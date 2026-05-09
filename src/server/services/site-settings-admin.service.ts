import { Prisma } from "@prisma/client";
import { getAdminUsernameFromCookies, isAdminAuthenticated } from "@/server/auth/admin-session";
import { writeAuditLog } from "@/server/services/audit-log.service";
import { siteSettingRepository } from "@/server/repositories/site-setting.repository";

export type AdminMutationResult = { ok: true } | { ok: false; error: string };

const KEY_RE = /^[a-z][a-z0-9_.]{1,80}$/;

export async function upsertSiteSetting(input: { key: string; value: unknown }): Promise<AdminMutationResult> {
  if (!(await isAdminAuthenticated())) return { ok: false, error: "Unauthorized." };
  if (!process.env.DATABASE_URL?.trim()) return { ok: false, error: "Database not configured." };

  const key = input.key.trim().toLowerCase();
  if (!KEY_RE.test(key)) return { ok: false, error: "Invalid setting key." };

  let json: Prisma.InputJsonValue;
  try {
    json = JSON.parse(JSON.stringify(input.value ?? null)) as Prisma.InputJsonValue;
  } catch {
    return { ok: false, error: "Value must be JSON-serializable." };
  }

  const row = await siteSettingRepository.upsert(key, json);

  await writeAuditLog({
    action: "settings.upsert",
    entityType: "SiteSetting",
    entityId: row.id,
    after: { key, value: json },
    actor: await getAdminUsernameFromCookies(),
  });

  return { ok: true };
}
