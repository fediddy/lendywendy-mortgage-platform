import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  CheckCircle,
  Shield,
  ChevronDown,
  Calculator,
  Clock,
  DollarSign,
  TrendingUp,
  Building,
  FileStack,
  Wallet,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "California Portfolio Loans | Finance 5-100+ Properties Under One Loan | LendyWendy",
  description:
    "Portfolio loans for California real estate investors. Consolidate multiple properties under one loan. Finance 5-100+ rentals with simplified management. DSCR qualification, no property limits. Rates from 6.5%.",
  keywords: [
    "portfolio loan California",
    "blanket loan California",
    "multi-property loan",
    "rental portfolio financing",
    "consolidate investment properties",
    "blanket mortgage California",
    "cross-collateral loan",
    "bulk property financing",
    "investor portfolio loan",
    "commercial portfolio loan",
    "multiple property mortgage",
    "5+ property loan California",
  ],
  openGraph: {
    title: "California Portfolio Loans | Multiple Properties, One Loan | LendyWendy",
    description:
      "Portfolio loans for California investors. Finance 5-100+ properties under one loan. Simplify management and unlock portfolio equity.",
    type: "website",
    url: "https://lendywendy.com/investment/portfolio-loans",
    images: [{ url: "https://lendywendy.com/api/og?title=California+Portfolio+Loans&subtitle=Finance+5-100%2B+Properties+Under+One+Loan.&badge=Blanket+Financing", width: 1200, height: 630, alt: "California Portfolio Loans" }],
  },
  alternates: {
    canonical: "https://lendywendy.com/investment/portfolio-loans",
  },
};

const benefits = [
  {
    icon: FileStack,
    title: "One Loan, Multiple Properties",
    description:
      "Consolidate 5-100+ properties under a single loan. One payment, one lender relationship, streamlined management.",
  },
  {
    icon: Wallet,
    title: "Unlock Portfolio Equity",
    description:
      "Access equity across your entire portfolio. Cash-out refinance multiple properties simultaneously.",
  },
  {
    icon: Target,
    title: "Portfolio-Level DSCR",
    description:
      "Qualify based on aggregate portfolio cash flow. Stronger properties can offset weaker performers.",
  },
  {
    icon: TrendingUp,
    title: "Scale Without Limits",
    description:
      "No conventional loan caps. Finance unlimited properties based on portfolio performance and equity.",
  },
];

const loanDetails = [
  { label: "Interest Rates", value: "6.5% - 8%" },
  { label: "Minimum Properties", value: "5 properties" },
  { label: "Maximum Properties", value: "100+" },
  { label: "Loan-to-Value (LTV)", value: "Up to 75%" },
  { label: "Minimum DSCR", value: "1.0 - 1.25 (portfolio level)" },
  { label: "Loan Terms", value: "5, 7, 10, 30-year options" },
  { label: "Minimum Loan Amount", value: "$500,000" },
  { label: "Maximum Loan Amount", value: "$50M+" },
];

const portfolioTypes = [
  {
    title: "SFR Portfolio",
    description: "Single-family rental homes across California markets",
    minProperties: "5+",
    bestFor: "Buy-and-hold investors scaling SFR strategy",
  },
  {
    title: "Multi-Family Portfolio",
    description: "Small multi-family properties (2-4 units each)",
    minProperties: "3+",
    bestFor: "Investors with scattered-site multi-family",
  },
  {
    title: "Mixed Portfolio",
    description: "Combination of SFR and multi-family properties",
    minProperties: "5+",
    bestFor: "Diversified investors with varied holdings",
  },
  {
    title: "Commercial Portfolio",
    description: "Small commercial and mixed-use properties",
    minProperties: "3+",
    bestFor: "Commercial investors consolidating holdings",
  },
];

const useCases = [
  "Consolidate multiple individual DSCR loans into one",
  "Refinance a package of properties acquired individually",
  "Cash-out refinance to fund new acquisitions",
  "Simplify accounting with one loan payment",
  "Acquire a portfolio of properties from another investor",
  "Exit from multiple hard money or bridge loans",
];

