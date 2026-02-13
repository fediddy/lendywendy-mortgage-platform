"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Calculator, FileText } from "lucide-react";

interface ClosingCostsResult {
  lenderFees: {
    originationFee: number;
    applicationFee: number;
    underwritingFee: number;
    processingFee: number;
    creditReport: number;
    appraisal: number;
    total: number;
  };
  titleAndEscrow: {
    titleSearch: number;
    titleInsurance: number;
    escrowFee: number;
    total: number;
  };
  government: {
    recordingFees: number;
    transferTax: number;
    total: number;
  };
  prepaid: {
    homeownersInsurance: number;
    propertyTax: number;
    prepaidInterest: number;
    total: number;
  };
  other: {
    homeInspection: number;
    survey: number;
    attorneyFees: number;
    total: number;
  };
  grandTotal: number;
  percentOfHomePrice: number;
}

export function ClosingCostsCalculator() {
  const [homePrice, setHomePrice] = useState<number>(350000);
  const [loanAmount, setLoanAmount] = useState<number>(280000);
  const [loanType, setLoanType] = useState<string>("conventional");
  const [state, setState] = useState<string>("california");
  const [interestRate, setInterestRate] = useState<number>(7.0);
  const [result, setResult] = useState<ClosingCostsResult | null>(null);

  const calculateClosingCosts = () => {
    // Lender Fees (varies by loan type)
    const originationFee = loanAmount * (loanType === "fha" ? 0.01 : 0.005); // 1% for FHA, 0.5% conventional
    const applicationFee = loanType === "va" ? 0 : 300;
    const underwritingFee = 500;
    const processingFee = 400;
    const creditReport = 50;
    const appraisal = loanType === "fha" ? 500 : 450;

    const lenderFeesTotal = originationFee + applicationFee + underwritingFee + processingFee + creditReport + appraisal;

    // Title and Escrow (varies by state and home price)
    const titleSearch = 200;
    const titleInsurance = homePrice * 0.005; // ~0.5% of home price
    const escrowFee = 500;

    const titleAndEscrowTotal = titleSearch + titleInsurance + escrowFee;

    // Government Fees (varies significantly by state)
    const recordingFees = 125;
    let transferTax = 0;
    if (state === "california") {
      transferTax = homePrice * 0.0011; // $1.10 per $1,000
    } else if (state === "new-york") {
      transferTax = homePrice * 0.004; // 0.4% for homes under $500k
    } else if (state === "florida") {
      transferTax = homePrice * 0.007; // $0.70 per $100
    } else if (state === "texas") {
      transferTax = 0; // No transfer tax in Texas
    } else {
      transferTax = homePrice * 0.002; // Average 0.2%
    }

    const governmentTotal = recordingFees + transferTax;

    // Prepaid Costs
    const homeownersInsurance = 1500; // Annual premium
    const propertyTax = (homePrice * 0.012) / 2; // ~6 months prepaid
    const daysInMonth = 30;
    const closingDay = 15; // Assume mid-month closing
    const prepaidInterest = (loanAmount * (interestRate / 100) / 365) * (daysInMonth - closingDay);

    const prepaidTotal = homeownersInsurance + propertyTax + prepaidInterest;

    // Other Costs
    const homeInspection = 400;
    const survey = state === "texas" || state === "florida" ? 400 : 0; // Common in TX and FL
    const attorneyFees = state === "new-york" ? 1500 : 0; // Required in some states

    const otherTotal = homeInspection + survey + attorneyFees;

    // Grand Total
    const grandTotal = lenderFeesTotal + titleAndEscrowTotal + governmentTotal + prepaidTotal + otherTotal;
    const percentOfHomePrice = (grandTotal / homePrice) * 100;

    setResult({
      lenderFees: {
        originationFee,
        applicationFee,
        underwritingFee,
        processingFee,
        creditReport,
        appraisal,
        total: lenderFeesTotal,
      },
      titleAndEscrow: {
        titleSearch,
        titleInsurance,
        escrowFee,
        total: titleAndEscrowTotal,
      },
      government: {
        recordingFees,
        transferTax,
        total: governmentTotal,
      },
      prepaid: {
        homeownersInsurance,
        propertyTax,
        prepaidInterest,
        total: prepaidTotal,
      },
      other: {
        homeInspection,
        survey,
        attorneyFees,
        total: otherTotal,
      },
      grandTotal,
      percentOfHomePrice,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-teal-600" />
          <CardTitle>Closing Costs Calculator</CardTitle>
        </div>
        <CardDescription>
          Estimate your total closing costs when buying a home
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Form */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="homePrice">Home Purchase Price</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="homePrice"
                type="number"
                value={homePrice}
                onChange={(e) => {
                  const price = Number(e.target.value);
                  setHomePrice(price);
                  setLoanAmount(price * 0.8); // Auto-adjust to 20% down
                }}
                className="pl-9"
                step="10000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanAmount">Loan Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="pl-9"
                step="5000"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Down payment: ${(homePrice - loanAmount).toLocaleString()} ({((homePrice - loanAmount) / homePrice * 100).toFixed(1)}%)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanType">Loan Type</Label>
            <Select value={loanType} onValueChange={setLoanType}>
              <SelectTrigger id="loanType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conventional">Conventional</SelectItem>
                <SelectItem value="fha">FHA</SelectItem>
                <SelectItem value="va">VA</SelectItem>
                <SelectItem value="usda">USDA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger id="state">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="california">California</SelectItem>
                <SelectItem value="texas">Texas</SelectItem>
                <SelectItem value="florida">Florida</SelectItem>
                <SelectItem value="new-york">New York</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Affects transfer taxes and fees</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              step="0.125"
            />
            <p className="text-xs text-muted-foreground">Used for prepaid interest calculation</p>
          </div>
        </div>

        <Button onClick={calculateClosingCosts} className="w-full" size="lg">
          <Calculator className="w-4 h-4 mr-2" />
          Estimate Closing Costs
        </Button>

        {/* Results */}
        {result && (
          <div className="mt-6 space-y-4">
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">Estimated Closing Costs</h3>

              {/* Summary */}
              <Card className="bg-teal-50 border-teal-600/30 mb-6">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Total Closing Costs</p>
                    <p className="text-5xl font-bold text-teal-600">
                      ${result.grandTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {result.percentOfHomePrice.toFixed(2)}% of home price
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Breakdown */}
              <div className="space-y-4">
                {/* Lender Fees */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold">Lender Fees</h4>
                    <span className="font-bold text-lg">
                      ${result.lenderFees.total.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Loan Origination Fee ({loanType === "fha" ? "1.0" : "0.5"}%)</span>
                      <span>${result.lenderFees.originationFee.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                    {result.lenderFees.applicationFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Application Fee</span>
                        <span>${result.lenderFees.applicationFee.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Underwriting Fee</span>
                      <span>${result.lenderFees.underwritingFee.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Fee</span>
                      <span>${result.lenderFees.processingFee.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Credit Report</span>
                      <span>${result.lenderFees.creditReport.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Appraisal</span>
                      <span>${result.lenderFees.appraisal.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                </div>

                {/* Title and Escrow */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold">Title & Escrow</h4>
                    <span className="font-bold text-lg">
                      ${result.titleAndEscrow.total.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Title Search</span>
                      <span>${result.titleAndEscrow.titleSearch.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Title Insurance</span>
                      <span>${result.titleAndEscrow.titleInsurance.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Escrow Fee</span>
                      <span>${result.titleAndEscrow.escrowFee.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                </div>

                {/* Government Fees */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold">Government Fees</h4>
                    <span className="font-bold text-lg">
                      ${result.government.total.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recording Fees</span>
                      <span>${result.government.recordingFees.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transfer Tax</span>
                      <span>${result.government.transferTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                </div>

                {/* Prepaid Costs */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold">Prepaid Costs</h4>
                    <span className="font-bold text-lg">
                      ${result.prepaid.total.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Homeowners Insurance (1 year)</span>
                      <span>${result.prepaid.homeownersInsurance.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Property Tax (6 months)</span>
                      <span>${result.prepaid.propertyTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prepaid Interest</span>
                      <span>${result.prepaid.prepaidInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                </div>

                {/* Other Costs */}
                {result.other.total > 0 && (
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold">Other Costs</h4>
                      <span className="font-bold text-lg">
                        ${result.other.total.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Home Inspection</span>
                        <span>${result.other.homeInspection.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                      </div>
                      {result.other.survey > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Property Survey</span>
                          <span>${result.other.survey.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                        </div>
                      )}
                      {result.other.attorneyFees > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Attorney Fees</span>
                          <span>${result.other.attorneyFees.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Total Cash Needed */}
              <div className="mt-6 p-4 bg-teal-50 border border-teal-600/30 rounded-lg">
                <h4 className="font-semibold mb-2">Total Cash Needed at Closing</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Down Payment</span>
                    <span className="font-medium">${(homePrice - loanAmount).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Closing Costs</span>
                    <span className="font-medium">${result.grandTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold text-base">
                    <span>Total</span>
                    <span className="text-teal-600">${(homePrice - loanAmount + result.grandTotal).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-amber-50 border border-amber-600/30 rounded-lg">
                <p className="text-sm text-amber-600">
                  <strong>Note:</strong> These are estimates. Actual costs vary by lender, location, and property.
                  Some costs may be negotiable or paid by the seller. Always review your Loan Estimate carefully.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
