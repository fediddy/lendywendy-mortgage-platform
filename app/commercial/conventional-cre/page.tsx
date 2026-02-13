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
  Zap,
  Target,
  Store,
  Warehouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "California Conventional Commercial Loans | Fast Close, All Property Types | LendyWendy",
  description:
    "Compare conventional commercial real estate loans for California investors. Finance office, retail, industrial, and multi-family. 30-45 day closing, competitive rates, no SBA restrictions.",
  keywords: [
    "commercial real estate loan California",
    "conventional commercial mortgage",
    "commercial property financing",
    "office building loan California",
    "retail property loan",
    "industrial property loan",
    "multi-family commercial loan",
    "commercial mortgage rates California",
    "investment property commercial loan",
    "CRE loan California",
    "commercial loan requirements",
    "commercial real estate financing",
  ],
  openGraph: {
    title: "California Commercial Real Estate Loans | LendyWendy",
    description:
      "Conventional commercial loans for California investors. Fast 30-45 day closing, all property types, competitive rates.",
    type: "website",
    url: "https://lendywendy.com/commercial/conventional-cre",
    images: [{ url: "https://lendywendy.com/api/og?title=California+Commercial+Real+Estate+Loans&subtitle=All+Property+Types.+Competitive+CRE+Financing.&badge=CRE+Specialists", width: 1200, height: 630, alt: "California Commercial Real Estate Loans" }],
  },
  alternates: {
    canonical: "https://lendywendy.com/commercial/conventional-cre",
  },
};

const benefits = [
  {
    icon: Zap,
    title: "Faster Closing",
    description:
      "Close in 30-45 days compared to 60-120 for SBA loans. Move quickly on time-sensitive opportunities.",
  },
  {
    icon: Target,
    title: "Fewer Restrictions",
    description:
      "No owner-occupancy requirements. Finance investment properties, NNN leases, and mixed-use buildings.",
  },
  {
    icon: Building2,
    title: "All Property Types",
    description:
      "Office, retail, industrial, multi-family, mixed-use, self-storage, and specialty properties.",
  },
  {
    icon: TrendingUp,
    title: "Flexible Terms",
    description:
      "Fixed and adjustable rate options, interest-only periods, and various amortization schedules.",
  },
];

const loanDetails = [
  { label: "Interest Rates", value: "7% - 9%" },
  { label: "Loan-to-Value (LTV)", value: "65% - 75%" },
  { label: "Down Payment", value: "25% - 35%" },
  { label: "Loan Terms", value: "5, 7, 10, 25-year options" },
  { label: "Amortization", value: "20-30 years" },
  { label: "Minimum Loan", value: "$250,000" },
  { label: "Maximum Loan", value: "$25M+" },
  { label: "Closing Time", value: "30-45 days" },
];

const propertyTypes = [
  {
    icon: Building2,
    type: "Office Buildings",
    ltv: "70-75%",
    description: "Class A, B, C office, medical office, flex space",
  },
  {
    icon: Store,
    type: "Retail Properties",
    ltv: "65-75%",
    description: "Strip centers, shopping centers, single-tenant NNN",
  },
  {
    icon: Warehouse,
    type: "Industrial & Warehouse",
    ltv: "70-75%",
    description: "Distribution, manufacturing, flex industrial",
  },
  {
    icon: Building2,
    type: "Multi-Family (5+ units)",
    ltv: "75%",
    description: "Apartment buildings, student housing, senior housing",
  },
];

const conventionalVsSba = [
  { factor: "Closing Time", conventional: "30-45 days", sba: "60-120 days" },
  { factor: "Down Payment", conventional: "25-35%", sba: "10-20%" },
  { factor: "Owner-Occupancy", conventional: "Not required", sba: "51%+ required" },
  { factor: "Prepayment Penalty", conventional: "Varies (often less)", sba: "10-year declining" },
  { factor: "Documentation", conventional: "Less extensive", sba: "More paperwork" },
  { factor: "Interest Rate", conventional: "Market rates", sba: "Often lower" },
];

const faqItems = [
  {
    question: "What is a conventional commercial real estate loan?",
    answer:
      "A conventional commercial loan is financing from banks, credit unions, or private lenders without government backing (like SBA). These loans offer more flexibility, faster closing, and work for investment properties that don't meet SBA owner-occupancy requirements. Trade-offs include higher down payments (25-35% vs 10%) and potentially higher rates than government-backed options.",
  },
  {
    question: "What are conventional commercial loan requirements?",
    answer:
      "Key requirements include: 25-35% down payment, minimum credit score of 680+ (700+ for best rates), debt service coverage ratio (DSCR) of 1.20-1.25+, global cash flow analysis for borrower, 6-12 months reserves, and property appraisal meeting loan standards. Requirements vary by property type and lender.",
  },
  {
    question: "What commercial property types can I finance?",
    answer:
      "Conventional commercial loans finance: office buildings, retail centers and single-tenant NNN, industrial and warehouse, multi-family (5+ units), self-storage facilities, mixed-use properties, hotels and hospitality, medical and professional offices, and special-purpose properties. Each property type may have different LTV limits and rate adjustments.",
  },
  {
    question: "What are current conventional commercial loan rates?",
    answer:
      "Conventional commercial rates in 2026 typically range from 7-9% (rates subject to change), depending on property type, loan term, borrower strength, and market conditions. Fixed rates for 5-10 year terms are common, with balloon payments or refinancing at maturity. Some lenders offer 25-year full amortization. Rates are generally higher than residential or SBA loans.",
  },
  {
    question: "Conventional vs SBA commercial loan: Which is better?",
    answer:
      "Choose conventional if: you need faster closing (30-45 vs 60-120 days), property is investment (non-owner-occupied), you have 25%+ down payment, you want fewer restrictions. Choose SBA if: you want lower down payment (10%), you'll occupy 51%+, you can wait longer to close, you qualify for below-market SBA 504 fixed rates.",
  },
  {
    question: "What is DSCR for commercial loans?",
    answer:
      "DSCR (Debt Service Coverage Ratio) measures if the property's income covers the loan payment. Calculate: Net Operating Income ÷ Annual Debt Service. Most conventional commercial lenders require 1.20-1.25+ DSCR, meaning the property generates 20-25% more income than the loan payment. Higher DSCR = better terms.",
  },
  {
    question: "Can I get a commercial loan for an investment property?",
    answer:
      "Yes! Unlike SBA loans, conventional commercial loans don't require owner-occupancy. You can finance pure investment properties including NNN leases, multi-family rentals, and commercial buildings with third-party tenants. For smaller investment properties (1-4 units), DSCR loans may offer better terms.",
  },
  {
    question: "How long does it take to close a conventional commercial loan?",
    answer:
      "Conventional commercial loans typically close in 30-45 days, significantly faster than SBA loans (60-120 days). Timeline depends on: appraisal timing (2-3 weeks for commercial), title and environmental work, borrower document responsiveness, and property complexity. Having documents ready can expedite closing.",
  },
];

