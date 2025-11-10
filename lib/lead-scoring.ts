import { Segment, LoanType, CreditRange, Timeline, EmploymentStatus } from "@prisma/client";

export interface LeadData {
  segment: Segment;
  loanType: LoanType;
  creditRange?: CreditRange;
  downPaymentPercent?: number;
  timeline?: Timeline;
  employmentStatus?: EmploymentStatus;
  annualIncome?: number;
  propertyValue?: number;
  currentlyOwn?: boolean;
  phone?: string;
  propertyLocation?: string;
}

export interface ScoringResult {
  score: number;
  breakdown: {
    creditScore: number;
    downPayment: number;
    timeline: number;
    employment: number;
    income: number;
    completeness: number;
    segment: number;
    loanType: number;
  };
  tier: "hot" | "warm" | "cold";
  qualification: "high" | "medium" | "low";
  recommendations: string[];
}

/**
 * Enhanced lead scoring algorithm with detailed breakdown
 * Score range: 0-100
 */
export function calculateEnhancedLeadScore(data: LeadData): ScoringResult {
  const breakdown = {
    creditScore: scoreCreditRange(data.creditRange),
    downPayment: scoreDownPayment(data.downPaymentPercent, data.propertyValue),
    timeline: scoreTimeline(data.timeline),
    employment: scoreEmployment(data.employmentStatus),
    income: scoreIncome(data.annualIncome, data.propertyValue),
    completeness: scoreCompleteness(data),
    segment: scoreSegment(data.segment),
    loanType: scoreLoanType(data.loanType, data.segment),
  };

  // Calculate total score (weighted average)
  const totalScore = Math.round(
    breakdown.creditScore * 0.25 + // 25% weight
    breakdown.downPayment * 0.20 + // 20% weight
    breakdown.timeline * 0.15 +    // 15% weight
    breakdown.employment * 0.10 +  // 10% weight
    breakdown.income * 0.10 +      // 10% weight
    breakdown.completeness * 0.10 + // 10% weight
    breakdown.segment * 0.05 +     // 5% weight
    breakdown.loanType * 0.05      // 5% weight
  );

  const tier = determineTier(totalScore);
  const qualification = determineQualification(breakdown);
  const recommendations = generateRecommendations(data, breakdown);

  return {
    score: totalScore,
    breakdown,
    tier,
    qualification,
    recommendations,
  };
}

/**
 * Score credit range (0-25 points)
 */
function scoreCreditRange(creditRange?: CreditRange): number {
  if (!creditRange) return 10; // Unknown, assume average

  switch (creditRange) {
    case CreditRange.EXCELLENT_740_PLUS:
      return 25;
    case CreditRange.GOOD_670_739:
      return 18;
    case CreditRange.FAIR_580_669:
      return 10;
    case CreditRange.POOR_BELOW_580:
      return 3;
    case CreditRange.NOT_SURE:
      return 10;
    default:
      return 10;
  }
}

/**
 * Score down payment (0-20 points)
 */
function scoreDownPayment(downPaymentPercent?: number, propertyValue?: number): number {
  if (!downPaymentPercent) return 8; // Unknown, assume 10%

  if (downPaymentPercent >= 25) return 20;
  if (downPaymentPercent >= 20) return 18;
  if (downPaymentPercent >= 15) return 14;
  if (downPaymentPercent >= 10) return 10;
  if (downPaymentPercent >= 5) return 6;
  return 3; // Less than 5%
}

/**
 * Score timeline urgency (0-15 points)
 */
function scoreTimeline(timeline?: Timeline): number {
  if (!timeline) return 6; // Unknown, assume moderate

  switch (timeline) {
    case Timeline.ASAP:
      return 15;
    case Timeline.WITHIN_30_DAYS:
      return 13;
    case Timeline.ONE_TO_THREE_MONTHS:
      return 10;
    case Timeline.THREE_TO_SIX_MONTHS:
      return 6;
    case Timeline.SIX_PLUS_MONTHS:
      return 3;
    case Timeline.JUST_RESEARCHING:
      return 1;
    default:
      return 6;
  }
}

/**
 * Score employment status (0-10 points)
 */
function scoreEmployment(employmentStatus?: EmploymentStatus): number {
  if (!employmentStatus) return 5; // Unknown

  switch (employmentStatus) {
    case EmploymentStatus.EMPLOYED_W2:
      return 10;
    case EmploymentStatus.SELF_EMPLOYED:
      return 8;
    case EmploymentStatus.RETIRED:
      return 7;
    case EmploymentStatus.OTHER:
      return 5;
    case EmploymentStatus.NOT_EMPLOYED:
      return 1;
    default:
      return 5;
  }
}

/**
 * Score income relative to property value (0-10 points)
 */
function scoreIncome(annualIncome?: number, propertyValue?: number): number {
  if (!annualIncome) return 5; // Unknown

  // Absolute income scoring
  let score = 5;
  if (annualIncome >= 200000) score = 10;
  else if (annualIncome >= 150000) score = 9;
  else if (annualIncome >= 100000) score = 8;
  else if (annualIncome >= 75000) score = 6;
  else if (annualIncome >= 50000) score = 4;
  else score = 2;

  // Adjust based on property value ratio (if available)
  if (propertyValue && propertyValue > 0) {
    const ratio = propertyValue / annualIncome;
    if (ratio <= 3) score = Math.min(10, score + 2); // Very affordable
    else if (ratio <= 4) score = Math.min(10, score + 1); // Affordable
    else if (ratio > 6) score = Math.max(0, score - 2); // Stretch
  }

  return score;
}

