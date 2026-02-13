import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';
import { ContentStatus, Segment } from "@prisma/client";
import { ContentCard } from "@/components/segments/content-card";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  ArrowRight,
  Home,
  CheckCircle,
  Shield,
  ChevronDown,
  Calculator,
  Users,
  Clock,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getArticleUrl,
  getGuideUrl,
  getCalculatorUrl,
} from "@/lib/url-utils";

export const metadata: Metadata = {
  title: "California Residential Mortgages | Home Loans & Refinancing | LendyWendy",
  description: "Compare California home loan rates in 60 seconds. FHA, VA, Conventional, Jumbo, and refinancing options. LendyWendy matches you with top lenders.",
  keywords: [
    "California home loans",
    "residential mortgage California",
    "FHA loans California",
    "VA loans California",
    "conventional mortgage",
    "jumbo loans California",
    "refinance California",
    "first-time homebuyer California",
    "mortgage pre-approval",
    "home loan rates California",
  ],
  openGraph: {
    title: "California Residential Mortgages | LendyWendy",
    description: "Compare California home loan rates in 60 seconds. FHA, VA, Conventional, Jumbo loans from top lenders.",
    type: "website",
    url: "https://lendywendy.com/residential",
    images: [{ url: "https://lendywendy.com/api/og?title=California+Residential+Mortgages&subtitle=Conventional%2C+FHA%2C+VA%2C+and+Jumbo+Loans.&badge=Home+Lending", width: 1200, height: 630, alt: "California Residential Mortgages" }],
  },
};

const loanTypes = [
  {
    title: "Conventional Loans",
    rate: "From 6.5%",
    description: "Traditional mortgage with 3-20% down. Best for buyers with good credit (620+).",
    features: ["3% down for first-time buyers", "PMI cancellable at 80% LTV", "Up to $832,750 conforming limit"],
    href: "/residential/conventional",
  },
  {
    title: "FHA Loans",
    rate: "From 6.25%",
    description: "Government-backed loan with lower credit requirements. Ideal for first-time buyers.",
    features: ["3.5% down with 580+ credit", "Accept 500+ with 10% down", "Lower closing costs"],
    href: "/residential/fha",
  },
  {
    title: "VA Loans",
    rate: "From 6%",
    description: "Zero down payment for eligible veterans, service members, and surviving spouses.",
    features: ["$0 down payment", "No PMI required", "Competitive rates"],
    href: "/residential/va",
  },
  {
    title: "Jumbo Loans",
    rate: "From 6.75%",
    description: "For high-value California properties above conforming loan limits.",
    features: ["Loans above $832,750", "10-20% down typical", "700+ credit recommended"],
    href: "/residential/jumbo",
  },
];

const faqItems = [
  {
    question: "What credit score do I need for a California home loan?",
    answer: "Credit requirements vary by loan type: FHA loans accept 580+ (3.5% down), Conventional loans require 620+, VA loans typically need 620+, and Jumbo loans usually require 700+. LendyWendy matches you with lenders who specialize in your credit profile."
  },
  {
    question: "How much down payment do I need to buy a house in California?",
    answer: "Down payment requirements depend on loan type: VA and USDA loans offer $0 down for eligible borrowers, FHA loans require 3.5% down, Conventional loans start at 3% down for first-time buyers, and Jumbo loans typically require 10-20% down."
  },
  {
    question: "How fast can I get matched with lenders for a California mortgage?",
    answer: "Most borrowers receive matched lender offers within 60 seconds. Full pre-approval with your chosen lender typically takes 24-48 hours after document submission."
  },
  {
    question: "What is the difference between FHA and Conventional loans?",
    answer: "FHA loans are government-insured with lower credit requirements (580+) and 3.5% down, but require mortgage insurance for the life of the loan. Conventional loans require 620+ credit and 3-20% down, with PMI cancellable at 80% LTV."
  },
];

