import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';
import { ContentStatus, Segment } from "@prisma/client";
import { ContentCard } from "@/components/segments/content-card";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Shield,
  ChevronDown,
  Calculator,
  Clock,
  DollarSign,
  Warehouse,
  Store,
  Hotel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getArticleUrl,
  getGuideUrl,
  getCalculatorUrl,
} from "@/lib/url-utils";

export const metadata: Metadata = {
  title: "California Commercial Real Estate Loans | SBA, Multi-Family, Construction | LendyWendy",
  description: "Compare commercial property financing in California. SBA 7(a) & 504 loans, multi-family, office, retail, industrial, and construction financing through our network of licensed lenders.",
  keywords: [
    "commercial mortgage California",
    "SBA loans California",
    "multi-family loans",
    "construction loans California",
    "commercial real estate financing",
    "office building loans",
    "retail property loans",
    "industrial property loans",
    "owner-occupied commercial loans",
    "CRE loans California",
  ],
  openGraph: {
    title: "California Commercial Real Estate Loans | LendyWendy",
    description: "SBA loans, multi-family, construction, and commercial property financing for California businesses.",
    type: "website",
    url: "https://lendywendy.com/commercial",
    images: [{ url: "https://lendywendy.com/api/og?title=California+Commercial+Loans&subtitle=SBA%2C+CRE%2C+and+Construction+Financing.&badge=Commercial+Lending", width: 1200, height: 630, alt: "California Commercial Loans" }],
  },
};

const loanTypes = [
  {
    icon: Building2,
    title: "SBA 7(a) Loans",
    rate: "Prime + 2.25%",
    description: "Government-backed loans for small business real estate and working capital.",
    features: ["Up to $5M", "10% down possible", "10-25 year terms", "Mixed-use eligible"],
    href: "/commercial/sba-7a-loans",
  },
  {
    icon: Warehouse,
    title: "SBA 504 Loans",
    rate: "Below market",
    description: "Fixed-rate financing for major real estate and equipment purchases.",
    features: ["Up to $5.5M", "10% down typical", "Fixed rates on CDC portion", "Owner-occupied only"],
    href: "/commercial/sba-504-loans",
  },
  {
    icon: Store,
    title: "Conventional CRE",
    rate: "From 7%",
    description: "Traditional commercial mortgages for all property types.",
    features: ["Office & retail", "Industrial & warehouse", "Mixed-use properties", "25-30% down typical"],
    href: "/commercial/conventional-cre",
  },
  {
    icon: Hotel,
    title: "Construction Loans",
    rate: "From 8%",
    description: "Ground-up construction and major renovation financing.",
    features: ["Interest-only during build", "12-24 month terms", "Converts to permanent", "20-30% equity required"],
    href: "/commercial/construction-loans",
  },
];

const faqItems = [
  {
    question: "What is the difference between SBA 7(a) and SBA 504 loans?",
    answer: "SBA 7(a) loans offer up to $5M for various business purposes including real estate, equipment, and working capital. SBA 504 loans offer up to $5.5M specifically for real estate and major equipment, with lower down payments (10%) and fixed rates on the CDC portion."
  },
  {
    question: "What down payment is required for commercial real estate loans?",
    answer: "Commercial loans typically require 25-30% down for investor-owned properties. Owner-occupied commercial properties may qualify for 10-20% down with SBA programs. Construction loans often require 20-30% equity."
  },
  {
    question: "How long does it take to close a commercial mortgage?",
    answer: "Commercial loans typically take 30-60 days to close due to more complex underwriting, property appraisals, and environmental assessments. SBA loans may take 60-90 days. Bridge loans can close in 2-4 weeks."
  },
  {
    question: "What types of commercial properties can I finance?",
    answer: "LendyWendy matches you with lenders for all commercial property types: office buildings, retail centers, multi-family (5+ units), industrial/warehouse, mixed-use properties, hotels, self-storage, and special-purpose buildings."
  },
];

export default async function CommercialPage() {
  const segment = Segment.COMMERCIAL;

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
        pageTitle="California Commercial Real Estate Loans | SBA, Multi-Family"
        pageDescription="Compare commercial property financing in California. SBA loans, multi-family, construction from top-rated lenders."
        pageUrl="/commercial"
        breadcrumbs={[{ name: "Commercial Real Estate", url: "/commercial" }]}
        faqItems={faqItems}
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-600/5 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-teal-600/10 border border-teal-600/30 text-teal-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Building2 className="h-4 w-4" />
                California Commercial Lending
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Commercial Real Estate
                <br />
                <span className="text-teal-600">Financing Solutions</span>
              </h1>

              <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                SBA loans, multi-family financing, construction loans, and conventional CRE mortgages
                for California businesses and investors.
              </p>

              {/* Key Benefits */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <Clock className="h-4 w-4 text-teal-600" />
                  <span>Close in 30-60 days</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span>SBA 10% down</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <Building2 className="h-4 w-4 text-teal-600" />
                  <span>All property types</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-8" asChild>
                  <Link href="/get-quote">
                    Compare Rates <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-gray-200 text-gray-900 hover:bg-gray-100" asChild>
                  <Link href="/calculators">
                    <Calculator className="mr-2 h-5 w-5" />
                    CRE Calculator
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
                Commercial Loan Programs
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Financing solutions for every commercial property need
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
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-teal-600/10 rounded-lg">
                        <loan.icon className="h-6 w-6 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">{loan.title}</h3>
                        <p className="text-teal-600 font-semibold">{loan.rate}</p>
                      </div>
                    </div>
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
                  Get Matched <ArrowRight className="ml-2 h-5 w-5" />
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
                <div className="text-4xl font-bold text-teal-600 mb-2">$500M+</div>
                <div className="text-gray-500">Commercial Loans Funded</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-teal-600 mb-2">45 days</div>
                <div className="text-gray-500">Average Close Time</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-teal-600 mb-2">200+</div>
                <div className="text-gray-500">CRE Lenders</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-teal-600 mb-2">4.8/5</div>
                <div className="text-gray-500">Business Owner Rating</div>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Commercial Financing News</h2>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Commercial Loan Guides</h2>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Commercial Calculators</h2>
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
                Commercial Loan FAQs
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
              Ready to Finance Your Commercial Property?
            </h2>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Get matched with commercial real estate lenders in 60 seconds.
              SBA, multi-family, construction - we&apos;ve got you covered.
            </p>
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-10" asChild>
              <Link href="/get-quote">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Equal Housing Opportunity | LendyWendy connects you with licensed lenders
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
