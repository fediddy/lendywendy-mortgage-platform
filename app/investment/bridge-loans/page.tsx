import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  ChevronDown,
  Calculator,
  Clock,
  DollarSign,
  TrendingUp,
  Zap,
  Building,
  RefreshCw,
  Target,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "California Bridge Loans | Quick Close, Flexible Terms | LendyWendy",
  description:
    "Bridge loans for California real estate investors. Short-term financing for acquisitions, stabilization, and time-sensitive opportunities. Lenders close in 10-21 days. Rates from 8%. No prepay penalties.",
  keywords: [
    "bridge loan California",
    "bridge financing California",
    "short term real estate loan",
    "commercial bridge loan California",
    "bridge to perm loan",
    "acquisition bridge loan",
    "gap financing California",
    "interim financing real estate",
    "bridge lender California",
    "quick close bridge loan",
    "stabilization loan California",
    "value-add bridge financing",
  ],
  openGraph: {
    title: "California Bridge Loans | Quick Close Financing | LendyWendy",
    description:
      "Bridge loans for California investors. 10-21 day closing, flexible terms, no prepay penalties. Bridge acquisitions and stabilizations.",
    type: "website",
    url: "https://lendywendy.com/investment/bridge-loans",
    images: [{ url: "https://lendywendy.com/api/og?title=California+Bridge+Loans&subtitle=Short-Term+Financing+for+Time-Sensitive+Deals.&badge=Quick+Closing", width: 1200, height: 630, alt: "California Bridge Loans" }],
  },
  alternates: {
    canonical: "https://lendywendy.com/investment/bridge-loans",
  },
};

const benefits = [
  {
    icon: Clock,
    title: "Quick Closing",
    description:
      "Lenders in our network close in 10-21 days when timing is critical. Move fast on opportunities that require immediate action.",
  },
  {
    icon: RefreshCw,
    title: "Flexible Exit",
    description:
      "No prepayment penalties on most programs. Refinance to permanent financing or sell when ready.",
  },
  {
    icon: Target,
    title: "Light Documentation",
    description:
      "Asset-based underwriting focuses on the property and exit strategy, not extensive income verification.",
  },
  {
    icon: DollarSign,
    title: "Interest Reserves",
    description:
      "Build interest reserves into the loan so you have no monthly payments during stabilization.",
  },
];

const loanDetails = [
  { label: "Interest Rates", value: "8% - 11%" },
  { label: "Loan-to-Value (LTV)", value: "Up to 75%" },
  { label: "Loan Terms", value: "12-24 months" },
  { label: "Minimum Loan Amount", value: "$150,000" },
  { label: "Maximum Loan Amount", value: "$10M+" },
  { label: "Credit Score", value: "640+ (680+ for best terms)" },
  { label: "Prepay Penalty", value: "None to 6 months" },
  { label: "Extension Options", value: "Available (fee applies)" },
];

const useCases = [
  {
    title: "Acquisition Bridge",
    description: "Close quickly on an acquisition while arranging permanent financing or sale.",
    timeframe: "10-21 day close",
  },
  {
    title: "Stabilization",
    description: "Finance lease-up period for properties not yet qualifying for DSCR.",
    timeframe: "12-18 months",
  },
  {
    title: "Value-Add Light",
    description: "Fund light renovations and improvements before refinancing.",
    timeframe: "12-24 months",
  },
  {
    title: "1031 Exchange",
    description: "Meet tight exchange deadlines when permanent financing won't close in time.",
    timeframe: "7-14 day close",
  },
  {
    title: "Portfolio Restructure",
    description: "Bridge between selling one property and closing on another.",
    timeframe: "6-12 months",
  },
  {
    title: "Discounted Payoff",
    description: "Quick capital to negotiate discounted loan payoffs with existing lenders.",
    timeframe: "14-21 day close",
  },
];

const faqItems = [
  {
    question: "What is a bridge loan in real estate?",
    answer:
      "A bridge loan is short-term financing (typically 12-24 months) used to 'bridge' a gap in funding. Common uses include: closing quickly on an acquisition before permanent financing is ready, financing a property during lease-up or stabilization, or bridging between selling one property and buying another. Bridge loans focus on the exit strategy (sale or refinance) rather than long-term debt service.",
  },
  {
    question: "How is a bridge loan different from a hard money loan?",
    answer:
      "Bridge loans and hard money loans are similar but have some distinctions: Bridge loans typically have lower rates (8-11% vs 9-12%), are used for stabilization or light value-add (not heavy rehab), and often have longer terms (12-24 months vs 6-18 months). Hard money loans are designed specifically for fix-and-flip with higher leverage for rehab costs. Many lenders offer both products.",
  },
  {
    question: "What do I need to qualify for a bridge loan?",
    answer:
      "Bridge loan qualification focuses on: (1) Property value and equity (up to 75% LTV), (2) Clear exit strategy (refinance to permanent loan or sale), (3) Minimum credit score (typically 640+), (4) Experience with similar properties (helpful but not always required), and (5) Reserves for carrying costs if no interest reserve. Income documentation is minimal compared to conventional loans.",
  },
  {
    question: "How fast can a bridge loan close?",
    answer:
      "Bridge loans typically close in 10-21 days, with some lenders offering 7-day closings for straightforward deals. Speed depends on property type, appraisal timing, and borrower responsiveness. Having documents ready (entity docs, insurance quotes, title work) can expedite closing. 1031 exchange bridges can often close fastest due to deadline urgency.",
  },
  {
    question: "What is an interest reserve on a bridge loan?",
    answer:
      "An interest reserve is a portion of the loan held back to cover monthly interest payments. For example, on a 12-month bridge loan at 10%, the lender might set aside enough to cover 6-12 months of interest. This means you have no out-of-pocket monthly payments during that period - ideal during property stabilization or lease-up.",
  },
  {
    question: "Can I get a bridge loan for commercial property?",
    answer:
      "Yes, bridge loans are common for commercial properties including multi-family (5+ units), office, retail, industrial, and mixed-use. Commercial bridge loans typically have lower LTVs (65-70%) than residential bridge loans and may require more documentation. Terms and rates are similar to residential bridge products.",
  },
  {
    question: "What happens when my bridge loan matures?",
    answer:
      "At maturity, you need to either: (1) Refinance into permanent financing (conventional, DSCR, or commercial), (2) Sell the property and pay off the loan, or (3) Request an extension (if available, usually for a fee of 0.5-1%). It's critical to have a clear exit strategy before taking a bridge loan and to start the refinance/sale process well before maturity.",
  },
  {
    question: "Bridge loan vs DSCR loan: Which should I choose?",
    answer:
      "Use a bridge loan when: the property isn't stabilized, you need to close faster than DSCR allows, or you plan to sell within 12-24 months. Use a DSCR loan when: the property has stable rental income, you want long-term financing, and you can wait 14-21+ days to close. Many investors use bridge financing initially, then refinance into DSCR once the property stabilizes.",
  },
];

