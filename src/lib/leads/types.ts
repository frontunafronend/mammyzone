/** Shared workflow for admin triage (M041). Newsletter rows use the same enum for consistency. */
export type LeadWorkflowStatus = "new" | "contacted" | "booked" | "closed";

export type NewsletterSignupSource = "modal" | "footer" | "blog";

export type BookingLeadRecord = {
  id: string;
  type: "booking";
  status: LeadWorkflowStatus;
  createdAt: string;
  reference: string;
  offeringSnapshot: {
    id: string;
    kind: string;
    titleHe: string;
    titleEn: string;
  };
  localDateIso: string;
  slot: {
    startUtcIso: string;
    localTimeLabelHe: string;
    localTimeLabelEn: string;
  };
  name: string;
  phone: string;
  email: string;
  notes: string;
  language: "he" | "en";
};

export type NewsletterLeadRecord = {
  id: string;
  type: "newsletter";
  status: LeadWorkflowStatus;
  createdAt: string;
  email: string;
  source: NewsletterSignupSource;
  language: "he" | "en";
};

export type ContactLeadRecord = {
  id: string;
  type: "contact";
  status: LeadWorkflowStatus;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  language: "he" | "en";
  /** e.g. homepage, footer, future /contact */
  source?: string;
};

export type StoredLead = BookingLeadRecord | NewsletterLeadRecord | ContactLeadRecord;

export type LeadsStoreFile = {
  version: 1;
  bookings: BookingLeadRecord[];
  newsletters: NewsletterLeadRecord[];
  contacts: ContactLeadRecord[];
};
