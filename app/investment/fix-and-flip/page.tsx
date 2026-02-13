import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Hammer,
  CheckCircle,
  Shield,
  ChevronDown,
  Calculator,
  Clock,
  DollarSign,
  TrendingUp,
  Zap,
  Target,
  RefreshCw,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "California Fix and Flip Loans | Close in 7-14 Days, 90% LTC | LendyWendy",
  description:
    "Hard money fix and flip loans for California investors. Lenders close in 7-14 days, up to 90% of purchase price, 100% rehab financing. Rates from 9%. Fund acquisitions and renovations fast.",
  keywords: [
    "fix and flip loan California",
    "hard money loan California",
    "flip financing California",
    "rehab loan California",
    "house flipping loan",
    "California hard money lender",
    "investment property rehab loan",
    "quick close hard money",
    "fix and flip financing",
    "renovation loan California",
    "real estate flip funding",
    "short term investment loan",
  ],
  openGraph: {
    title: "California Fix and Flip Loans | Close in 7 Days | LendyWendy",
    description:
      "Hard money fix and flip loans for California flippers. 7-14 day closing, 90% LTC, 100% rehab financing. Fast funding for your next deal.",
    type: "website",
    url: "https://lendywendy.com/investment/fix-and-flip",
    images: [{ url: "https://lendywendy.com/api/og?title=California+Fix+%26+Flip+Loans&subtitle=Fast+Funding+for+Renovations.+Close+in+7-14+Days.&badge=100%25+Rehab+Funding", width: 1200, height: 630, alt: "California Fix and Flip Loans" }],
  },
  alternates: {
    canonical: "https://lendywendy.com/investment/fix-and-flip",
  },
};

const benefits = [
  {
    icon: Zap,
    title: "7-14 Day Closing",
    description:
      "Lenders in our network offer lightning-fast closings. Fund deals that other buyers can't because of slow financing.",
  },
  {
    icon: DollarSign,
    title: "90% of Purchase",
    description:
      "Finance up to 90% of the purchase price. Put less capital into each deal and do more flips simultaneously.",
  },
  {
    icon: Hammer,
    title: "100% Rehab Funding",
    description:
      "Available through our network: 100% renovation funding. Draws released in 1-3 days as you complete work.",
  },
  {
    icon: RefreshCw,
    title: "Interest-Only Payments",
    description:
      "Lower monthly carrying costs with interest-only payments. Pay down principal when you sell.",
  },
];

const loanDetails = [
  { label: "Interest Rates", value: "9% - 12%" },
  { label: "Loan-to-Cost (LTC)", value: "Up to 90%" },
  { label: "Loan-to-ARV", value: "Up to 70-75%" },
  { label: "Rehab Financing", value: "100% of budget" },
  { label: "Loan Terms", value: "6-18 months" },
  { label: "Minimum Credit Score", value: "620+ (660+ for best rates)" },
  { label: "Experience Required", value: "0-3+ flips (varies)" },
  { label: "Draw Schedule", value: "1-3 day turnaround" },
];

const flippingProcess = [
  {
    step: "1",
    title: "Find Your Deal",
    description: "Identify a property with value-add potential. We'll help you analyze the numbers.",
  },
  {
    step: "2",
    title: "Get Matched",
    description: "Submit your deal for review. Same-day pre-approval letters available from lenders.",
  },
  {
    step: "3",
    title: "Close Fast",
    description: "Lenders fund in 7-14 days. Beat cash buyers who need longer to close.",
  },
  {
    step: "4",
    title: "Renovate",
    description: "Complete your rehab. Request draws as you finish stages.",
  },
  {
    step: "5",
    title: "Sell & Profit",
    description: "List the property, sell, pay off the loan, and pocket your profit.",
  },
];

const experienceLevels = [
  {
    level: "New Flipper (0-2 flips)",
    ltc: "Up to 85%",
    rate: "10-12%",
    reserves: "6 months PITIA",
  },
  {
    level: "Experienced (3-10 flips)",
    ltc: "Up to 90%",
    rate: "9-11%",
    reserves: "3 months PITIA",
  },
  {
    level: "Pro Flipper (10+ flips)",
    ltc: "Up to 90%+",
    rate: "9-10%",
    reserves: "Minimal",
  },
];

