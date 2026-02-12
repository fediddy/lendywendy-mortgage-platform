import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';
import { ContentStatus, Segment } from "@prisma/client";
import { ContentCard } from "@/components/segments/content-card";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  ArrowRight,
  TrendingUp,
  Clock,
  FileX,
  Building,
  RefreshCw,
  Layers,
  Zap,
  CheckCircle,
  Shield,
  Calculator,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getArticleUrl,
  getGuideUrl,
  getCalculatorUrl,
} from "@/lib/url-utils";

export const metadata: Metadata = {
  title: "California Investment Property Loans | DSCR, Fix & Flip, Portfolio | LendyWendy",
  description: "Get investment property financing in California. DSCR loans with no tax returns, fix-and-flip loans closing in 10 days, rental portfolio loans, and bridge financing. Expert guidance from NMLS #1945913.",
  keywords: [
    "DSCR loans California",
    "investment property loans",
    "fix and flip loans California",
    "rental property financing",
    "bridge loans California",
    "hard money loans California",
    "portfolio loans",
    "real estate investor loans",
    "no tax return mortgage",
    "bank statement loans California",
  ],
  openGraph: {
    title: "California Investment Property Loans | LendyWendy",
    description: "DSCR loans, fix-and-flip financing, and portfolio loans for California real estate investors. No tax returns required.",
    type: "website",
    url: "https://lendywendy.com/investment",
    images: [{ url: "https://lendywendy.com/api/og?title=California+Investment+Property+Loans&subtitle=DSCR%2C+Fix+%26+Flip%2C+Portfolio%2C+and+Hard+Money+Lending.&badge=Investor+Specialists", width: 1200, height: 630, alt: "California Investment Property Loans" }],
  },
};

const loanProducts = [
  {
    icon: TrendingUp,
    title: "DSCR Loans",
    rate: "6.25% - 7.75%",
    description: "Qualify on rental income, not personal income. No tax returns or W-2s required.",
    features: ["No income verification", "1.0+ DSCR required", "Up to 80% LTV", "30-year fixed available"],
    ltv: "Up to 80%",
    minDscr: "1.0+",
    href: "/investment/dscr-loans",
  },
  {
    icon: RefreshCw,
    title: "Fix & Flip",
    rate: "9% - 12%",
    description: "Fast funding for acquisitions and rehab. Close in as little as 7 days.",
    features: ["Close in 7-14 days", "Up to 90% of purchase", "100% rehab financing", "Interest-only payments"],
    ltv: "Up to 90%",
    term: "6-18 months",
    href: "/investment/fix-and-flip",
  },
  {
    icon: Building,
    title: "Bridge Loans",
    rate: "8% - 11%",
    description: "Short-term financing to bridge acquisitions or stabilize properties.",
    features: ["Quick closing", "Flexible terms", "No prepay penalty", "Interest reserves available"],
    ltv: "Up to 75%",
    term: "12-24 months",
    href: "/investment/bridge-loans",
  },
  {
    icon: Layers,
    title: "Portfolio Loans",
    rate: "6.5% - 8%",
    description: "Finance 5-100+ properties under one loan. Simplify your portfolio management.",
    features: ["Single loan, multiple properties", "Cross-collateralization", "Cash-out available", "Blanket loans"],
    ltv: "Up to 75%",
    minProperties: "5+",
    href: "/investment/portfolio-loans",
  },
  {
    icon: Zap,
    title: "Hard Money",
    rate: "9.99% - 13.99%",
    description: "Asset-based lending with the fastest closings in California. The property is the story.",
    features: ["Close in 7-10 days", "No income verification", "Any property condition", "Up to $20M+"],
    ltv: "Up to 75% ARV",
    term: "6-36 months",
    href: "/investment/hard-money",
  },
];

const faqItems = [
  {
    question: "What is a DSCR loan and who qualifies?",
    answer: "A DSCR (Debt Service Coverage Ratio) loan qualifies borrowers based on the property's rental income rather than personal income. You qualify when the property's rental income covers at least 100% of the mortgage payment. No tax returns, W-2s, or employment verification required."
  },
  {
    question: "How fast can I close on a fix-and-flip loan?",
    answer: "Fix-and-flip loans can close in as fast as 7-14 days. LendyWendy matches you with hard money and bridge lenders who specialize in quick closings for time-sensitive investment deals."
  },
  {
    question: "Do I need 20% down for investment property loans?",
    answer: "Down payment requirements vary: DSCR loans typically require 20-25% down, fix-and-flip loans offer 80-90% LTV (10-20% down), and portfolio loans may have flexible terms. Foreign nationals typically need 25-30% down."
  },
  {
    question: "Can I finance multiple investment properties under one loan?",
    answer: "Yes! Portfolio loans and blanket loans allow you to finance multiple properties (5-100+) under a single mortgage. This simplifies management and can offer better terms than individual loans."
  },
];

