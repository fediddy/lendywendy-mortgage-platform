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
  title: "California Residential Mortgages | Home Loans & Refinancing | LendyWendy",
  description: "Get pre-approved for California home loans in minutes. FHA, VA, Conventional, Jumbo, and refinancing options. Expert guidance from Wendy Landeros, NMLS #1945913. Compare rates from top lenders.",
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
    description: "Get pre-approved for California home loans in minutes. FHA, VA, Conventional, Jumbo loans. Compare rates from top lenders.",
    type: "website",
    url: "https://lendywendy.com/residential",
  },
};

export default async function ResidentialPage() {
  const segment = Segment.RESIDENTIAL;

  // Fetch featured articles
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

  // Fetch featured guides
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

  // Fetch calculators
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

  // Fetch categories for this segment
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

  // FAQ items for this segment
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
      question: "How fast can I get pre-approved for a California mortgage?",
      answer: "Most borrowers receive pre-qualification within 2 minutes using our AI advisor. Full pre-approval with a matched lender typically takes 24-48 hours after document submission."
    },
    {
      question: "What is the difference between FHA and Conventional loans?",
      answer: "FHA loans are government-insured with lower credit requirements (580+) and 3.5% down, but require mortgage insurance for the life of the loan. Conventional loans require 620+ credit and 3-20% down, with PMI cancellable at 80% LTV."
    },
  ];

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData
        type="service"
        pageTitle="California Residential Mortgages | Home Loans & Refinancing"
        pageDescription="Get pre-approved for California home loans in minutes. FHA, VA, Conventional, Jumbo, and refinancing options from top-rated lenders."
        pageUrl="/residential"
        breadcrumbs={[{ name: "Residential Mortgages", url: "/residential" }]}
        faqItems={faqItems}
      />

      <main className="min-h-screen" itemScope itemType="https://schema.org/WebPage">
        <SegmentHubHero segment={segment} />

        <div className="container mx-auto px-4 py-12 space-y-16">
          <Breadcrumbs
            items={[{ name: "Residential Mortgages", url: "/residential" }]}
          />

        {/* Categories */}
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

        {/* Latest Articles */}
        {articles.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-navy-900">Latest Articles</h2>
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

        {/* Featured Guides */}
        {guides.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-navy-900">Step-by-Step Guides</h2>
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

        {/* Calculators */}
        {calculators.length > 0 && (
          <section aria-labelledby="calculators-heading">
            <h2 id="calculators-heading" className="text-3xl font-bold mb-6 text-navy-900">Financial Calculators</h2>
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
            What Our Clients Say
          </h2>
          <TestimonialCards limit={3} />
        </section>

        {/* FAQ Section */}
        <section aria-labelledby="faq-heading" itemScope itemType="https://schema.org/FAQPage">
          <h2 id="faq-heading" className="text-3xl font-bold mb-6 text-navy-900">
            Frequently Asked Questions
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

      {/* Readiness Score CTA */}
      <CtaSection variant="readiness" />

      {/* Cross-Segment Navigation */}
      <SegmentNavigation currentSegment={segment} />

      {/* Final CTA */}
      <CtaSection variant="primary" />
      </main>
    </>
  );
}
