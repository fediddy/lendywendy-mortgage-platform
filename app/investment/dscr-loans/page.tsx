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
  FileX,
  Building,
  Layers,
  BarChart3,
  Target,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "California DSCR Loans | No Tax Returns, Qualify on Rental Income | LendyWendy",
  description:
    "DSCR loans for California real estate investors. Qualify based on property cash flow, not personal income. No tax returns, W-2s, or employment verification. Lenders close in 14-21 days. Rates from 6.25%.",
  keywords: [
    "DSCR loan California",
    "DSCR mortgage California",
    "no income verification loan California",
    "no tax return mortgage",
    "rental property loan California",
    "investment property DSCR",
    "debt service coverage ratio loan",
    "investor loan no W2",
    "cash flow based mortgage",
    "California rental property financing",
    "DSCR loan requirements",
    "DSCR loan rates California",
  ],
  openGraph: {
    title: "California DSCR Loans | No Tax Returns | LendyWendy",
    description:
      "DSCR loans for California investors. Qualify on rental income, not personal income. No tax returns required. Close in 14-21 days.",
    type: "website",
    url: "https://lendywendy.com/investment/dscr-loans",
    images: [{ url: "https://lendywendy.com/api/og?title=California+DSCR+Loans&subtitle=Qualify+on+Rental+Income%2C+Not+Yours.+No+Tax+Returns+Required.&badge=%231+Investor+Loan+Product", width: 1200, height: 630, alt: "California DSCR Loans" }],
  },
  alternates: {
    canonical: "https://lendywendy.com/investment/dscr-loans",
  },
};

const benefits = [
  {
    icon: FileX,
    title: "No Tax Returns",
    description:
      "Qualify without personal income documentation. No W-2s, tax returns, or employment verification needed.",
  },
  {
    icon: BarChart3,
    title: "Cash Flow Qualification",
    description:
      "Approval based on the property's rental income covering the mortgage. 1.0+ DSCR typically required.",
  },
  {
    icon: Clock,
    title: "Fast Closing",
    description:
      "Lenders in our network close in 14-21 days with streamlined underwriting. Perfect for competitive California markets.",
  },
  {
    icon: Layers,
    title: "Unlimited Properties",
    description:
      "No limit on how many DSCR loans you can have. Scale your portfolio without conventional loan caps.",
  },
];

const loanDetails = [
  { label: "Interest Rates", value: "6.25% - 7.75%" },
  { label: "Minimum DSCR", value: "0.75 - 1.0 (varies by lender)" },
  { label: "Loan-to-Value (LTV)", value: "Up to 80%" },
  { label: "Minimum Credit Score", value: "660 (700+ for best rates)" },
  { label: "Loan Amounts", value: "$100K - $5M+" },
  { label: "Property Types", value: "1-4 units, condos, townhomes" },
  { label: "Loan Terms", value: "30-year fixed, 5/1, 7/1 ARM" },
  { label: "Prepay Penalty", value: "0-5 years (options available)" },
];

const dscrExamples = [
  {
    scenario: "Strong Cash Flow",
    rent: "$4,500/mo",
    payment: "$3,500/mo",
    dscr: "1.29",
    status: "Excellent",
  },
  {
    scenario: "Minimum Qualifying",
    rent: "$3,600/mo",
    payment: "$3,500/mo",
    dscr: "1.03",
    status: "Approved",
  },
  {
    scenario: "Below Threshold",
    rent: "$3,200/mo",
    payment: "$3,500/mo",
    dscr: "0.91",
    status: "May Need 0.75 Program",
  },
];

const perfectFor = [
  "Self-employed investors who write off income",
  "W-2 employees with complex tax situations",
  "Foreign nationals investing in California",
  "Investors with 5+ financed properties",
  "Real estate professionals seeking portfolio growth",
  "1031 exchange buyers needing quick closings",
];

const faqItems = [
  {
    question: "What is a DSCR loan and how does it work?",
    answer:
      "A DSCR (Debt Service Coverage Ratio) loan qualifies borrowers based on the property's rental income rather than personal income. The DSCR is calculated by dividing the property's gross rental income by the total mortgage payment (principal, interest, taxes, insurance, HOA). A DSCR of 1.0 means the rent exactly covers the payment. Most lenders require 1.0+, though some offer 0.75 DSCR programs for properties in high-appreciation markets.",
  },
  {
    question: "What documents do I need for a DSCR loan?",
    answer:
      "DSCR loans require minimal documentation: property appraisal with rent schedule, 2 months bank statements (for reserves verification), credit report, entity documents (if using LLC), and property insurance quotes. You do NOT need tax returns, W-2s, pay stubs, or employment verification. This makes DSCR loans ideal for self-employed investors and those with complex tax situations.",
  },
  {
    question: "What credit score do I need for a DSCR loan in California?",
    answer:
      "Most DSCR lenders require a minimum 660 credit score, with 700+ needed for the best rates and terms. Borrowers with 740+ scores often qualify for rate reductions of 0.25-0.5%. Some portfolio lenders offer DSCR loans down to 620 with higher down payments and rates.",
  },
  {
    question: "How is DSCR calculated?",
    answer:
      "DSCR = Monthly Rental Income ÷ Monthly Mortgage Payment (PITIA). For example, if a property rents for $4,000/month and the total payment (principal, interest, taxes, insurance, association dues) is $3,500/month, the DSCR is $4,000 ÷ $3,500 = 1.14. Lenders typically use the lesser of actual rent, market rent from appraisal, or lease rent.",
  },
  {
    question: "Can I get a DSCR loan with no money down?",
    answer:
      "DSCR loans typically require 20-25% down payment. Some lenders offer 15% down programs for borrowers with 740+ credit and 1.25+ DSCR. Unlike conventional or FHA loans, there are no 3.5% or 5% down DSCR options because these are non-QM investment property loans with higher risk profiles.",
  },
  {
    question: "How fast can a DSCR loan close?",
    answer:
      "DSCR loans typically close in 14-21 days, significantly faster than conventional loans (30-45 days). The streamlined process skips income verification, employment calls, and tax return analysis. Some lenders offer rush closings in 10 days for time-sensitive deals with an additional fee.",
  },
  {
    question: "Can I use a DSCR loan for short-term rentals (Airbnb)?",
    answer:
      "Yes! Many DSCR lenders now offer short-term rental programs that use projected Airbnb/VRBO income for qualification. These typically require 12-month income projections from AirDNA or similar platforms, 25% down payment, and may have geographic restrictions in California markets with strict STR regulations.",
  },
  {
    question: "DSCR loan vs conventional loan: Which is better for investors?",
    answer:
      "DSCR loans are better if you: have complex/self-employed income, already have 5-10 conventional mortgages, need faster closing, or want to avoid DTI limits. Conventional loans are better if you have simple W-2 income, fewer than 5 financed properties, and can document income. DSCR rates are typically 0.5-1% higher than conventional.",
  },
];

