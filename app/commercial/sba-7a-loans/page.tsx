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
  Briefcase,
  BadgeCheck,
  FileText,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "California SBA 7(a) Loans | Up to $5M, 10% Down | LendyWendy",
  description:
    "Compare SBA 7(a) loans for California small businesses. Up to $5 million for real estate, equipment, and working capital. 10% down, 10-25 year terms. Government-backed with competitive rates.",
  keywords: [
    "SBA 7(a) loan California",
    "SBA loan California",
    "small business loan California",
    "SBA real estate loan",
    "SBA 7a requirements",
    "SBA loan rates",
    "government small business loan",
    "SBA preferred lender California",
    "SBA loan down payment",
    "owner-occupied commercial loan",
    "SBA 7a vs 504",
    "SBA loan closing time",
  ],
  openGraph: {
    title: "California SBA 7(a) Loans | Up to $5M | LendyWendy",
    description:
      "SBA 7(a) loans for California businesses. Up to $5M for real estate, equipment, working capital. 10% down, government-backed rates.",
    type: "website",
    url: "https://lendywendy.com/commercial/sba-7a-loans",
    images: [{ url: "https://lendywendy.com/api/og?title=California+SBA+7(a)+Loans&subtitle=Up+to+%245M.+Flexible+Terms+for+Small+Businesses.&badge=SBA+Approved", width: 1200, height: 630, alt: "California SBA 7a Loans" }],
  },
  alternates: {
    canonical: "https://lendywendy.com/commercial/sba-7a-loans",
  },
};

const benefits = [
  {
    icon: DollarSign,
    title: "Low Down Payment",
    description:
      "As little as 10% down for owner-occupied commercial real estate. Keep more capital in your business.",
  },
  {
    icon: Clock,
    title: "Long Repayment Terms",
    description:
      "Up to 25 years for real estate, 10 years for equipment. Lower monthly payments improve cash flow.",
  },
  {
    icon: TrendingUp,
    title: "Competitive Rates",
    description:
      "Rates based on Prime + spread. Government guarantee allows lenders to offer better terms.",
  },
  {
    icon: Briefcase,
    title: "Flexible Use of Funds",
    description:
      "Finance real estate, equipment, working capital, business acquisition, or refinancing.",
  },
];

const loanDetails = [
  { label: "Maximum Loan Amount", value: "$5,000,000" },
  { label: "Interest Rate", value: "Prime + 2.25% - 2.75%" },
  { label: "Down Payment", value: "10% - 20%" },
  { label: "Real Estate Term", value: "Up to 25 years" },
  { label: "Equipment Term", value: "Up to 10 years" },
  { label: "Working Capital Term", value: "Up to 10 years" },
  { label: "SBA Guarantee Fee", value: "0% - 3.5%" },
  { label: "Closing Time", value: "60-90 days" },
];

const eligibleUses = [
  { use: "Owner-Occupied Real Estate", description: "Purchase or refinance commercial property where you occupy 51%+ space" },
  { use: "Business Acquisition", description: "Buy an existing business including goodwill and inventory" },
  { use: "Equipment Purchase", description: "Finance machinery, vehicles, and business equipment" },
  { use: "Working Capital", description: "Fund operations, inventory, payroll, or expansion" },
  { use: "Debt Refinancing", description: "Consolidate high-interest business debt into lower SBA terms" },
  { use: "Leasehold Improvements", description: "Finance buildout of leased commercial space" },
];

const requirements = [
  "Business must be for-profit and operate in the US",
  "Must meet SBA size standards (varies by industry)",
  "Owner(s) must have at least 20% equity in business",
  "Personal guarantee required from owners with 20%+ stake",
  "Good character (no recent bankruptcies or criminal history)",
  "Demonstrated ability to repay from business cash flow",
];

const faqItems = [
  {
    question: "What is an SBA 7(a) loan?",
    answer:
      "The SBA 7(a) loan is the most common SBA loan program, offering up to $5 million for various business purposes including real estate, equipment, working capital, and business acquisition. The SBA guarantees a portion of the loan (up to 85%), which reduces lender risk and allows for better terms like lower down payments and longer repayment periods. The loan is made by SBA-approved lenders (banks, credit unions) with SBA backing.",
  },
  {
    question: "What can I use an SBA 7(a) loan for?",
    answer:
      "SBA 7(a) loans are flexible and can be used for: purchasing owner-occupied commercial real estate, buying equipment and machinery, financing business acquisition, providing working capital, refinancing existing business debt, and funding leasehold improvements. The key requirement is that funds must be used for legitimate business purposes.",
  },
  {
    question: "What are the SBA 7(a) loan requirements?",
    answer:
      "Key requirements include: for-profit US business, meet SBA size standards for your industry, owners with 20%+ stake must personally guarantee, good credit history (typically 680+), demonstrated ability to repay, and sufficient collateral (though not always required). The business must have exhausted other financing options - SBA loans are meant to fill gaps in conventional lending.",
  },
  {
    question: "How much down payment is required for an SBA 7(a) loan?",
    answer:
      "SBA 7(a) loans for real estate typically require 10% down payment, sometimes 15-20% depending on the property type and borrower strength. For business acquisitions, 10-20% is common. Working capital loans may require no down payment but may need collateral. The lower down payment is a major advantage over conventional commercial loans which often require 25-30% down.",
  },
  {
    question: "What are SBA 7(a) loan interest rates?",
    answer:
      "SBA 7(a) loan rates are variable, based on the Prime Rate plus a spread. For loans over $50,000: Prime + 2.25% for maturities up to 7 years, Prime + 2.75% for maturities over 7 years. As of 2026, with Prime at 8.5% (rates subject to change), SBA 7(a) rates are approximately 10.75% - 11.25%. Some lenders offer fixed-rate options at slightly higher rates.",
  },
  {
    question: "How long does it take to close an SBA 7(a) loan?",
    answer:
      "SBA 7(a) loans typically take 60-90 days to close, longer than conventional commercial loans due to SBA documentation requirements and approval process. Using an SBA-approved lender in our network (PLP) can speed up the process as they can approve loans without individual SBA review. Complex deals or those requiring additional SBA review may take longer.",
  },
  {
    question: "SBA 7(a) vs SBA 504: Which is better?",
    answer:
      "SBA 7(a) is more flexible - it can be used for real estate, equipment, working capital, and acquisitions. SBA 504 is specifically for real estate and major equipment, offers lower down payment (10%) and below-market fixed rates on the CDC portion. Choose 7(a) for flexibility or working capital needs; choose 504 for the lowest cost real estate financing when you can wait longer to close.",
  },
  {
    question: "Can I use an SBA 7(a) loan for investment property?",
    answer:
      "No, SBA loans require owner-occupancy for real estate - you must occupy at least 51% of the property for existing buildings or 60% for new construction. The remaining space can be leased to tenants. For pure investment properties without owner-occupancy, consider DSCR loans, conventional commercial loans, or hard money financing.",
  },
];

