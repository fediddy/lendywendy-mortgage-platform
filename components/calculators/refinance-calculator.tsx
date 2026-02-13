"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Calculator, TrendingDown, TrendingUp, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface RefinanceResult {
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  totalClosingCosts: number;
  breakEvenMonths: number;
  lifetimeSavings: number;
  totalInterestCurrent: number;
  totalInterestNew: number;
  interestSavings: number;
  recommendation: "refinance" | "wait" | "review";
}

export function RefinanceCalculator() {
  const [currentLoanBalance, setCurrentLoanBalance] = useState<number>(250000);
  const [currentInterestRate, setCurrentInterestRate] = useState<number>(6.5);
  const [currentRemainingYears, setCurrentRemainingYears] = useState<string>("25");
  const [newInterestRate, setNewInterestRate] = useState<number>(5.5);
  const [newLoanTerm, setNewLoanTerm] = useState<string>("30");
  const [closingCosts, setClosingCosts] = useState<number>(5000);
  const [cashOutAmount, setCashOutAmount] = useState<number>(0);
  const [result, setResult] = useState<RefinanceResult | null>(null);

  const calculateRefinance = () => {
    // Calculate current monthly payment
    const currentMonthlyRate = currentInterestRate / 100 / 12;
    const currentPayments = parseInt(currentRemainingYears) * 12;
    const currentMonthlyPayment =
      (currentLoanBalance *
        (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentPayments))) /
      (Math.pow(1 + currentMonthlyRate, currentPayments) - 1);

    // Calculate new loan amount (including cash out and closing costs if rolled in)
    const newLoanAmount = currentLoanBalance + cashOutAmount;

    // Calculate new monthly payment
    const newMonthlyRate = newInterestRate / 100 / 12;
    const newPayments = parseInt(newLoanTerm) * 12;
    const newMonthlyPayment =
      (newLoanAmount *
        (newMonthlyRate * Math.pow(1 + newMonthlyRate, newPayments))) /
      (Math.pow(1 + newMonthlyRate, newPayments) - 1);

    // Monthly savings
    const monthlySavings = currentMonthlyPayment - newMonthlyPayment;

    // Break-even point (months to recoup closing costs)
    const breakEvenMonths = monthlySavings > 0 ? closingCosts / monthlySavings : Infinity;

    // Total interest on current loan (remaining)
    const totalInterestCurrent = currentMonthlyPayment * currentPayments - currentLoanBalance;

    // Total interest on new loan
    const totalInterestNew = newMonthlyPayment * newPayments - newLoanAmount;

    // Interest savings
    const interestSavings = totalInterestCurrent - totalInterestNew;

    // Lifetime savings (considering how long you'll stay)
    const yearsRemaining = Math.min(parseInt(currentRemainingYears), parseInt(newLoanTerm));
    const lifetimeSavings = monthlySavings * yearsRemaining * 12 - closingCosts;

    // Recommendation logic
    let recommendation: "refinance" | "wait" | "review";
    if (breakEvenMonths <= 24 && monthlySavings > 0) {
      recommendation = "refinance";
    } else if (breakEvenMonths > 60 || monthlySavings <= 0) {
      recommendation = "wait";
    } else {
      recommendation = "review";
    }

    setResult({
      currentMonthlyPayment,
      newMonthlyPayment,
      monthlySavings,
      totalClosingCosts: closingCosts,
      breakEvenMonths,
      lifetimeSavings,
      totalInterestCurrent,
      totalInterestNew,
      interestSavings,
      recommendation,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingDown className="w-6 h-6 text-emerald-500" />
          <CardTitle>Refinance Calculator</CardTitle>
        </div>
        <CardDescription>
          See if refinancing makes sense for you and calculate your potential savings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Loan Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-base">Current Loan Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="balance">Current Loan Balance</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="balance"
                  type="number"
                  value={currentLoanBalance}
                  onChange={(e) => setCurrentLoanBalance(Number(e.target.value))}
                  className="pl-9"
                  step="10000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentRate">Current Interest Rate (%)</Label>
              <Input
                id="currentRate"
                type="number"
                value={currentInterestRate}
                onChange={(e) => setCurrentInterestRate(Number(e.target.value))}
                step="0.125"
                min="0"
                max="20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="remaining">Years Remaining on Loan</Label>
              <Select value={currentRemainingYears} onValueChange={setCurrentRemainingYears}>
                <SelectTrigger id="remaining">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 years</SelectItem>
                  <SelectItem value="10">10 years</SelectItem>
                  <SelectItem value="15">15 years</SelectItem>
                  <SelectItem value="20">20 years</SelectItem>
                  <SelectItem value="25">25 years</SelectItem>
                  <SelectItem value="30">30 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* New Loan Section */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-semibold text-base">New Loan Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newRate">New Interest Rate (%)</Label>
              <Input
                id="newRate"
                type="number"
                value={newInterestRate}
                onChange={(e) => setNewInterestRate(Number(e.target.value))}
                step="0.125"
                min="0"
                max="20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newTerm">New Loan Term</Label>
              <Select value={newLoanTerm} onValueChange={setNewLoanTerm}>
                <SelectTrigger id="newTerm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 years</SelectItem>
                  <SelectItem value="20">20 years</SelectItem>
                  <SelectItem value="30">30 years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="closing">Estimated Closing Costs</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="closing"
                  type="number"
                  value={closingCosts}
                  onChange={(e) => setClosingCosts(Number(e.target.value))}
                  className="pl-9"
                  step="500"
                />
              </div>
              <p className="text-xs text-muted-foreground">Typically 2-5% of loan amount</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cashout">Cash Out Amount (optional)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="cashout"
                  type="number"
                  value={cashOutAmount}
                  onChange={(e) => setCashOutAmount(Number(e.target.value))}
                  className="pl-9"
                  step="5000"
                />
              </div>
            </div>
          </div>
        </div>

        <Button onClick={calculateRefinance} className="w-full" size="lg">
          <Calculator className="w-4 h-4 mr-2" />
          Calculate Refinance Savings
        </Button>

        {/* Results */}
        {result && (
          <div className="mt-6 space-y-4">
            <div className="border-t pt-4">
              {/* Recommendation Alert */}
              {result.recommendation === "refinance" && (
                <Alert className="mb-4 bg-emerald-50 border-emerald-600/30">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <AlertTitle className="text-emerald-600">Refinancing Looks Good!</AlertTitle>
                  <AlertDescription className="text-emerald-600">
                    Based on your numbers, refinancing could save you money. Consider getting quotes from lenders.
                  </AlertDescription>
                </Alert>
              )}

              {result.recommendation === "wait" && (
                <Alert className="mb-4 bg-red-50 border-red-600/30">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertTitle className="text-red-600">Consider Waiting</AlertTitle>
                  <AlertDescription className="text-red-600">
                    The savings may not justify the costs right now. Monitor rates or consider other options.
                  </AlertDescription>
                </Alert>
              )}

              {result.recommendation === "review" && (
                <Alert className="mb-4 bg-amber-50 border-amber-600/30">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-600">Review Carefully</AlertTitle>
                  <AlertDescription className="text-amber-600">
                    There are potential savings, but review all factors including how long you plan to stay.
                  </AlertDescription>
                </Alert>
              )}

              <h3 className="text-lg font-semibold mb-4">Your Refinance Analysis</h3>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Card className={result.monthlySavings > 0 ? "bg-emerald-50 border-emerald-600/30" : "bg-red-50 border-red-600/30"}>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-600 mb-2">Monthly Savings</p>
                    <p className={`text-3xl font-bold ${result.monthlySavings > 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {result.monthlySavings > 0 ? "+" : ""}${Math.abs(result.monthlySavings).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-teal-50 border-teal-600/30">
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-600 mb-2">Break-Even Point</p>
                    <p className="text-3xl font-bold text-teal-600">
                      {result.breakEvenMonths === Infinity ? "N/A" : `${Math.round(result.breakEvenMonths)} mo`}
                    </p>
                  </CardContent>
                </Card>

                <Card className={result.lifetimeSavings > 0 ? "bg-purple-50 border-purple-600/30" : "bg-gray-100 border-gray-200"}>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-600 mb-2">Lifetime Savings</p>
                    <p className={`text-3xl font-bold ${result.lifetimeSavings > 0 ? "text-purple-600" : "text-gray-500"}`}>
                      ${result.lifetimeSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Payment Comparison</h4>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Current Monthly Payment</span>
                    <span className="font-medium">
                      ${result.currentMonthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">New Monthly Payment</span>
                    <span className="font-medium">
                      ${result.newMonthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b font-semibold">
                    <span>Monthly Difference</span>
                    <span className={result.monthlySavings > 0 ? "text-green-600" : "text-red-600"}>
                      {result.monthlySavings > 0 ? "+" : ""}${Math.abs(result.monthlySavings).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <h4 className="font-semibold text-sm">Cost Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Closing Costs</span>
                      <span className="font-medium text-red-600">
                        ${result.totalClosingCosts.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Break-Even Timeline</span>
                      <span className="font-medium">
                        {result.breakEvenMonths === Infinity
                          ? "Never (losing money)"
                          : `${Math.round(result.breakEvenMonths)} months (${(result.breakEvenMonths / 12).toFixed(1)} years)`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <h4 className="font-semibold text-sm">Interest Savings</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Total Interest (Current Loan)</span>
                      <span className="font-medium">
                        ${result.totalInterestCurrent.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Total Interest (New Loan)</span>
                      <span className="font-medium">
                        ${result.totalInterestNew.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-t font-semibold">
                      <span>Interest Savings</span>
                      <span className={result.interestSavings > 0 ? "text-green-600" : "text-red-600"}>
                        ${result.interestSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-teal-50 border border-teal-600/30 rounded-lg">
                  <p className="text-sm text-teal-600">
                    <strong>Next Steps:</strong> Ready to explore refinancing options?
                    Get personalized quotes from multiple lenders to find the best rate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
