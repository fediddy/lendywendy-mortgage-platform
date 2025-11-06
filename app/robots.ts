import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://lendywendy.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/login",
          "/register",
          "/_next/",
          "/private/",
        ],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"], // Block OpenAI crawler if desired
      },
      {
        userAgent: "CCBot",
        disallow: ["/"], // Block Common Crawl bot if desired
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
