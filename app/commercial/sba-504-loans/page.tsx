import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Shield,
  ChevronDown,
  Calculator,
  Clock,
  DollarSign,
  TrendingUp,
  Landmark,
  Lock,
  Target,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "California SBA 504 Loans | Below-Market Fixed Rates, 10% Down | LendyWendy",
  description:
    "SBA 504 loans for California commercial real estate. Below-market fixed rates, 10% down, up to $5.5M. Finance owner-occupied property and major equipment. Government-backed long-term financing. NMLS #1945913.",
  keywords: [
    "SBA 504 loan California",
    "SBA 504 program",
    "CDC loan California",
    "fixed rate commercial loan",
    "SBA 504 requirements",
    "SBA 504 vs 7a",
    "owner-occupied commercial loan",
    "SBA 504 down payment",
    "SBA 504 rates 2024",
    "California CDC lender",
    "SBA real estate loan",
    "below market commercial loan",
  ],
  openGraph: {
    title: "California SBA 504 Loans | Fixed Rates, 10% Down | LendyWendy",
    description:
      "SBA 504 loans for California businesses. Below-market fixed rates, 10% down, up to $5.5M for real estate and equipment.",
    type: "website",
    url: "https://lendywendy.com/commercial/sba-504-loans",
    images: [{ url: "https://lendywendy.com/api/og?title=California+SBA+504+Loans&subtitle=Fixed+Rates%2C+10%25+Down.+Owner-Occupied+Commercial.&badge=Lowest+Down+Payment", width: 1200, height: 630, alt: "California SBA 504 Loans" }],
  },
  alternates: {
    canonical: "https://lendywendy.com/commercial/sba-504-loans",
  },
};

const benefits = [
  {
    icon: Lock,
    title: "Fixed Rate Advantage",
    description:
      "Below-market fixed rate on the CDC portion (40% of project). Lock in today's rates for 10, 20, or 25 years.",
  },
  {
    icon: DollarSign,
    title: "Just 10% Down",
    description:
      "One of the lowest down payments for commercial real estate. Preserve capital for operations and growth.",
  },
  {
    icon: TrendingUp,
    title: "Below-Market Rates",
    description:
      "CDC debenture rates are tied to Treasury bonds, typically lower than conventional commercial rates.",
  },
  {
    icon: Clock,
    title: "Long-Term Stability",
    description:
      "Up to 25-year terms for real estate provide predictable payments and cash flow certainty.",
  },
];

const loanStructure = [
  {
    portion: "First Mortgage (Bank)",
    percentage: "50%",
    rate: "Negotiated with bank",
    description: "Conventional first position loan from an SBA-approved bank",
  },
  {
    portion: "CDC/SBA Loan",
    percentage: "40%",
    rate: "Below-market fixed",
    description: "Certified Development Company debenture backed by SBA",
  },
  {
    portion: "Borrower Equity",
    percentage: "10%",
    rate: "N/A",
    description: "Your down payment (may be higher for special-use properties)",
  },
];

const loanDetails = [
  { label: "Maximum CDC Portion", value: "$5,500,000" },
  { label: "Typical Project Size", value: "$500K - $15M+" },
  { label: "Down Payment", value: "10% - 20%" },
  { label: "Real Estate Term", value: "10, 20, or 25 years" },
  { label: "Equipment Term", value: "10 years" },
  { label: "CDC Rate Type", value: "Fixed (tied to Treasury)" },
  { label: "Prepayment Penalty", value: "Declining over 10 years" },
  { label: "Closing Time", value: "90-120 days" },
];

const eligibleProperties = [
  "Office buildings",
  "Retail and shopping centers",
  "Industrial and warehouse",
  "Manufacturing facilities",
  "Hotels and hospitality",
  "Self-storage facilities",
  "Mixed-use (51%+ occupied)",
  "Special-purpose (restaurants, etc.)",
];

