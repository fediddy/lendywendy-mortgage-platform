/**
 * Content Service
 *
 * Business logic for content management, versioning, and publishing workflows
 */

import { prisma } from "@/lib/db";
import {
  ContentStatus,
  Article,
  Guide,
  Calculator,
  ContentVersion,
} from "@prisma/client";
import {
  CreateArticleInput,
  UpdateArticleInput,
  PublishContentInput,
  ScheduleContentInput,
  ArchiveContentInput,
} from "@/types/content";
import { logger } from "@/lib/logger";

// ============================================================================
// Article Management
// ============================================================================

export async function createArticle(
  data: CreateArticleInput,
  authorId: string
): Promise<Article> {
  try {
    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        featuredImage: data.featuredImage,
        readTime: data.readTime,
        authorId,
        categoryId: data.categoryId,
        status: ContentStatus.DRAFT,
        tags: data.tagIds
          ? {
              connect: data.tagIds.map((id) => ({ id })),
            }
          : undefined,
        seoMetadata: data.seoMetadata
          ? {
              create: data.seoMetadata,
            }
          : undefined,
      },
      include: {
        author: true,
        category: true,
        tags: true,
        seoMetadata: true,
      },
    });

    logger.info("Article created", {
      component: "content-service",
      action: "create-article",
      metadata: { articleId: article.id, authorId },
    });

    return article;
  } catch (error) {
    logger.dbError("create article", error as Error, {
      metadata: { title: data.title, authorId },
    });
    throw error;
  }
}

export async function updateArticle(
  id: string,
  data: UpdateArticleInput
): Promise<Article> {
  try {
    const article = await prisma.article.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        featuredImage: data.featuredImage,
        readTime: data.readTime,
        status: data.status,
        categoryId: data.categoryId,
        tags: data.tagIds
          ? {
              set: data.tagIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        author: true,
        category: true,
        tags: true,
        seoMetadata: true,
        versions: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });

    logger.info("Article updated", {
      component: "content-service",
      action: "update-article",
      metadata: { articleId: id },
    });

    return article;
  } catch (error) {
    logger.dbError("update article", error as Error, {
      metadata: { articleId: id },
    });
    throw error;
  }
}

// ============================================================================
// Publishing Workflow
// ============================================================================

export async function publishArticle(
  id: string,
  userId: string,
  options: PublishContentInput = {}
): Promise<Article> {
  const { publishedAt = new Date(), createVersion = true, changeLog } = options;

  try {
    // Start transaction
    const article = await prisma.$transaction(async (tx) => {
      // Create version snapshot if requested
      if (createVersion) {
        const currentArticle = await tx.article.findUnique({
          where: { id },
          select: { content: true, versions: { orderBy: { versionNumber: "desc" }, take: 1 } },
        });

        if (currentArticle) {
          const nextVersion = (currentArticle.versions[0]?.versionNumber ?? 0) + 1;

          await tx.contentVersion.create({
            data: {
              articleId: id,
              versionNumber: nextVersion,
              content: currentArticle.content,
              changeLog: changeLog || `Published version ${nextVersion}`,
              createdById: userId,
            },
          });
        }
      }

      // Update article status and publish date
      return tx.article.update({
        where: { id },
        data: {
          status: ContentStatus.PUBLISHED,
          publishedAt,
        },
        include: {
          author: true,
          category: true,
          tags: true,
          seoMetadata: true,
        },
      });
    });

    logger.info("Article published", {
      component: "content-service",
      action: "publish-article",
      metadata: { articleId: id, publishedAt },
    });

    return article;
  } catch (error) {
    logger.dbError("publish article", error as Error, {
      metadata: { articleId: id },
    });
    throw error;
  }
}

export async function scheduleArticle(
  id: string,
  userId: string,
  options: ScheduleContentInput
): Promise<Article> {
  const { publishedAt, createVersion = true, changeLog } = options;

  try {
    const article = await prisma.$transaction(async (tx) => {
      // Create version snapshot if requested
      if (createVersion) {
        const currentArticle = await tx.article.findUnique({
          where: { id },
          select: { content: true, versions: { orderBy: { versionNumber: "desc" }, take: 1 } },
        });

        if (currentArticle) {
          const nextVersion = (currentArticle.versions[0]?.versionNumber ?? 0) + 1;

          await tx.contentVersion.create({
            data: {
              articleId: id,
              versionNumber: nextVersion,
              content: currentArticle.content,
              changeLog: changeLog || `Scheduled for ${publishedAt.toISOString()}`,
              createdById: userId,
            },
          });
        }
      }

      // Update article status and scheduled publish date
      return tx.article.update({
        where: { id },
        data: {
          status: ContentStatus.SCHEDULED,
          publishedAt,
        },
        include: {
          author: true,
          category: true,
          tags: true,
          seoMetadata: true,
        },
      });
    });

    logger.info("Article scheduled", {
      component: "content-service",
      action: "schedule-article",
      metadata: { articleId: id, publishedAt },
    });

    return article;
  } catch (error) {
    logger.dbError("schedule article", error as Error, {
      metadata: { articleId: id },
    });
    throw error;
  }
}

