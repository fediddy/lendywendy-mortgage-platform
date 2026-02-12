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
    <main className="min-h-screen bg-slate-950">
      {/* Hero Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Calculator className="h-4 w-4" />
              Free Investor Tools
            </div>
            <h1 className="text-4xl font-bold mb-4 text-white">Investment Property Calculators</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
              Analyze deals, calculate DSCR, estimate cash flow, and determine your ROI before you invest
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold" asChild>
                <Link href="/get-quote">
                  Get Actual Rates <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800" asChild>
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
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8 bg-slate-900 border border-slate-800">
              <TabsTrigger value="affordability" className="gap-1 text-xs sm:text-sm data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Affordability</span>
                <span className="sm:hidden">Afford</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="gap-1 text-xs sm:text-sm data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                <Calculator className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Payment</span>
                <span className="sm:hidden">Pay</span>
              </TabsTrigger>
              <TabsTrigger value="refinance" className="gap-1 text-xs sm:text-sm data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Refinance</span>
                <span className="sm:hidden">Refi</span>
              </TabsTrigger>
              <TabsTrigger value="rent-vs-buy" className="gap-1 text-xs sm:text-sm data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                <Scale className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Rent vs Buy</span>
                <span className="sm:hidden">R/B</span>
              </TabsTrigger>
              <TabsTrigger value="dti" className="gap-1 text-xs sm:text-sm data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                <Percent className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">DTI</span>
                <span className="sm:hidden">DTI</span>
              </TabsTrigger>
              <TabsTrigger value="closing" className="gap-1 text-xs sm:text-sm data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Closing</span>
                <span className="sm:hidden">Cost</span>
              </TabsTrigger>
            </TabsList>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
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
            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-colors">
              <DollarSign className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="font-semibold mb-2 text-white">Affordability Calculator</h3>
              <p className="text-sm text-gray-400">
                Determine how much investment property you can afford based on your income and debt profile.
              </p>
            </div>

            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-colors">
              <Calculator className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="font-semibold mb-2 text-white">Payment Calculator</h3>
              <p className="text-sm text-gray-400">
                Calculate your estimated monthly payment including taxes, insurance, and cash flow analysis.
              </p>
            </div>

            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-colors">
              <TrendingDown className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="font-semibold mb-2 text-white">Refinance Calculator</h3>
              <p className="text-sm text-gray-400">
                See if refinancing makes sense and calculate your potential savings and break-even point.
              </p>
            </div>

            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-colors">
              <Scale className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="font-semibold mb-2 text-white">Rent vs. Buy Calculator</h3>
              <p className="text-sm text-gray-400">
                Compare the long-term financial impact of renting versus owning investment property.
              </p>
            </div>

            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-colors">
              <Percent className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="font-semibold mb-2 text-white">DTI Calculator</h3>
              <p className="text-sm text-gray-400">
                Calculate your debt-to-income ratio to understand your loan qualification options.
              </p>
            </div>

            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-colors">
              <FileText className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="font-semibold mb-2 text-white">Closing Costs Calculator</h3>
              <p className="text-sm text-gray-400">
                Estimate all your closing costs including lender fees, title, taxes, and prepaid items.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-6 bg-slate-900/50 rounded-xl border border-slate-800">
            <p className="text-sm text-gray-400">
              <strong className="text-amber-500">Disclaimer:</strong> These calculators provide estimates only and should not be considered
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
      <section className="py-20 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-12 w-12 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready for Actual Investment Rates?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            These calculators give estimates. For real rates from California investment lenders, get matched in 60 seconds.
          </p>
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg px-10" asChild>
            <Link href="/get-quote">
              Get Investor Rates <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            NMLS #1945913 | No credit impact to get matched
          </p>
        </div>
      </section>
    </main>
  );
}