const faqItems = [
  {
    question: "What is a portfolio loan for real estate investors?",
    answer:
      "A portfolio loan (also called blanket loan) allows you to finance multiple investment properties under a single mortgage. Instead of having 10 separate loans with 10 payments, you have one loan with one payment. Portfolio loans use cross-collateralization, meaning all properties secure the loan. They're ideal for investors with 5+ properties who want simplified management and potentially better terms through economies of scale.",
  },
  {
    question: "How many properties do I need for a portfolio loan?",
    answer:
      "Most portfolio lenders require a minimum of 5 properties, though some work with 3-4 property portfolios. There's typically no maximum - lenders will finance portfolios of 50, 100, or even 500+ properties. The key factors are total loan amount (usually $500K minimum), aggregate cash flow, and equity across the portfolio.",
  },
  {
    question: "How does DSCR work for portfolio loans?",
    answer:
      "Portfolio loans calculate DSCR at the portfolio level rather than property-by-property. This means a property with 0.85 DSCR can be offset by another property with 1.35 DSCR. As long as the aggregate DSCR meets minimum requirements (typically 1.0-1.25), the portfolio qualifies. This flexibility is a major advantage over individual property financing.",
  },
  {
    question: "What are the advantages of consolidating properties into one loan?",
    answer:
      "Key benefits include: (1) One monthly payment instead of multiple, (2) Potentially lower blended interest rate, (3) Simplified accounting and tax preparation, (4) Portfolio-level DSCR qualification, (5) Ability to cash-out equity across multiple properties, (6) Single lender relationship for easier communication, and (7) No individual property loan limits.",
  },
  {
    question: "Can I add or remove properties from a portfolio loan?",
    answer:
      "Some portfolio loan structures allow partial releases - selling one property and having it released from the loan (usually for a fee and with equity requirements). Adding properties typically requires a refinance or loan modification. Flexible structures exist for active investors who regularly buy and sell. Discuss your strategy with lenders to find the right structure.",
  },
  {
    question: "What is cross-collateralization in portfolio loans?",
    answer:
      "Cross-collateralization means all properties in the portfolio serve as collateral for the entire loan. If you default on the loan, the lender can foreclose on any or all properties - not just the one causing the default. This structure allows lenders to offer better terms because they have more security. The trade-off is less flexibility in selling individual properties.",
  },
  {
    question: "Portfolio loan vs individual DSCR loans: Which is better?",
    answer:
      "Portfolio loans are better if you: have 5+ properties, want simplified management, have properties with varying DSCR, or want to unlock equity across the portfolio. Individual DSCR loans are better if you: have fewer properties, want flexibility to sell without releasing, have all strong-performing properties, or are still building your portfolio. Many investors use individual DSCR loans while scaling, then consolidate into a portfolio loan.",
  },
  {
    question: "What types of properties can be included in a portfolio loan?",
    answer:
      "Most portfolio loans accept: single-family rentals (SFR), 2-4 unit multi-family, small apartment buildings (5-20 units), townhouses, and condos. Some lenders also accept commercial properties, mixed-use, and short-term rentals. Properties typically need to be stabilized (leased) and in rentable condition. Geographic diversity across California is usually acceptable.",
  },
];

export default function PortfolioLoansPage() {
  return (
    <>
      <StructuredData
        type="service"
        pageTitle="California Portfolio Loans | Multiple Properties, One Loan"
        pageDescription="Portfolio loans for California real estate investors. Consolidate multiple properties under one loan. Finance 5-100+ rentals with simplified management."
        pageUrl="/investment/portfolio-loans"
        breadcrumbs={[
          { name: "Investment", url: "/investment" },
          { name: "Portfolio Loans", url: "/investment/portfolio-loans" },
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
                <span className="text-teal-600">Portfolio Loans</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-teal-600/10 border border-teal-600/30 text-teal-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Layers className="h-4 w-4" />
                Scale Your Portfolio
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                California <span className="text-teal-600">Portfolio Loans</span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-600">
                  5-100+ Properties Under One Loan
                </span>
              </h1>

              <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                Simplify your rental portfolio with blanket financing. One loan, one payment,
                unlimited scaling potential for California real estate investors.
              </p>

              {/* Key Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <TrendingUp className="h-4 w-4 text-teal-600" />
                  <span>From 6.5% APR</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <Layers className="h-4 w-4 text-emerald-600" />
                  <span>5-100+ Properties</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <DollarSign className="h-4 w-4 text-teal-600" />
                  <span>Up to $50M</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-8"
                  asChild
                >
                  <Link href="/get-quote">
                    Compare Portfolio Rates <ArrowRight className="ml-2 h-5 w-5" />
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
                    Portfolio Calculator
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
                Why Consolidate Your Portfolio
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Simplify management and unlock new growth opportunities
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

        {/* Portfolio Types */}
        <section className="py-20 border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Portfolio Loan Types
                </h2>
                <p className="text-gray-500">
                  Financing solutions for different portfolio compositions
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {portfolioTypes.map((type, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                  >
                    <h3 className="text-xl font-bold text-teal-600 mb-2">{type.title}</h3>
                    <p className="text-gray-500 text-sm mb-3">{type.description}</p>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Min Properties</span>
                      <span className="text-gray-900">{type.minProperties}</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <span className="text-gray-500 text-xs">Best for: </span>
                      <span className="text-gray-600 text-xs">{type.bestFor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Common Portfolio Loan Uses
                </h2>
                <p className="text-gray-500">
                  How investors use portfolio financing
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {useCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-900">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Loan Details */}
        <section className="py-20 border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Portfolio Loan Terms
                </h2>
                <p className="text-gray-500">
                  Competitive terms for California portfolio investors
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
                    Compare Portfolio Rates <ArrowRight className="ml-2 h-5 w-5" />
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
                    Individual DSCR Loans
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Finance properties one at a time. More flexibility to sell, but multiple
                    payments and relationships to manage.
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
                    Short-term financing for acquisitions. Use bridge to acquire, then consolidate
                    into portfolio loan.
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
                    Fix & Flip Lines
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Revolving credit lines for high-volume flippers. Different use case than
                    portfolio loans for rentals.
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
                Portfolio Loan FAQs
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
            <Layers className="h-12 w-12 text-teal-600 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Consolidate Your Portfolio?
            </h2>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Connect with lenders who specialize in California portfolio financing.
              One loan, one payment, unlimited growth potential.
            </p>
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-10"
              asChild
            >
              <Link href="/get-quote">
                Compare Portfolio Rates <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              California Portfolio Lending Network | Equal Housing Opportunity
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
