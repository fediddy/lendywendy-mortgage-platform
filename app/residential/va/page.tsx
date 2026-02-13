import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  CheckCircle,
  ChevronDown,
  Calculator,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Award,
  Star,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "California VA Loans | $0 Down, No PMI for Veterans | LendyWendy",
  description:
    "Compare VA home loan rates in California with zero down payment and no monthly PMI. Exclusive benefits for veterans, active duty, National Guard, and surviving spouses. Competitive rates, no loan limits for full entitlement.",
  keywords: [
    "VA loan California",
    "VA mortgage California",
    "VA home loan benefits",
    "veteran home loan California",
    "zero down VA loan",
    "no PMI VA loan",
    "VA loan requirements California",
    "VA loan eligibility",
    "VA Certificate of Eligibility",
    "VA funding fee California",
    "military home loan California",
    "VA loan limits California 2024",
  ],
  openGraph: {
    title: "California VA Loans | $0 Down for Veterans | LendyWendy",
    description:
      "Compare VA mortgage rates for California veterans and military. Zero down payment, no PMI, competitive rates. Thank you for your service.",
    type: "website",
    url: "https://lendywendy.com/residential/va",
    images: [{ url: "https://lendywendy.com/api/og?title=California+VA+Loans&subtitle=%240+Down+for+Veterans.+No+PMI.+Best+Rates+Available.&badge=For+Veterans", width: 1200, height: 630, alt: "California VA Loans" }],
  },
  alternates: {
    canonical: "https://lendywendy.com/residential/va",
  },
};

const benefits = [
  {
    icon: DollarSign,
    title: "$0 Down Payment",
    description:
      "Purchase a home with no down payment required. Buy a $1M California home without saving for a down payment.",
  },
  {
    icon: Shield,
    title: "No PMI Ever",
    description:
      "Save thousands annually with no private mortgage insurance requirement, regardless of your down payment.",
  },
  {
    icon: TrendingUp,
    title: "Best Rates Available",
    description:
      "VA loans consistently offer the lowest mortgage rates in the market, often 0.25-0.5% below conventional.",
  },
  {
    icon: Users,
    title: "Flexible Guidelines",
    description:
      "No maximum DTI, no minimum credit score from VA (lenders typically require 580-620), and bankruptcy-friendly.",
  },
];

const eligibility = [
  { service: "Active Duty", requirement: "90 consecutive days during wartime, or 181 days during peacetime" },
  { service: "Veterans", requirement: "Met active duty service requirements and received honorable discharge" },
  { service: "National Guard", requirement: "6 years of service, or 90 days activated under Title 10" },
  { service: "Reserves", requirement: "6 years of service, or 90 days activated under Title 10" },
  { service: "Surviving Spouses", requirement: "Unremarried spouse of veteran who died in service or from service-connected disability" },
];

const fundingFees = [
  { type: "First-Time Use (0% down)", regular: "2.15%", disabled: "Exempt" },
  { type: "First-Time Use (5%+ down)", regular: "1.5%", disabled: "Exempt" },
  { type: "First-Time Use (10%+ down)", regular: "1.25%", disabled: "Exempt" },
  { type: "Subsequent Use (0% down)", regular: "3.3%", disabled: "Exempt" },
  { type: "Subsequent Use (5%+ down)", regular: "1.5%", disabled: "Exempt" },
];

const faqItems = [
  {
    question: "What is a VA loan and who qualifies?",
    answer:
      "A VA loan is a mortgage guaranteed by the U.S. Department of Veterans Affairs, available to eligible veterans, active-duty service members, National Guard, Reserves, and certain surviving spouses. VA loans offer exceptional benefits: $0 down payment, no PMI, competitive rates, and flexible credit requirements. You'll need a Certificate of Eligibility (COE) to prove your entitlement.",
  },
  {
    question: "How do I get a VA Certificate of Eligibility (COE)?",
    answer:
      "You can obtain your COE through several methods: (1) Apply online through eBenefits, (2) Have your lender request it through the VA's Web LGY system (fastest method), or (3) Mail VA Form 26-1880 to the VA. Most lenders can retrieve your COE electronically within minutes. LendyWendy's partner lenders handle this process for you.",
  },
  {
    question: "Is there a VA loan limit in California?",
    answer:
      "For veterans with full entitlement (never used VA loan or paid off previous VA loan), there is NO loan limit - you can borrow as much as a lender will approve with $0 down. For veterans with reduced entitlement, limits apply based on county. California's high-cost counties allow up to $1,249,125 with full entitlement benefits.",
  },
  {
    question: "What is the VA funding fee and can it be waived?",
    answer:
      "The VA funding fee ranges from 1.25% to 3.3% of the loan amount, depending on down payment and whether it's your first VA loan. The fee can be financed into your loan. Veterans receiving VA disability compensation, Purple Heart recipients, and surviving spouses are exempt from the funding fee entirely.",
  },
  {
    question: "Can I use a VA loan for an investment property?",
    answer:
      "VA loans are for primary residences only - you cannot use a VA loan for pure investment properties. However, you CAN buy a multi-unit property (up to 4 units) with a VA loan if you live in one unit. This lets you house-hack and collect rent from other units while using your VA benefit.",
  },
  {
    question: "VA loan vs Conventional: Which is better?",
    answer:
      "For eligible veterans, VA loans are almost always better: $0 down vs 3-20% down, no PMI vs PMI until 20% equity, lower rates, and more flexible credit requirements. The only scenario where conventional might win is if you have 20%+ down and want to avoid the VA funding fee, but even then VA rates are often lower.",
  },
  {
    question: "Can I use my VA loan benefit more than once?",
    answer:
      "Yes! You can use your VA loan benefit multiple times. If you've paid off a previous VA loan, your full entitlement is restored. You can also have multiple VA loans simultaneously if you have remaining entitlement. Second-time users pay a higher funding fee (3.3% vs 2.15% with $0 down).",
  },
  {
    question: "What credit score do I need for a VA loan in California?",
    answer:
      "The VA itself has no minimum credit score requirement, but most lenders require 580-620. Some VA lenders work with scores as low as 500. LendyWendy matches you with lenders who specialize in VA loans across all credit profiles, including those rebuilding credit after military service.",
  },
];

