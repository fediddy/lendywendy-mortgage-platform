import { Metadata } from "next";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';
import { ContentStatus, Segment } from "@prisma/client";
import { SegmentHubHero } from "@/components/segments/segment-hub-hero";
import { ContentCard } from "@/components/segments/content-card";
import { SegmentNavigation } from "@/components/segments/segment-navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import { TrustSignals, TestimonialCards } from "@/components/shared";
import { CtaSection } from "@/components/shared";
import {
  getArticleUrl,
  getGuideUrl,
  getCalculatorUrl,
  getCategoryUrl,
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
  },
};

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
    take: 6,
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
    take: 4,
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

  const categories = await prisma.category.findMany({
    where: { segment },
    include: {
      _count: {
        select: {
          articles: {
            where: {
              status: ContentStatus.PUBLISHED,
              publishedAt: { lte: new Date() },
            },
          },
          guides: {
            where: {
              status: ContentStatus.PUBLISHED,
              publishedAt: { lte: new Date() },
            },
          },
          calculators: {
            where: {
              status: ContentStatus.PUBLISHED,
              publishedAt: { lte: new Date() },
            },
          },
        },
      },
    },
    orderBy: { name: "asc" },
  });

  // FAQ items for investment segment
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

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData
        type="service"
        pageTitle="California Investment Property Loans | DSCR, Fix & Flip"
        pageDescription="Get investment property financing in California. DSCR loans, fix-and-flip, rental portfolios from top-rated lenders."
        pageUrl="/investment"
        breadcrumbs={[{ name: "Investment Property", url: "/investment" }]}
        faqItems={faqItems}
      />

      <main className="min-h-screen" itemScope itemType="https://schema.org/WebPage">
        <SegmentHubHero segment={segment} />

        <div className="container mx-auto px-4 py-12 space-y-16">
          <Breadcrumbs
            items={[{ name: "Investment Property", url: "/investment" }]}
          />

        {categories.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-navy-900">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => {
                const totalContent =
                  category._count.articles +
                  category._count.guides +
                  category._count.calculators;

                return (
                  <a
                    key={category.id}
                    href={getCategoryUrl(category.slug)}
                    className="p-6 border rounded-lg hover:shadow-md transition-shadow bg-card"
                  >
                    <h3 className="font-semibold text-lg mb-2">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {category.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {totalContent} {totalContent === 1 ? "resource" : "resources"}
                    </p>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {articles.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-navy-900">Latest Investment Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </section>
        )}

        {guides.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-navy-900">Investment Strategy Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </section>
        )}

        {calculators.length > 0 && (
          <section aria-labelledby="calculators-heading">
            <h2 id="calculators-heading" className="text-3xl font-bold mb-6 text-navy-900">Investment Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          </section>
        )}

        {/* Testimonials */}
        <section aria-labelledby="testimonials-heading">
          <h2 id="testimonials-heading" className="text-3xl font-bold mb-6 text-navy-900">
            What Investors Say
          </h2>
          <TestimonialCards limit={3} />
        </section>

        {/* FAQ Section */}
        <section aria-labelledby="faq-heading" itemScope itemType="https://schema.org/FAQPage">
          <h2 id="faq-heading" className="text-3xl font-bold mb-6 text-navy-900">
            Investment Loan FAQs
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors">
                  <h3 className="font-semibold text-navy-900 text-sm pr-4" itemProp="name">
                    {item.question}
                  </h3>
                </summary>
                <div
                  className="px-4 pb-4 text-sm text-gray-600"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p itemProp="text">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>

      {/* Trust Signals */}
      <TrustSignals variant="light" showStats={true} showCredentials={true} />

      {/* Cross-Segment Navigation */}
      <SegmentNavigation currentSegment={segment} />

      {/* Final CTA */}
      <CtaSection
        variant="primary"
        title="Ready to finance your next investment?"
        description="Get matched with lenders who specialize in investment property loans. DSCR, fix-and-flip, portfolio - we've got you covered."
      />
      </main>
    </>
  );
}
