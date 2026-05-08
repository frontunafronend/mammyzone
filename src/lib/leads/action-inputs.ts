import type { SelectedSlot } from "@/lib/booking/types";
import type { NewsletterSignupSource } from "./types";

/** Serializable booking payload from the client wizard (M040). */
export type SubmitBookingRequestInput = {
  offeringId: string;
  localDateIso: string;
  slot: SelectedSlot;
  name: string;
  phone: string;
  email: string;
  notes: string;
  reference: string;
  submittedAtUtcIso: string;
  honeypot?: string | null;
  language: "he" | "en";
};

export type SubscribeNewsletterInput = {
  email: string;
  source: NewsletterSignupSource;
  honeypot?: string | null;
  language: "he" | "en";
};

export type SubmitContactInterestInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot?: string | null;
  language: "he" | "en";
  /** Origin label for admin triage, e.g. `homepage`, `contact-page` */
  source?: string;
};

export type LeadActionResult = { ok: true } | { ok: false; error: string };