const faqItems = [
  {
    question: "What is an SBA 504 loan?",
    answer:
      "The SBA 504 loan is a government-backed financing program specifically for owner-occupied commercial real estate and major equipment purchases. It features a unique three-party structure: a bank provides 50% as a first mortgage, a Certified Development Company (CDC) provides 40% as an SBA-backed debenture at below-market fixed rates, and the borrower contributes 10% down. This structure allows for lower down payments and better rates than conventional commercial loans.",
  },
  {
    question: "What are the advantages of SBA 504 vs SBA 7(a)?",
    answer:
      "SBA 504 advantages: lower down payment (10% vs 10-20%), below-market fixed rates on CDC portion, lower overall effective rate, and longer terms up to 25 years. SBA 7(a) advantages: more flexible use of funds (working capital, acquisitions), faster closing (60-90 vs 90-120 days), and simpler structure. Choose 504 for real estate when rate savings outweigh the longer timeline.",
  },
  {
    question: "What are current SBA 504 loan rates?",
    answer:
      "SBA 504 CDC debenture rates are set monthly based on Treasury bond rates. As of 2024, 20-year rates are approximately 5.5-6.5%, significantly below conventional commercial rates. The first mortgage (50%) from the bank will have a separately negotiated rate, typically similar to conventional commercial rates. The blended effective rate is usually lower than 100% conventional financing.",
  },
  {
    question: "What can I use an SBA 504 loan for?",
    answer:
      "SBA 504 loans are specifically for: purchasing land and existing buildings, constructing new facilities or renovating existing ones, purchasing heavy machinery and equipment with 10+ year useful life, and refinancing eligible debt. Unlike 7(a), 504 cannot be used for working capital, inventory, or business acquisition goodwill. The property must be at least 51% owner-occupied.",
  },
  {
    question: "What is the SBA 504 prepayment penalty?",
    answer:
      "The CDC portion of SBA 504 loans has a prepayment penalty that declines over the first 10 years, starting at approximately 3% and reducing to 0% by year 10. This is a trade-off for the below-market fixed rate. If you may sell or refinance within 10 years, factor this into your decision. The bank first mortgage may have separate prepayment terms.",
  },
  {
    question: "How long does SBA 504 closing take?",
    answer:
      "SBA 504 loans typically take 90-120 days to close, longer than SBA 7(a) or conventional commercial loans. The process involves three parties (bank, CDC, SBA) and two separate closings. The CDC/SBA portion may close 30-60 days after the bank portion. Plan for this timeline when making purchase offers and ensure sellers can accommodate.",
  },
  {
    question: "What are SBA 504 eligibility requirements?",
    answer:
      "Key requirements: for-profit US business, tangible net worth under $15 million, average net income under $5 million for past two years, 51%+ owner-occupancy of the property, and job creation or other public policy goals. The business must demonstrate ability to repay and owners with 20%+ stake must personally guarantee. Good credit history (typically 680+) is expected.",
  },
  {
    question: "Can I use SBA 504 for investment property?",
    answer:
      "No, SBA 504 requires at least 51% owner-occupancy for existing buildings or 60% for new construction. You cannot use 504 for pure investment property. If you need less than 51% of the space, you may still qualify if you can demonstrate you'll grow into the space within a reasonable timeframe. For investment property, consider DSCR loans or conventional commercial financing.",
  },
];