export default async function ResidentialPage() {
  const segment = Segment.RESIDENTIAL;

  let articles: (Awaited<ReturnType<typeof prisma.article.findMany>>[number] & { category: { name: string; slug: string } })[] = [];
  let guides: (Awaited<ReturnType<typeof prisma.guide.findMany>>[number] & { category: { name: string; slug: string } })[] = [];
  let calculators: (Awaited<ReturnType<typeof prisma.calculator.findMany>>[number] & { category: { name: string; slug: string } })[] = [];

  try {
    [articles, guides, calculators] = await Promise.all([
      prisma.article.findMany({
        where: {
          status: ContentStatus.PUBLISHED,
          publishedAt: { lte: new Date() },
          category: { segment },
        },
        include: {
          category: { select: { name: true, slug: true } },
        },
        orderBy: { publishedAt: "desc" },
        take: 3,
      }),
      prisma.guide.findMany({
        where: {
          status: ContentStatus.PUBLISHED,
          publishedAt: { lte: new Date() },
          category: { segment },
        },
        include: {
          category: { select: { name: true, slug: true } },
        },
        orderBy: { publishedAt: "desc" },
        take: 2,
      }),
      prisma.calculator.findMany({
        where: {
          status: ContentStatus.PUBLISHED,
          publishedAt: { lte: new Date() },
          category: { segment },
        },
        include: {
          category: { select: { name: true, slug: true } },
        },
        orderBy: { usageCount: "desc" },
        take: 4,
      }),
    ]);
  } catch {
    // DB unavailable — render page without dynamic content
  }

  return (
    <>
      <StructuredData
        type="service"
        pageTitle="California Residential Mortgages | Home Loans & Refinancing"
        pageDescription="Compare California home loan rates in 60 seconds. FHA, VA, Conventional, Jumbo, and refinancing options from top-rated lenders."
        pageUrl="/residential"
        breadcrumbs={[{ name: "Residential Mortgages", url: "/residential" }]}
        faqItems={faqItems}
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-600/5 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-teal-600/10 border border-teal-600/30 text-teal-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Home className="h-4 w-4" />
                California Home Loans
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Find Your Perfect
                <br />
                <span className="text-teal-600">California Home Loan</span>
              </h1>

              <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                FHA, VA, Conventional, and Jumbo loans from California&apos;s top lenders.
                Compare rates in 60 seconds with no credit impact.
              </p>

              {/* Key Benefits */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <Clock className="h-4 w-4 text-teal-600" />
                  <span>Matched in 60 seconds</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span>As low as 3% down</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <Users className="h-4 w-4 text-teal-600" />
                  <span>500+ lenders</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-8" asChild>
                  <Link href="/get-quote">
                    Get Matched <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-gray-200 text-gray-900 hover:bg-gray-100" asChild>
                  <Link href="/calculators">
                    <Calculator className="mr-2 h-5 w-5" />
                    Payment Calculator
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Loan Types */}
        <section className="py-20 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Home Loan Programs
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Find the right loan for your situation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {loanTypes.map((loan, index) => (
                <Link
                  key={index}
                  href={loan.href}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">{loan.title}</h3>
                      <p className="text-teal-600 font-semibold">{loan.rate}</p>
                    </div>
                    <Home className="h-6 w-6 text-teal-600" />
                  </div>

                  <p className="text-gray-500 mb-4">{loan.description}</p>

                  <div className="space-y-2">
                    {loan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-teal-600 text-sm font-medium flex items-center gap-1">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-bold" asChild>
                <Link href="/get-quote">
                  Compare Rates <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              <div>
                <div className="text-4xl font-bold text-teal-600 mb-2">$2B+</div>
                <div className="text-gray-500">Loans Facilitated</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-teal-600 mb-2">24hrs</div>
                <div className="text-gray-500">Pre-Approval Time</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-teal-600 mb-2">10,000+</div>
                <div className="text-gray-500">Happy Homeowners</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-teal-600 mb-2">4.9/5</div>
                <div className="text-gray-500">Customer Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        {(articles.length > 0 || guides.length > 0 || calculators.length > 0) && (
          <section className="py-20 border-t border-gray-200">
            <div className="container mx-auto px-4 space-y-16">
              {articles.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Home Buying Tips</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {articles.map((article) => (
                      <ContentCard
                        key={article.id}
                        title={article.title}
                        excerpt={article.excerpt || undefined}
                        slug={article.slug}
                        url={getArticleUrl(article.slug)}
                        type="article"
                        publishedAt={article.publishedAt || undefined}
                        readTime={article.readTime || undefined}
                        viewCount={article.viewCount}
                        featuredImage={article.featuredImage || undefined}
                        category={{
                          name: article.category.name,
                          slug: article.category.slug,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {guides.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Home Buying Guides</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {guides.map((guide) => (
                      <ContentCard
                        key={guide.id}
                        title={guide.title}
                        excerpt={guide.excerpt || undefined}
                        slug={guide.slug}
                        url={getGuideUrl(guide.slug)}
                        type="guide"
                        publishedAt={guide.publishedAt || undefined}
                        readTime={guide.estimatedTime || undefined}
                        viewCount={guide.viewCount}
                        featuredImage={guide.featuredImage || undefined}
                        category={{
                          name: guide.category.name,
                          slug: guide.category.slug,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {calculators.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Mortgage Calculators</h2>
                  <div className="grid md:grid-cols-4 gap-6">
                    {calculators.map((calculator) => (
                      <ContentCard
                        key={calculator.id}
                        title={calculator.title}
                        excerpt={calculator.description || undefined}
                        slug={calculator.slug}
                        url={getCalculatorUrl(calculator.slug)}
                        type="calculator"
                        publishedAt={calculator.publishedAt || undefined}
                        viewCount={calculator.usageCount}
                        category={{
                          name: calculator.category.name,
                          slug: calculator.category.slug,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="py-20 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                Home Loan FAQs
              </h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <details
                    key={index}
                    className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-100/50 transition-colors">
                      <h3 className="font-semibold text-gray-900 pr-4">
                        {item.question}
                      </h3>
                      <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
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
              Ready to Find Your California Home Loan?
            </h2>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Get matched with top California lenders in 60 seconds.
              FHA, VA, Conventional, Jumbo - we&apos;ve got you covered.
            </p>
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-10" asChild>
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