export async function archiveArticle(
  id: string,
  userId: string,
  options: ArchiveContentInput = {}
): Promise<Article> {
  try {
    const article = await prisma.article.update({
      where: { id },
      data: {
        status: ContentStatus.ARCHIVED,
      },
      include: {
        author: true,
        category: true,
        tags: true,
        seoMetadata: true,
      },
    });

    logger.info("Article archived", {
      component: "content-service",
      action: "archive-article",
      metadata: { articleId: id, reason: options.reason },
    });

    return article;
  } catch (error) {
    logger.dbError("archive article", error as Error, {
      metadata: { articleId: id },
    });
    throw error;
  }
}

export async function submitArticleForReview(
  id: string,
  userId: string
): Promise<Article> {
  try {
    const article = await prisma.article.update({
      where: { id },
      data: {
        status: ContentStatus.IN_REVIEW,
      },
      include: {
        author: true,
        category: true,
        tags: true,
        seoMetadata: true,
      },
    });

    logger.info("Article submitted for review", {
      component: "content-service",
      action: "submit-review",
      metadata: { articleId: id, submittedBy: userId },
    });

    return article;
  } catch (error) {
    logger.dbError("submit article for review", error as Error, {
      metadata: { articleId: id },
    });
    throw error;
  }
}

// ============================================================================
// Version Management
// ============================================================================

export async function getArticleVersions(
  articleId: string
): Promise<ContentVersion[]> {
  try {
    return await prisma.contentVersion.findMany({
      where: { articleId },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { versionNumber: "desc" },
    });
  } catch (error) {
    logger.dbError("get article versions", error as Error, {
      metadata: { articleId },
    });
    throw error;
  }
}

export async function restoreArticleVersion(
  articleId: string,
  versionId: string,
  userId: string
): Promise<Article> {
  try {
    return await prisma.$transaction(async (tx) => {
      // Get the version to restore
      const version = await tx.contentVersion.findUnique({
        where: { id: versionId },
      });

      if (!version || version.articleId !== articleId) {
        throw new Error("Version not found");
      }

      // Create a new version with the current content before restoring
      const currentArticle = await tx.article.findUnique({
        where: { id: articleId },
        select: { content: true, versions: { orderBy: { versionNumber: "desc" }, take: 1 } },
      });

      if (currentArticle) {
        const nextVersion = (currentArticle.versions[0]?.versionNumber ?? 0) + 1;

        await tx.contentVersion.create({
          data: {
            articleId,
            versionNumber: nextVersion,
            content: currentArticle.content,
            changeLog: `Restored from version ${version.versionNumber}`,
            createdById: userId,
          },
        });
      }

      // Restore the content from the version
      return tx.article.update({
        where: { id: articleId },
        data: {
          content: version.content,
          status: ContentStatus.DRAFT, // Reset to draft after restore
        },
        include: {
          author: true,
          category: true,
          tags: true,
          seoMetadata: true,
        },
      });
    });
  } catch (error) {
    logger.dbError("restore article version", error as Error, {
      metadata: { articleId, versionId },
    });
    throw error;
  }
}

// ============================================================================
// Scheduled Publishing (Background Job)
// ============================================================================

/**
 * Process scheduled articles that should be published
 * This should be called by a cron job or scheduled task
 */
export async function processScheduledArticles(): Promise<number> {
  try {
    const now = new Date();

    const result = await prisma.article.updateMany({
      where: {
        status: ContentStatus.SCHEDULED,
        publishedAt: {
          lte: now,
        },
      },
      data: {
        status: ContentStatus.PUBLISHED,
      },
    });

    logger.info("Processed scheduled articles", {
      component: "content-service",
      action: "process-scheduled",
      metadata: { count: result.count },
    });

    return result.count;
  } catch (error) {
    logger.dbError("process scheduled articles", error as Error);
    throw error;
  }
}
