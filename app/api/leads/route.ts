import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
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

    // Calculate lead score
    const score = calculateLeadScore(validatedData);

    // Get IP address
    const ipAddress = request.headers.get("x-forwarded-for") ||
                     request.headers.get("x-real-ip") ||
                     "unknown";

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        ...validatedData,
        score,
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
      },
    });

    // TODO: Send notification email to sales team for hot leads (score >= 80)
    if (score >= 80) {
      logger.info("Hot lead detected", {
        component: "leads-api",
        metadata: { leadId: lead.id, score },
      });
      // Integrate with email service here
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

// Lead scoring algorithm (0-100)
function calculateLeadScore(data: z.infer<typeof leadSchema>): number {
  let score = 50; // Base score

  // Credit score impact (0-25 points)
  if (data.creditRange === CreditRange.EXCELLENT_740_PLUS) {
    score += 25;
  } else if (data.creditRange === CreditRange.GOOD_670_739) {
    score += 15;
  } else if (data.creditRange === CreditRange.FAIR_580_669) {
    score += 5;
  } else if (data.creditRange === CreditRange.POOR_BELOW_580) {
    score -= 10;
  }

  // Down payment impact (0-20 points)
  if (data.downPaymentPercent) {
    if (data.downPaymentPercent >= 20) {
      score += 20;
    } else if (data.downPaymentPercent >= 10) {
      score += 10;
    } else if (data.downPaymentPercent >= 5) {
      score += 5;
    }
  } else if (data.downPayment && data.propertyValue) {
    const percent = (data.downPayment / data.propertyValue) * 100;
    if (percent >= 20) {
      score += 20;
    } else if (percent >= 10) {
      score += 10;
    } else if (percent >= 5) {
      score += 5;
    }
  }

  // Timeline urgency (0-15 points)
  if (data.timeline === Timeline.ASAP) {
    score += 15;
  } else if (data.timeline === Timeline.WITHIN_30_DAYS) {
    score += 12;
  } else if (data.timeline === Timeline.ONE_TO_THREE_MONTHS) {
    score += 8;
  } else if (data.timeline === Timeline.THREE_TO_SIX_MONTHS) {
    score += 4;
  } else if (data.timeline === Timeline.JUST_RESEARCHING) {
    score -= 5;
  }

  // Employment status (0-10 points)
  if (data.employmentStatus === EmploymentStatus.EMPLOYED_W2) {
    score += 10;
  } else if (data.employmentStatus === EmploymentStatus.SELF_EMPLOYED) {
    score += 7;
  } else if (data.employmentStatus === EmploymentStatus.RETIRED) {
    score += 5;
  } else if (data.employmentStatus === EmploymentStatus.NOT_EMPLOYED) {
    score -= 10;
  }

  // Income impact (0-10 points)
  if (data.annualIncome) {
    if (data.annualIncome >= 150000) {
      score += 10;
    } else if (data.annualIncome >= 100000) {
      score += 7;
    } else if (data.annualIncome >= 75000) {
      score += 5;
    } else if (data.annualIncome >= 50000) {
      score += 3;
    }
  }

  // Phone number provided (5 points - shows higher intent)
  if (data.phone) {
    score += 5;
  }

  // Property details provided (5 points)
  if (data.propertyValue || data.propertyLocation) {
    score += 5;
  }

  // Ensure score is between 0-100
  return Math.max(0, Math.min(100, Math.round(score)));
}
