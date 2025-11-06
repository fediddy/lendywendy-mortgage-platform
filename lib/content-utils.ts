/**
 * Content Management Utility Functions
 *
 * Helper functions for content creation, slugification, and management
 */

import { SlugOptions } from "@/types/content";

/**
 * Generate a URL-friendly slug from a title
 */
export function generateSlug(
  title: string,
  options: SlugOptions = {}
): string {
  const {
    prefix = "",
    suffix = "",
    maxLength = 100,
  } = options;

  let slug = title
    .toLowerCase()
    .trim()
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, "-")
    // Remove special characters
    .replace(/[^\w\-]+/g, "")
    // Remove multiple consecutive hyphens
    .replace(/\-\-+/g, "-")
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, "");

  // Add prefix and suffix
  if (prefix) slug = `${prefix}-${slug}`;
  if (suffix) slug = `${slug}-${suffix}`;

  // Truncate to max length
  if (slug.length > maxLength) {
    slug = slug.substring(0, maxLength).replace(/-[^-]*$/, "");
  }

  return slug;
}

/**
 * Calculate estimated reading time in minutes
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Extract plain text from HTML content
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Generate an excerpt from content
 */
export function generateExcerpt(
  content: string,
  maxLength: number = 160
): string {
  const plainText = stripHtml(content);

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Find the last complete sentence within the limit
  const truncated = plainText.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf(".");
  const lastQuestion = truncated.lastIndexOf("?");
  const lastExclamation = truncated.lastIndexOf("!");

  const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclamation);

  if (lastSentenceEnd > maxLength * 0.6) {
    return plainText.substring(0, lastSentenceEnd + 1);
  }

  // If no good sentence break, find the last word boundary
  const lastSpace = truncated.lastIndexOf(" ");
  return plainText.substring(0, lastSpace) + "...";
}

/**
 * Validate slug uniqueness (to be used with database query)
 */
export async function isSlugUnique(
  slug: string,
  contentType: "article" | "guide" | "calculator",
  excludeId?: string
): Promise<boolean> {
  // This will be implemented in the API routes with database access
  // Placeholder for type safety
  return true;
}

/**
 * Generate a unique slug by appending a number if needed
 */
export async function generateUniqueSlug(
  title: string,
  contentType: "article" | "guide" | "calculator",
  options: SlugOptions = {}
): Promise<string> {
  let slug = generateSlug(title, options);
  let counter = 1;

  // This is a placeholder - actual implementation will check database
  // In practice, this would be called from API routes with prisma access
  while (!(await isSlugUnique(slug, contentType))) {
    slug = generateSlug(title, { ...options, suffix: `${counter}` });
    counter++;
  }

  return slug;
}

/**
 * Format content status for display
 */
export function formatContentStatus(
  status: string
): { label: string; color: string } {
  const statusMap: Record<
    string,
    { label: string; color: string }
  > = {
    DRAFT: { label: "Draft", color: "gray" },
    IN_REVIEW: { label: "In Review", color: "yellow" },
    SCHEDULED: { label: "Scheduled", color: "blue" },
    PUBLISHED: { label: "Published", color: "green" },
    ARCHIVED: { label: "Archived", color: "red" },
  };

  return statusMap[status] || { label: status, color: "gray" };
}

/**
 * Format segment for display
 */
export function formatSegment(segment: string): string {
  const segmentMap: Record<string, string> = {
    RESIDENTIAL: "Residential Mortgages",
    INVESTMENT: "Investment Property",
    COMMERCIAL: "Commercial Real Estate",
  };

  return segmentMap[segment] || segment;
}

/**
 * Format calculator type for display
 */
export function formatCalculatorType(type: string): string {
  return type
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Validate SEO metadata
 */
export function validateSeoMetadata(metadata: {
  metaTitle: string;
  metaDescription: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Meta title validation
  if (metadata.metaTitle.length < 30) {
    errors.push("Meta title should be at least 30 characters");
  }
  if (metadata.metaTitle.length > 60) {
    errors.push("Meta title should not exceed 60 characters");
  }

  // Meta description validation
  if (metadata.metaDescription.length < 120) {
    errors.push("Meta description should be at least 120 characters");
  }
  if (metadata.metaDescription.length > 160) {
    errors.push("Meta description should not exceed 160 characters");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generate JSON-LD schema for articles
 */
export function generateArticleSchema(article: {
  title: string;
  excerpt?: string | null;
  publishedAt?: Date | null;
  updatedAt: Date;
  author: { name: string | null; email: string };
  featuredImage?: string | null;
}): Record<string, unknown> {
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
    image: article.featuredImage || "",
  };
}

/**
 * Generate JSON-LD schema for how-to guides
 */
export function generateHowToSchema(guide: {
  title: string;
  excerpt?: string | null;
  estimatedTime?: number | null;
  steps: Array<{ stepNumber: number; title: string; content: string }>;
  featuredImage?: string | null;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.excerpt || "",
    totalTime: guide.estimatedTime
      ? `PT${guide.estimatedTime}M`
      : undefined,
    image: guide.featuredImage || "",
    step: guide.steps.map((step) => ({
      "@type": "HowToStep",
      position: step.stepNumber,
      name: step.title,
      text: stripHtml(step.content),
    })),
  };
}

/**
 * Sanitize HTML content (basic sanitization)
 * For production, use a library like DOMPurify
 */
export function sanitizeHtml(html: string): string {
  // Basic sanitization - remove script and style tags
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "") // Remove inline event handlers
    .replace(/on\w+='[^']*'/gi, "");
}
