import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { ContentStatus, Segment } from "@prisma/client";
import { SegmentHubHero } from "@/components/segments/segment-hub-hero";
import { ContentCard } from "@/components/segments/content-card";
import { SegmentNavigation } from "@/components/segments/segment-navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  getArticleUrl,
  getGuideUrl,
  getCalculatorUrl,
  getCategoryUrl,
} from "@/lib/url-utils";

export const metadata: Metadata = {
  title: "Commercial Real Estate Financing | LendyWendy",
  description: "Navigate commercial real estate financing with expert insights on loans, terms, underwriting, and strategies for business properties.",
  openGraph: {
    title: "Commercial Real Estate Financing | LendyWendy",
    description: "Expert guidance on commercial real estate loans and financing strategies.",
    type: "website",
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

  return (
    <div className="min-h-screen">
      <SegmentHubHero segment={segment} />

      <div className="container mx-auto px-4 py-12 space-y-16">
        <Breadcrumbs
          items={[{ name: "Commercial Real Estate", url: "/commercial" }]}
        />

        {categories.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6">Browse by Category</h2>
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
            <h2 className="text-3xl font-bold mb-6">Commercial Financing News</h2>
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
            <h2 className="text-3xl font-bold mb-6">Commercial Loan Guides</h2>
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
          <section>
            <h2 className="text-3xl font-bold mb-6">Commercial Property Calculators</h2>
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
      </div>

      {/* Cross-Segment Navigation */}
      <SegmentNavigation currentSegment={segment} />
    </div>
  );
}
