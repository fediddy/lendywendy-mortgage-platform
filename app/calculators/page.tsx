import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AffordabilityCalculator } from "@/components/calculators/affordability-calculator";
import { MonthlyPaymentCalculator } from "@/components/calculators/monthly-payment-calculator";
import { RefinanceCalculator } from "@/components/calculators/refinance-calculator";
import { Calculator, Home, TrendingDown } from "lucide-react";

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
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="affordability" className="gap-2">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Affordability</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="gap-2">
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">Monthly Payment</span>
              </TabsTrigger>
              <TabsTrigger value="refinance" className="gap-2">
                <TrendingDown className="w-4 h-4" />
                <span className="hidden sm:inline">Refinance</span>
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
          </Tabs>

          {/* Information Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
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
