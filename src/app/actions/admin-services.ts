"use server";

import { revalidatePath } from "next/cache";
import { createLessonService, updateLessonService } from "@/server/services/lesson-catalog-admin.service";

export type AdminMutationResult = { ok: true; id?: string } | { ok: false; error: string };

export async function createLessonServiceAction(input: {
  slug: string;
  titleHe: string;
  titleEn: string;
  descriptionHe: string;
  descriptionEn: string;
  type: string;
  durationMinutes: number;
  price: number;
  currency?: string;
}): Promise<AdminMutationResult> {
  const r = await createLessonService(input);
  if (r.ok) {
    revalidatePath("/admin/services");
    revalidatePath("/admin/schedule");
  }
  return r;
}

export async function updateLessonServiceAction(input: {
  id: string;
  titleHe?: string;
  titleEn?: string;
  descriptionHe?: string;
  descriptionEn?: string;
  type?: string;
  durationMinutes?: number;
  price?: number;
  currency?: string;
  active?: boolean;
  featured?: boolean;
}): Promise<AdminMutationResult> {
  const r = await updateLessonService(input);
  if (r.ok) {
    revalidatePath("/admin/services");
    revalidatePath("/admin/schedule");
  }
  return r;
}
