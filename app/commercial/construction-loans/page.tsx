import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  HardHat,
  CheckCircle,
  Shield,
  ChevronDown,
  Calculator,
  Clock,
  DollarSign,
  TrendingUp,
  Building,
  Hammer,
  FileText,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "California Construction Loans | Ground-Up & Renovation Financing | LendyWendy",
  description:
    "Compare construction loans for California builders and developers. Ground-up construction, major renovations, and spec building financing. Interest-only during build, converts to permanent. Rates from 8%.",
  keywords: [
    "construction loan California",
    "commercial construction financing",
    "ground up construction loan",
    "spec home construction loan",
    "developer loan California",
    "construction to permanent loan",
    "build to suit financing",
    "construction loan rates California",
    "ADU construction loan",
    "multi-family construction loan",
    "real estate development financing",
    "construction draw loan",
  ],
  openGraph: {
    title: "California Construction Loans | Ground-Up Financing | LendyWendy",
    description:
      "Construction financing for California builders. Ground-up, renovation, spec building. Interest-only during construction, converts to permanent.",
    type: "website",
    url: "https://lendywendy.com/commercial/construction-loans",
    images: [{ url: "https://lendywendy.com/api/og?title=California+Construction+Loans&subtitle=Ground-Up+Financing.+Construction-to-Permanent+Options.&badge=New+Construction", width: 1200, height: 630, alt: "California Construction Loans" }],
  },
  alternates: {
    canonical: "https://lendywendy.com/commercial/construction-loans",
  },
};

const benefits = [
  {
    icon: DollarSign,
    title: "Interest-Only During Build",
    description:
      "Pay interest only on drawn funds during construction. Lower carrying costs until the project is complete.",
  },
  {
    icon: RefreshCw,
    title: "Converts to Permanent",
    description:
      "Many programs convert to permanent financing upon completion. One closing, one set of fees.",
  },
  {
    icon: FileText,
    title: "Draw Schedule",
    description:
      "Funds released in draws as construction progresses. Inspections verify work completion before each disbursement.",
  },
  {
    icon: Clock,
    title: "Flexible Terms",
    description:
      "12-24 month construction periods with extension options. Match loan term to your project timeline.",
  },
];

const loanDetails = [
  { label: "Interest Rates", value: "8% - 12%" },
  { label: "Loan-to-Cost (LTC)", value: "Up to 80%" },
  { label: "Loan-to-Value (LTV)", value: "Up to 70% of completed value" },
  { label: "Construction Term", value: "12-24 months" },
  { label: "Down Payment/Equity", value: "20% - 30%" },
  { label: "Interest Reserve", value: "Often included" },
  { label: "Draw Schedule", value: "Monthly or milestone-based" },
  { label: "Minimum Experience", value: "Varies (0-3+ projects)" },
];

const projectTypes = [
  {
    type: "Ground-Up Construction",
    description: "New commercial buildings, multi-family, and residential subdivisions",
    ltc: "Up to 75-80%",
  },
  {
    type: "Spec Home Building",
    description: "Single-family homes built for resale without a buyer contract",
    ltc: "Up to 80%",
  },
  {
    type: "Build-to-Suit",
    description: "Custom construction with a tenant/buyer committed",
    ltc: "Up to 85%",
  },
  {
    type: "Major Renovation",
    description: "Gut rehabs and major repositioning of existing buildings",
    ltc: "Up to 80%",
  },
  {
    type: "ADU Construction",
    description: "Accessory Dwelling Units on existing residential properties",
    ltc: "Up to 85%",
  },
  {
    type: "Multi-Family Development",
    description: "Apartment buildings and townhome communities",
    ltc: "Up to 75%",
  },
];

const constructionProcess = [
  { step: "1", title: "Pre-Approval", description: "Submit plans, permits, and cost breakdown for preliminary approval" },
  { step: "2", title: "Appraisal & Underwriting", description: "Complete appraisal of 'as-built' value, full underwriting review" },
  { step: "3", title: "Closing & Initial Draw", description: "Close loan, fund initial draw for land payoff and mobilization" },
  { step: "4", title: "Construction Phase", description: "Build project, request draws as work is completed and inspected" },
  { step: "5", title: "Completion & Conversion", description: "Obtain certificate of occupancy, convert to permanent loan or sell" },
];

