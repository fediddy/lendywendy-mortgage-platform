import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  CheckCircle,
  Shield,
  ChevronDown,
  Calculator,
  Clock,
  DollarSign,
  Zap,
  Building,
  Target,
  AlertTriangle,
  Percent,
  Landmark,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "California Hard Money Loans | Fast Funding, Asset-Based | LendyWendy",
  description:
    "Hard money loans for California real estate investors. Asset-based lending with 7-10 day closings. No income verification. Up to 75% LTV on purchase, 100% rehab funding. Rates from 9.99%. Private money lenders.",
  keywords: [
    "hard money loan California",
    "hard money lender California",
    "private money loan California",
    "asset based lending California",
    "hard money real estate loan",
    "California private lender",
    "hard money bridge loan",
    "fast closing real estate loan",
    "hard money loan rates California",
    "no income verification hard money",
    "hard money loan requirements",
    "private money lender near me",
  ],
  openGraph: {
    title: "California Hard Money Loans | Fast Asset-Based Funding | LendyWendy",
    description:
      "Hard money loans for California investors. Asset-based approval, close in 7-10 days. No income docs required. Rates from 9.99%.",
    type: "website",
    url: "https://lendywendy.com/investment/hard-money",
    images: [{ url: "https://lendywendy.com/api/og?title=California+Hard+Money+Loans&subtitle=Asset-Based+Lending.+Close+in+7-10+Days.&badge=Fastest+Funding", width: 1200, height: 630, alt: "California Hard Money Loans" }],
  },
  alternates: {
    canonical: "https://lendywendy.com/investment/hard-money",
  },
};

const benefits = [
  {
    icon: Zap,
    title: "Close in 7-10 Days",
    description:
      "Speed is everything in competitive markets. Hard money approval is based on the asset, not your tax returns — so underwriting takes days, not weeks.",
  },
  {
    icon: Building,
    title: "Asset-Based Approval",
    description:
      "The property is the collateral. Credit score, income, and employment are secondary — what matters is the deal and the exit strategy.",
  },
  {
    icon: DollarSign,
    title: "Flexible Loan Structures",
    description:
      "Interest-only payments, no prepay penalties on most programs, and creative structuring for complex deals that banks won't touch.",
  },
  {
    icon: Target,
    title: "Any Property Type",
    description:
      "SFR, multifamily, mixed-use, commercial, land, construction — hard money covers property types conventional lenders avoid.",
  },
];

const loanDetails = [
  { label: "Interest Rates", value: "9.99% - 13.99%" },
  { label: "Loan-to-Value (LTV)", value: "Up to 75% of ARV" },
  { label: "Loan Amounts", value: "$75K - $20M+" },
  { label: "Loan Terms", value: "6 - 36 months" },
  { label: "Origination Points", value: "1 - 3 points" },
  { label: "Minimum Credit Score", value: "No minimum (550+ preferred)" },
  { label: "Closing Speed", value: "7-10 business days" },
  { label: "Prepay Penalty", value: "None on most programs" },
];

const useCases = [
  {
    title: "Fix & Flip Projects",
    description:
      "Purchase distressed properties and fund 100% of rehab costs. Repay when you sell the renovated property.",
    exitStrategy: "Sell after renovation",
  },
  {
    title: "Bridge to Permanent",
    description:
      "Close quickly on a time-sensitive acquisition, then refinance into a DSCR or conventional loan once the property stabilizes.",
    exitStrategy: "Refinance to long-term",
  },
  {
    title: "Auction & REO Purchases",
    description:
      "Proof of funds in 24 hours. Close on foreclosure, auction, and REO properties faster than any bank.",
    exitStrategy: "Rehab + sell or refinance",
  },
  {
    title: "Land & Construction",
    description:
      "Finance raw land acquisition and ground-up construction when traditional lenders won't fund speculative projects.",
    exitStrategy: "Sell completed project",
  },
  {
    title: "Distressed Properties",
    description:
      "Properties that don't qualify for conventional financing due to condition — fire damage, deferred maintenance, vacancy.",
    exitStrategy: "Rehab + refinance or sell",
  },
  {
    title: "Portfolio Acquisition",
    description:
      "Quickly close on a portfolio of properties when a seller wants a fast, all-cash close. Refinance individually later.",
    exitStrategy: "Refinance into DSCR loans",
  },
];

