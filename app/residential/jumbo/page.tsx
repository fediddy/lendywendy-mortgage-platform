import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building,
  CheckCircle,
  Shield,
  ChevronDown,
  Calculator,
  Clock,
  DollarSign,
  TrendingUp,
  Gem,
  Crown,
  Home,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "California Jumbo Loans | High-Value Home Financing Above $766K | LendyWendy",
  description:
    "Jumbo mortgages for California luxury homes above conforming limits. Finance properties up to $5M+ with competitive rates. 10-20% down, 700+ credit. Los Angeles, San Francisco, Orange County, San Diego specialists. NMLS #1945913.",
  keywords: [
    "jumbo loan California",
    "jumbo mortgage California",
    "high balance loan California",
    "luxury home loan California",
    "jumbo loan rates California",
    "jumbo loan requirements",
    "million dollar mortgage California",
    "non-conforming loan California",
    "Los Angeles jumbo loan",
    "San Francisco jumbo mortgage",
    "Orange County jumbo loan",
    "super jumbo loan California",
  ],
  openGraph: {
    title: "California Jumbo Loans | Luxury Home Financing | LendyWendy",
    description:
      "Jumbo mortgages for California high-value properties. Competitive rates for homes above conforming limits. Expert luxury home financing.",
    type: "website",
    url: "https://lendywendy.com/residential/jumbo",
    images: [{ url: "https://lendywendy.com/api/og?title=California+Jumbo+Loans&subtitle=Financing+Above+%24766K.+Luxury+Property+Specialists.&badge=High+Balance", width: 1200, height: 630, alt: "California Jumbo Loans" }],
  },
  alternates: {
    canonical: "https://lendywendy.com/residential/jumbo",
  },
};

const benefits = [
  {
    icon: Crown,
    title: "Higher Loan Amounts",
    description:
      "Finance California luxury properties from $766,550 up to $5M+. No Fannie Mae/Freddie Mac limits apply.",
  },
  {
    icon: TrendingUp,
    title: "Competitive Rates",
    description:
      "Jumbo rates are now comparable to conforming loans. Strong borrowers often see rates within 0.25% of conventional.",
  },
  {
    icon: Gem,
    title: "Flexible Structures",
    description:
      "Interest-only options, ARMs, and fixed-rate products. Customize your loan to match your financial strategy.",
  },
  {
    icon: Home,
    title: "All Property Types",
    description:
      "Single-family, condos, co-ops, investment properties, and second homes. Finance your California dream property.",
  },
];

const requirements = [
  { label: "Minimum Credit Score", value: "700 (720+ for best rates)" },
  { label: "Down Payment", value: "10% - 20% (varies by loan size)" },
  { label: "Debt-to-Income Ratio", value: "Up to 43%" },
  { label: "Cash Reserves", value: "6-12 months PITI" },
  { label: "Loan Amounts", value: "$766,551 - $5M+" },
  { label: "Property Types", value: "Primary, Second Home, Investment" },
];

const loanTiers = [
  {
    name: "Jumbo",
    range: "$766,551 - $1.5M",
    downPayment: "10-15%",
    creditScore: "700+",
    description: "Standard jumbo for most California luxury markets",
  },
  {
    name: "High-Balance Jumbo",
    range: "$1.5M - $3M",
    downPayment: "15-20%",
    creditScore: "720+",
    description: "Premium properties in LA, SF, and coastal areas",
  },
  {
    name: "Super Jumbo",
    range: "$3M - $5M+",
    downPayment: "20-25%",
    creditScore: "740+",
    description: "Ultra-luxury estates and investment properties",
  },
];

const californiaMarkets = [
  { market: "Los Angeles", avgPrice: "$1.2M", jumboDemand: "Very High" },
  { market: "San Francisco", avgPrice: "$1.4M", jumboDemand: "Very High" },
  { market: "Orange County", avgPrice: "$1.1M", jumboDemand: "Very High" },
  { market: "San Diego", avgPrice: "$950K", jumboDemand: "High" },
  { market: "Silicon Valley", avgPrice: "$1.8M", jumboDemand: "Extreme" },
  { market: "Marin County", avgPrice: "$1.5M", jumboDemand: "Very High" },
];

