// Mortgage Readiness Score calculation algorithm

export interface AssessmentResponses {
  creditScore: 'excellent' | 'good' | 'fair' | 'poor' | 'unsure';
  employmentLength: 'less_than_1' | '1_to_2' | '2_to_5' | 'more_than_5' | 'self_employed';
  annualIncome: 'under_50k' | '50k_75k' | '75k_100k' | '100k_150k' | 'over_150k';
  monthlyDebt: 'under_500' | '500_1000' | '1000_2000' | '2000_3000' | 'over_3000';
  downPayment: 'under_5' | '5_to_10' | '10_to_20' | '20_plus';
  preApproved: 'yes' | 'no' | 'started';
  creditEvents: 'none' | 'bankruptcy' | 'foreclosure' | 'late_payments';
  loanType: 'conventional' | 'fha' | 'va' | 'investment' | 'unsure';
  timeline: 'asap' | '1_to_3_months' | '3_to_6_months' | 'researching';
  location: string;
}

export interface ScoreBreakdown {
  totalScore: number;
  creditScore: number;
  employmentScore: number;
  incomeScore: number;
  debtScore: number;
  downPaymentScore: number;
  preApprovalScore: number;
  noNegativeEventsScore: number;
  category: 'MORTGAGE_READY' | 'ALMOST_THERE' | 'GETTING_PREPARED' | 'BUILDING_FOUNDATION';
  categoryLabel: string;
  categoryDescription: string;
}

export function calculateReadinessScore(responses: AssessmentResponses): ScoreBreakdown {
  // Credit Score (0-25 points)
  const creditScoreMap: Record<string, number> = {
    excellent: 25,
    good: 20,
    fair: 12,
    poor: 5,
    unsure: 10,
  };
  const creditScore = creditScoreMap[responses.creditScore] || 10;

  // Employment Stability (0-15 points)
  const employmentMap: Record<string, number> = {
    more_than_5: 15,
    '2_to_5': 13,
    '1_to_2': 10,
    self_employed: 12, // Self-employed can qualify but needs more documentation
    less_than_1: 5,
  };
  const employmentScore = employmentMap[responses.employmentLength] || 8;

  // Income Adequacy (0-15 points)
  const incomeMap: Record<string, number> = {
    over_150k: 15,
    '100k_150k': 14,
    '75k_100k': 12,
    '50k_75k': 9,
    under_50k: 5,
  };
  const incomeScore = incomeMap[responses.annualIncome] || 8;

  // Debt-to-Income indicator (0-15 points) - lower debt is better
  const debtMap: Record<string, number> = {
    under_500: 15,
    '500_1000': 13,
    '1000_2000': 10,
    '2000_3000': 6,
    over_3000: 3,
  };
  const debtScore = debtMap[responses.monthlyDebt] || 8;

  // Down Payment (0-15 points)
  const downPaymentMap: Record<string, number> = {
    '20_plus': 15,
    '10_to_20': 12,
    '5_to_10': 8,
    under_5: 4,
  };
  const downPaymentScore = downPaymentMap[responses.downPayment] || 6;

  // Pre-approval Status (0-10 points)
  const preApprovalMap: Record<string, number> = {
    yes: 10,
    started: 6,
    no: 2,
  };
  const preApprovalScore = preApprovalMap[responses.preApproved] || 2;

  // No Negative Credit Events (0-5 points)
  const creditEventsMap: Record<string, number> = {
    none: 5,
    late_payments: 3,
    bankruptcy: 1,
    foreclosure: 0,
  };
  const noNegativeEventsScore = creditEventsMap[responses.creditEvents] || 3;

  // Calculate total
  const totalScore =
    creditScore +
    employmentScore +
    incomeScore +
    debtScore +
    downPaymentScore +
    preApprovalScore +
    noNegativeEventsScore;

  // Determine category
  let category: ScoreBreakdown['category'];
  let categoryLabel: string;
  let categoryDescription: string;

  if (totalScore >= 80) {
    category = 'MORTGAGE_READY';
    categoryLabel = 'Mortgage Ready!';
    categoryDescription = "Great news! You appear to be in excellent shape for a mortgage. Your strong financial profile means you'll likely have multiple options and competitive rates available.";
  } else if (totalScore >= 60) {
    category = 'ALMOST_THERE';
    categoryLabel = 'Almost There!';
    categoryDescription = "You're in good shape! With a few improvements, you could be fully mortgage-ready. A local expert can help identify exactly what steps would strengthen your application.";
  } else if (totalScore >= 40) {
    category = 'GETTING_PREPARED';
    categoryLabel = 'Getting Prepared';
    categoryDescription = "You're on the right track! There are some areas to work on, but homeownership is definitely within reach. Let's connect you with an expert who can create a personalized roadmap.";
  } else {
    category = 'BUILDING_FOUNDATION';
    categoryLabel = 'Building Foundation';
    categoryDescription = "Every journey starts somewhere! Focus on building your credit and savings. Our experts can help you create a plan to achieve your homeownership goals.";
  }

  return {
    totalScore,
    creditScore,
    employmentScore,
    incomeScore,
    debtScore,
    downPaymentScore,
    preApprovalScore,
    noNegativeEventsScore,
    category,
    categoryLabel,
    categoryDescription,
  };
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-blue-600';
  if (score >= 40) return 'text-yellow-600';
  return 'text-orange-600';
}

export function getScoreBgColor(score: number): string {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-blue-500';
  if (score >= 40) return 'bg-yellow-500';
  return 'bg-orange-500';
}

export function getImprovementTips(responses: AssessmentResponses, breakdown: ScoreBreakdown): string[] {
  const tips: string[] = [];

  if (breakdown.creditScore < 20) {
    tips.push('Improving your credit score could significantly boost your mortgage options. Consider paying down credit card balances and avoiding new credit inquiries.');
  }

  if (breakdown.downPaymentScore < 12) {
    tips.push('A larger down payment (20%+) can eliminate PMI and get you better rates. Look into down payment assistance programs in your area.');
  }

  if (breakdown.debtScore < 10) {
    tips.push('Reducing your monthly debt payments will improve your debt-to-income ratio, a key factor in mortgage approval.');
  }

  if (breakdown.preApprovalScore < 6) {
    tips.push('Getting pre-approved shows sellers you\'re serious and helps you understand your budget. It\'s a great next step!');
  }

  if (responses.creditEvents !== 'none') {
    tips.push('Past credit events take time to age off your report. Some loan programs (like FHA) are more flexible with credit history.');
  }

  if (tips.length === 0) {
    tips.push('You\'re in great shape! Connect with a local expert to start your mortgage process and lock in today\'s rates.');
  }

  return tips;
}
