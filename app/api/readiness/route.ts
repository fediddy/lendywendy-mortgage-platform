import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { ScoreBreakdown, AssessmentResponses } from '@/lib/scoring/readiness';
import { Segment, LoanType, CreditRange, Timeline } from '@prisma/client';
import { sendToMaxBounty } from '@/lib/integrations/maxbounty';
import { notifyAdminOfNewLead, sendLeadConfirmation, matchAndNotifyAgent } from '@/lib/integrations/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, responses, score, sessionId } = body as {
      email: string;
      responses: AssessmentResponses;
      score: ScoreBreakdown;
      sessionId: string;
    };

    if (!email || !responses || !score || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create or update readiness assessment
    const assessment = await prisma.readinessAssessment.upsert({
      where: { sessionId },
      create: {
        sessionId,
        responses: JSON.stringify(responses),
        totalScore: score.totalScore,
        creditScore: score.creditScore,
        employmentScore: score.employmentScore,
        incomeScore: score.incomeScore,
        debtScore: score.debtScore,
        downPaymentScore: score.downPaymentScore,
        preApprovalScore: score.preApprovalScore,
        noNegativeEventsScore: score.noNegativeEventsScore,
        category: score.category,
        completed: true,
        emailCaptured: true,
      },
      update: {
        emailCaptured: true,
      },
    });

    // Create lead from assessment
    const lead = await prisma.lead.create({
      data: {
        leadSource: 'READINESS_SCORE',
        email,
        name: '', // Will be captured later
        segment: getSegmentFromLoanType(responses.loanType),
        loanType: getLoanTypeEnum(responses.loanType),
        propertyLocation: responses.location,
        creditRange: getCreditRangeEnum(responses.creditScore),
        timeline: getTimelineEnum(responses.timeline),
        score: score.totalScore,
        scoreCategory: score.category.toLowerCase().replace('_', '-'),
        tcpaConsent: true,
        consentTimestamp: new Date(),
        sourceUrl: '/readiness-score',
      },
    });

    // Link assessment to lead
    await prisma.readinessAssessment.update({
      where: { id: assessment.id },
      data: { leadId: lead.id },
    });

    // Fetch full lead for MaxBounty submission
    const fullLead = await prisma.lead.findUnique({
      where: { id: lead.id },
    });

    // Send to MaxBounty for affiliate tracking (async, non-blocking)
    if (fullLead) {
      sendToMaxBounty(fullLead).catch((error) => {
        console.error('MaxBounty submission failed:', error);
      });

      // Send email notifications (async, non-blocking)
      Promise.all([
        notifyAdminOfNewLead(fullLead),
        sendLeadConfirmation(fullLead),
        matchAndNotifyAgent(fullLead),
      ]).catch((error) => {
        console.error('Email notifications failed:', error);
      });
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
    });
  } catch (error) {
    console.error('Readiness API error:', error);
    return NextResponse.json(
      { error: 'Failed to save assessment' },
      { status: 500 }
    );
  }
}

// Helper functions to convert responses to enum values
function getSegmentFromLoanType(loanType: string): Segment {
  if (loanType === 'investment') return 'INVESTMENT';
  return 'RESIDENTIAL'; // Default to residential
}

function getLoanTypeEnum(loanType: string): LoanType {
  const mapping: Record<string, LoanType> = {
    conventional: 'PURCHASE',
    fha: 'FHA_LOAN',
    va: 'VA_LOAN',
    investment: 'INVESTMENT_PROPERTY',
    unsure: 'PURCHASE',
  };
  return mapping[loanType] || 'PURCHASE';
}

function getCreditRangeEnum(creditScore: string): CreditRange | undefined {
  const mapping: Record<string, CreditRange> = {
    excellent: 'EXCELLENT_740_PLUS',
    good: 'GOOD_670_739',
    fair: 'FAIR_580_669',
    poor: 'POOR_BELOW_580',
    unsure: 'NOT_SURE',
  };
  return mapping[creditScore];
}

function getTimelineEnum(timeline: string): Timeline | undefined {
  const mapping: Record<string, Timeline> = {
    asap: 'ASAP',
    '1_to_3_months': 'ONE_TO_THREE_MONTHS',
    '3_to_6_months': 'THREE_TO_SIX_MONTHS',
    researching: 'JUST_RESEARCHING',
  };
  return mapping[timeline];
}
