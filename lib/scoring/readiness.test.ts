import { describe, it, expect } from "vitest";
import {
  calculateReadinessScore,
  getScoreColor,
  getScoreBgColor,
  type AssessmentResponses,
} from "./readiness";

const strongProfile: AssessmentResponses = {
  creditScore: "excellent",
  employmentLength: "more_than_5",
  annualIncome: "over_150k",
  monthlyDebt: "under_500",
  downPayment: "20_plus",
  preApproved: "yes",
  creditEvents: "none",
  loanType: "conventional",
  timeline: "asap",
  location: "Los Angeles, CA",
};

const weakProfile: AssessmentResponses = {
  creditScore: "poor",
  employmentLength: "less_than_1",
  annualIncome: "under_50k",
  monthlyDebt: "over_3000",
  downPayment: "under_5",
  preApproved: "no",
  creditEvents: "foreclosure",
  loanType: "unsure",
  timeline: "researching",
  location: "Sacramento, CA",
};

describe("calculateReadinessScore", () => {
  it("returns MORTGAGE_READY for a strong profile", () => {
    const result = calculateReadinessScore(strongProfile);
    expect(result.totalScore).toBe(100);
    expect(result.category).toBe("MORTGAGE_READY");
  });

  it("returns BUILDING_FOUNDATION for a weak profile", () => {
    const result = calculateReadinessScore(weakProfile);
    expect(result.totalScore).toBeLessThan(40);
    expect(result.category).toBe("BUILDING_FOUNDATION");
  });

  it("scores each dimension independently", () => {
    const result = calculateReadinessScore(strongProfile);
    expect(result.creditScore).toBe(25);
    expect(result.employmentScore).toBe(15);
    expect(result.incomeScore).toBe(15);
    expect(result.debtScore).toBe(15);
    expect(result.downPaymentScore).toBe(15);
    expect(result.preApprovalScore).toBe(10);
    expect(result.noNegativeEventsScore).toBe(5);
  });

  it("returns ALMOST_THERE for scores 60-79", () => {
    const midProfile: AssessmentResponses = {
      ...strongProfile,
      creditScore: "fair",
      downPayment: "5_to_10",
      preApproved: "no",
      creditEvents: "late_payments",
    };
    const result = calculateReadinessScore(midProfile);
    expect(result.totalScore).toBeGreaterThanOrEqual(60);
    expect(result.totalScore).toBeLessThan(80);
    expect(result.category).toBe("ALMOST_THERE");
  });

  it("returns GETTING_PREPARED for scores 40-59", () => {
    const lowMidProfile: AssessmentResponses = {
      ...weakProfile,
      creditScore: "fair",
      employmentLength: "2_to_5",
      annualIncome: "75k_100k",
    };
    const result = calculateReadinessScore(lowMidProfile);
    expect(result.totalScore).toBeGreaterThanOrEqual(40);
    expect(result.totalScore).toBeLessThan(60);
    expect(result.category).toBe("GETTING_PREPARED");
  });
});

describe("getScoreColor", () => {
  it("returns green for 80+", () => {
    expect(getScoreColor(80)).toBe("text-green-600");
    expect(getScoreColor(100)).toBe("text-green-600");
  });

  it("returns blue for 60-79", () => {
    expect(getScoreColor(60)).toBe("text-blue-600");
    expect(getScoreColor(79)).toBe("text-blue-600");
  });

  it("returns yellow for 40-59", () => {
    expect(getScoreColor(40)).toBe("text-yellow-600");
  });

  it("returns orange for below 40", () => {
    expect(getScoreColor(20)).toBe("text-orange-600");
  });
});

describe("getScoreBgColor", () => {
  it("returns correct background colors", () => {
    expect(getScoreBgColor(80)).toBe("bg-green-500");
    expect(getScoreBgColor(60)).toBe("bg-blue-500");
    expect(getScoreBgColor(40)).toBe("bg-yellow-500");
    expect(getScoreBgColor(20)).toBe("bg-orange-500");
  });
});