export default async function InvestmentPage() {
  const segment = Segment.INVESTMENT;

  const articles = await prisma.article.findMany({
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
  });

  const guides = await prisma.guide.findMany({
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
  });

  const calculators = await prisma.calculator.findMany({
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
  });

  return (
    <>
      <StructuredData
        type="service"
        pageTitle="California Investment Property Loans | DSCR, Fix & Flip"
        pageDescription="Get investment property financing in California. DSCR loans, fix-and-flip, rental portfolios from top-rated lenders."
        pageUrl="/investment"
        breadcrumbs={[{ name: "Investment Property", url: "/investment" }]}
        faqItems={faqItems}
      />

      <main className="min-h-screen bg-slate-950">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="h-4 w-4" />
                California Investment Property Lenders
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Scale Your Portfolio
                <br />
                <span className="text-amber-500">Without the Paperwork</span>
              </h1>

              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                DSCR loans, fix-and-flip financing, and portfolio loans for California real estate investors.
                No tax returns required. Close in as few as 7 days.
              </p>

              {/* Key Benefits */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span>Close in 7-14 days</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <FileX className="h-4 w-4 text-emerald-500" />
                  <span>No tax returns</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <Layers className="h-4 w-4 text-amber-500" />
                  <span>Unlimited properties</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg px-8" asChild>
                  <Link href="/get-quote">
                    Get Investor Rates <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800" asChild>
                  <Link href="/calculators">
                    <Calculator className="mr-2 h-5 w-5" />
                    DSCR Calculator
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Loan Products */}
        <section className="py-20 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Investor Loan Programs
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Purpose-built financing for every investment strategy
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {loanProducts.map((product, index) => (
                <Link
                  key={index}
                  href={product.href}
                  className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500/10 rounded-lg">
                        <product.icon className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">{product.title}</h3>
                        <p className="text-amber-500 font-semibold">{product.rate}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-4">{product.description}</p>

                  <div className="space-y-2">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                    <div className="flex gap-4 text-sm">
                      <span className="text-gray-500">LTV: <span className="text-white">{product.ltv}</span></span>
                      {product.minDscr && <span className="text-gray-500">Min DSCR: <span className="text-white">{product.minDscr}</span></span>}
                      {product.term && <span className="text-gray-500">Term: <span className="text-white">{product.term}</span></span>}
                      {product.minProperties && <span className="text-gray-500">Properties: <span className="text-white">{product.minProperties}</span></span>}
                    </div>
                    <ArrowRight className="h-5 w-5 text-amber-500" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold" asChild>
                <Link href="/get-quote">
                  Get Matched with Lenders <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-t border-slate-800 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              <div>
                <div className="text-4xl font-bold text-amber-500 mb-2">$847M</div>
                <div className="text-gray-400">Investor Loans Funded</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-500 mb-2">14 days</div>
                <div className="text-gray-400">Average Close Time</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-500 mb-2">2,400+</div>
                <div className="text-gray-400">Properties Financed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-500 mb-2">4.9/5</div>
                <div className="text-gray-400">Investor Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        {(articles.length > 0 || guides.length > 0 || calculators.length > 0) && (
          <section className="py-20 border-t border-slate-800">
            <div className="container mx-auto px-4 space-y-16">
              {articles.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Latest Investment Insights</h2>
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
                  <h2 className="text-2xl font-bold text-white mb-6">Investment Strategy Guides</h2>
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
                  <h2 className="text-2xl font-bold text-white mb-6">Investor Calculators</h2>
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
        <section className="py-20 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white text-center mb-10">
                Investment Loan FAQs
              </h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <details
                    key={index}
                    className="group bg-slate-900 rounded-xl border border-slate-800 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-800/50 transition-colors">
                      <h3 className="font-semibold text-white pr-4">
                        {item.question}
                      </h3>
                      <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
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
              Ready to Finance Your Next Deal?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Get matched with investment property lenders in 60 seconds.
              DSCR, fix-and-flip, portfolio - we&apos;ve got you covered.
            </p>
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg px-10" asChild>
              <Link href="/get-quote">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              NMLS #1945913 | No credit impact to get matched
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
