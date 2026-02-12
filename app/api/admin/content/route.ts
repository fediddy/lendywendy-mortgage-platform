import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ContentStatus, Segment } from "@prisma/client";

// GET - List articles with filtering
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "article";
  const status = searchParams.get("status") as ContentStatus | null;
  const segment = searchParams.get("segment") as Segment | null;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (segment) where.category = { segment };

  try {
    if (type === "article") {
      const [articles, total] = await Promise.all([
        prisma.article.findMany({
          where,
          include: {
            author: { select: { name: true, email: true } },
            category: { select: { name: true, slug: true, segment: true } },
          },
          orderBy: { updatedAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.article.count({ where }),
      ]);
      return NextResponse.json({ data: articles, total, page, limit });
    }

    if (type === "guide") {
      const [guides, total] = await Promise.all([
        prisma.guide.findMany({
          where,
          include: {
            author: { select: { name: true, email: true } },
            category: { select: { name: true, slug: true, segment: true } },
          },
          orderBy: { updatedAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.guide.count({ where }),
      ]);
      return NextResponse.json({ data: guides, total, page, limit });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("Content list error:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

// POST - Create new content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, title, slug, excerpt, content, categoryId, status, authorId } = body;

    if (!title || !slug || !content || !categoryId || !authorId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (type === "article") {
      const article = await prisma.article.create({
        data: {
          title,
          slug,
          excerpt: excerpt || null,
          content,
          status: status || ContentStatus.DRAFT,
          authorId,
          categoryId,
          readTime: Math.ceil(content.split(/\s+/).length / 200),
          publishedAt: status === ContentStatus.PUBLISHED ? new Date() : null,
        },
        include: {
          category: { select: { name: true, slug: true } },
        },
      });
      return NextResponse.json({ data: article }, { status: 201 });
    }

    if (type === "guide") {
      const guide = await prisma.guide.create({
        data: {
          title,
          slug,
          excerpt: excerpt || null,
          content,
          status: status || ContentStatus.DRAFT,
          authorId,
          categoryId,
          estimatedTime: Math.ceil(content.split(/\s+/).length / 150),
          publishedAt: status === ContentStatus.PUBLISHED ? new Date() : null,
        },
        include: {
          category: { select: { name: true, slug: true } },
        },
      });
      return NextResponse.json({ data: guide }, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("Content create error:", error);
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 });
  }
}

// PUT - Update content
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, title, slug, excerpt, content, categoryId, status } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const data: Record<string, unknown> = {};
    if (title !== undefined) data.title = title;
    if (slug !== undefined) data.slug = slug;
    if (excerpt !== undefined) data.excerpt = excerpt;
    if (content !== undefined) {
      data.content = content;
      if (type === "article") data.readTime = Math.ceil(content.split(/\s+/).length / 200);
      if (type === "guide") data.estimatedTime = Math.ceil(content.split(/\s+/).length / 150);
    }
    if (categoryId !== undefined) data.categoryId = categoryId;
    if (status !== undefined) {
      data.status = status;
      if (status === ContentStatus.PUBLISHED) data.publishedAt = new Date();
    }

    if (type === "article") {
      const article = await prisma.article.update({
        where: { id },
        data,
        include: { category: { select: { name: true, slug: true } } },
      });
      return NextResponse.json({ data: article });
    }

    if (type === "guide") {
      const guide = await prisma.guide.update({
        where: { id },
        data,
        include: { category: { select: { name: true, slug: true } } },
      });
      return NextResponse.json({ data: guide });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("Content update error:", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}

// DELETE - Delete content
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type || !id) {
    return NextResponse.json({ error: "Type and ID required" }, { status: 400 });
  }

  try {
    if (type === "article") {
      await prisma.article.delete({ where: { id } });
    } else if (type === "guide") {
      await prisma.guide.delete({ where: { id } });
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Content delete error:", error);
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 });
  }
}
