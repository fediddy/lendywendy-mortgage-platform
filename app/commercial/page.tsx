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
  title: "California Commercial Real Estate Loans | SBA, Multi-Family, Construction | LendyWendy",
  description: "Get commercial property financing in California. SBA 7(a) & 504 loans, multi-family, office, retail, industrial, and construction financing. Expert guidance from NMLS #1945913.",
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
  },
};

export default async function CommercialPage() {
  const segment = Segment.COMMERCIAL;

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

  // FAQ items for commercial segment
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

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData
        type="service"
        pageTitle="California Commercial Real Estate Loans | SBA, Multi-Family"
        pageDescription="Get commercial property financing in California. SBA loans, multi-family, construction from top-rated lenders."
        pageUrl="/commercial"
        breadcrumbs={[{ name: "Commercial Real Estate", url: "/commercial" }]}
        faqItems={faqItems}
      />

      <main className="min-h-screen" itemScope itemType="https://schema.org/WebPage">
        <SegmentHubHero segment={segment} />

        <div className="container mx-auto px-4 py-12 space-y-16">
          <Breadcrumbs
            items={[{ name: "Commercial Real Estate", url: "/commercial" }]}
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
            <h2 className="text-3xl font-bold mb-6 text-navy-900">Commercial Financing News</h2>
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
            <h2 className="text-3xl font-bold mb-6 text-navy-900">Commercial Loan Guides</h2>
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
            <h2 id="calculators-heading" className="text-3xl font-bold mb-6 text-navy-900">Commercial Property Calculators</h2>
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
            What Business Owners Say
          </h2>
          <TestimonialCards limit={3} />
        </section>

        {/* FAQ Section */}
        <section aria-labelledby="faq-heading" itemScope itemType="https://schema.org/FAQPage">
          <h2 id="faq-heading" className="text-3xl font-bold mb-6 text-navy-900">
            Commercial Loan FAQs
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
        title="Ready to finance your commercial property?"
        description="Get matched with lenders who specialize in commercial real estate. SBA, multi-family, construction - we've got you covered."
      />
      </main>
    </>
  );
}