export default function ConventionalCREPage() {
  return (
    <>
      <StructuredData
        type="service"
        pageTitle="California Conventional Commercial Loans"
        pageDescription="Conventional commercial real estate loans for California investors. Finance office, retail, industrial, and multi-family with fast 30-45 day closing."
        pageUrl="/commercial/conventional-cre"
        breadcrumbs={[
          { name: "Commercial", url: "/commercial" },
          { name: "Conventional CRE", url: "/commercial/conventional-cre" },
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
                <span className="text-teal-600">Conventional CRE</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-teal-600/10 border border-teal-600/30 text-teal-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Building2 className="h-4 w-4" />
                Commercial Real Estate
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Conventional <span className="text-teal-600">Commercial Loans</span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-600">
                  Fast Close | All Property Types | No SBA Rules
                </span>
              </h1>

              <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                Flexible financing for California commercial real estate investors. No owner-occupancy
                requirements, faster closing, and competitive rates for all property types.
              </p>

              {/* Key Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50/50 px-4 py-2 rounded-full border border-gray-200">
                  <TrendingUp className="h-4 w-4 text-teal-600" />
                  <span>From 7% APR</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50/50 px-4 py-2 rounded-full border border-gray-200">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  <span>30-45 Day Close</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50/50 px-4 py-2 rounded-full border border-gray-200">
                  <Building2 className="h-4 w-4 text-teal-600" />
                  <span>Up to 75% LTV</span>
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
                    CRE Calculator
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
                Why Choose Conventional Commercial
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Flexibility and speed for California CRE investors
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

        {/* Property Types */}
        <section className="py-20 border-t border-gray-200 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Property Types We Finance
                </h2>
                <p className="text-gray-500">
                  Comprehensive coverage for California commercial properties
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {propertyTypes.map((property, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-teal-600/10 rounded-lg">
                        <property.icon className="h-6 w-6 text-teal-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-gray-900 font-semibold">{property.type}</h3>
                          <span className="text-xs text-teal-600 bg-teal-600/10 px-2 py-0.5 rounded">
                            {property.ltv} LTV
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm">{property.description}</p>
                      </div>
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
                  Commercial Loan Terms
                </h2>
                <p className="text-gray-500">
                  Competitive terms for California CRE
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

        {/* Comparison Table */}
        <section className="py-20 border-t border-gray-200 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Conventional vs SBA Commercial Loans
                </h2>
                <p className="text-gray-500">
                  Side-by-side comparison to help you decide
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 text-sm font-semibold">
                  <span className="text-gray-900">Factor</span>
                  <span className="text-teal-600">Conventional</span>
                  <span className="text-blue-400">SBA</span>
                </div>
                {conventionalVsSba.map((row, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 p-4 border-t border-gray-200 text-sm"
                  >
                    <span className="text-gray-900">{row.factor}</span>
                    <span className="text-gray-600">{row.conventional}</span>
                    <span className="text-gray-600">{row.sba}</span>
                  </div>
                ))}
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
                <p className="text-gray-500">Find the right financing for your project</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/commercial/sba-7a-loans"
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                    SBA 7(a) Loans
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Lower down payment (10%), but requires 51% owner-occupancy. Longer closing
                    timeline.
                  </p>
                  <span className="text-teal-600 text-sm font-medium flex items-center gap-1">
                    Compare SBA 7(a) <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/commercial/sba-504-loans"
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                    SBA 504 Loans
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Best rates for owner-occupied CRE. Below-market fixed rates but longest
                    closing time.
                  </p>
                  <span className="text-teal-600 text-sm font-medium flex items-center gap-1">
                    Compare SBA 504 <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/commercial/construction-loans"
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                    Construction Loans
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    For ground-up development. Specialized financing for build-to-suit and
                    spec construction.
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
                Commercial Loan FAQs
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
            <Building2 className="h-12 w-12 text-teal-600 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Finance Your Commercial Property?
            </h2>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Get matched with conventional commercial lenders who specialize in California CRE.
              Fast closing, competitive rates, all property types.
            </p>
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-10"
              asChild
            >
              <Link href="/get-quote">
                Compare Lenders <ArrowRight className="ml-2 h-5 w-5" />
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
