/**
 * Canonical MammyZone contact channels (M042).
 * Import from here for wa.me / tel / mailto — avoid duplicating digits in components.
 */

/** WhatsApp `wa.me` path: country + number without leading + or 0 */
export const WHATSAPP_NUMBER_DIGITS = "972544256903" as const;

/** Click-to-call (E.164) */
export const PHONE_E164 = "+972544256903" as const;

export const EMAIL_ADDRESS = "ortitul@gmail.com" as const;

/** Human display (Israel) */
export const PHONE_DISPLAY_IL = "054-425-6903" as const;

export function buildTelHref(): string {
  return `tel:${PHONE_E164.replace(/\s/g, "")}`;
}

export function buildMailtoHref(options?: { subject?: string; body?: string }): string {
  const params = new URLSearchParams();
  if (options?.subject) params.set("subject", options.subject);
  if (options?.body) params.set("body", options.body);
  const q = params.toString();
  return q ? `mailto:${EMAIL_ADDRESS}?${q}` : `mailto:${EMAIL_ADDRESS}`;
}

/** Base `https://wa.me/…` without pre-filled text */
export function buildWhatsAppMeUrl(prefillText?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER_DIGITS}`;
  const t = prefillText?.trim();
  if (!t) return base;
  const u = new URL(base);
  u.searchParams.set("text", t);
  return u.toString();
}

/** First contact on WhatsApp — Hebrew-first body, bilingual block */
export function buildContactIntroWhatsAppText(language: "he" | "en"): string {
  const he = "היי אורטל, הגעתי מעמוד הקשר באתר MammyZone. אשמח לשיחה קצרה.";
  const en = "Hi Ortal — I came from the MammyZone contact page and would love a brief chat.";
  return language === "he" ? `${he}\n\n---\n\n${en}` : `${en}\n\n---\n\n${he}`;
}

/** Same object shape as legacy `siteContact` for drop-in replacement */
export const siteContact = {
  phoneDisplay: PHONE_DISPLAY_IL,
  phoneTel: buildTelHref(),
  whatsappUrl: buildWhatsAppMeUrl(),
  email: EMAIL_ADDRESS,
  mailto: buildMailtoHref(),
} as const;