export default function VALoansPage() {
  return (
    <>
      <StructuredData
        type="service"
        pageTitle="California VA Loans | $0 Down for Veterans"
        pageDescription="Compare VA home loan rates in California with zero down payment and no PMI for veterans, active duty, and surviving spouses. Competitive rates and flexible guidelines."
        pageUrl="/residential/va"
        breadcrumbs={[
          { name: "Residential", url: "/residential" },
          { name: "VA Loans", url: "/residential/va" },
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
                <Link href="/residential" className="hover:text-teal-600">
                  Residential
                </Link>
                <span>/</span>
                <span className="text-teal-600">VA Loans</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Award className="h-4 w-4" />
                Exclusive Veteran Benefits
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                California <span className="text-teal-600">VA Loans</span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-600">
                  $0 Down | No PMI | Best Rates
                </span>
              </h1>

              <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                Thank you for your service. Access the best mortgage benefits available - zero down
                payment, no monthly PMI, and the lowest rates in the market.
              </p>

              {/* Key Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50/50 px-4 py-2 rounded-full border border-gray-200">
                  <TrendingUp className="h-4 w-4 text-teal-600" />
                  <span>From 6.0% APR</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50/50 px-4 py-2 rounded-full border border-gray-200">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span>$0 Down</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50/50 px-4 py-2 rounded-full border border-gray-200">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <span>No PMI</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-8"
                  asChild
                >
                  <Link href="/get-quote">
                    Compare VA Rates <ArrowRight className="ml-2 h-5 w-5" />
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
                    VA Calculator
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
                VA Loan Benefits
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                The best mortgage program available - exclusive benefits for those who served
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

        {/* Eligibility Section */}
        <section className="py-20 border-t border-gray-200 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Who Qualifies for VA Loans?
                </h2>
                <p className="text-gray-500">
                  VA loan eligibility requirements for California veterans
                </p>
              </div>

              <div className="space-y-4">
                {eligibility.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-5 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <span className="text-gray-900 font-semibold">{item.service}</span>
                    <span className="text-gray-500 text-sm sm:text-right">{item.requirement}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <div className="flex items-start gap-4">
                  <BadgeCheck className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-gray-900 font-semibold mb-2">Not Sure If You Qualify?</h3>
                    <p className="text-gray-500 text-sm">
                      Many veterans don't realize they're eligible. If you served 90+ days during
                      wartime, 181+ days during peacetime, or 6+ years in Guard/Reserves, you likely
                      qualify. LendyWendy can help verify your eligibility.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold"
                  asChild
                >
                  <Link href="/get-quote">
                    Check VA Eligibility <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Funding Fee Section */}
        <section className="py-20 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  VA Funding Fee Breakdown
                </h2>
                <p className="text-gray-500">
                  One-time fee that can be financed into your loan
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 text-sm font-semibold text-gray-900">
                  <span>Loan Type</span>
                  <span>Regular Military</span>
                  <span>Disabled/Exempt</span>
                </div>
                {fundingFees.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 p-4 border-t border-gray-200 text-sm"
                  >
                    <span className="text-gray-900">{item.type}</span>
                    <span className="text-teal-600 font-semibold">{item.regular}</span>
                    <span className="text-emerald-600 font-semibold">{item.disabled}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-6 bg-emerald-50 border border-emerald-500/30 rounded-xl">
                <div className="flex items-start gap-4">
                  <Star className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-gray-900 font-semibold mb-2">Funding Fee Exemptions</h3>
                    <p className="text-gray-500 text-sm">
                      Veterans receiving VA disability compensation, Purple Heart recipients
                      (active duty), and eligible surviving spouses pay NO funding fee. This can
                      save $10,000+ on a typical California home purchase.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 border-t border-gray-200 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  VA Loans vs. Other Options
                </h2>
                <p className="text-gray-500">See why VA is the best choice for eligible veterans</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/residential/conventional"
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                    VA vs Conventional
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    VA: $0 down, no PMI, lower rates. Conventional: 3-20% down, PMI until 20%
                    equity. VA wins for eligible veterans.
                  </p>
                  <span className="text-teal-600 text-sm font-medium flex items-center gap-1">
                    Compare Conventional <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/residential/fha"
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                    VA vs FHA
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    VA: $0 down, no mortgage insurance. FHA: 3.5% down, lifetime MIP. VA is
                    significantly better if you qualify.
                  </p>
                  <span className="text-teal-600 text-sm font-medium flex items-center gap-1">
                    Compare FHA <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/residential/jumbo"
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                    VA Jumbo Loans
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    With full entitlement, VA has no loan limit. Buy a $2M+ California home with $0
                    down and no PMI.
                  </p>
                  <span className="text-teal-600 text-sm font-medium flex items-center gap-1">
                    Learn About Jumbo <ArrowRight className="h-4 w-4" />
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
                VA Loan FAQs
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
            <Award className="h-12 w-12 text-teal-600 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Thank You for Your Service
            </h2>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Let us help you use the VA loan benefits you've earned. Get matched with VA-approved
              lenders in 60 seconds with no credit impact.
            </p>
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-10"
              asChild
            >
              <Link href="/get-quote">
                Get Matched <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Equal Housing Opportunity | LendyWendy is not a lender
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
