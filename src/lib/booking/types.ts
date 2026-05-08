import type { Bilingual } from "@/types";

/** Top-level offering families — maps to UX tabs and future billing rules */
export type BookingKind =
  | "workshop"
  | "private_session"
  | "yoga_class"
  | "retreat"
  | "package";

/** Capabilities we may enable per offering (payments, video, memberships) */
export type OfferingCapabilities = {
  recurring: boolean;
  videoSession: boolean;
  membershipEligible: boolean;
  communityAccess: boolean;
};

export type BookingOffering = {
  id: string;
  kind: BookingKind;
  title: Bilingual;
  description: Bilingual;
  durationMin: number;
  /** Display only until PayPlus / Tranzila is wired */
  priceHint: Bilingual;
  capabilities: OfferingCapabilities;
};

export type BookingStep = "service" | "date" | "time" | "confirm";

export type SelectedSlot = {
  startUtcIso: string;
  localTimeLabel: Bilingual;
};

export type BookingDraft = {
  offeringId: string | null;
  localDateIso: string | null;
  slot: SelectedSlot | null;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

export type BookingRequestPayload = {
  offering: BookingOffering;
  localDateIso: string;
  slot: SelectedSlot;
  name: string;
  phone: string;
  email: string;
  notes: string;
  reference: string;
  submittedAtUtcIso: string;
};