const hardMoneyVsConventional = [
  {
    feature: "Approval Speed",
    hardMoney: "24-48 hours",
    conventional: "2-4 weeks",
  },
  {
    feature: "Closing Time",
    hardMoney: "7-10 days",
    conventional: "30-45 days",
  },
  {
    feature: "Income Docs",
    hardMoney: "Not required",
    conventional: "Full documentation",
  },
  {
    feature: "Credit Score",
    hardMoney: "Flexible (550+)",
    conventional: "680+ required",
  },
  {
    feature: "Property Condition",
    hardMoney: "Any condition",
    conventional: "Must be habitable",
  },
  {
    feature: "Interest Rate",
    hardMoney: "9.99% - 13.99%",
    conventional: "6.5% - 7.5%",
  },
  {
    feature: "Loan Term",
    hardMoney: "6-36 months",
    conventional: "15-30 years",
  },
  {
    feature: "Best For",
    hardMoney: "Speed & flexibility",
    conventional: "Long-term hold",
  },
];

const faqItems = [
  {
    question: "What is a hard money loan?",
    answer:
      "A hard money loan is a short-term, asset-based loan secured by real property. Unlike conventional mortgages, hard money lenders focus primarily on the property's value and the borrower's exit strategy rather than income, employment, or credit history. These loans are funded by private investors or lending companies and are commonly used by real estate investors for fix-and-flip projects, bridge financing, and deals that require fast closing.",
  },
  {
    question: "How fast can I get a hard money loan in California?",
    answer:
      "Most hard money lenders in California can provide proof of funds within 24 hours and close in 7-10 business days. Some lenders offer expedited closings in as few as 3-5 days for experienced borrowers with clean deals. The speed comes from asset-based underwriting — since approval is based on the property, there's no need for income verification, employment checks, or lengthy document review.",
  },
  {
    question: "What credit score do I need for a hard money loan?",
    answer:
      "There is no strict minimum credit score for most hard money loans. Many lenders work with scores as low as 550, and some don't pull credit at all. However, borrowers with higher credit scores (680+) typically receive better rates and terms. The primary qualification factors are the property's value (LTV), the borrower's experience, the exit strategy, and available cash reserves.",
  },
  {
    question: "How much does a hard money loan cost?",
    answer:
      "Hard money loans in California typically carry interest rates of 9.99% to 13.99% with 1-3 origination points. For a $500,000 loan at 11% with 2 points, you'd pay $10,000 in points at closing plus approximately $4,583/month in interest-only payments. While more expensive than conventional loans, the speed, flexibility, and ability to close deals that banks won't fund often make the higher cost worthwhile for investors.",
  },
  {
    question: "What's the difference between hard money and bridge loans?",
    answer:
      "Hard money loans are broader — any asset-based, short-term real estate loan funded by private capital. Bridge loans are a specific type that 'bridges' a gap between transactions (like buying before selling, or acquiring before refinancing). All bridge loans can be hard money loans, but not all hard money loans are bridges. Hard money also covers fix-and-flip, construction, and other short-term investment strategies.",
  },
  {
    question: "Can I get a hard money loan for a primary residence?",
    answer:
      "Hard money loans for primary residences are rare and heavily regulated in California under consumer protection laws (Dodd-Frank, TRID). Most hard money lenders only fund investment properties, second homes, or commercial properties. If you need fast financing for a primary residence, consider a non-QM lender or bank statement loan instead.",
  },
  {
    question: "What properties qualify for hard money loans in California?",
    answer:
      "Almost any property type qualifies: single-family residences, multifamily (2-100+ units), mixed-use, commercial buildings, retail, industrial, raw land, and new construction. Properties in any condition are eligible — including distressed, fire-damaged, vacant, or those requiring major renovation. The key factor is the property's after-repair value (ARV) or as-is value relative to the loan amount.",
  },
  {
    question: "How do I pay back a hard money loan?",
    answer:
      "Hard money loans are designed to be short-term (6-36 months) with clear exit strategies: (1) Sell the property after renovation for fix-and-flip projects, (2) Refinance into a long-term DSCR or conventional loan after stabilizing the property, (3) Pay off with proceeds from another property sale or business income. Lenders evaluate your exit strategy as a key part of the approval process.",
  },
];

