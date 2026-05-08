import type { LeadStorageAdapter } from "./storage";
import type {
  BookingLeadRecord,
  ContactLeadRecord,
  LeadWorkflowStatus,
  NewsletterLeadRecord,
  StoredLead,
} from "./types";

/**
 * TODO M040 — Airtable adapter (ops / marketing grids)
 *
 * Integration outline:
 * - Env: `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, table IDs per entity.
 * - Map MammyZone fields to Airtable columns; use `status` single-select matching {@link LeadWorkflowStatus}.
 * - Rate-limit friendly batching for bulk export if needed.
 * - Replace `getLeadStorage()` branch when `LEADS_STORAGE_DRIVER=airtable`.
 */
export class AirtableLeadStorage implements LeadStorageAdapter {
  async appendBooking(): Promise<BookingLeadRecord> {
    throw new Error(
      "AirtableLeadStorage not implemented. Set LEADS_STORAGE_DRIVER=file for local dev, then implement adapter-airtable.ts.",
    );
  }

  async appendNewsletter(): Promise<NewsletterLeadRecord> {
    throw new Error(
      "AirtableLeadStorage not implemented. Set LEADS_STORAGE_DRIVER=file for local dev, then implement adapter-airtable.ts.",
    );
  }

  async appendContact(): Promise<ContactLeadRecord> {
    throw new Error(
      "AirtableLeadStorage not implemented. Set LEADS_STORAGE_DRIVER=file for local dev, then implement adapter-airtable.ts.",
    );
  }

  async listBookings(): Promise<BookingLeadRecord[]> {
    throw new Error("AirtableLeadStorage.listBookings not implemented.");
  }

  async listNewsletters(): Promise<NewsletterLeadRecord[]> {
    throw new Error("AirtableLeadStorage.listNewsletters not implemented.");
  }

  async listContacts(): Promise<ContactLeadRecord[]> {
    throw new Error("AirtableLeadStorage.listContacts not implemented.");
  }

  async updateBookingStatus(): Promise<void> {
    throw new Error("AirtableLeadStorage.updateBookingStatus not implemented.");
  }

  async updateNewsletterStatus(): Promise<void> {
    throw new Error("AirtableLeadStorage.updateNewsletterStatus not implemented.");
  }

  async updateContactStatus(): Promise<void> {
    throw new Error("AirtableLeadStorage.updateContactStatus not implemented.");
  }

  async listAllLeads(): Promise<StoredLead[]> {
    throw new Error("AirtableLeadStorage.listAllLeads not implemented.");
  }
}
