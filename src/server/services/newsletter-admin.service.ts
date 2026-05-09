import type { NewsletterSubscriberStatus } from "@prisma/client";
import { getAdminUsernameFromCookies, isAdminAuthenticated } from "@/server/auth/admin-session";
import { writeAuditLog } from "@/server/services/audit-log.service";
import { toJsonSnapshot } from "@/server/services/json-snapshot";
import { newsletterSubscriberRepository } from "@/server/repositories/newsletter-subscriber.repository";

export type AdminMutationResult = { ok: true } | { ok: false; error: string };

export async function updateNewsletterSubscriber(input: { id: string; status: string }): Promise<AdminMutationResult> {
  if (!(await isAdminAuthenticated())) return { ok: false, error: "Unauthorized." };
  if (!process.env.DATABASE_URL?.trim()) return { ok: false, error: "Database not configured." };

  const id = input.id.trim();
  const st = input.status as NewsletterSubscriberStatus;
  if (st !== "active" && st !== "unsubscribed") {
    return { ok: false, error: "Invalid status." };
  }

  const before = await newsletterSubscriberRepository.findById(id);
  if (!before) return { ok: false, error: "Not found." };

  const row = await newsletterSubscriberRepository.updateStatus(id, st);

  await writeAuditLog({
    action: "newsletter.subscriber_update",
    entityType: "NewsletterSubscriber",
    entityId: id,
    before: toJsonSnapshot(before),
    after: toJsonSnapshot(row),
    actor: await getAdminUsernameFromCookies(),
  });

  return { ok: true };
}
