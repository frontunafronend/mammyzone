"use server";

import { revalidatePath } from "next/cache";
import { updateNewsletterSubscriber } from "@/server/services/newsletter-admin.service";

export type AdminMutationResult = { ok: true } | { ok: false; error: string };

export async function updateNewsletterSubscriberAction(input: {
  id: string;
  status: string;
}): Promise<AdminMutationResult> {
  const r = await updateNewsletterSubscriber(input);
  if (r.ok) {
    revalidatePath("/admin/newsletter");
    revalidatePath("/admin");
  }
  return r;
}
