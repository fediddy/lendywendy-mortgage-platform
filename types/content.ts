/**
 * Content Management System Types
 *
 * Centralized type definitions for the CMS
 */

import {
  Article,
  Guide,
  Calculator,
  Category,
  Tag,
  SeoMetadata,
  ContentVersion,
  GuideStep,
  ContentStatus,
  Segment,
  CalculatorType,
  Difficulty,
} from "@prisma/client";

// ============================================================================
// Content Models with Relations
// ============================================================================

export type ArticleWithRelations = Article & {
  author: {
    id: string;
    name: string | null;
    email: string;
  };
  category: Category;
  tags: Tag[];
  seoMetadata: SeoMetadata | null;
  versions?: ContentVersion[];
};

export type GuideWithRelations = Guide & {
  author: {
    id: string;
    name: string | null;
    email: string;
  };
  category: Category;
  tags: Tag[];
  steps: GuideStep[];
  seoMetadata: SeoMetadata | null;
  versions?: ContentVersion[];
};

export type CalculatorWithRelations = Calculator & {
  author: {
    id: string;
    name: string | null;
    email: string;
  };
  category: Category;
  tags: Tag[];
  seoMetadata: SeoMetadata | null;
  versions?: ContentVersion[];
};

export type CategoryWithRelations = Category & {
  parent?: Category | null;
  children?: Category[];
  _count?: {
    articles: number;
    guides: number;
    calculators: number;
  };
};

// ============================================================================
// Content Creation/Update Inputs
// ============================================================================

export type CreateArticleInput = {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  categoryId: string;
  tagIds?: string[];
  readTime?: number;
  seoMetadata?: CreateSeoMetadataInput;
};

export type UpdateArticleInput = Partial<CreateArticleInput> & {
  status?: ContentStatus;
};

export type CreateGuideInput = {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  categoryId: string;
  tagIds?: string[];
  difficulty?: Difficulty;
  estimatedTime?: number;
  steps?: CreateGuideStepInput[];
  seoMetadata?: CreateSeoMetadataInput;
};

export type UpdateGuideInput = Partial<CreateGuideInput> & {
  status?: ContentStatus;
};

export type CreateGuideStepInput = {
  stepNumber: number;
  title: string;
  content: string;
  image?: string;
};

export type CreateCalculatorInput = {
  title: string;
  slug: string;
  description?: string;
  calculatorType: CalculatorType;
  config: CalculatorConfig;
  categoryId: string;
  tagIds?: string[];
  seoMetadata?: CreateSeoMetadataInput;
};

export type UpdateCalculatorInput = Partial<CreateCalculatorInput> & {
  status?: ContentStatus;
};

export type CreateSeoMetadataInput = {
  metaTitle: string;
  metaDescription: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  schema?: string | null;
};

// ============================================================================
// Calculator Configuration Types
// ============================================================================

export type CalculatorConfig = {
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  formula: string; // JavaScript expression or function name
  options?: {
    currency?: string;
    locale?: string;
    decimalPlaces?: number;
  };
};

export type CalculatorInput = {
  id: string;
  label: string;
  type: "number" | "currency" | "percent" | "select";
  defaultValue?: number | string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  helpText?: string;
  options?: { value: string | number; label: string }[]; // For select inputs
};

export type CalculatorOutput = {
  id: string;
  label: string;
  type: "currency" | "number" | "percent" | "text";
  format?: string; // Display format
  helpText?: string;
};

// ============================================================================
// Content Filters and Queries
// ============================================================================

export type ContentFilters = {
  status?: ContentStatus | ContentStatus[];
  segment?: Segment;
  categoryId?: string;
  tagIds?: string[];
  authorId?: string;
  search?: string; // Search in title, excerpt, content
  publishedAfter?: Date;
  publishedBefore?: Date;
};

export type ContentSortBy =
  | "publishedAt"
  | "createdAt"
  | "updatedAt"
  | "viewCount"
  | "title";

export type ContentSortOrder = "asc" | "desc";

export type PaginationParams = {
  page?: number;
  pageSize?: number;
  sortBy?: ContentSortBy;
  sortOrder?: ContentSortOrder;
};

export type PaginatedResult<T> = {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    hasMore: boolean;
  };
};

// ============================================================================
// Publishing Workflow Types
// ============================================================================

export type PublishContentInput = {
  publishedAt?: Date; // If not provided, publish immediately
  createVersion?: boolean; // Whether to create a version snapshot
  changeLog?: string; // Version changelog message
};

export type ScheduleContentInput = {
  publishedAt: Date; // Future date/time
  createVersion?: boolean;
  changeLog?: string;
};

export type ArchiveContentInput = {
  reason?: string; // Why the content is being archived
};

// ============================================================================
// Content Analytics Types
// ============================================================================

export type ContentAnalytics = {
  id: string;
  type: "article" | "guide" | "calculator";
  title: string;
  slug: string;
  viewCount: number;
  publishedAt: Date | null;
  category: string;
  segment: Segment;
  performance: {
    averageTimeOnPage?: number;
    bounceRate?: number;
    conversionRate?: number;
  };
};

// ============================================================================
// Slug Generation
// ============================================================================

export type SlugOptions = {
  prefix?: string;
  suffix?: string;
  maxLength?: number;
  unique?: boolean; // Check for uniqueness in database
};

// ============================================================================
// Export Enums for Frontend Use
// ============================================================================

export {
  ContentStatus,
  Segment,
  CalculatorType,
  Difficulty,
  type Article,
  type Guide,
  type Calculator,
  type Category,
  type Tag,
  type SeoMetadata,
  type ContentVersion,
  type GuideStep,
};