const faqItems = [
  {
    question: "What is a jumbo loan in California?",
    answer:
      "A jumbo loan is a mortgage that exceeds conforming loan limits set by Fannie Mae and Freddie Mac. In most California counties, the 2024 conforming limit is $766,550 (up to $1,149,825 in high-cost areas like LA and SF). Any loan above these limits is considered jumbo and isn't backed by government-sponsored enterprises, which historically meant higher rates and stricter requirements.",
  },
  {
    question: "What credit score do I need for a California jumbo loan?",
    answer:
      "Most jumbo lenders require a minimum 700 credit score, with 720+ needed for the best rates. For super jumbo loans ($3M+), lenders typically want 740+. Strong credit is more important for jumbo loans because there's no government backing - lenders take on more risk and want qualified borrowers.",
  },
  {
    question: "How much down payment do I need for a jumbo mortgage?",
    answer:
      "Jumbo down payments typically range from 10-25% depending on loan size and borrower strength. For loans under $1.5M, 10-15% down is common with excellent credit. Loans $1.5M-$3M usually require 15-20% down. Super jumbo loans ($3M+) often require 20-25% down. Some lenders offer 10% down up to $2M for strong borrowers.",
  },
  {
    question: "Are jumbo loan rates higher than conforming rates?",
    answer:
      "Historically yes, but the gap has narrowed significantly. In today's market, jumbo rates are often within 0.25% of conforming rates, and some lenders offer jumbo rates that match or beat conforming. Strong borrowers with excellent credit, substantial assets, and 20%+ down often get very competitive jumbo rates.",
  },
  {
    question: "What cash reserves do I need for a jumbo loan?",
    answer:
      "Jumbo lenders typically require 6-12 months of cash reserves (principal, interest, taxes, insurance payments) in liquid assets after closing. For larger loans ($2M+), expect to show 12-18 months reserves. Reserves can include checking/savings accounts, investment accounts, and retirement funds (often counted at 60-70%).",
  },
  {
    question: "Can I get a jumbo loan for an investment property in California?",
    answer:
      "Yes, jumbo loans are available for investment properties, though requirements are stricter: typically 25-30% down, 720+ credit score, and lower maximum DTI ratios. For investors seeking more flexibility, DSCR loans may be a better option as they qualify based on rental income rather than personal income.",
  },
  {
    question: "What's the difference between jumbo and super jumbo loans?",
    answer:
      "Jumbo loans typically cover amounts from conforming limits up to $1.5-2M. Super jumbo loans are for amounts above $2-3M, sometimes reaching $10M or more. Super jumbo loans have stricter requirements: higher credit scores (740+), larger down payments (20-30%), and more cash reserves. They're often portfolio loans kept by the originating bank.",
  },
  {
    question: "How long does it take to close a jumbo loan?",
    answer:
      "Jumbo loans typically take 30-45 days to close, sometimes longer due to more extensive underwriting, larger appraisals, and asset verification. Complex borrower profiles (self-employed, multiple properties) may extend timelines. Having documents ready and responsive communication can help expedite the process.",
  },
];