/**
 * Score lead completeness (0-10 points)
 */
function scoreCompleteness(data: LeadData): number {
  let score = 0;

  // Phone number provided (high intent)
  if (data.phone) score += 3;

  // Property details provided
  if (data.propertyValue || data.propertyLocation) score += 2;

  // Financial details provided
  if (data.creditRange) score += 2;
  if (data.downPaymentPercent) score += 1;
  if (data.annualIncome) score += 1;

  // Additional context
  if (data.timeline) score += 1;

  return Math.min(10, score);
}

/**
 * Score segment type (0-5 points)
 */
function scoreSegment(segment: Segment): number {
  switch (segment) {
    case Segment.INVESTMENT:
      return 5; // Highest value - likely to close multiple deals
    case Segment.COMMERCIAL:
      return 4; // High value - larger loan amounts
    case Segment.RESIDENTIAL:
      return 3; // Standard value
    default:
      return 3;
  }
}

/**
 * Score loan type within segment (0-5 points)
 */
function scoreLoanType(loanType: LoanType, segment: Segment): number {
  // Refinance and purchase are generally higher intent
  if (loanType === LoanType.PURCHASE || loanType === LoanType.REFINANCE) {
    return 5;
  }

  // Investment property purchases
  if (
    segment === Segment.INVESTMENT &&
    (loanType === LoanType.INVESTMENT_PROPERTY || loanType === LoanType.FIX_AND_FLIP)
  ) {
    return 5;
  }

  // Commercial loans
  if (
    segment === Segment.COMMERCIAL &&
    (loanType === LoanType.COMMERCIAL_PURCHASE || loanType === LoanType.COMMERCIAL_REFINANCE)
  ) {
    return 5;
  }

  // Cash-out refinance (lower priority but still valuable)
  if (loanType === LoanType.CASH_OUT_REFINANCE) {
    return 4;
  }

  // Other loan types
  return 3;
}

/**
 * Determine lead tier based on score
 */
function determineTier(score: number): "hot" | "warm" | "cold" {
  if (score >= 80) return "hot";
  if (score >= 60) return "warm";
  return "cold";
}

/**
 * Determine qualification likelihood
 */
function determineQualification(breakdown: ScoringResult["breakdown"]): "high" | "medium" | "low" {
  // High qualification: strong credit, employment, and down payment
  if (
    breakdown.creditScore >= 18 &&
    breakdown.employment >= 8 &&
    breakdown.downPayment >= 14
  ) {
    return "high";
  }

  // Low qualification: weak credit or employment
  if (breakdown.creditScore <= 10 || breakdown.employment <= 3) {
    return "low";
  }

  return "medium";
}

/**
 * Generate personalized recommendations
 */
function generateRecommendations(data: LeadData, breakdown: ScoringResult["breakdown"]): string[] {
  const recommendations: string[] = [];

  // Credit recommendations
  if (breakdown.creditScore < 15) {
    recommendations.push("Consider credit repair before applying");
    recommendations.push("Review credit report for errors");
  }

  // Down payment recommendations
  if (breakdown.downPayment < 10) {
    recommendations.push("Explore down payment assistance programs");
    recommendations.push("Consider FHA loans with 3.5% down");
  }

  // Timeline recommendations
  if (breakdown.timeline >= 13) {
    recommendations.push("Fast-track pre-approval process");
    recommendations.push("Prioritize lender with quick closing times");
  } else if (breakdown.timeline <= 3) {
    recommendations.push("Use time to improve credit score");
    recommendations.push("Save additional down payment funds");
  }

  // Employment recommendations
  if (data.employmentStatus === EmploymentStatus.SELF_EMPLOYED) {
    recommendations.push("Prepare 2 years of tax returns");
    recommendations.push("Consider bank statement loans");
  }

  // Income recommendations
  if (breakdown.income < 6) {
    recommendations.push("Consider adding co-borrower");
    recommendations.push("Look for properties in lower price range");
  }

  // Completeness recommendations
  if (breakdown.completeness < 7) {
    recommendations.push("Complete full financial profile");
    recommendations.push("Provide additional documentation");
  }

  return recommendations;
}

/**
 * Calculate DTI ratio for qualification check
 */
export function calculateDTI(
  monthlyIncome: number,
  monthlyDebts: number,
  proposedHousingPayment: number
): {
  frontEnd: number;
  backEnd: number;
  qualifiesConventional: boolean;
  qualifiesFHA: boolean;
} {
  const frontEnd = (proposedHousingPayment / monthlyIncome) * 100;
  const backEnd = ((proposedHousingPayment + monthlyDebts) / monthlyIncome) * 100;

  return {
    frontEnd,
    backEnd,
    qualifiesConventional: frontEnd <= 28 && backEnd <= 43,
    qualifiesFHA: frontEnd <= 31 && backEnd <= 43,
  };
}
