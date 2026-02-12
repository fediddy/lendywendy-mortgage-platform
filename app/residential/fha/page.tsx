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
  CreditCard,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "California FHA Loans | 3.5% Down, 580 Credit Score | LendyWendy",
  description:
    "FHA loans in California with just 3.5% down and 580 credit score. Government-backed mortgages with low closing costs, gift funds allowed. First-time homebuyer friendly. Pre-approval in 24 hours. NMLS #1945913.",
  keywords: [
    "FHA loan California",
    "FHA mortgage California",
    "FHA loan requirements California",
    "580 credit score mortgage",
    "3.5% down payment home loan",
    "first-time homebuyer FHA California",
    "FHA loan limits California 2024",
    "low credit home loan California",
    "FHA vs conventional loan",
    "government-backed mortgage California",
    "FHA closing costs California",
    "FHA streamline refinance California",
  ],
  openGraph: {
    title: "California FHA Loans | 3.5% Down, 580 Credit | LendyWendy",
    description:
      "FHA mortgages for California homebuyers. 3.5% down with 580 credit. Government-backed, first-time buyer friendly.",
    type: "website",
    url: "https://lendywendy.com/residential/fha",
    images: [{ url: "https://lendywendy.com/api/og?title=California+FHA+Loans&subtitle=580+Credit+Score.+3.5%25+Down+Payment.+First-Time+Buyer+Friendly.&badge=Low+Down+Payment", width: 1200, height: 630, alt: "California FHA Loans" }],
  },
  alternates: {
    canonical: "https://lendywendy.com/residential/fha",
  },
};

const benefits = [
  {
    icon: CreditCard,
    title: "Low Credit Requirements",
    description:
      "Qualify with just a 580 credit score for 3.5% down, or 500 credit score with 10% down. Perfect for rebuilding credit.",
  },
  {
    icon: DollarSign,
    title: "3.5% Down Payment",
    description:
      "One of the lowest down payments available. $17,500 down on a $500,000 home versus $100,000 for 20% down.",
  },
  {
    icon: Gift,
    title: "Gift Funds Allowed",
    description:
      "Your entire down payment can come from a gift from family, employer, or approved assistance program.",
  },
  {
    icon: Users,
    title: "Flexible DTI Ratios",
    description:
      "FHA allows up to 50% debt-to-income ratio with compensating factors, helping more borrowers qualify.",
  },
];

const requirements = [
  { label: "Minimum Credit Score", value: "580 (500 with 10% down)" },
  { label: "Down Payment", value: "3.5% - 10%" },
  { label: "Debt-to-Income Ratio", value: "Up to 50% with factors" },
  { label: "Loan Limits (2024)", value: "$498,257 - $1,149,825" },
  { label: "MIP Required", value: "Yes, for life of loan" },
  { label: "Property Types", value: "Primary Residence Only" },
];

const californiaFhaLimits = [
  { county: "Los Angeles County", limit: "$1,149,825", floor: "High-Cost" },
  { county: "San Francisco County", limit: "$1,149,825", floor: "High-Cost" },
  { county: "Orange County", limit: "$1,149,825", floor: "High-Cost" },
  { county: "San Diego County", limit: "$1,006,250", floor: "High-Cost" },
  { county: "Sacramento County", limit: "$763,600", floor: "High-Cost" },
  { county: "Fresno County", limit: "$498,257", floor: "Standard" },
];

const faqItems = [
  {
    question: "What is an FHA loan and how does it work?",
    answer:
      "An FHA loan is a mortgage insured by the Federal Housing Administration. Because the government backs these loans, lenders can offer more flexible qualification requirements including lower credit scores (580+) and down payments (3.5%). You'll pay mortgage insurance premiums (MIP) which protect the lender if you default. FHA loans are popular among first-time California homebuyers.",
  },
  {
    question: "What credit score do I need for an FHA loan in California?",
    answer:
      "You need a minimum 580 credit score to qualify for an FHA loan with 3.5% down. If your score is between 500-579, you can still qualify but need 10% down. Most California FHA lenders prefer 620+ for the smoothest approval process, but LendyWendy matches you with lenders who specialize in lower credit profiles.",
  },
  {
    question: "What are the FHA loan limits in California for 2024?",
    answer:
      "California FHA loan limits for 2024 range from $498,257 in standard areas to $1,149,825 in high-cost counties like Los Angeles, San Francisco, and Orange County. San Diego County's limit is $1,006,250. These limits are the same as conforming loan limits in most California counties due to high home prices.",
  },
  {
    question: "How much is FHA mortgage insurance (MIP)?",
    answer:
      "FHA requires two types of mortgage insurance: an upfront MIP of 1.75% of the loan amount (can be financed) and annual MIP of 0.55% of the loan amount paid monthly. On a $500,000 loan, that's $8,750 upfront and about $229/month. Unlike conventional PMI, FHA MIP lasts for the life of the loan unless you refinance.",
  },
  {
    question: "Can I use gift money for my FHA down payment?",
    answer:
      "Yes! FHA allows 100% of your down payment and closing costs to come from gift funds. Acceptable donors include family members, employers, labor unions, close friends with documented relationship, and government down payment assistance programs. The donor must provide a gift letter stating no repayment is expected.",
  },
  {
    question: "FHA vs Conventional: Which is better for California homebuyers?",
    answer:
      "FHA is better if you have lower credit (below 680), limited down payment funds, or higher debt ratios. Conventional is better if you have good credit (680+) because PMI can be cancelled at 20% equity. FHA mortgage insurance lasts the life of the loan. LendyWendy compares both options for your situation.",
  },
  {
    question: "What property types qualify for FHA loans in California?",
    answer:
      "FHA loans can be used for 1-4 unit properties as long as you live in one unit as your primary residence. This includes single-family homes, condos, townhouses, and multi-family properties. FHA-approved condos must meet specific requirements. Investment properties and vacation homes don't qualify for FHA financing.",
  },
  {
    question: "How long does it take to close an FHA loan in California?",
    answer:
      "FHA loans typically take 30-45 days to close, sometimes longer than conventional loans due to stricter appraisal requirements. FHA appraisers must verify the property meets minimum safety and habitability standards. With a prepared application and responsive borrowers, closings can happen in 30 days.",
  },
];