const faqItems = [
  {
    question: "What is a construction loan?",
    answer:
      "A construction loan is short-term financing for building new structures or major renovations. Unlike traditional mortgages, funds are disbursed in draws as construction progresses rather than all at once. You pay interest only on drawn funds during construction. Most construction loans are 12-24 months and either convert to permanent financing upon completion or require refinancing/sale.",
  },
  {
    question: "How does the construction draw process work?",
    answer:
      "As you complete construction phases, you submit a draw request to the lender. The lender sends an inspector to verify work completion matches the request. Once approved (usually 3-7 days), funds are released to pay contractors and suppliers. Typical draw schedules include: land/mobilization (10-15%), foundation (15%), framing (20%), MEP rough-in (15%), drywall (10%), finishes (15%), completion (5-10%).",
  },
  {
    question: "What do I need to qualify for a construction loan?",
    answer:
      "Key requirements include: detailed plans and permits, contractor bids and construction budget, 20-30% equity (land equity often counts), minimum credit score of 680+, construction experience (varies by lender), and demonstrated ability to complete the project. Lenders evaluate both your qualifications and the project viability.",
  },
  {
    question: "Can I get a construction loan as a first-time builder?",
    answer:
      "Yes, some lenders work with first-time builders, though terms may be more conservative. You'll strengthen your application with: a licensed, experienced contractor, detailed and realistic budget, strong personal credit and financials, larger down payment, and a clear exit strategy. Some lenders require 1-3 completed projects for certain loan types.",
  },
  {
    question: "What is loan-to-cost (LTC) vs loan-to-value (LTV) for construction?",
    answer:
      "Loan-to-Cost (LTC) compares the loan to total project cost (land + hard costs + soft costs). Loan-to-Value (LTV) compares the loan to the appraised value upon completion. Construction loans are typically underwritten to the lesser of: 75-80% LTC or 65-70% of completed LTV. Example: $1M project cost, $1.2M completed value = max loan around $750K-800K.",
  },
  {
    question: "What is construction-to-permanent financing?",
    answer:
      "Construction-to-permanent (C2P) loans combine construction and permanent financing in one loan with one closing. During construction, you pay interest only on drawn funds. Upon completion, the loan automatically converts to a traditional mortgage (fixed or adjustable). C2P saves closing costs compared to separate construction and permanent loans.",
  },
  {
    question: "What is an interest reserve in construction loans?",
    answer:
      "An interest reserve is a portion of the loan set aside to make interest payments during construction. Instead of paying monthly interest out-of-pocket, payments come from the reserve. This is especially helpful for spec projects with no income during construction. The reserve is typically 12-18 months of projected interest, built into the total loan amount.",
  },
  {
    question: "How long do construction loans take to close?",
    answer:
      "Construction loans typically take 30-60 days to close, depending on complexity. Timeline factors include: appraisal (2-3 weeks for construction appraisals), permit verification, contractor documentation review, and title/survey work. Having complete documentation (plans, permits, bids, contractor info) ready can significantly speed up the process.",
  },
];

export default function ConstructionLoansPage() {
  return (
    <>
      <StructuredData
        type="service"
        pageTitle="California Construction Loans | Ground-Up Financing"
        pageDescription="Construction loans for California builders and developers. Ground-up construction, major renovations, and spec building financing."
        pageUrl="/commercial/construction-loans"
        breadcrumbs={[
          { name: "Commercial", url: "/commercial" },
          { name: "Construction Loans", url: "/commercial/construction-loans" },
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
                <span className="text-teal-600">Construction Loans</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-teal-600/10 border border-teal-600/30 text-teal-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <HardHat className="h-4 w-4" />
                Development Financing
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                California <span className="text-teal-600">Construction Loans</span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-600">
                  Build Your Vision From Ground Up
                </span>
              </h1>

              <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                Financing for California builders and developers. Ground-up construction, major
                renovations, ADUs, and spec building with interest-only during construction.
              </p>

              {/* Key Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50/50 px-4 py-2 rounded-full border border-gray-200">
                  <TrendingUp className="h-4 w-4 text-teal-600" />
                  <span>From 8% APR</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50/50 px-4 py-2 rounded-full border border-gray-200">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span>Up to 80% LTC</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50/50 px-4 py-2 rounded-full border border-gray-200">
                  <Clock className="h-4 w-4 text-teal-600" />
                  <span>12-24 Month Terms</span>
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
                    Cost Calculator
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
                Construction Loan Benefits
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Purpose-built financing for California development projects
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

        {/* Project Types */}
        <section className="py-20 border-t border-gray-200 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Projects We Finance
                </h2>
                <p className="text-gray-500">
                  Construction financing for various California projects
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectTypes.map((project, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-5 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-900 font-semibold">{project.type}</h3>
                      <span className="text-xs text-teal-600 bg-teal-600/10 px-2 py-0.5 rounded">
                        {project.ltc}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Construction Process */}
        <section className="py-20 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  The Construction Loan Process
                </h2>
                <p className="text-gray-500">
                  From approval to completion
                </p>
              </div>

              <div className="space-y-4">
                {constructionProcess.map((item, index) => (
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

        {/* Loan Details */}
        <section className="py-20 border-t border-gray-200 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Construction Loan Terms
                </h2>
                <p className="text-gray-500">
                  Competitive terms for California builders
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
                    Compare Rates <ArrowRight className="ml-2 h-5 w-5" />
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
                  Related Financing Options
                </h2>
                <p className="text-gray-500">Other products for your project needs</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/investment/fix-and-flip"
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                    Fix & Flip Loans
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    For residential renovations. Faster closing, simpler process for rehab
                    projects vs new construction.
                  </p>
                  <span className="text-teal-600 text-sm font-medium flex items-center gap-1">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/commercial/sba-504-loans"
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                    SBA 504 Construction
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    SBA 504 can finance owner-occupied construction through CDC interim loan
                    programs.
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
                    For land acquisition before construction or to bridge between construction
                    completion and permanent financing.
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
                Construction Loan FAQs
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
            <HardHat className="h-12 w-12 text-teal-600 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Build in California?
            </h2>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Get matched with construction lenders who specialize in California development.
              Ground-up, renovation, ADU - we have the financing for your project.
            </p>
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-10"
              asChild
            >
              <Link href="/get-quote">
                Get Construction Financing <ArrowRight className="ml-2 h-5 w-5" />
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