export default function JumboLoansPage() {
  return (
    <>
      <StructuredData
        type="service"
        pageTitle="California Jumbo Loans | High-Value Home Financing"
        pageDescription="Jumbo mortgages for California luxury homes above conforming limits. Finance properties up to $5M+ with competitive rates."
        pageUrl="/residential/jumbo"
        breadcrumbs={[
          { name: "Residential", url: "/residential" },
          { name: "Jumbo Loans", url: "/residential/jumbo" },
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
                <span className="text-amber-500">Jumbo Loans</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Crown className="h-4 w-4" />
                Luxury Home Financing
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                California <span className="text-amber-500">Jumbo Loans</span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-300">
                  Finance Your Dream Home Above $766K
                </span>
              </h1>

              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Competitive financing for California luxury properties. From coastal estates to
                Silicon Valley homes, get the capital you need for high-value real estate.
              </p>

              {/* Key Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <TrendingUp className="h-4 w-4 text-amber-500" />
                  <span>From 6.75% APR</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <DollarSign className="h-4 w-4 text-emerald-500" />
                  <span>Up to $5M+</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span>10% Down Available</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg px-8"
                  asChild
                >
                  <Link href="/get-quote">
                    Get Jumbo Rates <ArrowRight className="ml-2 h-5 w-5" />
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
                Why Choose a Jumbo Loan?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Access the capital you need for California's competitive luxury real estate market
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

        {/* Loan Tiers Section */}
        <section className="py-20 border-t border-slate-800 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Jumbo Loan Tiers
                </h2>
                <p className="text-gray-400">
                  Different loan sizes have different requirements
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {loanTiers.map((tier, index) => (
                  <div
                    key={index}
                    className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-colors"
                  >
                    <h3 className="text-xl font-bold text-amber-500 mb-2">{tier.name}</h3>
                    <div className="text-2xl font-bold text-white mb-4">{tier.range}</div>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Down Payment</span>
                        <span className="text-white">{tier.downPayment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Credit Score</span>
                        <span className="text-white">{tier.creditScore}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">{tier.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-20 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Jumbo Loan Requirements
                </h2>
                <p className="text-gray-400">
                  What you need to qualify for a jumbo mortgage in California
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

        {/* California Markets */}
        <section className="py-20 border-t border-slate-800 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  California Jumbo Loan Markets
                </h2>
                <p className="text-gray-400">
                  Where jumbo loans are most common in California
                </p>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-4 bg-slate-800 text-sm font-semibold text-white">
                  <span>Market</span>
                  <span>Median Price</span>
                  <span>Jumbo Demand</span>
                </div>
                {californiaMarkets.map((item, index) => (
                  <Link
                    href={`/california/${item.market.toLowerCase().replace(' ', '-')}`}
                    key={index}
                    className="grid grid-cols-3 gap-4 p-4 border-t border-slate-800 text-sm hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="text-white flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-amber-500" />
                      {item.market}
                    </span>
                    <span className="text-amber-500 font-semibold">{item.avgPrice}</span>
                    <span className="text-gray-400">{item.jumboDemand}</span>
                  </Link>
                ))}
              </div>

              <p className="text-gray-500 text-sm text-center mt-4">
                Click a market to see local investment opportunities
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Jumbo vs. Other Options
                </h2>
                <p className="text-gray-400">Compare jumbo loans to alternatives</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/residential/conventional"
                  className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-500">
                    Jumbo vs Conventional
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Conventional tops out at $766,550 (or $1.14M in high-cost areas). Need more?
                    Jumbo is your path.
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
                    VA Jumbo Option
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Veterans with full entitlement have NO loan limit. Buy a $2M home with $0 down
                    using VA benefits.
                  </p>
                  <span className="text-amber-500 text-sm font-medium flex items-center gap-1">
                    Learn About VA <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/investment/dscr-loans"
                  className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-500">
                    For Investors: DSCR
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Buying a luxury rental? DSCR loans qualify on property income, not personal
                    income. No tax returns.
                  </p>
                  <span className="text-amber-500 text-sm font-medium flex items-center gap-1">
                    Explore DSCR <ArrowRight className="h-4 w-4" />
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
                Jumbo Loan FAQs
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
            <Crown className="h-12 w-12 text-amber-500 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Finance Your California Luxury Home?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Get matched with jumbo lenders who specialize in high-value California properties.
              Compare rates from multiple lenders with no credit impact.
            </p>
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg px-10"
              asChild
            >
              <Link href="/get-quote">
                Get Jumbo Pre-Approved <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              NMLS #1945913 | Luxury Property Specialists
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
