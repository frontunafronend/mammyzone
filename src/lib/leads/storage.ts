import type {
  BookingLeadRecord,
  ContactLeadRecord,
  LeadWorkflowStatus,
  NewsletterLeadRecord,
  StoredLead,
} from "./types";

/**
 * Admin-readable persistence for bookings, newsletter signups, and contact interest.
 *
 * TODO (M040+): Swap implementation via `LEADS_STORAGE_DRIVER` — see `get-lead-storage.ts`.
 * - `file` — JSON file under `LEADS_DATA_DIR` (local / writable disk only; not durable on Vercel serverless).
 * - `supabase` — Postgres-backed (stub in `adapter-supabase.ts`).
 * - `airtable` — ops-friendly grid (stub in `adapter-airtable.ts`).
 */
export interface LeadStorageAdapter {
  appendBooking(
    row: Omit<BookingLeadRecord, "id" | "createdAt" | "status" | "type">,
  ): Promise<BookingLeadRecord>;
  appendNewsletter(
    row: Omit<NewsletterLeadRecord, "id" | "createdAt" | "status" | "type">,
  ): Promise<NewsletterLeadRecord>;
  appendContact(
    row: Omit<ContactLeadRecord, "id" | "createdAt" | "status" | "type">,
  ): Promise<ContactLeadRecord>;

  listBookings(): Promise<BookingLeadRecord[]>;
  listNewsletters(): Promise<NewsletterLeadRecord[]>;
  listContacts(): Promise<ContactLeadRecord[]>;

  updateBookingStatus(id: string, status: LeadWorkflowStatus): Promise<void>;
  updateNewsletterStatus(id: string, status: LeadWorkflowStatus): Promise<void>;
  updateContactStatus(id: string, status: LeadWorkflowStatus): Promise<void>;

  /** Single merged list for exports / audits */
  listAllLeads(): Promise<StoredLead[]>;
}
