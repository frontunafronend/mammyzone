"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createAdminSessionToken, ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin/session";
import { getOfferingById } from "@/lib/booking/catalog";
import { validateBookingSelection } from "@/lib/booking/server/validate-submission";
import type {
  SubmitBookingRequestInput,
  SubscribeNewsletterInput,
  SubmitContactInterestInput,
  LeadActionResult,
} from "@/lib/leads/action-inputs";
import { getLeadStorage } from "@/lib/leads/get-lead-storage";
import type { LeadWorkflowStatus } from "@/lib/leads/types";
import {
  isHoneypotTriggered,
  validateEmail,
  validateLanguage,
  validateName,
  validateMessage,
  validateNewsletterSource,
  validateNotes,
  validateOptionalEmail,
  validateOptionalPhone,
  validatePhone,
  validateReference,
} from "@/lib/leads/validation";

function readAdminSecret(): string | null {
  const k = process.env.ADMIN_ACCESS_KEY?.trim();
  return k && k.length > 0 ? k : null;
}

function isAdminAuthenticated(): boolean {
  const secret = readAdminSecret();
  if (!secret) return false;
  const tok = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!tok) return false;
  return verifyAdminSessionToken(tok, secret);
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

  revalidatePath("/admin/leads");
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

  revalidatePath("/admin/leads");
  return { ok: true };
}

/**
 * Contact / interest form (M042 will add `/contact` UI). Callable from any future server component or route.
 */
export async function submitContactInterest(input: SubmitContactInterestInput): Promise<LeadActionResult> {
  if (isHoneypotTriggered(input.honeypot)) return { ok: true };

  const lang = validateLanguage(input.language);
  if (!lang.ok) return { ok: false, error: lang.message };

  const name = validateName(input.name);
  if (!name.ok) return { ok: false, error: name.message };

  const email = validateEmail(input.email);
  if (!email.ok) return { ok: false, error: email.message };

  const phone = validateOptionalPhone(input.phone || "");
  if (!phone.ok) return { ok: false, error: phone.message };

  const msg = validateMessage(input.message);
  if (!msg.ok) return { ok: false, error: msg.error };

  try {
    await getLeadStorage().appendContact({
      name: name.name,
      email: email.email,
      phone: phone.phone,
      message: msg.text,
      language: lang.language,
      source: input.source?.slice(0, 120),
    });
  } catch (e) {
    console.error("submitContactInterest persistence error", e);
    return { ok: false, error: "We could not send your message. Please try again later." };
  }

  revalidatePath("/admin/leads");
  return { ok: true };
}

export type UpdateLeadStatusInput = {
  kind: "booking" | "newsletter" | "contact";
  id: string;
  status: LeadWorkflowStatus;
};

export async function updateLeadStatus(input: UpdateLeadStatusInput): Promise<LeadActionResult> {
  if (!isAdminAuthenticated()) return { ok: false, error: "Unauthorized." };

  const allowed: LeadWorkflowStatus[] = ["new", "contacted", "booked", "closed"];
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

  revalidatePath("/admin/leads");
  return { ok: true };
}

export async function loginAdmin(password: string): Promise<LeadActionResult> {
  const secret = readAdminSecret();
  if (!secret) return { ok: false, error: "Admin access is not configured (missing ADMIN_ACCESS_KEY)." };

  const trimmed = password.trim();
  if (trimmed !== secret) return { ok: false, error: "Invalid password." };

  const token = createAdminSessionToken(secret);
  cookies().set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  revalidatePath("/admin/leads");
  return { ok: true };
}

export async function logoutAdmin(): Promise<LeadActionResult> {
  cookies().delete(ADMIN_SESSION_COOKIE);
  revalidatePath("/admin/leads");
  return { ok: true };
}
