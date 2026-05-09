"use server";

import { revalidatePath } from "next/cache";
import { upsertSiteSetting } from "@/server/services/site-settings-admin.service";

export type AdminMutationResult = { ok: true } | { ok: false; error: string };

export async function upsertSiteSettingAction(input: { key: string; value: unknown }): Promise<AdminMutationResult> {
  const r = await upsertSiteSetting(input);
  if (r.ok) revalidatePath("/admin/settings");
  return r;
}
