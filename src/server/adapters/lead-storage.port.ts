import type {
  BookingLeadRecord,
  ContactLeadRecord,
  LeadWorkflowStatus,
  NewsletterLeadRecord,
  StoredLead,
} from "@/lib/leads/types";

/**
 * Port for lead persistence — implemented by Neon (Prisma), file JSON, or future external CRMs.
 * Keeps domain records stable if the backend is extracted to a separate service later.
 */
export interface LeadStorageAdapter {
  appendBooking(row: Omit<BookingLeadRecord, "id" | "createdAt" | "status" | "type">): Promise<BookingLeadRecord>;
  appendNewsletter(row: Omit<NewsletterLeadRecord, "id" | "createdAt" | "status" | "type">): Promise<NewsletterLeadRecord>;
  appendContact(row: Omit<ContactLeadRecord, "id" | "createdAt" | "status" | "type">): Promise<ContactLeadRecord>;

  listBookings(): Promise<BookingLeadRecord[]>;
  listNewsletters(): Promise<NewsletterLeadRecord[]>;
  listContacts(): Promise<ContactLeadRecord[]>;

  updateBookingStatus(id: string, status: LeadWorkflowStatus): Promise<void>;
  updateNewsletterStatus(id: string, status: LeadWorkflowStatus): Promise<void>;
  updateContactStatus(id: string, status: LeadWorkflowStatus): Promise<void>;

  listAllLeads(): Promise<StoredLead[]>;
}
