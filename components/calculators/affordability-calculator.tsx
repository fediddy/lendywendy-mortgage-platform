"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { DollarSign, TrendingUp, Home, Calculator } from "lucide-react";

interface AffordabilityResult {
  maxHomePrice: number;
  monthlyPayment: number;
  downPayment: number;
  loanAmount: number;
  propertyTax: number;
  homeInsurance: number;
  pmi: number;
  totalMonthlyPayment: number;
}

export function AffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState<number>(75000);
  const [monthlyDebts, setMonthlyDebts] = useState<number>(500);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(7.0);
  const [loanTerm, setLoanTerm] = useState<string>("30");
  const [result, setResult] = useState<AffordabilityResult | null>(null);

  const calculateAffordability = () => {
    // DTI ratio - typically 43% max for conventional loans
    const maxDTI = 0.43;
    const monthlyIncome = annualIncome / 12;
    const maxMonthlyPayment = monthlyIncome * maxDTI - monthlyDebts;

    // Calculate max loan amount based on monthly payment
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = parseInt(loanTerm) * 12;

    // Mortgage payment formula: M = P[r(1+r)^n]/[(1+r)^n-1]
    // Solving for P (principal): P = M * [(1+r)^n - 1] / [r(1+r)^n]
    const denominator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
    const numerator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;

    // Estimate property tax (1.2% annually), insurance (0.5% annually), and HOA
    const estimatedTaxInsuranceRate = 0.017 / 12; // ~1.7% annually, monthly

    // Available for principal & interest after tax/insurance
    const availableForPI = maxMonthlyPayment * 0.75; // Conservative estimate

    const maxLoanAmount = availableForPI * (numerator / denominator);
    const downPaymentAmount = maxLoanAmount * (downPaymentPercent / 100) / (1 - downPaymentPercent / 100);
    const maxHomePrice = maxLoanAmount + downPaymentAmount;

    // Calculate all payment components
    const propertyTax = (maxHomePrice * 0.012) / 12;
    const homeInsurance = (maxHomePrice * 0.005) / 12;
    const pmi = downPaymentPercent < 20 ? (maxLoanAmount * 0.005) / 12 : 0;

    const principalAndInterest = availableForPI;
    const totalMonthlyPayment = principalAndInterest + propertyTax + homeInsurance + pmi;

    setResult({
      maxHomePrice,
      monthlyPayment: principalAndInterest,
      downPayment: downPaymentAmount,
      loanAmount: maxLoanAmount,
      propertyTax,
      homeInsurance,
      pmi,
      totalMonthlyPayment,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Home className="w-6 h-6 text-amber-500" />
          <CardTitle>Home Affordability Calculator</CardTitle>
        </div>
        <CardDescription>
          Find out how much house you can afford based on your income and debts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Form */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="income">Annual Gross Income</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="income"
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="pl-9"
                step="1000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="debts">Monthly Debts (Car, Credit Cards, etc.)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="debts"
                type="number"
                value={monthlyDebts}
                onChange={(e) => setMonthlyDebts(Number(e.target.value))}
                className="pl-9"
                step="50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate">Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              step="0.125"
              min="0"
              max="20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="term">Loan Term</Label>
            <Select value={loanTerm} onValueChange={setLoanTerm}>
              <SelectTrigger id="term">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 years</SelectItem>
                <SelectItem value="20">20 years</SelectItem>
                <SelectItem value="30">30 years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label>Down Payment: {downPaymentPercent}%</Label>
            <Slider
              value={[downPaymentPercent]}
              onValueChange={(value) => setDownPaymentPercent(value[0])}
              min={3}
              max={50}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>3%</span>
              <span>50%</span>
            </div>
          </div>
        </div>

        <Button onClick={calculateAffordability} className="w-full" size="lg">
          <Calculator className="w-4 h-4 mr-2" />
          Calculate Affordability
        </Button>

        {/* Results */}
        {result && (
          <div className="mt-6 space-y-4">
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">Your Results</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-blue-500/10 border-blue-500/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-blue-300">Max Home Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-blue-600">
                      ${result.maxHomePrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-emerald-500/10 border-emerald-500/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-emerald-300">Down Payment Needed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-green-600">
                      ${result.downPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {downPaymentPercent}% of home price
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4 space-y-3">
                <h4 className="font-semibold">Monthly Payment Breakdown</h4>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Principal & Interest</span>
                    <span className="font-medium">
                      ${result.monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Property Taxes (est.)</span>
                    <span className="font-medium">
                      ${result.propertyTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Home Insurance (est.)</span>
                    <span className="font-medium">
                      ${result.homeInsurance.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  {result.pmi > 0 && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">PMI (down payment &lt; 20%)</span>
                      <span className="font-medium">
                        ${result.pmi.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 border-t-2 font-semibold text-base">
                    <span>Total Monthly Payment</span>
                    <span className="text-blue-600">
                      ${result.totalMonthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <p className="text-sm text-amber-300">
                    <strong>Note:</strong> This is an estimate based on a 43% debt-to-income ratio.
                    Actual affordability may vary based on credit score, location, and lender requirements.
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
