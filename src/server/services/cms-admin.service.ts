import type { BlogPostAdminStatus, ContentPageStatus } from "@prisma/client";
import { getAdminUsernameFromCookies, isAdminAuthenticated } from "@/server/auth/admin-session";
import { writeAuditLog } from "@/server/services/audit-log.service";
import { contentPageRepository } from "@/server/repositories/content-page.repository";
import { blogPostAdminRepository } from "@/server/repositories/blog-post-admin.repository";

export type AdminMutationResult = { ok: true } | { ok: false; error: string };

function validSlug(s: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s) && s.length >= 2 && s.length <= 120;
}

export async function upsertContentPage(input: {
  slug: string;
  titleHe: string;
  titleEn: string;
  bodyHe: string;
  bodyEn: string;
  seoTitleHe?: string;
  seoTitleEn?: string;
  seoDescriptionHe?: string;
  seoDescriptionEn?: string;
  status: ContentPageStatus;
}): Promise<AdminMutationResult> {
  if (!(await isAdminAuthenticated())) return { ok: false, error: "Unauthorized." };
  if (!process.env.DATABASE_URL?.trim()) return { ok: false, error: "Database not configured." };

  const slug = input.slug.trim().toLowerCase();
  if (!validSlug(slug)) return { ok: false, error: "Invalid slug." };
  if (input.status !== "draft" && input.status !== "published") {
    return { ok: false, error: "Invalid status." };
  }

  const row = await contentPageRepository.upsertBySlug(
    slug,
    {
      slug,
      titleHe: input.titleHe.trim().slice(0, 500),
      titleEn: input.titleEn.trim().slice(0, 500),
      bodyHe: input.bodyHe.trim().slice(0, 100000),
      bodyEn: input.bodyEn.trim().slice(0, 100000),
      seoTitleHe: input.seoTitleHe?.trim().slice(0, 500) || null,
      seoTitleEn: input.seoTitleEn?.trim().slice(0, 500) || null,
      seoDescriptionHe: input.seoDescriptionHe?.trim().slice(0, 2000) || null,
      seoDescriptionEn: input.seoDescriptionEn?.trim().slice(0, 2000) || null,
      status: input.status,
    },
    {
      titleHe: input.titleHe.trim().slice(0, 500),
      titleEn: input.titleEn.trim().slice(0, 500),
      bodyHe: input.bodyHe.trim().slice(0, 100000),
      bodyEn: input.bodyEn.trim().slice(0, 100000),
      seoTitleHe: input.seoTitleHe?.trim().slice(0, 500) || null,
      seoTitleEn: input.seoTitleEn?.trim().slice(0, 500) || null,
      seoDescriptionHe: input.seoDescriptionHe?.trim().slice(0, 2000) || null,
      seoDescriptionEn: input.seoDescriptionEn?.trim().slice(0, 2000) || null,
      status: input.status,
    },
  );

  await writeAuditLog({
    action: "content.upsert",
    entityType: "ContentPage",
    entityId: row.id,
    after: { slug, status: input.status },
    actor: await getAdminUsernameFromCookies(),
  });

  return { ok: true };
}

export async function upsertBlogPostAdmin(input: {
  slug: string;
  titleHe: string;
  titleEn: string;
  excerptHe: string;
  excerptEn: string;
  category: string;
  tags: string[];
  status: BlogPostAdminStatus;
  publishedAt?: string | null;
}): Promise<AdminMutationResult> {
  if (!(await isAdminAuthenticated())) return { ok: false, error: "Unauthorized." };
  if (!process.env.DATABASE_URL?.trim()) return { ok: false, error: "Database not configured." };

  const slug = input.slug.trim().toLowerCase();
  if (!validSlug(slug)) return { ok: false, error: "Invalid slug." };
  if (input.status !== "draft" && input.status !== "published") {
    return { ok: false, error: "Invalid status." };
  }

  const tags = input.tags.map((t) => t.trim().slice(0, 48)).filter(Boolean).slice(0, 40);
  let publishedAt: Date | null = null;
  if (input.status === "draft") {
    publishedAt = null;
  } else if (input.publishedAt && input.publishedAt.trim()) {
    const d = new Date(input.publishedAt);
    publishedAt = Number.isNaN(d.getTime()) ? new Date() : d;
  } else {
    publishedAt = new Date();
  }

  const row = await blogPostAdminRepository.upsertBySlug(
    slug,
    {
      slug,
      titleHe: input.titleHe.trim().slice(0, 500),
      titleEn: input.titleEn.trim().slice(0, 500),
      excerptHe: input.excerptHe.trim().slice(0, 4000),
      excerptEn: input.excerptEn.trim().slice(0, 4000),
      category: input.category.trim().slice(0, 120),
      tags,
      status: input.status,
      publishedAt,
    },
    {
      titleHe: input.titleHe.trim().slice(0, 500),
      titleEn: input.titleEn.trim().slice(0, 500),
      excerptHe: input.excerptHe.trim().slice(0, 4000),
      excerptEn: input.excerptEn.trim().slice(0, 4000),
      category: input.category.trim().slice(0, 120),
      tags,
      status: input.status,
      publishedAt,
    },
  );

  await writeAuditLog({
    action: "blog_admin.upsert",
    entityType: "BlogPostAdmin",
    entityId: row.id,
    after: { slug, status: input.status },
    actor: await getAdminUsernameFromCookies(),
  });

  return { ok: true };
}
