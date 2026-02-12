import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Home,
  CheckCircle,
  Shield,
  ChevronDown,
  Calculator,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  BadgeCheck,
  Percent,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "California Conventional Loans | 3% Down, No PMI at 80% LTV | LendyWendy",
  description:
    "Get a California conventional mortgage with as little as 3% down. Conforming loans up to $766,550, competitive rates from 6.5%, PMI cancellable at 80% LTV. Pre-approval in 24 hours. NMLS #1945913.",
  keywords: [
    "conventional loan California",
    "conforming loan California",
    "conventional mortgage rates",
    "California home loan 3% down",
    "conventional vs FHA California",
    "conforming loan limits California",
    "PMI cancellation",
    "620 credit score mortgage",
    "first-time homebuyer conventional loan",
    "Fannie Mae loans California",
    "Freddie Mac loans California",
    "conventional loan requirements California",
  ],
  openGraph: {
    title: "California Conventional Loans | 3% Down | LendyWendy",
    description:
      "Conventional mortgages with 3% down for California homebuyers. Up to $766,550 conforming limit. PMI cancellable at 80% LTV.",
    type: "website",
    url: "https://lendywendy.com/residential/conventional",
    images: [{ url: "https://lendywendy.com/api/og?title=California+Conventional+Loans&subtitle=From+3%25+Down.+Competitive+Rates+for+Qualified+Buyers.&badge=Most+Popular", width: 1200, height: 630, alt: "California Conventional Loans" }],
  },
  alternates: {
    canonical: "https://lendywendy.com/residential/conventional",
  },
};

const benefits = [
  {
    icon: DollarSign,
    title: "As Low as 3% Down",
    description:
      "First-time homebuyers can put as little as 3% down with Fannie Mae HomeReady or Freddie Mac Home Possible programs.",
  },
  {
    icon: Percent,
    title: "PMI Cancellable",
    description:
      "Unlike FHA loans, PMI on conventional loans can be cancelled once you reach 20% equity, saving you hundreds per month.",
  },
  {
    icon: TrendingUp,
    title: "Higher Loan Limits",
    description:
      "California conforming limit is $766,550 for most counties, with high-cost areas like San Francisco allowing up to $1,149,825.",
  },
  {
    icon: Clock,
    title: "Faster Processing",
    description:
      "Conventional loans often close faster than government-backed loans with fewer bureaucratic requirements.",
  },
];

const requirements = [
  { label: "Minimum Credit Score", value: "620 (680+ for best rates)" },
  { label: "Down Payment", value: "3% - 20%" },
  { label: "Debt-to-Income Ratio", value: "Up to 45% (50% with strong factors)" },
  { label: "Loan Limits (2024)", value: "$766,550 - $1,149,825" },
  { label: "PMI Required", value: "Yes, if < 20% down" },
  { label: "Property Types", value: "Primary, Second Home, Investment" },
];

const californiaCountyLimits = [
  { county: "Los Angeles County", limit: "$1,149,825", type: "High-Cost" },
  { county: "San Francisco County", limit: "$1,149,825", type: "High-Cost" },
  { county: "Orange County", limit: "$1,149,825", type: "High-Cost" },
  { county: "San Diego County", limit: "$1,006,250", type: "High-Cost" },
  { county: "Sacramento County", limit: "$766,550", type: "Standard" },
  { county: "Riverside County", limit: "$766,550", type: "Standard" },
];

const faqItems = [
  {
    question: "What is a conventional loan in California?",
    answer:
      "A conventional loan is a mortgage that isn't backed by a government agency (like FHA, VA, or USDA). Instead, it follows guidelines set by Fannie Mae and Freddie Mac. Conventional loans offer competitive rates, flexible terms, and the ability to cancel PMI once you reach 20% equity. They're ideal for California buyers with good credit (620+) who want lower long-term costs.",
  },
  {
    question: "What credit score do I need for a conventional loan in California?",
    answer:
      "The minimum credit score for a conventional loan is 620, but you'll get better rates with a score of 680 or higher. Borrowers with 740+ credit scores qualify for the best available rates. LendyWendy matches you with lenders who specialize in your credit profile to find competitive options.",
  },
  {
    question: "How much down payment do I need for a conventional loan?",
    answer:
      "Conventional loans require as little as 3% down for first-time homebuyers through programs like Fannie Mae HomeReady and Freddie Mac Home Possible. Standard conventional loans typically require 5% down, while putting 20% down eliminates the need for PMI entirely.",
  },
  {
    question: "What are the 2024 conforming loan limits for California?",
    answer:
      "California conforming loan limits for 2024 range from $766,550 in standard counties to $1,149,825 in high-cost areas like Los Angeles, San Francisco, and Orange County. San Diego County has a limit of $1,006,250. Loans above these limits require jumbo financing.",
  },
  {
    question: "Can I cancel PMI on a conventional loan?",
    answer:
      "Yes! PMI on conventional loans can be cancelled once you reach 20% equity (80% LTV). This is a major advantage over FHA loans, which require mortgage insurance for the life of the loan. Your lender must automatically cancel PMI when you reach 22% equity.",
  },
  {
    question: "Conventional vs FHA loan: Which is better for California homebuyers?",
    answer:
      "Conventional loans are often better for buyers with good credit (680+) because they offer lower PMI costs and the ability to cancel PMI. FHA loans are better for buyers with lower credit scores (580-620) or limited down payment funds. LendyWendy can help you compare both options to find the best fit.",
  },
  {
    question: "How long does it take to close a conventional loan in California?",
    answer:
      "Conventional loans typically close in 30-45 days, often faster than FHA or VA loans because they have fewer bureaucratic requirements. With a complete application and responsive borrowers, some conventional loans can close in as few as 21 days.",
  },
  {
    question: "Can I use a conventional loan for an investment property in California?",
    answer:
      "Yes, conventional loans can be used for primary residences, second homes, and investment properties. Investment property conventional loans typically require 15-25% down and have slightly higher interest rates. For investors seeking more flexibility, DSCR loans may be a better option.",
  },
];

