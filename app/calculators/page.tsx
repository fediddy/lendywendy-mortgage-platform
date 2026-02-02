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
import { TrustBadges, CtaSection } from "@/components/shared";
import { Calculator, Home, TrendingDown, Scale, Percent, FileText, ArrowRight, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Mortgage Calculators California | Payment, Affordability, Refinance | LendyWendy",
  description: "Free California mortgage calculators to help you estimate home affordability, monthly payments, refinance savings, DTI, and closing costs. Make informed decisions about your home financing.",
  keywords: [
    "mortgage calculator California",
    "home affordability calculator",
    "monthly payment calculator",
    "refinance calculator",
    "DTI calculator",
    "closing costs calculator",
    "rent vs buy calculator",
    "how much house can I afford",
  ],
};

export default function CalculatorsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Header - Navy themed */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/30 text-gold-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Calculator className="h-4 w-4" />
              Free Financial Tools
            </div>
            <h1 className="text-4xl font-bold mb-4">Mortgage Calculators</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
              Use our free calculators to estimate your California home affordability, monthly payments,
              and potential refinance savings
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold" asChild>
                <Link href="/get-quote">
                  Get Actual Rates <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/readiness-score">
                  Check Readiness Score
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">

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
            <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <Home className="w-8 h-8 text-gold-500 mb-3" />
              <h3 className="font-semibold mb-2 text-navy-900">Affordability Calculator</h3>
              <p className="text-sm text-gray-600">
                Determine how much house you can afford based on your income, debts, and down payment.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <Calculator className="w-8 h-8 text-gold-500 mb-3" />
              <h3 className="font-semibold mb-2 text-navy-900">Payment Calculator</h3>
              <p className="text-sm text-gray-600">
                Calculate your estimated monthly mortgage payment including taxes, insurance, and PMI.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <TrendingDown className="w-8 h-8 text-gold-500 mb-3" />
              <h3 className="font-semibold mb-2 text-navy-900">Refinance Calculator</h3>
              <p className="text-sm text-gray-600">
                See if refinancing makes sense and calculate your potential savings and break-even point.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <Scale className="w-8 h-8 text-gold-500 mb-3" />
              <h3 className="font-semibold mb-2 text-navy-900">Rent vs. Buy Calculator</h3>
              <p className="text-sm text-gray-600">
                Compare the long-term financial impact of renting versus buying a home over time.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <Percent className="w-8 h-8 text-gold-500 mb-3" />
              <h3 className="font-semibold mb-2 text-navy-900">DTI Calculator</h3>
              <p className="text-sm text-gray-600">
                Calculate your debt-to-income ratio to see which loan types you qualify for.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <FileText className="w-8 h-8 text-gold-500 mb-3" />
              <h3 className="font-semibold mb-2 text-navy-900">Closing Costs Calculator</h3>
              <p className="text-sm text-gray-600">
                Estimate all your closing costs including lender fees, title, taxes, and prepaid items.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-6 bg-navy-900 rounded-xl">
            <p className="text-sm text-gray-300">
              <strong className="text-gold-400">Disclaimer:</strong> These calculators provide estimates only and should not be considered
              financial advice. Actual mortgage terms, rates, and payments may vary based on your credit profile,
              property location, lender requirements, and market conditions. For accurate quotes, please connect
              with our lending partners.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="mt-6">
            <TrustBadges variant="light" className="justify-center" />
          </div>
        </div>
      </div>
      </div>

      {/* CTA Section */}
      <CtaSection
        variant="primary"
        title="Ready for actual mortgage rates?"
        description="These calculators give estimates. For real rates from California lenders, get matched in 60 seconds."
      />
    </main>
  );
}
