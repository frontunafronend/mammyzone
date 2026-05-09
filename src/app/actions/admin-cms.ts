"use server";

import { revalidatePath } from "next/cache";
import type { BlogPostAdminStatus, ContentPageStatus } from "@prisma/client";
import { upsertBlogPostAdmin, upsertContentPage } from "@/server/services/cms-admin.service";

export type AdminMutationResult = { ok: true } | { ok: false; error: string };

export async function upsertContentPageAction(input: {
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
  const r = await upsertContentPage(input);
  if (r.ok) revalidatePath("/admin/content");
  return r;
}

export async function upsertBlogPostAdminAction(input: {
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
  const r = await upsertBlogPostAdmin(input);
  if (r.ok) revalidatePath("/admin/blog");
  return r;
}
