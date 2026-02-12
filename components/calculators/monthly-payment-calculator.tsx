"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { DollarSign, Calculator, PieChart } from "lucide-react";

interface PaymentResult {
  monthlyPI: number;
  propertyTax: number;
  homeInsurance: number;
  pmi: number;
  hoaFees: number;
  totalMonthly: number;
  totalInterest: number;
  totalCost: number;
  loanAmount: number;
}

export function MonthlyPaymentCalculator() {
  const [homePrice, setHomePrice] = useState<number>(350000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(7.0);
  const [loanTerm, setLoanTerm] = useState<string>("30");
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.2);
  const [insuranceAnnual, setInsuranceAnnual] = useState<number>(1500);
  const [hoaMonthly, setHoaMonthly] = useState<number>(0);
  const [result, setResult] = useState<PaymentResult | null>(null);

  const calculatePayment = () => {
    const downPayment = homePrice * (downPaymentPercent / 100);
    const loanAmount = homePrice - downPayment;

    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = parseInt(loanTerm) * 12;

    // Monthly principal & interest using mortgage formula
    // M = P[r(1+r)^n]/[(1+r)^n-1]
    const monthlyPI =
      (loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Property tax (monthly)
    const propertyTax = (homePrice * (propertyTaxRate / 100)) / 12;

    // Home insurance (monthly)
    const homeInsurance = insuranceAnnual / 12;

    // PMI (if down payment < 20%)
    const pmi = downPaymentPercent < 20 ? (loanAmount * 0.005) / 12 : 0;

    // Total monthly payment
    const totalMonthly = monthlyPI + propertyTax + homeInsurance + pmi + hoaMonthly;

    // Total interest over life of loan
    const totalInterest = monthlyPI * numberOfPayments - loanAmount;

    // Total cost (principal + interest)
    const totalCost = loanAmount + totalInterest;

    setResult({
      monthlyPI,
      propertyTax,
      homeInsurance,
      pmi,
      hoaFees: hoaMonthly,
      totalMonthly,
      totalInterest,
      totalCost,
      loanAmount,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="w-6 h-6 text-amber-500" />
          <CardTitle>Monthly Payment Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate your estimated monthly mortgage payment including taxes and insurance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Form */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="price">Home Price</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="price"
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="pl-9"
                step="10000"
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

          <div className="md:col-span-2 space-y-2">
            <Label>Down Payment: {downPaymentPercent}% (${(homePrice * downPaymentPercent / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })})</Label>
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

          <div className="space-y-2">
            <Label htmlFor="taxRate">Property Tax Rate (%)</Label>
            <Input
              id="taxRate"
              type="number"
              value={propertyTaxRate}
              onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
              step="0.1"
              min="0"
              max="5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="insurance">Annual Home Insurance</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="insurance"
                type="number"
                value={insuranceAnnual}
                onChange={(e) => setInsuranceAnnual(Number(e.target.value))}
                className="pl-9"
                step="100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hoa">Monthly HOA Fees (optional)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="hoa"
                type="number"
                value={hoaMonthly}
                onChange={(e) => setHoaMonthly(Number(e.target.value))}
                className="pl-9"
                step="50"
              />
            </div>
          </div>
        </div>

        <Button onClick={calculatePayment} className="w-full" size="lg">
          <Calculator className="w-4 h-4 mr-2" />
          Calculate Monthly Payment
        </Button>

        {/* Results */}
        {result && (
          <div className="mt-6 space-y-4">
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Your Monthly Payment
              </h3>

              <Card className="bg-blue-500/10 border-blue-500/30 mb-4">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Estimated Monthly Payment</p>
                    <p className="text-5xl font-bold text-blue-300">
                      ${result.totalMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">per month</p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Payment Breakdown</h4>

                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <span className="text-sm font-medium">Principal & Interest</span>
                      <p className="text-xs text-muted-foreground">
                        Loan: ${result.loanAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })} @ {interestRate}%
                      </p>
                    </div>
                    <span className="font-semibold">
                      ${result.monthlyPI.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm">Property Taxes</span>
                    <span className="font-medium">
                      ${result.propertyTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm">Home Insurance</span>
                    <span className="font-medium">
                      ${result.homeInsurance.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  {result.pmi > 0 && (
                    <div className="flex justify-between py-2 border-b">
                      <div>
                        <span className="text-sm">PMI</span>
                        <p className="text-xs text-muted-foreground">
                          Down payment &lt; 20%
                        </p>
                      </div>
                      <span className="font-medium">
                        ${result.pmi.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  )}

                  {result.hoaFees > 0 && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-sm">HOA Fees</span>
                      <span className="font-medium">
                        ${result.hoaFees.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t-2">
                  <h4 className="font-semibold text-sm mb-3">Loan Summary</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-800 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Total Interest Paid</p>
                      <p className="text-lg font-semibold text-red-600">
                        ${result.totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Total Amount Paid</p>
                      <p className="text-lg font-semibold text-gray-300">
                        ${result.totalCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-blue-300">
                    <strong>Ready to move forward?</strong> Get pre-approved to see actual rates and terms
                    from top lenders.
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