export default function SBA7aLoansPage() {
  return (
    <>
      <StructuredData
        type="service"
        pageTitle="California SBA 7(a) Loans | Up to $5M"
        pageDescription="SBA 7(a) loans for California small businesses. Up to $5 million for real estate, equipment, and working capital. 10% down, government-backed rates."
        pageUrl="/commercial/sba-7a-loans"
        breadcrumbs={[
          { name: "Commercial", url: "/commercial" },
          { name: "SBA 7(a) Loans", url: "/commercial/sba-7a-loans" },
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
                <Link href="/commercial" className="hover:text-teal-600">
                  Commercial
                </Link>
                <span>/</span>
                <span className="text-teal-600">SBA 7(a) Loans</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                Government-Backed Financing
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                California <span className="text-teal-600">SBA 7(a) Loans</span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-600">
                  Up to $5M | 10% Down | 25-Year Terms
                </span>
              </h1>

              <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                The most flexible SBA loan program for California small businesses. Finance real
                estate, equipment, working capital, or acquisitions with government-backed terms.
              </p>

              {/* Key Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50/50 px-4 py-2 rounded-full border border-gray-200">
                  <TrendingUp className="h-4 w-4 text-teal-600" />
                  <span>Prime + 2.25%</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50/50 px-4 py-2 rounded-full border border-gray-200">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span>10% Down</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50/50 px-4 py-2 rounded-full border border-gray-200">
                  <Clock className="h-4 w-4 text-teal-600" />
                  <span>25-Year Terms</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-8"
                  asChild
                >
                  <Link href="/get-quote">
                    Compare Rates <ArrowRight className="ml-2 h-5 w-5" />
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
                    Payment Calculator
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
                SBA 7(a) Loan Advantages
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Government backing unlocks better terms for California businesses
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

        {/* Eligible Uses */}
        <section className="py-20 border-t border-gray-200 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  What Can SBA 7(a) Finance?
                </h2>
                <p className="text-gray-500">
                  Flexible funding for various business needs
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {eligibleUses.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-5 border border-gray-200"
                  >
                    <h3 className="text-gray-900 font-semibold mb-2">{item.use}</h3>
                    <p className="text-gray-500 text-sm">{item.description}</p>
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
                  SBA 7(a) Loan Terms
                </h2>
                <p className="text-gray-500">
                  Current rates and requirements
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

        {/* Requirements */}
        <section className="py-20 border-t border-gray-200 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  SBA 7(a) Eligibility Requirements
                </h2>
                <p className="text-gray-500">
                  What you need to qualify for SBA financing
                </p>
              </div>

              <div className="space-y-3">
                {requirements.map((req, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-900">{req}</span>
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
                    Get Matched <ArrowRight className="ml-2 h-5 w-5" />
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
                  Compare Commercial Loan Options
                </h2>
                <p className="text-gray-500">Find the right financing for your business</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/commercial/sba-504-loans"
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                    SBA 504 Loans
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Lower rates for real estate. Fixed rate on CDC portion. Best for large real
                    estate purchases when you can wait longer to close.
                  </p>
                  <span className="text-teal-600 text-sm font-medium flex items-center gap-1">
                    Compare 504 <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/commercial/conventional-cre"
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                    Conventional CRE
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Faster closing, fewer restrictions. Better if you have 25%+ down and don't
                    qualify for SBA or want quicker funding.
                  </p>
                  <span className="text-teal-600 text-sm font-medium flex items-center gap-1">
                    Compare Conventional <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/investment/dscr-loans"
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                    DSCR Loans (Investors)
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    For investment property without owner-occupancy. Qualify on rental income,
                    not business financials.
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
        <section className="py-20 border-t border-gray-200 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                SBA 7(a) Loan FAQs
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
              Ready for SBA 7(a) Financing?
            </h2>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Get matched with SBA-approved lenders in our network who specialize in California small business
              financing. Low down payments, long terms, competitive rates.
            </p>
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-10"
              asChild
            >
              <Link href="/get-quote">
                Compare SBA Lenders <ArrowRight className="ml-2 h-5 w-5" />
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