export default function FHALoansPage() {
  return (
    <>
      <StructuredData
        type="service"
        pageTitle="California FHA Loans | 3.5% Down, 580 Credit"
        pageDescription="FHA loans in California with just 3.5% down and 580 credit score. Government-backed mortgages with low closing costs for first-time homebuyers."
        pageUrl="/residential/fha"
        breadcrumbs={[
          { name: "Residential", url: "/residential" },
          { name: "FHA Loans", url: "/residential/fha" },
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
                <span className="text-amber-500">FHA Loans</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                Government-Backed Mortgage
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                California <span className="text-amber-500">FHA Loans</span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-300">
                  3.5% Down | 580 Credit Score
                </span>
              </h1>

              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                The easiest path to California homeownership. Low down payment, flexible credit
                requirements, and gift funds allowed for first-time buyers.
              </p>

              {/* Key Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <TrendingUp className="h-4 w-4 text-amber-500" />
                  <span>From 6.25% APR</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <DollarSign className="h-4 w-4 text-emerald-500" />
                  <span>3.5% Down</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <CreditCard className="h-4 w-4 text-amber-500" />
                  <span>580 Credit OK</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg px-8"
                  asChild
                >
                  <Link href="/get-quote">
                    Get FHA Rates <ArrowRight className="ml-2 h-5 w-5" />
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
                    FHA Calculator
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
                Why Choose an FHA Loan?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                FHA loans help California first-time buyers and those rebuilding credit achieve
                homeownership
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
                  FHA Loan Requirements
                </h2>
                <p className="text-gray-400">
                  What you need to qualify for an FHA mortgage in California
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

              <div className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">First-Time Buyer Bonus</h3>
                    <p className="text-gray-400 text-sm">
                      FHA considers you a first-time buyer if you haven't owned a home in the past 3
                      years. This opens up additional down payment assistance programs in California.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold"
                  asChild
                >
                  <Link href="/get-quote">
                    Check FHA Eligibility <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* California FHA Limits */}
        <section className="py-20 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  2024 California FHA Loan Limits
                </h2>
                <p className="text-gray-400">
                  Maximum FHA loan amounts by California county
                </p>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-4 bg-slate-800 text-sm font-semibold text-white">
                  <span>County</span>
                  <span>FHA Limit</span>
                  <span>Area Type</span>
                </div>
                {californiaFhaLimits.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 p-4 border-t border-slate-800 text-sm"
                  >
                    <span className="text-white">{item.county}</span>
                    <span className="text-amber-500 font-semibold">{item.limit}</span>
                    <span className="text-gray-400">{item.floor}</span>
                  </div>
                ))}
              </div>

              <p className="text-gray-500 text-sm text-center mt-4">
                FHA limits match conforming limits in most CA high-cost counties
              </p>
            </div>
          </div>
        </section>

        {/* MIP Breakdown */}
        <section className="py-20 border-t border-slate-800 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  FHA Mortgage Insurance (MIP) Explained
                </h2>
                <p className="text-gray-400">
                  Understanding the cost of FHA mortgage insurance
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-xl font-bold text-white mb-4">Upfront MIP</h3>
                  <div className="text-4xl font-bold text-amber-500 mb-2">1.75%</div>
                  <p className="text-gray-400 mb-4">of base loan amount</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      Can be financed into loan
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      One-time payment at closing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      $8,750 on $500K loan
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-xl font-bold text-white mb-4">Annual MIP</h3>
                  <div className="text-4xl font-bold text-amber-500 mb-2">0.55%</div>
                  <p className="text-gray-400 mb-4">of loan amount per year</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      Paid monthly with mortgage
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      ~$229/month on $500K loan
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      Required for life of loan
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Compare FHA to Other Loans
                </h2>
                <p className="text-gray-400">Find the right loan type for your situation</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/residential/conventional"
                  className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-500">
                    FHA vs Conventional
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Conventional offers lower PMI (cancellable at 20% equity) but requires 620+
                    credit. FHA is better for lower credit buyers.
                  </p>
                  <span className="text-amber-500 text-sm font-medium flex items-center gap-1">
                    Compare Conventional <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/residential/va"
                  className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-500">
                    FHA vs VA
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    If you're a veteran, VA loans offer $0 down and no monthly mortgage insurance.
                    VA beats FHA for eligible borrowers.
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
                    FHA vs Jumbo
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Need to borrow more than $1.14M? FHA has limits. Jumbo loans cover high-value
                    California properties.
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
        <section className="py-20 border-t border-slate-800 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white text-center mb-10">
                FHA Loan FAQs
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
              Ready for a California FHA Loan?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Get matched with FHA lenders who specialize in first-time buyers and lower credit
              scores. Pre-approval in 24 hours with no credit impact.
            </p>
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg px-10"
              asChild
            >
              <Link href="/get-quote">
                Get FHA Pre-Approved <ArrowRight className="ml-2 h-5 w-5" />
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