export default function SBA504LoansPage() {
  return (
    <>
      <StructuredData
        type="service"
        pageTitle="California SBA 504 Loans | Below-Market Fixed Rates"
        pageDescription="SBA 504 loans for California commercial real estate. Below-market fixed rates, 10% down, up to $5.5M for owner-occupied property."
        pageUrl="/commercial/sba-504-loans"
        breadcrumbs={[
          { name: "Commercial", url: "/commercial" },
          { name: "SBA 504 Loans", url: "/commercial/sba-504-loans" },
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
                <Link href="/commercial" className="hover:text-amber-500">
                  Commercial
                </Link>
                <span>/</span>
                <span className="text-amber-500">SBA 504 Loans</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Lock className="h-4 w-4" />
                Fixed Rate SBA Program
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                California <span className="text-amber-500">SBA 504 Loans</span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-300">
                  Below-Market Fixed Rates | 10% Down
                </span>
              </h1>

              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                The lowest-cost financing for California owner-occupied commercial real estate.
                Lock in below-market fixed rates for up to 25 years with just 10% down.
              </p>

              {/* Key Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <Lock className="h-4 w-4 text-emerald-500" />
                  <span>Fixed Rates</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <DollarSign className="h-4 w-4 text-amber-500" />
                  <span>10% Down</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span>Up to 25 Years</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg px-8"
                  asChild
                >
                  <Link href="/get-quote">
                    Get SBA 504 Rates <ArrowRight className="ml-2 h-5 w-5" />
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
                SBA 504 Advantages
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                The best financing option for owner-occupied commercial property
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

        {/* Loan Structure */}
        <section className="py-20 border-t border-slate-800 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  How SBA 504 Works
                </h2>
                <p className="text-gray-400">
                  Three-party structure for maximum benefit
                </p>
              </div>

              <div className="space-y-4">
                {loanStructure.map((item, index) => (
                  <div
                    key={index}
                    className="bg-slate-900 rounded-xl p-6 border border-slate-800"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl font-bold text-amber-500">{item.percentage}</span>
                          <h3 className="text-xl font-bold text-white">{item.portion}</h3>
                        </div>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                      <div className="bg-slate-800 px-4 py-2 rounded-lg">
                        <span className="text-gray-400 text-sm">Rate: </span>
                        <span className="text-white font-semibold">{item.rate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Eligible Properties */}
        <section className="py-20 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Eligible Property Types
                </h2>
                <p className="text-gray-400">
                  SBA 504 finances most commercial property types
                </p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {eligibleProperties.map((property, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-slate-900 rounded-xl p-4 border border-slate-800"
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-white text-sm">{property}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Loan Details */}
        <section className="py-20 border-t border-slate-800 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  SBA 504 Loan Terms
                </h2>
                <p className="text-gray-400">
                  Current program parameters
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {loanDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="bg-slate-900 rounded-xl p-5 border border-slate-800 flex justify-between items-center"
                  >
                    <span className="text-gray-400">{detail.label}</span>
                    <span className="text-white font-semibold">{detail.value}</span>
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
                    Get Your SBA 504 Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
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
                  Compare Commercial Loan Options
                </h2>
                <p className="text-gray-400">Find the right financing for your business</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/commercial/sba-7a-loans"
                  className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-500">
                    SBA 7(a) Loans
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    More flexible use of funds including working capital. Faster closing but
                    variable rates. Good for business acquisitions.
                  </p>
                  <span className="text-amber-500 text-sm font-medium flex items-center gap-1">
                    Compare 7(a) <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/commercial/conventional-cre"
                  className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-500">
                    Conventional CRE
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Fastest closing, fewest restrictions. Requires 25%+ down but no
                    owner-occupancy requirement.
                  </p>
                  <span className="text-amber-500 text-sm font-medium flex items-center gap-1">
                    Compare Conventional <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/commercial/construction-loans"
                  className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-500">
                    Construction Loans
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    For ground-up construction. SBA 504 can finance construction through CDC
                    interim loan program.
                  </p>
                  <span className="text-amber-500 text-sm font-medium flex items-center gap-1">
                    Learn More <ArrowRight className="h-4 w-4" />
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
                SBA 504 Loan FAQs
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
            <Landmark className="h-12 w-12 text-amber-500 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready for Below-Market Fixed Rates?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Get matched with SBA 504 lenders and Certified Development Companies who specialize
              in California commercial real estate. Lock in rates for 25 years.
            </p>
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg px-10"
              asChild
            >
              <Link href="/get-quote">
                Get SBA 504 Pre-Qualified <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              NMLS #1945913 | SBA & CDC Lender Network Partner
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