export default function HardMoneyPage() {
  return (
    <>
      <StructuredData
        type="service"
        pageTitle="California Hard Money Loans | Fast Asset-Based Funding"
        pageDescription="Hard money loans for California real estate investors. Asset-based approval, close in 7-10 days. No income docs required. Rates from 9.99%."
        pageUrl="/investment/hard-money"
        breadcrumbs={[
          { name: "Investment", url: "/investment" },
          { name: "Hard Money Loans", url: "/investment/hard-money" },
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
                <span className="text-teal-600">Hard Money Loans</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-teal-600/10 border border-teal-600/30 text-teal-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Zap className="h-4 w-4" />
                Fastest Funding in California
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                California <span className="text-teal-600">Hard Money Loans</span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-600">
                  Close in Days, Not Months
                </span>
              </h1>

              <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                Asset-based lending for investors who need speed and flexibility. No income
                docs, no bank approvals, no red tape. The property is the story.
              </p>

              {/* Key Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <Zap className="h-4 w-4 text-teal-600" />
                  <span>Close in 7 Days</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <Building className="h-4 w-4 text-emerald-600" />
                  <span>Any Property Type</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <DollarSign className="h-4 w-4 text-teal-600" />
                  <span>Up to $20M+</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-8"
                  asChild
                >
                  <Link href="/get-quote">
                    Compare Hard Money Rates <ArrowRight className="ml-2 h-5 w-5" />
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
                Why Investors Use Hard Money
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                When speed, flexibility, and certainty of close matter more than rate
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

        {/* Use Cases Section */}
        <section className="py-20 border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  When to Use Hard Money
                </h2>
                <p className="text-gray-500">
                  The most common strategies funded by private capital
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {useCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{useCase.title}</h3>
                    <p className="text-gray-500 text-sm mb-4">{useCase.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <ArrowRight className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-600 font-medium">
                        Exit: {useCase.exitStrategy}
                      </span>
                    </div>
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
                  Hard Money Loan Terms
                </h2>
                <p className="text-gray-500">
                  Typical terms from California private lenders
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
                    Compare Hard Money Rates <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Hard Money vs Conventional Comparison */}
        <section className="py-20 border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Hard Money vs. Conventional Loans
                </h2>
                <p className="text-gray-500">
                  Understanding the trade-offs between speed and cost
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 text-sm font-semibold text-gray-900">
                  <span>Feature</span>
                  <span className="text-teal-600">Hard Money</span>
                  <span>Conventional</span>
                </div>
                {hardMoneyVsConventional.map((row, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 p-4 border-t border-gray-200 text-sm"
                  >
                    <span className="text-gray-900 font-medium">{row.feature}</span>
                    <span className="text-teal-600">{row.hardMoney}</span>
                    <span className="text-gray-500">{row.conventional}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-gray-50 rounded-xl p-5 border border-teal-600/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-1">When Hard Money Makes Sense</h4>
                    <p className="text-gray-500 text-sm">
                      Hard money's higher cost is offset when the deal requires speed (auction,
                      competitive market), the property doesn't qualify for conventional (condition,
                      vacancy), or you need certainty of close. Most investors use hard money as
                      short-term capital and refinance into cheaper long-term debt once the property
                      is stabilized.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compare Loan Products */}
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
                    Long-term rental financing. Qualify on cash flow, no income docs. Lower rates
                    than hard money for stabilized properties.
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
                    Similar to hard money but specifically structured for renovation projects with
                    100% rehab funding and draw schedules.
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
                    Short-term financing to bridge acquisitions or stabilize properties before
                    refinancing to permanent debt.
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
                Hard Money Loan FAQs
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
              Need Fast Capital for Your Next Deal?
            </h2>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Connect with California's top hard money lenders. Proof of funds in 24
              hours. Lenders close in 7-10 days. No income verification required.
            </p>
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-10"
              asChild
            >
              <Link href="/get-quote">
                Compare Hard Money Lenders <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              California Private Lending Network | Equal Housing Opportunity
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
