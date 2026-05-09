import { Prisma } from "@prisma/client";
import { getAdminUsernameFromCookies, isAdminAuthenticated } from "@/server/auth/admin-session";
import { writeAuditLog } from "@/server/services/audit-log.service";
import { toJsonSnapshot } from "@/server/services/json-snapshot";
import { lessonServiceRepository } from "@/server/repositories/lesson-service.repository";

export type AdminMutationResult = { ok: true; id?: string } | { ok: false; error: string };

function validSlug(s: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s) && s.length >= 2 && s.length <= 120;
}

export async function createLessonService(input: {
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
  if (!(await isAdminAuthenticated())) return { ok: false, error: "Unauthorized." };
  if (!process.env.DATABASE_URL?.trim()) return { ok: false, error: "Database not configured." };

  const slug = input.slug.trim().toLowerCase();
  if (!validSlug(slug)) return { ok: false, error: "Invalid slug (lowercase letters, numbers, hyphens)." };

  const titleHe = input.titleHe.trim().slice(0, 500);
  const titleEn = input.titleEn.trim().slice(0, 500);
  if (!titleHe || !titleEn) return { ok: false, error: "Titles are required." };

  const descriptionHe = input.descriptionHe.trim().slice(0, 20000);
  const descriptionEn = input.descriptionEn.trim().slice(0, 20000);
  const type = input.type.trim().slice(0, 80) || "service";
  const duration = Math.max(5, Math.min(1440, Math.floor(input.durationMinutes)));
  const price = Math.max(0, input.price);
  const currency = (input.currency ?? "ILS").trim().toUpperCase().slice(0, 3) || "ILS";

  let row;
  try {
    row = await lessonServiceRepository.create({
      slug,
      titleHe,
      titleEn,
      descriptionHe,
      descriptionEn,
      type,
      durationMinutes: duration,
      price: new Prisma.Decimal(price),
      currency,
      active: true,
      featured: false,
    });
  } catch {
    return { ok: false, error: "Could not create (duplicate slug?)." };
  }

  await writeAuditLog({
    action: "service.create",
    entityType: "LessonService",
    entityId: row.id,
    after: { slug },
    actor: await getAdminUsernameFromCookies(),
  });

  return { ok: true, id: row.id };
}

export async function updateLessonService(input: {
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
  if (!(await isAdminAuthenticated())) return { ok: false, error: "Unauthorized." };
  if (!process.env.DATABASE_URL?.trim()) return { ok: false, error: "Database not configured." };

  const id = input.id.trim();
  const data: Prisma.LessonServiceUpdateInput = {};
  if (input.titleHe !== undefined) data.titleHe = input.titleHe.trim().slice(0, 500);
  if (input.titleEn !== undefined) data.titleEn = input.titleEn.trim().slice(0, 500);
  if (input.descriptionHe !== undefined) data.descriptionHe = input.descriptionHe.trim().slice(0, 20000);
  if (input.descriptionEn !== undefined) data.descriptionEn = input.descriptionEn.trim().slice(0, 20000);
  if (input.type !== undefined) data.type = input.type.trim().slice(0, 80);
  if (input.durationMinutes !== undefined) {
    data.durationMinutes = Math.max(5, Math.min(1440, Math.floor(input.durationMinutes)));
  }
  if (input.price !== undefined) data.price = new Prisma.Decimal(Math.max(0, input.price));
  if (input.currency !== undefined) data.currency = input.currency.trim().toUpperCase().slice(0, 3);
  if (input.active !== undefined) data.active = input.active;
  if (input.featured !== undefined) data.featured = input.featured;

  if (Object.keys(data).length === 0) return { ok: false, error: "Nothing to update." };

  const before = await lessonServiceRepository.findById(id);
  if (!before) return { ok: false, error: "Not found." };

  const row = await lessonServiceRepository.update(id, data);
  await writeAuditLog({
    action: "service.update",
    entityType: "LessonService",
    entityId: id,
    before: toJsonSnapshot(before),
    after: toJsonSnapshot(row),
    actor: await getAdminUsernameFromCookies(),
  });

  return { ok: true };
}