export default function ConventionalLoansPage() {
  return (
    <>
      <StructuredData
        type="service"
        pageTitle="California Conventional Loans | 3% Down"
        pageDescription="Get a California conventional mortgage with as little as 3% down. Conforming loans up to $766,550, competitive rates, PMI cancellable at 80% LTV."
        pageUrl="/residential/conventional"
        breadcrumbs={[
          { name: "Residential", url: "/residential" },
          { name: "Conventional Loans", url: "/residential/conventional" },
        ]}
        faqItems={faqItems}
      />

      <main className="min-h-screen bg-slate-950">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="flex justify-center items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/" className="hover:text-amber-500">
                  Home
                </Link>
                <span>/</span>
                <Link href="/residential" className="hover:text-amber-500">
                  Residential
                </Link>
                <span>/</span>
                <span className="text-amber-500">Conventional Loans</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Home className="h-4 w-4" />
                California Conventional Mortgages
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                California <span className="text-amber-500">Conventional Loans</span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-300">
                  As Low as 3% Down
                </span>
              </h1>

              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                The most popular mortgage choice for California homebuyers. Competitive rates,
                flexible terms, and PMI that can be cancelled once you reach 20% equity.
              </p>

              {/* Key Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <TrendingUp className="h-4 w-4 text-amber-500" />
                  <span>From 6.5% APR</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <DollarSign className="h-4 w-4 text-emerald-500" />
                  <span>3% Down Available</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span>Close in 30 Days</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg px-8"
                  asChild
                >
                  <Link href="/get-quote">
                    Get Conventional Rates <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-slate-800"
                  asChild
                >
                  <Link href="/calculators">
                    <Calculator className="mr-2 h-5 w-5" />
                    Payment Calculator
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Why Choose a Conventional Loan?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Conventional loans offer the best long-term value for California homebuyers with
                good credit
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-colors"
                >
                  <div className="p-3 bg-amber-500/10 rounded-xl w-fit mb-4">
                    <benefit.icon className="h-6 w-6 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-20 border-t border-slate-800 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Conventional Loan Requirements
                </h2>
                <p className="text-gray-400">
                  What you need to qualify for a conventional mortgage in California
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {requirements.map((req, index) => (
                  <div
                    key={index}
                    className="bg-slate-900 rounded-xl p-5 border border-slate-800 flex justify-between items-center"
                  >
                    <span className="text-gray-400">{req.label}</span>
                    <span className="text-white font-semibold">{req.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold"
                  asChild
                >
                  <Link href="/get-quote">
                    Check Your Eligibility <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* California County Limits */}
        <section className="py-20 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  2024 California Conforming Loan Limits
                </h2>
                <p className="text-gray-400">
                  Maximum loan amounts for conventional mortgages by county
                </p>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-4 bg-slate-800 text-sm font-semibold text-white">
                  <span>County</span>
                  <span>Loan Limit</span>
                  <span>Area Type</span>
                </div>
                {californiaCountyLimits.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 p-4 border-t border-slate-800 text-sm"
                  >
                    <span className="text-white">{item.county}</span>
                    <span className="text-amber-500 font-semibold">{item.limit}</span>
                    <span className="text-gray-400">{item.type}</span>
                  </div>
                ))}
              </div>

              <p className="text-gray-500 text-sm text-center mt-4">
                Need a loan above these limits?{" "}
                <Link href="/residential/jumbo" className="text-amber-500 hover:underline">
                  Explore Jumbo Loans
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 border-t border-slate-800 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Conventional vs. Other Loan Types
                </h2>
                <p className="text-gray-400">See how conventional loans compare</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/residential/fha"
                  className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-500">
                    Conventional vs FHA
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    FHA offers lower credit requirements (580) but has lifetime mortgage insurance.
                    Conventional is better for 680+ credit.
                  </p>
                  <span className="text-amber-500 text-sm font-medium flex items-center gap-1">
                    Compare FHA <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/residential/va"
                  className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-500">
                    Conventional vs VA
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    VA offers $0 down and no PMI for eligible veterans. If you qualify, VA is often
                    the better choice.
                  </p>
                  <span className="text-amber-500 text-sm font-medium flex items-center gap-1">
                    Compare VA <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/residential/jumbo"
                  className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-500">
                    Conventional vs Jumbo
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Need more than $1,149,825 in high-cost areas? Jumbo loans offer higher limits
                    with competitive rates.
                  </p>
                  <span className="text-amber-500 text-sm font-medium flex items-center gap-1">
                    Compare Jumbo <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white text-center mb-10">
                Conventional Loan FAQs
              </h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <details
                    key={index}
                    className="group bg-slate-900 rounded-xl border border-slate-800 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-800/50 transition-colors">
                      <h3 className="font-semibold text-white pr-4">{item.question}</h3>
                      <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    <div className="px-5 pb-5 text-gray-400">
                      <p>{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 border-t border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="container mx-auto px-4 text-center">
            <Shield className="h-12 w-12 text-amber-500 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready for a California Conventional Loan?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Get matched with top conventional lenders in 60 seconds. Compare rates from multiple
              lenders with no credit impact.
            </p>
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg px-10"
              asChild
            >
              <Link href="/get-quote">
                Get Pre-Approved <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              NMLS #1945913 | Equal Housing Opportunity
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
