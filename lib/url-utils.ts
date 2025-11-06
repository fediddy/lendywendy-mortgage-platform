/**
 * URL Utilities
 *
 * Centralized URL generation and routing utilities for SEO-friendly URLs
 */

import { Segment } from "@prisma/client";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://lendywendy.com";

/**
 * Content type URL prefixes
 */
export const URL_PREFIXES = {
  ARTICLE: "/articles",
  GUIDE: "/guides",
  CALCULATOR: "/calculators",
  CATEGORY: "/category",
  TAG: "/tag",
} as const;

/**
 * Segment URL paths
 */
export const SEGMENT_PATHS = {
  RESIDENTIAL: "/residential",
  INVESTMENT: "/investment",
  COMMERCIAL: "/commercial",
} as const;

/**
 * Get segment path from segment enum
 */
export function getSegmentPath(segment: Segment): string {
  return SEGMENT_PATHS[segment];
}

/**
 * Get segment name for display
 */
export function getSegmentName(segment: Segment): string {
  const names: Record<Segment, string> = {
    RESIDENTIAL: "Residential Mortgages",
    INVESTMENT: "Investment Property",
    COMMERCIAL: "Commercial Real Estate",
  };
  return names[segment];
}

/**
 * Generate article URL
 */
export function getArticleUrl(slug: string, absolute = false): string {
  const path = `${URL_PREFIXES.ARTICLE}/${slug}`;
  return absolute ? `${BASE_URL}${path}` : path;
}

/**
 * Generate guide URL
 */
export function getGuideUrl(slug: string, absolute = false): string {
  const path = `${URL_PREFIXES.GUIDE}/${slug}`;
  return absolute ? `${BASE_URL}${path}` : path;
}

/**
 * Generate calculator URL
 */
export function getCalculatorUrl(slug: string, absolute = false): string {
  const path = `${URL_PREFIXES.CALCULATOR}/${slug}`;
  return absolute ? `${BASE_URL}${path}` : path;
}

/**
 * Generate category URL
 */
export function getCategoryUrl(slug: string, absolute = false): string {
  const path = `${URL_PREFIXES.CATEGORY}/${slug}`;
  return absolute ? `${BASE_URL}${path}` : path;
}

/**
 * Generate tag URL
 */
export function getTagUrl(slug: string, absolute = false): string {
  const path = `${URL_PREFIXES.TAG}/${slug}`;
  return absolute ? `${BASE_URL}${path}` : path;
}

/**
 * Generate segment hub URL
 */
export function getSegmentUrl(segment: Segment, absolute = false): string {
  const path = getSegmentPath(segment);
  return absolute ? `${BASE_URL}${path}` : path;
}

/**
 * Generate content listing URL with filters
 */
export function getContentListingUrl(
  type: "articles" | "guides" | "calculators",
  filters?: {
    category?: string;
    tag?: string;
    segment?: Segment;
    page?: number;
  }
): string {
  const prefix = `/${type}`;
  const params = new URLSearchParams();

  if (filters?.category) params.set("category", filters.category);
  if (filters?.tag) params.set("tag", filters.tag);
  if (filters?.segment) params.set("segment", filters.segment);
  if (filters?.page && filters.page > 1) params.set("page", filters.page.toString());

  const queryString = params.toString();
  return queryString ? `${prefix}?${queryString}` : prefix;
}

/**
 * Generate breadcrumb data for navigation
 */
export function generateBreadcrumbs(
  segments: Array<{ name: string; url: string }>
): Array<{ name: string; url: string }> {
  return [
    { name: "Home", url: "/" },
    ...segments,
  ];
}

/**
 * Parse content type from URL path
 */
export function parseContentType(
  path: string
): "article" | "guide" | "calculator" | "category" | "tag" | "segment" | null {
  if (path.startsWith(URL_PREFIXES.ARTICLE)) return "article";
  if (path.startsWith(URL_PREFIXES.GUIDE)) return "guide";
  if (path.startsWith(URL_PREFIXES.CALCULATOR)) return "calculator";
  if (path.startsWith(URL_PREFIXES.CATEGORY)) return "category";
  if (path.startsWith(URL_PREFIXES.TAG)) return "tag";
  if (
    path.startsWith(SEGMENT_PATHS.RESIDENTIAL) ||
    path.startsWith(SEGMENT_PATHS.INVESTMENT) ||
    path.startsWith(SEGMENT_PATHS.COMMERCIAL)
  ) {
    return "segment";
  }
  return null;
}

/**
 * Extract slug from URL path
 */
export function extractSlug(path: string): string | null {
  const parts = path.split("/").filter(Boolean);
  return parts.length > 1 ? parts[parts.length - 1] : null;
}

/**
 * Generate canonical URL for content
 */
export function generateCanonicalUrl(path: string): string {
  // Remove trailing slash and query parameters
  const cleanPath = path.split("?")[0].replace(/\/$/, "");
  return `${BASE_URL}${cleanPath}`;
}

/**
 * Check if URL is internal
 */
export function isInternalUrl(url: string): boolean {
  try {
    const urlObj = new URL(url, BASE_URL);
    return urlObj.origin === new URL(BASE_URL).origin;
  } catch {
    // Relative URLs are internal
    return !url.startsWith("http");
  }
}

/**
 * Generate pagination URLs
 */
export function getPaginationUrls(
  basePath: string,
  currentPage: number,
  totalPages: number
): {
  first: string | null;
  prev: string | null;
  next: string | null;
  last: string | null;
} {
  const getPageUrl = (page: number) => {
    return page === 1 ? basePath : `${basePath}?page=${page}`;
  };

  return {
    first: currentPage > 1 ? getPageUrl(1) : null,
    prev: currentPage > 1 ? getPageUrl(currentPage - 1) : null,
    next: currentPage < totalPages ? getPageUrl(currentPage + 1) : null,
    last: currentPage < totalPages ? getPageUrl(totalPages) : null,
  };
}

/**
 * Generate alternate language URLs (for future i18n support)
 */
export function generateAlternateUrls(
  path: string,
  languages: string[] = ["en"]
): Array<{ lang: string; url: string }> {
  return languages.map((lang) => ({
    lang,
    url: `${BASE_URL}${path}`,
  }));
}
