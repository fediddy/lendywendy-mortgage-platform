"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DollarSign, Calculator, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

interface DTIResult {
  frontEndDTI: number;
  backEndDTI: number;
  totalMonthlyIncome: number;
  totalMonthlyDebts: number;
  housingExpenses: number;
  maxHousingPayment: number;
  qualifiesConventional: boolean;
  qualifiesFHA: boolean;
  qualifiesVA: boolean;
  recommendation: string;
}

export function DTICalculator() {
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState<number>(6250);
  const [otherIncome, setOtherIncome] = useState<number>(0);
  const [proposedMortgage, setProposedMortgage] = useState<number>(0);
  const [propertyTax, setPropertyTax] = useState<number>(0);
  const [homeInsurance, setHomeInsurance] = useState<number>(0);
  const [hoa, setHOA] = useState<number>(0);
  const [pmi, setPMI] = useState<number>(0);
  const [carPayments, setCarPayments] = useState<number>(0);
  const [creditCards, setCreditCards] = useState<number>(0);
  const [studentLoans, setStudentLoans] = useState<number>(0);
  const [otherDebts, setOtherDebts] = useState<number>(0);
  const [result, setResult] = useState<DTIResult | null>(null);

  const calculateDTI = () => {
    const totalMonthlyIncome = grossMonthlyIncome + otherIncome;
    const housingExpenses = proposedMortgage + propertyTax + homeInsurance + hoa + pmi;
    const totalMonthlyDebts = carPayments + creditCards + studentLoans + otherDebts;

    // Front-end DTI (housing expenses only)
    const frontEndDTI = (housingExpenses / totalMonthlyIncome) * 100;

    // Back-end DTI (all debts including housing)
    const backEndDTI = ((housingExpenses + totalMonthlyDebts) / totalMonthlyIncome) * 100;

    // Calculate max housing payment for different loan types
    // Conventional: 28% front-end, 43% back-end
    // FHA: 31% front-end, 43% back-end
    // VA: No front-end limit, 41% back-end
    const maxHousingConventional = totalMonthlyIncome * 0.28;
    const maxTotalConventional = totalMonthlyIncome * 0.43;
    const maxHousingFHA = totalMonthlyIncome * 0.31;
    const maxTotalFHA = totalMonthlyIncome * 0.43;
    const maxTotalVA = totalMonthlyIncome * 0.41;

    // Qualification checks
    const qualifiesConventional = frontEndDTI <= 28 && backEndDTI <= 43;
    const qualifiesFHA = frontEndDTI <= 31 && backEndDTI <= 43;
    const qualifiesVA = backEndDTI <= 41; // VA has no front-end requirement

    // Calculate maximum housing payment
    const maxHousingPayment = Math.min(
      maxHousingConventional,
      maxTotalConventional - totalMonthlyDebts,
      maxHousingFHA,
      maxTotalFHA - totalMonthlyDebts
    );

    // Generate recommendation
    let recommendation = "";
    if (qualifiesConventional) {
      recommendation = "Your DTI ratios qualify for conventional loans with the best rates!";
    } else if (qualifiesFHA) {
      recommendation = "You qualify for FHA loans, which offer more flexibility.";
    } else if (qualifiesVA) {
      recommendation = "If you're a veteran, you may qualify for a VA loan.";
    } else {
      recommendation = "Your DTI is high. Consider reducing debts or increasing income before applying.";
    }

    setResult({
      frontEndDTI,
      backEndDTI,
      totalMonthlyIncome,
      totalMonthlyDebts,
      housingExpenses,
      maxHousingPayment,
      qualifiesConventional,
      qualifiesFHA,
      qualifiesVA,
      recommendation,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="w-6 h-6 text-blue-600" />
          <CardTitle>Debt-to-Income (DTI) Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate your DTI ratio to see if you qualify for a mortgage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Form */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Monthly Income</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="income">Gross Monthly Income</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="income"
                    type="number"
                    value={grossMonthlyIncome}
                    onChange={(e) => setGrossMonthlyIncome(Number(e.target.value))}
                    className="pl-9"
                    step="100"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Before taxes and deductions</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherIncome">Other Monthly Income (optional)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="otherIncome"
                    type="number"
                    value={otherIncome}
                    onChange={(e) => setOtherIncome(Number(e.target.value))}
                    className="pl-9"
                    step="100"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Bonuses, rental income, etc.</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Proposed Housing Expenses</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mortgage">Monthly Mortgage Payment (P&I)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="mortgage"
                    type="number"
                    value={proposedMortgage}
                    onChange={(e) => setProposedMortgage(Number(e.target.value))}
                    className="pl-9"
                    step="50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyTax">Monthly Property Tax</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="propertyTax"
                    type="number"
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(Number(e.target.value))}
                    className="pl-9"
                    step="50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="insurance">Monthly Home Insurance</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="insurance"
                    type="number"
                    value={homeInsurance}
                    onChange={(e) => setHomeInsurance(Number(e.target.value))}
                    className="pl-9"
                    step="25"
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
                    value={hoa}
                    onChange={(e) => setHOA(Number(e.target.value))}
                    className="pl-9"
                    step="25"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pmi">Monthly PMI (if applicable)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="pmi"
                    type="number"
                    value={pmi}
                    onChange={(e) => setPMI(Number(e.target.value))}
                    className="pl-9"
                    step="25"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Monthly Debt Obligations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="car">Car Payments</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="car"
                    type="number"
                    value={carPayments}
                    onChange={(e) => setCarPayments(Number(e.target.value))}
                    className="pl-9"
                    step="50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="credit">Credit Card Minimum Payments</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="credit"
                    type="number"
                    value={creditCards}
                    onChange={(e) => setCreditCards(Number(e.target.value))}
                    className="pl-9"
                    step="25"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="student">Student Loan Payments</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="student"
                    type="number"
                    value={studentLoans}
                    onChange={(e) => setStudentLoans(Number(e.target.value))}
                    className="pl-9"
                    step="50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="other">Other Monthly Debts</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="other"
                    type="number"
                    value={otherDebts}
                    onChange={(e) => setOtherDebts(Number(e.target.value))}
                    className="pl-9"
                    step="25"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Personal loans, alimony, etc.</p>
              </div>
            </div>
          </div>
        </div>

        <Button onClick={calculateDTI} className="w-full" size="lg">
          <Calculator className="w-4 h-4 mr-2" />
          Calculate DTI Ratio
        </Button>

        {/* Results */}
        {result && (
          <div className="mt-6 space-y-4">
            <div className="border-t pt-4">
              {/* Recommendation Alert */}
              {result.qualifiesConventional && (
                <Alert className="mb-4 bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-900">Excellent DTI Ratios!</AlertTitle>
                  <AlertDescription className="text-green-800">
                    {result.recommendation}
                  </AlertDescription>
                </Alert>
              )}

              {!result.qualifiesConventional && (result.qualifiesFHA || result.qualifiesVA) && (
                <Alert className="mb-4 bg-yellow-50 border-yellow-200">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-900">You May Qualify</AlertTitle>
                  <AlertDescription className="text-yellow-800">
                    {result.recommendation}
                  </AlertDescription>
                </Alert>
              )}

              {!result.qualifiesConventional && !result.qualifiesFHA && !result.qualifiesVA && (
                <Alert className="mb-4 bg-red-50 border-red-200">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertTitle className="text-red-900">DTI Too High</AlertTitle>
                  <AlertDescription className="text-red-800">
                    {result.recommendation}
                  </AlertDescription>
                </Alert>
              )}

              <h3 className="text-lg font-semibold mb-4">Your DTI Ratios</h3>

              {/* DTI Ratios */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Front-End DTI (Housing Only)</span>
                    <span className={`text-sm font-bold ${result.frontEndDTI <= 28 ? "text-green-600" : result.frontEndDTI <= 31 ? "text-yellow-600" : "text-red-600"}`}>
                      {result.frontEndDTI.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={Math.min(result.frontEndDTI, 100)} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">
                    ${result.housingExpenses.toLocaleString()} ÷ ${result.totalMonthlyIncome.toLocaleString()} income
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Back-End DTI (All Debts)</span>
                    <span className={`text-sm font-bold ${result.backEndDTI <= 36 ? "text-green-600" : result.backEndDTI <= 43 ? "text-yellow-600" : "text-red-600"}`}>
                      {result.backEndDTI.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={Math.min(result.backEndDTI, 100)} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">
                    ${(result.housingExpenses + result.totalMonthlyDebts).toLocaleString()} ÷ ${result.totalMonthlyIncome.toLocaleString()} income
                  </p>
                </div>
              </div>

              {/* Loan Type Qualification */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-sm">Loan Qualification</h4>

                <div className={`p-4 border rounded-lg ${result.qualifiesConventional ? "bg-green-50 border-green-200" : "bg-gray-50"}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Conventional Loan</span>
                      <p className="text-xs text-muted-foreground">28% front / 43% back</p>
                    </div>
                    {result.qualifiesConventional ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </div>

                <div className={`p-4 border rounded-lg ${result.qualifiesFHA ? "bg-green-50 border-green-200" : "bg-gray-50"}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">FHA Loan</span>
                      <p className="text-xs text-muted-foreground">31% front / 43% back</p>
                    </div>
                    {result.qualifiesFHA ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </div>

                <div className={`p-4 border rounded-lg ${result.qualifiesVA ? "bg-green-50 border-green-200" : "bg-gray-50"}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">VA Loan</span>
                      <p className="text-xs text-muted-foreground">No front limit / 41% back</p>
                    </div>
                    {result.qualifiesVA ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold mb-3 text-sm">Maximum Housing Payment</h4>
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  ${result.maxHousingPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}/month
                </p>
                <p className="text-xs text-muted-foreground">
                  Based on your income and existing debts, this is the maximum monthly housing payment you can afford while qualifying for most loans.
                </p>
              </div>

              <div className="mt-4 p-4 bg-gray-50 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Tips to Improve Your DTI</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Pay down credit card balances and other revolving debt</li>
                  <li>• Avoid taking on new debt before applying for a mortgage</li>
                  <li>• Increase your income through raises, bonuses, or side work</li>
                  <li>• Consider a co-borrower to add additional income</li>
                  <li>• Shop for a less expensive home if DTI is too high</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