export default function BridgeLoansPage() {
  return (
    <>
      <StructuredData
        type="service"
        pageTitle="California Bridge Loans | Quick Close Financing"
        pageDescription="Bridge loans for California real estate investors. Short-term financing for acquisitions, stabilization, and time-sensitive opportunities."
        pageUrl="/investment/bridge-loans"
        breadcrumbs={[
          { name: "Investment", url: "/investment" },
          { name: "Bridge Loans", url: "/investment/bridge-loans" },
        ]}
        faqItems={faqItems}
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-600/5 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="flex justify-center items-center gap-2 text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-teal-600">
                  Home
                </Link>
                <span>/</span>
                <Link href="/investment" className="hover:text-teal-600">
                  Investment
                </Link>
                <span>/</span>
                <span className="text-teal-600">Bridge Loans</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-teal-600/10 border border-teal-600/30 text-teal-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Building className="h-4 w-4" />
                Short-Term Financing
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                California <span className="text-teal-600">Bridge Loans</span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-600">
                  Bridge the Gap to Your Exit
                </span>
              </h1>

              <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                Short-term financing for acquisitions, stabilization, and time-sensitive
                opportunities. Move fast with flexible terms and no prepay penalties.
              </p>

              {/* Key Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <TrendingUp className="h-4 w-4 text-teal-600" />
                  <span>From 8% APR</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  <span>10-21 Day Close</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <RefreshCw className="h-4 w-4 text-teal-600" />
                  <span>No Prepay Penalty</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-8"
                  asChild
                >
                  <Link href="/get-quote">
                    Compare Bridge Rates <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-200 text-gray-900 hover:bg-gray-100"
                  asChild
                >
                  <Link href="/calculators">
                    <Calculator className="mr-2 h-5 w-5" />
                    Loan Calculator
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Bridge Financing
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Flexible short-term capital for California investors
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors"
                >
                  <div className="p-3 bg-teal-600/10 rounded-xl w-fit mb-4">
                    <benefit.icon className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-500 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Common Bridge Loan Uses
                </h2>
                <p className="text-gray-500">
                  Flexible financing for various investment scenarios
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {useCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-5 border border-gray-200"
                  >
                    <h3 className="text-gray-900 font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-gray-500 text-sm mb-3">{useCase.description}</p>
                    <span className="text-teal-600 text-xs font-medium">{useCase.timeframe}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Loan Details */}
        <section className="py-20 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Bridge Loan Terms
                </h2>
                <p className="text-gray-500">
                  Competitive terms for California investors
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {loanDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-5 border border-gray-200 flex justify-between items-center"
                  >
                    <span className="text-gray-500">{detail.label}</span>
                    <span className="text-gray-900 font-semibold">{detail.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold"
                  asChild
                >
                  <Link href="/get-quote">
                    Compare Bridge Rates <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Compare Investor Loan Options
                </h2>
                <p className="text-gray-500">Find the right product for your strategy</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/investment/dscr-loans"
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                    DSCR Loans
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Permanent financing for stabilized rentals. Refinance your bridge loan into DSCR
                    once the property is leased.
                  </p>
                  <span className="text-teal-600 text-sm font-medium flex items-center gap-1">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/investment/fix-and-flip"
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                    Fix & Flip Loans
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    For heavy renovations. Higher leverage (90% LTC) and 100% rehab funding. Bridge
                    is better for light value-add.
                  </p>
                  <span className="text-teal-600 text-sm font-medium flex items-center gap-1">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/investment/portfolio-loans"
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                    Portfolio Loans
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Finance multiple properties under one loan. Consolidate several bridge loans
                    or acquire a package of properties.
                  </p>
                  <span className="text-teal-600 text-sm font-medium flex items-center gap-1">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                Bridge Loan FAQs
              </h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <details
                    key={index}
                    className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-100/50 transition-colors">
                      <h3 className="font-semibold text-gray-900 pr-4">{item.question}</h3>
                      <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    <div className="px-5 pb-5 text-gray-500">
                      <p>{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <Shield className="h-12 w-12 text-teal-600 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Need to Move Fast on a Deal?
            </h2>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Connect with bridge lenders who close when you need it. Lenders close in 10-21 days with flexible
              terms and clear exit strategies for California investors.
            </p>
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-10"
              asChild
            >
              <Link href="/get-quote">
                Compare Bridge Rates <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              California Bridge Lending Network | Equal Housing Opportunity
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
