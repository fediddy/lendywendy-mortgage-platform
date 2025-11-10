import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AffordabilityCalculator } from "@/components/calculators/affordability-calculator";
import { MonthlyPaymentCalculator } from "@/components/calculators/monthly-payment-calculator";
import { RefinanceCalculator } from "@/components/calculators/refinance-calculator";
import { RentVsBuyCalculator } from "@/components/calculators/rent-vs-buy-calculator";
import { DTICalculator } from "@/components/calculators/dti-calculator";
import { ClosingCostsCalculator } from "@/components/calculators/closing-costs-calculator";
import { Calculator, Home, TrendingDown, Scale, Percent, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Mortgage Calculators | Free Tools | LendyWendy",
  description: "Free mortgage calculators to help you estimate affordability, monthly payments, and refinance savings. Make informed decisions about your home financing.",
  keywords: "mortgage calculator, affordability calculator, payment calculator, refinance calculator, home loan calculator",
};

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Calculator className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Mortgage Calculators</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Use our free calculators to estimate your home affordability, monthly payments,
              and potential refinance savings
            </p>
          </div>

          {/* Calculator Tabs */}
          <Tabs defaultValue="affordability" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
              <TabsTrigger value="affordability" className="gap-1 text-xs sm:text-sm">
                <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Affordability</span>
                <span className="sm:hidden">Home</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="gap-1 text-xs sm:text-sm">
                <Calculator className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Payment</span>
                <span className="sm:hidden">Pay</span>
              </TabsTrigger>
              <TabsTrigger value="refinance" className="gap-1 text-xs sm:text-sm">
                <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Refinance</span>
                <span className="sm:hidden">Refi</span>
              </TabsTrigger>
              <TabsTrigger value="rent-vs-buy" className="gap-1 text-xs sm:text-sm">
                <Scale className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Rent vs Buy</span>
                <span className="sm:hidden">R/B</span>
              </TabsTrigger>
              <TabsTrigger value="dti" className="gap-1 text-xs sm:text-sm">
                <Percent className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">DTI</span>
                <span className="sm:hidden">DTI</span>
              </TabsTrigger>
              <TabsTrigger value="closing" className="gap-1 text-xs sm:text-sm">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Closing</span>
                <span className="sm:hidden">Cost</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="affordability">
              <AffordabilityCalculator />
            </TabsContent>

            <TabsContent value="payment">
              <MonthlyPaymentCalculator />
            </TabsContent>

            <TabsContent value="refinance">
              <RefinanceCalculator />
            </TabsContent>

            <TabsContent value="rent-vs-buy">
              <RentVsBuyCalculator />
            </TabsContent>

            <TabsContent value="dti">
              <DTICalculator />
            </TabsContent>

            <TabsContent value="closing">
              <ClosingCostsCalculator />
            </TabsContent>
          </Tabs>

          {/* Information Section */}
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg border">
              <Home className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Affordability Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Determine how much house you can afford based on your income, debts, and down payment.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border">
              <Calculator className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Payment Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Calculate your estimated monthly mortgage payment including taxes, insurance, and PMI.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border">
              <TrendingDown className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold mb-2">Refinance Calculator</h3>
              <p className="text-sm text-muted-foreground">
                See if refinancing makes sense and calculate your potential savings and break-even point.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border">
              <Scale className="w-8 h-8 text-orange-600 mb-3" />
              <h3 className="font-semibold mb-2">Rent vs. Buy Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Compare the long-term financial impact of renting versus buying a home over time.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border">
              <Percent className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-semibold mb-2">DTI Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Calculate your debt-to-income ratio to see which loan types you qualify for.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border">
              <FileText className="w-8 h-8 text-teal-600 mb-3" />
              <h3 className="font-semibold mb-2">Closing Costs Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Estimate all your closing costs including lender fees, title, taxes, and prepaid items.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
            <p className="text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> These calculators provide estimates only and should not be considered
              financial advice. Actual mortgage terms, rates, and payments may vary based on your credit profile,
              property location, lender requirements, and market conditions. For accurate quotes, please connect
              with our lending partners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
