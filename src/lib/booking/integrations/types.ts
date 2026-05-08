/**
 * Integration contracts — implement adapters when wiring Cal.com, Google Calendar,
 * WhatsApp Business API, PayPlus, or Tranzila. UI stays on `BookingWizard` + catalog.
 */

export type CalComBookingPayload = {
  offeringId: string;
  startUtcIso: string;
  attendeeName: string;
  attendeePhone: string;
  attendeeEmail?: string;
  notes?: string;
};

export type CalComAdapter = {
  id: "calcom";
  /** e.g. NEXT_PUBLIC_CALCOM_USERNAME / event slug */
  createHold: (payload: CalComBookingPayload) => Promise<{ bookingUrl: string } | { error: string }>;
};

export type GoogleCalendarAdapter = {
  id: "google_calendar";
  /** Service account or OAuth — block conflicting events */
  syncBusyWindows: (range: { fromUtcIso: string; toUtcIso: string }) => Promise<
    { busyUtc: { start: string; end: string }[] } | { error: string }
  >;
};

export type WhatsAppReminderAdapter = {
  id: "whatsapp";
  /** Template messages or deep-link handoff */
  scheduleReminder: (payload: {
    phoneE164: string;
    messageHe: string;
    messageEn: string;
    sendAtUtcIso: string;
  }) => Promise<{ ok: true } | { error: string }>;
};

export type PaymentProviderId = "payplus" | "tranzila";

export type PaymentIntentPayload = {
  amountAgorot: number;
  descriptionHe: string;
  descriptionEn: string;
  customerEmail?: string;
  customerPhone: string;
  reference: string;
};

export type PaymentAdapter = {
  provider: PaymentProviderId;
  createCheckoutSession: (
    payload: PaymentIntentPayload,
  ) => Promise<{ redirectUrl: string } | { error: string }>;
};

export type BookingIntegrations = {
  calcom?: CalComAdapter;
  googleCalendar?: GoogleCalendarAdapter;
  whatsapp?: WhatsAppReminderAdapter;
  payment?: PaymentAdapter;
};
