import type { MetadataRoute } from "next";
import { blogCategories } from "@/lib/blog/categories";
import { getAllPostMetas } from "@/lib/blog/load-posts";
import { SERVICE_PAGE_SLUGS } from "@/lib/services/service-pages";
import { siteUrl } from "@/lib/site-url";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl.replace(/\/$/, "");
  const posts = getAllPostMetas();
  const last = posts[0]?.publishedAt ?? new Date().toISOString().slice(0, 10);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: last, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/book`, lastModified: last, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/contact`, lastModified: last, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/blog`, lastModified: last, changeFrequency: "weekly", priority: 0.9 },
    ...SERVICE_PAGE_SLUGS.map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: last,
      changeFrequency: "weekly" as const,
      priority: 0.82,
    })),
  ];

  const categoryRoutes = blogCategories.map((c) => ({
    url: `${base}/blog/category/${c}`,
    lastModified: last,
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.updatedAt ?? p.publishedAt,
    changeFrequency: "monthly" as const,
    priority: p.featured ? 0.85 : 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
