import { Metadata } from "next";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AffordabilityCalculator } from "@/components/calculators/affordability-calculator";
import { MonthlyPaymentCalculator } from "@/components/calculators/monthly-payment-calculator";
import { RefinanceCalculator } from "@/components/calculators/refinance-calculator";
import { RentVsBuyCalculator } from "@/components/calculators/rent-vs-buy-calculator";
import { DTICalculator } from "@/components/calculators/dti-calculator";
import { ClosingCostsCalculator } from "@/components/calculators/closing-costs-calculator";
import { TrustBadges } from "@/components/shared";
import { Calculator, TrendingUp, TrendingDown, Scale, Percent, FileText, ArrowRight, Shield, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Investment Property Calculators | DSCR, Cash Flow, ROI | LendyWendy",
  description: "Free California investment property calculators. Calculate DSCR, cash flow, ROI, cap rate, and refinance savings. Make informed decisions about your investment financing.",
  keywords: [
    "DSCR calculator",
    "investment property calculator",
    "cash flow calculator",
    "cap rate calculator",
    "ROI calculator",
    "refinance calculator",
    "rental property calculator",
  ],
};

export default function CalculatorsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-600/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-teal-600/10 border border-teal-600/30 text-teal-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Calculator className="h-4 w-4" />
              Free Investor Tools
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Investment Property Calculators</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-6">
              Analyze deals, calculate DSCR, estimate cash flow, and determine your ROI before you invest
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bold" asChild>
                <Link href="/get-quote">
                  Compare Rates <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="border-gray-200 text-gray-900 hover:bg-gray-100" asChild>
                <Link href="/investment">
                  View Loan Programs
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">

          {/* Calculator Tabs */}
          <Tabs defaultValue="affordability" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8 bg-gray-50 border border-gray-200">
              <TabsTrigger value="affordability" className="gap-1 text-xs sm:text-sm data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Affordability</span>
                <span className="sm:hidden">Afford</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="gap-1 text-xs sm:text-sm data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                <Calculator className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Payment</span>
                <span className="sm:hidden">Pay</span>
              </TabsTrigger>
              <TabsTrigger value="refinance" className="gap-1 text-xs sm:text-sm data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Refinance</span>
                <span className="sm:hidden">Refi</span>
              </TabsTrigger>
              <TabsTrigger value="rent-vs-buy" className="gap-1 text-xs sm:text-sm data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                <Scale className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Rent vs Buy</span>
                <span className="sm:hidden">R/B</span>
              </TabsTrigger>
              <TabsTrigger value="dti" className="gap-1 text-xs sm:text-sm data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                <Percent className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">DTI</span>
                <span className="sm:hidden">DTI</span>
              </TabsTrigger>
              <TabsTrigger value="closing" className="gap-1 text-xs sm:text-sm data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Closing</span>
                <span className="sm:hidden">Cost</span>
              </TabsTrigger>
            </TabsList>

            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
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
            </div>
          </Tabs>

          {/* Calculator Info Cards */}
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-teal-600/50 transition-colors">
              <DollarSign className="w-8 h-8 text-teal-600 mb-3" />
              <h3 className="font-semibold mb-2 text-gray-900">Affordability Calculator</h3>
              <p className="text-sm text-gray-500">
                Determine how much investment property you can afford based on your income and debt profile.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-teal-600/50 transition-colors">
              <Calculator className="w-8 h-8 text-teal-600 mb-3" />
              <h3 className="font-semibold mb-2 text-gray-900">Payment Calculator</h3>
              <p className="text-sm text-gray-500">
                Calculate your estimated monthly payment including taxes, insurance, and cash flow analysis.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-teal-600/50 transition-colors">
              <TrendingDown className="w-8 h-8 text-teal-600 mb-3" />
              <h3 className="font-semibold mb-2 text-gray-900">Refinance Calculator</h3>
              <p className="text-sm text-gray-500">
                See if refinancing makes sense and calculate your potential savings and break-even point.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-teal-600/50 transition-colors">
              <Scale className="w-8 h-8 text-teal-600 mb-3" />
              <h3 className="font-semibold mb-2 text-gray-900">Rent vs. Buy Calculator</h3>
              <p className="text-sm text-gray-500">
                Compare the long-term financial impact of renting versus owning investment property.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-teal-600/50 transition-colors">
              <Percent className="w-8 h-8 text-teal-600 mb-3" />
              <h3 className="font-semibold mb-2 text-gray-900">DTI Calculator</h3>
              <p className="text-sm text-gray-500">
                Calculate your debt-to-income ratio to understand your loan qualification options.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-teal-600/50 transition-colors">
              <FileText className="w-8 h-8 text-teal-600 mb-3" />
              <h3 className="font-semibold mb-2 text-gray-900">Closing Costs Calculator</h3>
              <p className="text-sm text-gray-500">
                Estimate all your closing costs including lender fees, title, taxes, and prepaid items.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">
              <strong className="text-teal-600">Disclaimer:</strong> These calculators provide estimates only and should not be considered
              financial advice. Actual mortgage terms, rates, and payments may vary based on your credit profile,
              property location, lender requirements, and market conditions. For accurate quotes, please connect
              with our lending partners.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="mt-6">
            <TrustBadges variant="dark" className="justify-center" />
          </div>
        </div>
      </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-12 w-12 text-teal-600 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Compare Investment Rates?
          </h2>
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            These calculators give estimates. For real rates from California investment lenders, get matched in 60 seconds.
          </p>
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-10" asChild>
            <Link href="/get-quote">
              Compare Rates <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Equal Housing Opportunity | No credit impact to get matched
          </p>
        </div>
      </section>
    </main>
  );
}
