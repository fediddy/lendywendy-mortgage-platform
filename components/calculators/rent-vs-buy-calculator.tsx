"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DollarSign, Calculator, Home, TrendingUp } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface RentVsBuyResult {
  totalCostRenting: number;
  totalCostBuying: number;
  netDifference: number;
  homeEquity: number;
  homeValue: number;
  recommendation: "buy" | "rent" | "close";
  breakEvenYears: number;
  monthlyRent: number;
  monthlyMortgage: number;
}

export function RentVsBuyCalculator() {
  const [homePrice, setHomePrice] = useState<number>(350000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(7.0);
  const [monthlyRent, setMonthlyRent] = useState<number>(2000);
  const [rentIncrease, setRentIncrease] = useState<number>(3);
  const [homeAppreciation, setHomeAppreciation] = useState<number>(3);
  const [yearsToAnalyze, setYearsToAnalyze] = useState<number>(7);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.2);
  const [homeInsurance, setHomeInsurance] = useState<number>(1500);
  const [hoaFees, setHoaFees] = useState<number>(0);
  const [maintenanceCost, setMaintenanceCost] = useState<number>(1);
  const [closingCosts, setClosingCosts] = useState<number>(8000);
  const [result, setResult] = useState<RentVsBuyResult | null>(null);

  const calculateRentVsBuy = () => {
    const downPayment = homePrice * (downPaymentPercent / 100);
    const loanAmount = homePrice - downPayment;

    // Monthly mortgage payment (P&I only)
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = 30 * 12;
    const monthlyMortgage =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Monthly property tax and insurance
    const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;
    const monthlyInsurance = homeInsurance / 12;
    const monthlyMaintenance = (homePrice * (maintenanceCost / 100)) / 12;

    // Total monthly homeownership cost
    const totalMonthlyOwnership =
      monthlyMortgage + monthlyPropertyTax + monthlyInsurance + hoaFees + monthlyMaintenance;

    // Calculate costs over time
    let totalRentPaid = 0;
    let totalOwnershipCost = downPayment + closingCosts;
    let remainingLoanBalance = loanAmount;
    let currentRent = monthlyRent;
    let currentHomeValue = homePrice;

    for (let year = 1; year <= yearsToAnalyze; year++) {
      // Renting costs
      for (let month = 1; month <= 12; month++) {
        totalRentPaid += currentRent;
      }
      currentRent *= (1 + rentIncrease / 100);

      // Buying costs
      for (let month = 1; month <= 12; month++) {
        // Add ownership costs
        totalOwnershipCost += totalMonthlyOwnership;

        // Calculate principal paid this month
        const interestPayment = remainingLoanBalance * monthlyRate;
        const principalPayment = monthlyMortgage - interestPayment;
        remainingLoanBalance -= principalPayment;
      }

      // Home appreciation
      currentHomeValue *= (1 + homeAppreciation / 100);
    }

    // Calculate home equity (home value - remaining loan)
    const homeEquity = currentHomeValue - remainingLoanBalance;

    // Net cost of buying (total costs - equity gained)
    const netBuyingCost = totalOwnershipCost - homeEquity;

    // Difference
    const netDifference = totalRentPaid - netBuyingCost;

    // Break-even calculation (simplified)
    let breakEvenYears = 0;
    let rentTotal = 0;
    let buyTotal = downPayment + closingCosts;
    let tempRent = monthlyRent;
    let tempHomeValue = homePrice;
    let tempLoanBalance = loanAmount;

    for (let year = 1; year <= 30; year++) {
      for (let month = 1; month <= 12; month++) {
        rentTotal += tempRent / 12;
        buyTotal += totalMonthlyOwnership;

        const interestPayment = tempLoanBalance * monthlyRate;
        const principalPayment = monthlyMortgage - interestPayment;
        tempLoanBalance -= principalPayment;
      }

      tempRent *= (1 + rentIncrease / 100);
      tempHomeValue *= (1 + homeAppreciation / 100);

      const tempEquity = tempHomeValue - tempLoanBalance;
      const netBuy = buyTotal - tempEquity;

      if (rentTotal > netBuy && breakEvenYears === 0) {
        breakEvenYears = year;
        break;
      }
    }

    if (breakEvenYears === 0) breakEvenYears = 30; // Never breaks even in 30 years

    // Recommendation
    let recommendation: "buy" | "rent" | "close";
    if (netDifference > homePrice * 0.1) {
      recommendation = "buy";
    } else if (netDifference < -homePrice * 0.1) {
      recommendation = "rent";
    } else {
      recommendation = "close";
    }

    setResult({
      totalCostRenting: totalRentPaid,
      totalCostBuying: netBuyingCost,
      netDifference,
      homeEquity,
      homeValue: currentHomeValue,
      recommendation,
      breakEvenYears,
      monthlyRent: currentRent / (1 + rentIncrease / 100), // Reset to current
      monthlyMortgage: totalMonthlyOwnership,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Home className="w-6 h-6 text-purple-600" />
          <CardTitle>Rent vs. Buy Calculator</CardTitle>
        </div>
        <CardDescription>
          Compare the long-term costs of renting versus buying a home
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Form */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Home Purchase Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="homePrice">Home Price</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="homePrice"
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="pl-9"
                    step="10000"
                  />
                </div>
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
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label>Down Payment: {downPaymentPercent}% (${(homePrice * downPaymentPercent / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })})</Label>
                <Slider
                  value={[downPaymentPercent]}
                  onValueChange={(value) => setDownPaymentPercent(value[0])}
                  min={3}
                  max={50}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="closingCosts">Closing Costs</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="closingCosts"
                    type="number"
                    value={closingCosts}
                    onChange={(e) => setClosingCosts(Number(e.target.value))}
                    className="pl-9"
                    step="500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="homeInsurance">Annual Home Insurance</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="homeInsurance"
                    type="number"
                    value={homeInsurance}
                    onChange={(e) => setHomeInsurance(Number(e.target.value))}
                    className="pl-9"
                    step="100"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Rental Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyRent">Current Monthly Rent</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="monthlyRent"
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                    className="pl-9"
                    step="50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rentIncrease">Annual Rent Increase (%)</Label>
                <Input
                  id="rentIncrease"
                  type="number"
                  value={rentIncrease}
                  onChange={(e) => setRentIncrease(Number(e.target.value))}
                  step="0.5"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Additional Factors</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="homeAppreciation">Home Appreciation Rate (%)</Label>
                <Input
                  id="homeAppreciation"
                  type="number"
                  value={homeAppreciation}
                  onChange={(e) => setHomeAppreciation(Number(e.target.value))}
                  step="0.5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="years">Years to Analyze</Label>
                <Input
                  id="years"
                  type="number"
                  value={yearsToAnalyze}
                  onChange={(e) => setYearsToAnalyze(Number(e.target.value))}
                  min="1"
                  max="30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyTax">Property Tax Rate (%)</Label>
                <Input
                  id="propertyTax"
                  type="number"
                  value={propertyTaxRate}
                  onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenance">Annual Maintenance (% of home value)</Label>
                <Input
                  id="maintenance"
                  type="number"
                  value={maintenanceCost}
                  onChange={(e) => setMaintenanceCost(Number(e.target.value))}
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoa">Monthly HOA Fees (optional)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="hoa"
                    type="number"
                    value={hoaFees}
                    onChange={(e) => setHoaFees(Number(e.target.value))}
                    className="pl-9"
                    step="50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button onClick={calculateRentVsBuy} className="w-full" size="lg">
          <Calculator className="w-4 h-4 mr-2" />
          Compare Rent vs. Buy
        </Button>

        {/* Results */}
        {result && (
          <div className="mt-6 space-y-4">
            <div className="border-t pt-4">
              {/* Recommendation Alert */}
              {result.recommendation === "buy" && (
                <Alert className="mb-4 bg-green-50 border-green-200">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-900">Buying Looks Better!</AlertTitle>
                  <AlertDescription className="text-green-800">
                    Based on your inputs, buying would save you ${Math.abs(result.netDifference).toLocaleString('en-US', { maximumFractionDigits: 0 })} over {yearsToAnalyze} years compared to renting.
                  </AlertDescription>
                </Alert>
              )}

              {result.recommendation === "rent" && (
                <Alert className="mb-4 bg-blue-50 border-blue-200">
                  <Home className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-900">Renting May Be Better</AlertTitle>
                  <AlertDescription className="text-blue-800">
                    Renting could save you ${Math.abs(result.netDifference).toLocaleString('en-US', { maximumFractionDigits: 0 })} over {yearsToAnalyze} years. Consider your plans and other factors.
                  </AlertDescription>
                </Alert>
              )}

              {result.recommendation === "close" && (
                <Alert className="mb-4 bg-yellow-50 border-yellow-200">
                  <DollarSign className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-900">It's Close!</AlertTitle>
                  <AlertDescription className="text-yellow-800">
                    The costs are similar. Consider lifestyle factors, job stability, and how long you plan to stay.
                  </AlertDescription>
                </Alert>
              )}

              <h3 className="text-lg font-semibold mb-4">Analysis Over {yearsToAnalyze} Years</h3>

              {/* Cost Comparison */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Home className="w-5 h-5 text-blue-600" />
                      <p className="text-sm font-medium text-blue-900">Total Cost of Renting</p>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">
                      ${result.totalCostRenting.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Starting at ${monthlyRent}/mo, {rentIncrease}% annual increase
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <p className="text-sm font-medium text-green-900">Net Cost of Buying</p>
                    </div>
                    <p className="text-3xl font-bold text-green-600">
                      ${result.totalCostBuying.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      After accounting for ${result.homeEquity.toLocaleString('en-US', { maximumFractionDigits: 0 })} equity
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Key Metrics */}
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Monthly Cost Comparison</span>
                  </div>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rent (starting)</span>
                      <span>${monthlyRent.toLocaleString('en-US', { maximumFractionDigits: 0 })}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Homeownership (total)</span>
                      <span>${result.monthlyMortgage.toLocaleString('en-US', { maximumFractionDigits: 0 })}/mo</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Home Equity Built</span>
                    <span className="text-lg font-bold text-green-600">
                      ${result.homeEquity.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Home value: ${result.homeValue.toLocaleString('en-US', { maximumFractionDigits: 0 })} (from ${homePrice.toLocaleString('en-US', { maximumFractionDigits: 0 })})
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Break-Even Point</span>
                    <span className="text-lg font-bold">
                      {result.breakEvenYears} years
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    When buying becomes cheaper than renting
                  </p>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Net Difference</span>
                    <span className={`text-xl font-bold ${result.netDifference > 0 ? "text-green-600" : "text-red-600"}`}>
                      {result.netDifference > 0 ? "Save " : "Cost "}${Math.abs(result.netDifference).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    By buying instead of renting over {yearsToAnalyze} years
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Important:</strong> This analysis considers financial factors only.
                  Also consider lifestyle, job stability, mobility needs, and local market conditions.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
