import type {
  ContactInterestType,
  ContactPreferredMethod,
  NewsletterSignupSource,
} from "./types";

const CONTACT_INTEREST: readonly ContactInterestType[] = [
  "private_session",
  "yoga_after_birth",
  "pregnancy_yoga",
  "baby_massage",
  "nlp",
  "workshop",
  "retreat",
  "not_sure",
] as const;

const CONTACT_METHOD: readonly ContactPreferredMethod[] = ["whatsapp", "phone", "email"] as const;

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function isHoneypotTriggered(honeypot: string | null | undefined): boolean {
  return Boolean(honeypot && honeypot.trim().length > 0);
}

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function validateEmail(raw: string): { ok: true; email: string } | { ok: false; message: string } {
  const email = normalizeEmail(raw);
  if (!email) return { ok: false, message: "Email is required." };
  if (email.length > 254) return { ok: false, message: "Email is too long." };
  if (!EMAIL_RE.test(email)) return { ok: false, message: "Invalid email address." };
  return { ok: true, email };
}

/** Booking email field is optional */
export function validateOptionalEmail(
  raw: string,
): { ok: true; email: string } | { ok: false; message: string } {
  const t = raw.trim();
  if (!t) return { ok: true, email: "" };
  return validateEmail(t);
}

export function validatePhone(raw: string): { ok: true; phone: string } | { ok: false; message: string } {
  const phone = raw.trim();
  if (!phone) return { ok: false, message: "Phone is required." };
  if (phone.length > 40) return { ok: false, message: "Phone is too long." };
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 8) return { ok: false, message: "Phone number looks too short." };
  return { ok: true, phone };
}

export function validateName(
  raw: string,
  opts?: { optional?: boolean },
): { ok: true; name: string } | { ok: false; message: string } {
  const name = raw.trim();
  if (!name) {
    if (opts?.optional) return { ok: true, name: "" };
    return { ok: false, message: "Name is required." };
  }
  if (name.length > 120) return { ok: false, message: "Name is too long." };
  return { ok: true, name };
}

export function validateNotes(raw: string): { ok: true; notes: string } | { ok: false; message: string } {
  const notes = raw.trim();
  if (notes.length > 4000) return { ok: false, message: "Notes are too long." };
  return { ok: true, notes };
}

export function validateMessage(
  raw: string,
): { ok: true; text: string } | { ok: false; error: string } {
  const text = raw.trim();
  if (!text) return { ok: false, error: "Message is required." };
  if (text.length > 4000) return { ok: false, error: "Message is too long." };
  return { ok: true, text };
}

export function validateOptionalPhone(
  raw: string,
): { ok: true; phone: string } | { ok: false; message: string } {
  const phone = raw.trim();
  if (!phone) return { ok: true, phone: "" };
  return validatePhone(raw);
}

export function validateNewsletterSource(
  raw: string,
): { ok: true; source: NewsletterSignupSource } | { ok: false; message: string } {
  if (raw === "modal" || raw === "footer" || raw === "blog") return { ok: true, source: raw };
  return { ok: false, message: "Invalid signup source." };
}

export function validateLanguage(raw: string): { ok: true; language: "he" | "en" } | { ok: false; message: string } {
  if (raw === "he" || raw === "en") return { ok: true, language: raw };
  return { ok: false, message: "Invalid language." };
}

export function validateReference(raw: string): { ok: true; reference: string } | { ok: false; message: string } {
  const reference = raw.trim().toUpperCase();
  if (!/^MZ-[0-9A-Z]{4,12}$/.test(reference)) return { ok: false, message: "Invalid booking reference." };
  return { ok: true, reference };
}

export function validateContactInterestType(
  raw: string,
): { ok: true; value: ContactInterestType } | { ok: false; message: string } {
  if (CONTACT_INTEREST.includes(raw as ContactInterestType)) {
    return { ok: true, value: raw as ContactInterestType };
  }
  return { ok: false, message: "Invalid interest selection." };
}

export function validateContactPreferredMethod(
  raw: string,
): { ok: true; value: ContactPreferredMethod } | { ok: false; message: string } {
  if (CONTACT_METHOD.includes(raw as ContactPreferredMethod)) {
    return { ok: true, value: raw as ContactPreferredMethod };
  }
  return { ok: false, message: "Invalid contact preference." };
}
