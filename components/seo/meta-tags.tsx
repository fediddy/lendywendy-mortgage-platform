import { SeoMetadata } from "@prisma/client";
import { Metadata } from "next";

/**
 * Generate Next.js metadata object from SEO metadata
 */
export function generateMetadata(seo: SeoMetadata, baseUrl: string): Metadata {
  const metadata: Metadata = {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.focusKeyword ? [seo.focusKeyword] : undefined,
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
    alternates: seo.canonicalUrl
      ? {
          canonical: seo.canonicalUrl,
        }
      : undefined,
    openGraph: {
      title: seo.ogTitle || seo.metaTitle,
      description: seo.ogDescription || seo.metaDescription,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
      type: "article",
    },
    twitter: {
      card: (seo.twitterCard as "summary" | "summary_large_image") || "summary_large_image",
      title: seo.ogTitle || seo.metaTitle,
      description: seo.ogDescription || seo.metaDescription,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
  };

  return metadata;
}

/**
 * Generate structured data (JSON-LD) for articles
 */
export function generateArticleJsonLd(
  article: {
    title: string;
    excerpt?: string | null;
    publishedAt?: Date | null;
    updatedAt: Date;
    author: { name: string | null; email: string };
    featuredImage?: string | null;
    slug: string;
  },
  baseUrl: string
): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt || "",
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: article.author.name || article.author.email,
    },
    publisher: {
      "@type": "Organization",
      name: "LendyWendy",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    image: article.featuredImage || `${baseUrl}/og-image.png`,
    url: `${baseUrl}/articles/${article.slug}`,
  };
}

/**
 * Generate structured data (JSON-LD) for how-to guides
 */
export function generateHowToJsonLd(
  guide: {
    title: string;
    excerpt?: string | null;
    estimatedTime?: number | null;
    steps: Array<{ stepNumber: number; title: string; content: string }>;
    featuredImage?: string | null;
    slug: string;
  },
  baseUrl: string
): object {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.excerpt || "",
    totalTime: guide.estimatedTime ? `PT${guide.estimatedTime}M` : undefined,
    image: guide.featuredImage || `${baseUrl}/og-image.png`,
    step: guide.steps.map((step) => ({
      "@type": "HowToStep",
      position: step.stepNumber,
      name: step.title,
      text: step.content.replace(/<[^>]*>/g, ""), // Strip HTML
    })),
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
  baseUrl: string
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Component for rendering JSON-LD structured data
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
