import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { calculateEnhancedLeadScore } from "@/lib/lead-scoring";
import { sendWebhook } from "@/lib/webhooks";
import { z } from "zod";
import {
  Segment,
  LoanType,
  PropertyType,
  CreditRange,
  Timeline,
  EmploymentStatus,
} from "@prisma/client";

// Validation schema
const leadSchema = z.object({
  segment: z.nativeEnum(Segment),
  loanType: z.nativeEnum(LoanType),
  propertyType: z.nativeEnum(PropertyType).optional(),
  propertyValue: z.number().positive().optional(),
  purchasePrice: z.number().positive().optional(),
  propertyLocation: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  creditRange: z.nativeEnum(CreditRange).optional(),
  downPayment: z.number().positive().optional(),
  downPaymentPercent: z.number().min(0).max(100).optional(),
  timeline: z.nativeEnum(Timeline).optional(),
  currentlyOwn: z.boolean().optional(),
  employmentStatus: z.nativeEnum(EmploymentStatus).optional(),
  annualIncome: z.number().positive().optional(),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  userAgent: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = leadSchema.parse(body);

    // Calculate enhanced lead score with breakdown
    const scoringResult = calculateEnhancedLeadScore({
      segment: validatedData.segment,
      loanType: validatedData.loanType,
      creditRange: validatedData.creditRange,
      downPaymentPercent: validatedData.downPaymentPercent,
      timeline: validatedData.timeline,
      employmentStatus: validatedData.employmentStatus,
      annualIncome: validatedData.annualIncome,
      propertyValue: validatedData.propertyValue,
      currentlyOwn: validatedData.currentlyOwn,
      phone: validatedData.phone,
      propertyLocation: validatedData.propertyLocation,
    });

    // Get IP address
    const ipAddress = request.headers.get("x-forwarded-for") ||
                     request.headers.get("x-real-ip") ||
                     "unknown";

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        ...validatedData,
        score: scoringResult.score,
        ipAddress,
        status: "NEW",
      },
    });

    logger.info("Lead created", {
      component: "leads-api",
      metadata: {
        leadId: lead.id,
        email: lead.email,
        segment: lead.segment,
        score: lead.score,
        tier: scoringResult.tier,
        qualification: scoringResult.qualification,
      },
    });

    // Send webhook for lead.created event (async, don't block response)
    sendWebhook({
      event: "lead.created",
      timestamp: new Date().toISOString(),
      data: {
        leadId: lead.id,
        email: lead.email,
        name: lead.name,
        phone: lead.phone || undefined,
        segment: lead.segment,
        score: lead.score,
        status: lead.status,
        tier: scoringResult.tier,
        qualification: scoringResult.qualification,
        loanType: lead.loanType,
        timeline: lead.timeline || undefined,
      },
    }).catch((error) => {
      // Log webhook errors but don't fail the request
      logger.error("Webhook send failed", error as Error, {
        component: "leads-api",
        metadata: { leadId: lead.id },
      });
    });

    // Send hot lead webhook if score >= 80
    if (scoringResult.tier === "hot") {
      logger.info("Hot lead detected", {
        component: "leads-api",
        metadata: {
          leadId: lead.id,
          score: lead.score,
          breakdown: scoringResult.breakdown,
        },
      });

      // Send hot lead webhook (async)
      sendWebhook({
        event: "lead.hot",
        timestamp: new Date().toISOString(),
        data: {
          leadId: lead.id,
          email: lead.email,
          name: lead.name,
          phone: lead.phone || undefined,
          segment: lead.segment,
          score: lead.score,
          status: lead.status,
          tier: scoringResult.tier,
          qualification: scoringResult.qualification,
          recommendations: scoringResult.recommendations,
          breakdown: scoringResult.breakdown,
        },
      }).catch((error) => {
        logger.error("Hot lead webhook failed", error as Error, {
          component: "leads-api",
          metadata: { leadId: lead.id },
        });
      });
    }

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        message: "Thank you! We'll be in touch shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid data submitted",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    logger.error("Lead creation failed", error as Error, {
      component: "leads-api",
    });

    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit lead. Please try again.",
      },
      { status: 500 }
    );
  }
}

// Note: Lead scoring has been moved to lib/lead-scoring.ts for enhanced functionality
// The enhanced scoring includes detailed breakdown, tier assignment, qualification level,
// and personalized recommendations for each lead.