export default function DSCRLoansPage() {
  return (
    <>
      <StructuredData
        type="service"
        pageTitle="California DSCR Loans | No Tax Returns Required"
        pageDescription="DSCR loans for California real estate investors. Qualify based on property cash flow, not personal income. No tax returns required. Close in 14-21 days."
        pageUrl="/investment/dscr-loans"
        breadcrumbs={[
          { name: "Investment", url: "/investment" },
          { name: "DSCR Loans", url: "/investment/dscr-loans" },
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
                <span className="text-teal-600">DSCR Loans</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-teal-600/10 border border-teal-600/30 text-teal-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="h-4 w-4" />
                #1 Investor Loan Product
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                California <span className="text-teal-600">DSCR Loans</span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-600">
                  Qualify on Rental Income, Not Yours
                </span>
              </h1>

              <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                Skip the tax returns and income verification. DSCR loans qualify you based on the
                property's cash flow - the way investment lending should work.
              </p>

              {/* Key Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <TrendingUp className="h-4 w-4 text-teal-600" />
                  <span>From 6.25% APR</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <FileX className="h-4 w-4 text-emerald-600" />
                  <span>No Tax Returns</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <Clock className="h-4 w-4 text-teal-600" />
                  <span>Lenders close in 14 days</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-8"
                  asChild
                >
                  <Link href="/get-quote">
                    Compare DSCR Rates <ArrowRight className="ml-2 h-5 w-5" />
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
                    DSCR Calculator
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
                Why Investors Choose DSCR Loans
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                The most flexible financing option for California real estate investors
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

        {/* DSCR Calculator Example */}
        <section className="py-20 border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  How DSCR is Calculated
                </h2>
                <p className="text-gray-500">
                  DSCR = Monthly Rent ÷ Monthly Payment (PITIA)
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-4 bg-gray-100 text-sm font-semibold text-gray-900">
                  <span>Scenario</span>
                  <span>Monthly Rent</span>
                  <span>Payment</span>
                  <span>DSCR</span>
                  <span>Status</span>
                </div>
                {dscrExamples.map((example, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 gap-4 p-4 border-t border-gray-200 text-sm"
                  >
                    <span className="text-gray-900">{example.scenario}</span>
                    <span className="text-emerald-600">{example.rent}</span>
                    <span className="text-gray-500">{example.payment}</span>
                    <span className="text-teal-600 font-bold">{example.dscr}</span>
                    <span className={`${example.status === "Excellent" ? "text-emerald-600" : example.status === "Approved" ? "text-teal-600" : "text-gray-500"}`}>
                      {example.status}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-gray-500 text-sm text-center mt-4">
                Higher DSCR = Better rates and terms. Most lenders require 1.0+ minimum.
              </p>
            </div>
          </div>
        </section>

        {/* Loan Details */}
        <section className="py-20 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  DSCR Loan Terms & Requirements
                </h2>
                <p className="text-gray-500">
                  What you need to qualify for a DSCR loan in California
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
                    Compare DSCR Rates <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="py-20 border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  DSCR Loans Are Perfect For
                </h2>
                <p className="text-gray-500">
                  Investors who struggle with traditional income documentation
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {perfectFor.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-900">{item}</span>
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
                  Compare Investor Loan Options
                </h2>
                <p className="text-gray-500">Find the right product for your strategy</p>
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
                    Short-term financing for renovations. 7-14 day closing, 100% rehab funding.
                    Better for value-add projects.
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
                    refinancing to DSCR.
                  </p>
                  <span className="text-teal-600 text-sm font-medium flex items-center gap-1">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/investment/portfolio-loans"
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                    Portfolio Loans
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Finance 5-100+ properties under one loan. Consolidate multiple DSCR loans into
                    one streamlined payment.
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
                DSCR Loan FAQs
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
              Ready to Scale Your Portfolio?
            </h2>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Connect with DSCR lenders who specialize in California investment properties.
              No tax returns. No income verification. Lenders close in 14 days.
            </p>
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-10"
              asChild
            >
              <Link href="/get-quote">
                Compare DSCR Lenders <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              California Investment Property Lending Network | Equal Housing Opportunity
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
