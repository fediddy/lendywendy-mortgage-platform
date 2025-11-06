import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { ContentStatus } from "@prisma/client";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://lendywendy.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Fetch published articles
  const articles = await prisma.article.findMany({
    where: {
      status: ContentStatus.PUBLISHED,
      publishedAt: {
        lte: new Date(),
      },
    },
    select: {
      slug: true,
      updatedAt: true,
      publishedAt: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
  });

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Fetch published guides
  const guides = await prisma.guide.findMany({
    where: {
      status: ContentStatus.PUBLISHED,
      publishedAt: {
        lte: new Date(),
      },
    },
    select: {
      slug: true,
      updatedAt: true,
      publishedAt: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
  });

  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: guide.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Fetch published calculators
  const calculators = await prisma.calculator.findMany({
    where: {
      status: ContentStatus.PUBLISHED,
      publishedAt: {
        lte: new Date(),
      },
    },
    select: {
      slug: true,
      updatedAt: true,
      publishedAt: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
  });

  const calculatorRoutes: MetadataRoute.Sitemap = calculators.map(
    (calculator) => ({
      url: `${BASE_URL}/calculators/${calculator.slug}`,
      lastModified: calculator.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  // Fetch categories
  const categories = await prisma.category.findMany({
    select: {
      slug: true,
      updatedAt: true,
      segment: true,
    },
  });

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/category/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Segment hub pages
  const segmentRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/residential`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/investment`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/commercial`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Combine all routes
  return [
    ...staticRoutes,
    ...segmentRoutes,
    ...articleRoutes,
    ...guideRoutes,
    ...calculatorRoutes,
    ...categoryRoutes,
  ];
}