const faqItems = [
  {
    question: "What is a fix and flip loan?",
    answer:
      "A fix and flip loan (also called hard money or bridge loan) is short-term financing designed for real estate investors who buy, renovate, and sell properties for profit. These loans typically cover 80-90% of the purchase price plus 100% of renovation costs, with terms of 6-18 months. They're asset-based, meaning approval depends more on the deal than your personal income.",
  },
  {
    question: "How fast can I close on a fix and flip loan?",
    answer:
      "Fix and flip loans can close in as fast as 7 days, with most deals closing in 10-14 days. This speed comes from streamlined underwriting that focuses on the property and deal metrics rather than extensive income documentation. Some lenders offer same-day pre-approval and can fund even faster for experienced flippers with established relationships.",
  },
  {
    question: "What credit score do I need for a fix and flip loan?",
    answer:
      "Most fix and flip lenders require a minimum 620-660 credit score. Unlike conventional loans, these are primarily asset-based, so the deal quality matters more than your credit. However, better credit scores (680+) typically get better rates and higher leverage. Some lenders work with scores down to 600 for experienced flippers with strong deals.",
  },
  {
    question: "How much down payment do I need for a flip?",
    answer:
      "Fix and flip loans typically require 10-20% down on the purchase price. New flippers usually need 15-20% down, while experienced investors with track records may qualify for 10% down or less. The total cash needed also includes closing costs (2-4%) and any portion of rehab not covered by the loan.",
  },
  {
    question: "Do I need experience to get a fix and flip loan?",
    answer:
      "Many lenders work with first-time flippers, though terms may be more conservative (higher rates, lower leverage, more reserves required). Having a contractor, mentor, or partner with experience can help. Most lenders want to see your renovation scope of work and budget to ensure the project is realistic.",
  },
  {
    question: "How do rehab draws work?",
    answer:
      "After closing, you fund initial renovation work. As you complete phases (demo, framing, electrical, etc.), you request draws. The lender sends an inspector to verify completed work, then releases funds (usually within 1-3 days). Most lenders pay draws based on percentage of work completed or pre-agreed milestones.",
  },
  {
    question: "What happens if my flip takes longer than expected?",
    answer:
      "Most fix and flip loans offer extension options (typically 3-6 months) for a fee (usually 0.5-1% of the loan amount). It's important to build a realistic timeline and budget contingency into your project plan. If you need more time, communicate early with your lender - they generally prefer extensions over foreclosure.",
  },
  {
    question: "Fix and flip loan vs DSCR loan: Which should I use?",
    answer:
      "Use fix and flip loans for properties needing significant renovation that you plan to sell within 6-18 months. Use DSCR loans for stabilized rental properties you plan to hold long-term. Many investors use fix and flip financing to acquire and renovate, then refinance into a DSCR loan if they decide to keep the property as a rental.",
  },
];

export default function FixAndFlipLoansPage() {
  return (
    <>
      <StructuredData
        type="service"
        pageTitle="California Fix and Flip Loans | Close in 7-14 Days"
        pageDescription="Hard money fix and flip loans for California investors. Close in 7-14 days, up to 90% of purchase price, 100% rehab financing."
        pageUrl="/investment/fix-and-flip"
        breadcrumbs={[
          { name: "Investment", url: "/investment" },
          { name: "Fix and Flip Loans", url: "/investment/fix-and-flip" },
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
                <span className="text-teal-600">Fix and Flip</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-teal-600/10 border border-teal-600/30 text-teal-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Hammer className="h-4 w-4" />
                Hard Money Financing
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                California <span className="text-teal-600">Fix & Flip Loans</span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-600">
                  Close in 7 Days. Fund 90% LTC.
                </span>
              </h1>

              <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                Move fast on California flip opportunities. Lightning-quick closings, high leverage,
                and 100% rehab funding to maximize your returns.
              </p>

              {/* Key Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <TrendingUp className="h-4 w-4 text-teal-600" />
                  <span>From 9% APR</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  <span>7-14 Day Close</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <DollarSign className="h-4 w-4 text-teal-600" />
                  <span>90% LTC</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-8"
                  asChild
                >
                  <Link href="/get-quote">
                    Compare Flip Lenders <ArrowRight className="ml-2 h-5 w-5" />
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
                    Flip Calculator
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
                Why Flippers Choose Hard Money
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Speed and flexibility that traditional lenders can't match
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

        {/* Loan Details */}
        <section className="py-20 border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Fix & Flip Loan Terms
                </h2>
                <p className="text-gray-500">
                  Competitive terms for California flippers
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
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  The Flipping Process
                </h2>
                <p className="text-gray-500">
                  From deal finding to profit taking
                </p>
              </div>

              <div className="space-y-4">
                {flippingProcess.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 border border-gray-200"
                  >
                    <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Levels */}
        <section className="py-20 border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Terms by Experience Level
                </h2>
                <p className="text-gray-500">
                  More experience = better terms
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {experienceLevels.map((exp, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
                  >
                    <h3 className="text-lg font-bold text-teal-600 mb-4">{exp.level}</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Max LTC</span>
                        <span className="text-gray-900 font-semibold">{exp.ltc}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Rate Range</span>
                        <span className="text-gray-900 font-semibold">{exp.rate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reserves</span>
                        <span className="text-gray-900 font-semibold">{exp.reserves}</span>
                      </div>
                    </div>
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
                    Compare Flip Rates <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 border-t border-gray-200">
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
                    For stabilized rentals you'll hold long-term. Lower rates, 30-year terms.
                    Refinance your flip into DSCR if you decide to keep it.
                  </p>
                  <span className="text-teal-600 text-sm font-medium flex items-center gap-1">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/investment/bridge-loans"
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                    Bridge Loans
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Similar to fix & flip but for properties needing light work or stabilization.
                    Typically lower rates than hard money.
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
                    Finance multiple flips under one loan. Ideal for high-volume flippers doing
                    5+ deals simultaneously.
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
        <section className="py-20 border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                Fix & Flip Loan FAQs
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
            <Hammer className="h-12 w-12 text-teal-600 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Fund Your Next Flip?
            </h2>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Connect with hard money lenders who close fast on California flips.
              Same-day pre-approval. Lenders close in 7-14 days. 90% LTC available.
            </p>
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-10"
              asChild
            >
              <Link href="/get-quote">
                Compare Flip Rates <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              California Hard Money Lending Network | Equal Housing Opportunity
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
