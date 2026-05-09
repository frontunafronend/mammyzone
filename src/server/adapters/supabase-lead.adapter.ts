import type { LeadStorageAdapter } from "@/server/adapters/lead-storage.port";
import type {
  BookingLeadRecord,
  ContactLeadRecord,
  LeadWorkflowStatus,
  NewsletterLeadRecord,
  StoredLead,
} from "@/lib/leads/types";

/**
 * TODO M040 — Supabase / Postgres adapter
 *
 * Integration outline:
 * - Env: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (server only), optional `SUPABASE_LEADS_SCHEMA`.
 * - Tables: `booking_leads`, `newsletter_leads`, `contact_leads` mirroring {@link StoredLead} fields + indexes on `created_at`, `status`.
 * - RLS: deny anon; service role from Route Handlers / Server Actions only.
 * - Replace `getLeadStorage()` branch when `LEADS_STORAGE_DRIVER=supabase`.
 */
export class SupabaseLeadStorage implements LeadStorageAdapter {
  async appendBooking(): Promise<BookingLeadRecord> {
    throw new Error(
      "SupabaseLeadStorage not implemented. Set LEADS_STORAGE_DRIVER=file for local dev, then implement adapter-supabase.ts.",
    );
  }

  async appendNewsletter(): Promise<NewsletterLeadRecord> {
    throw new Error(
      "SupabaseLeadStorage not implemented. Set LEADS_STORAGE_DRIVER=file for local dev, then implement adapter-supabase.ts.",
    );
  }

  async appendContact(): Promise<ContactLeadRecord> {
    throw new Error(
      "SupabaseLeadStorage not implemented. Set LEADS_STORAGE_DRIVER=file for local dev, then implement adapter-supabase.ts.",
    );
  }

  async listBookings(): Promise<BookingLeadRecord[]> {
    throw new Error("SupabaseLeadStorage.listBookings not implemented.");
  }

  async listNewsletters(): Promise<NewsletterLeadRecord[]> {
    throw new Error("SupabaseLeadStorage.listNewsletters not implemented.");
  }

  async listContacts(): Promise<ContactLeadRecord[]> {
    throw new Error("SupabaseLeadStorage.listContacts not implemented.");
  }

  async updateBookingStatus(): Promise<void> {
    throw new Error("SupabaseLeadStorage.updateBookingStatus not implemented.");
  }

  async updateNewsletterStatus(): Promise<void> {
    throw new Error("SupabaseLeadStorage.updateNewsletterStatus not implemented.");
  }

  async updateContactStatus(): Promise<void> {
    throw new Error("SupabaseLeadStorage.updateContactStatus not implemented.");
  }

  async listAllLeads(): Promise<StoredLead[]> {
    throw new Error("SupabaseLeadStorage.listAllLeads not implemented.");
  }
}
