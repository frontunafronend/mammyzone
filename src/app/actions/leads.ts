"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE } from "@/server/auth/session";
import { getAdminUsernameFromCookies, isAdminAuthenticated } from "@/server/auth/admin-session";
import { performAdminLogin } from "@/server/services/admin-login.service";
import { getOfferingById } from "@/lib/booking/catalog";
import { validateBookingSelection } from "@/server/validators/booking-submission";
import type {
  SubmitBookingRequestInput,
  SubscribeNewsletterInput,
  SubmitContactInterestInput,
  LeadActionResult,
} from "@/lib/leads/action-inputs";
import { getLeadStorage } from "@/server/adapters/lead-storage.factory";
import type { LeadWorkflowStatus } from "@/lib/leads/types";
import {
  isHoneypotTriggered,
  validateContactInterestType,
  validateContactPreferredMethod,
  validateEmail,
  validateLanguage,
  validateName,
  validateNewsletterSource,
  validateNotes,
  validateOptionalEmail,
  validatePhone,
  validateReference,
} from "@/server/validators/leads";
import { writeAuditLog } from "@/server/services/audit-log.service";

function revalidateAdmin() {
  const paths = [
    "/admin",
    "/admin/leads",
    "/admin/bookings",
    "/admin/newsletter",
    "/admin/audit",
    "/admin/system",
  ];
  for (const p of paths) revalidatePath(p);
}

export async function submitBookingRequest(input: SubmitBookingRequestInput): Promise<LeadActionResult> {
  if (isHoneypotTriggered(input.honeypot)) return { ok: true };

  const lang = validateLanguage(input.language);
  if (!lang.ok) return { ok: false, error: lang.message };

  const sel = validateBookingSelection(input.offeringId, input.localDateIso, input.slot);
  if (!sel.ok) return { ok: false, error: sel.message };

  const offering = getOfferingById(sel.offeringId);
  if (!offering) return { ok: false, error: "Unknown service." };

  const name = validateName(input.name);
  if (!name.ok) return { ok: false, error: name.message };

  const phone = validatePhone(input.phone);
  if (!phone.ok) return { ok: false, error: phone.message };

  const email = validateOptionalEmail(input.email);
  if (!email.ok) return { ok: false, error: email.message };

  const notes = validateNotes(input.notes);
  if (!notes.ok) return { ok: false, error: notes.message };

  const ref = validateReference(input.reference);
  if (!ref.ok) return { ok: false, error: ref.message };

  try {
    await getLeadStorage().appendBooking({
      reference: ref.reference,
      offeringSnapshot: {
        id: offering.id,
        kind: offering.kind,
        titleHe: offering.title.he,
        titleEn: offering.title.en,
      },
      localDateIso: input.localDateIso,
      slot: {
        startUtcIso: input.slot.startUtcIso,
        localTimeLabelHe: input.slot.localTimeLabel.he,
        localTimeLabelEn: input.slot.localTimeLabel.en,
      },
      name: name.name,
      phone: phone.phone,
      email: email.email,
      notes: notes.notes,
      language: lang.language,
    });
  } catch (e) {
    console.error("submitBookingRequest persistence error", e);
    return {
      ok: false,
      error:
        "We could not save your booking request. Please continue with WhatsApp, or try again later.",
    };
  }

  revalidateAdmin();
  return { ok: true };
}

export async function subscribeNewsletter(input: SubscribeNewsletterInput): Promise<LeadActionResult> {
  if (isHoneypotTriggered(input.honeypot)) return { ok: true };

  const lang = validateLanguage(input.language);
  if (!lang.ok) return { ok: false, error: lang.message };

  const src = validateNewsletterSource(input.source);
  if (!src.ok) return { ok: false, error: src.message };

  const email = validateEmail(input.email);
  if (!email.ok) return { ok: false, error: email.message };

  try {
    await getLeadStorage().appendNewsletter({
      email: email.email,
      source: src.source,
      language: lang.language,
    });
  } catch (e) {
    console.error("subscribeNewsletter persistence error", e);
    return { ok: false, error: "We could not subscribe you right now. Please try again later." };
  }

  revalidateAdmin();
  return { ok: true };
}

export async function submitContactInterest(input: SubmitContactInterestInput): Promise<LeadActionResult> {
  if (isHoneypotTriggered(input.honeypot)) return { ok: true };

  const lang = validateLanguage(input.language);
  if (!lang.ok) return { ok: false, error: lang.message };

  const name = validateName(input.name);
  if (!name.ok) return { ok: false, error: name.message };

  const email = validateOptionalEmail(input.email || "");
  if (!email.ok) return { ok: false, error: email.message };

  const phone = validatePhone(input.phone || "");
  if (!phone.ok) return { ok: false, error: phone.message };

  const interest = validateContactInterestType(input.interestType);
  if (!interest.ok) return { ok: false, error: interest.message };

  const method = validateContactPreferredMethod(input.preferredMethod);
  if (!method.ok) return { ok: false, error: method.message };

  const msg = validateNotes(input.message || "");
  if (!msg.ok) return { ok: false, error: msg.message };

  try {
    await getLeadStorage().appendContact({
      name: name.name,
      email: email.email,
      phone: phone.phone,
      message: msg.notes,
      language: lang.language,
      source: input.source?.slice(0, 120) ?? "/contact",
      interestType: interest.value,
      preferredMethod: method.value,
    });
  } catch (e) {
    console.error("submitContactInterest persistence error", e);
    return { ok: false, error: "We could not send your message. Please try again later." };
  }

  revalidateAdmin();
  return { ok: true };
}

export type UpdateLeadStatusInput = {
  kind: "booking" | "newsletter" | "contact";
  id: string;
  status: LeadWorkflowStatus;
};

export async function updateLeadStatus(input: UpdateLeadStatusInput): Promise<LeadActionResult> {
  if (!(await isAdminAuthenticated())) return { ok: false, error: "Unauthorized." };

  const allowed: LeadWorkflowStatus[] = ["new", "contacted", "booked", "closed", "archived"];
  if (!allowed.includes(input.status)) return { ok: false, error: "Invalid status." };

  try {
    const store = getLeadStorage();
    if (input.kind === "booking") await store.updateBookingStatus(input.id, input.status);
    else if (input.kind === "newsletter") await store.updateNewsletterStatus(input.id, input.status);
    else await store.updateContactStatus(input.id, input.status);
  } catch (e) {
    console.error("updateLeadStatus", e);
    return { ok: false, error: "Could not update status." };
  }

  await writeAuditLog({
    action: "lead.status_update",
    entityType: input.kind,
    entityId: input.id,
    after: { status: input.status },
    actor: await getAdminUsernameFromCookies(),
  });

  revalidateAdmin();
  return { ok: true };
}

export async function loginAdmin(username: string, password: string): Promise<LeadActionResult> {
  const result = await performAdminLogin(username, password);
  if (result.ok) revalidateAdmin();
  return result;
}

export async function logoutAdmin(): Promise<LeadActionResult> {
  cookies().delete(ADMIN_SESSION_COOKIE);
  revalidateAdmin();
  return { ok: true };
}
