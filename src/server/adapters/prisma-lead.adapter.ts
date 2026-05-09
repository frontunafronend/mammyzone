import type { BookingRequestStatus, LeadStatus, Prisma } from "@prisma/client";
import { getPrisma } from "@/server/db";
import type { LeadStorageAdapter } from "@/server/adapters/lead-storage.port";
import type {
  BookingLeadRecord,
  ContactLeadRecord,
  LeadWorkflowStatus,
  NewsletterLeadRecord,
  StoredLead,
} from "@/lib/leads/types";

function leadStatusToBookingPipe(s: LeadStatus): BookingRequestStatus {
  if (s === "closed") return "completed";
  if (s === "archived") return "cancelled";
  return s as BookingRequestStatus;
}

function prismaLeadStatusToWorkflow(s: LeadStatus): LeadWorkflowStatus {
  return s as LeadWorkflowStatus;
}

function workflowToPrismaLeadStatus(s: LeadWorkflowStatus): LeadStatus {
  return s as LeadStatus;
}

export class PrismaLeadStorage implements LeadStorageAdapter {
  private db = getPrisma();

  async appendBooking(
    row: Omit<BookingLeadRecord, "id" | "createdAt" | "status" | "type">,
  ): Promise<BookingLeadRecord> {
    const result = await this.db.$transaction(async (tx) => {
      const lead = await tx.lead.create({
        data: {
          type: "booking",
          status: "new",
          name: row.name,
          phone: row.phone,
          email: row.email || null,
          message: row.notes || null,
          source: "/book",
          metadata: {
            language: row.language,
            offeringSnapshot: row.offeringSnapshot,
            slot: row.slot,
            localDateIso: row.localDateIso,
          } as Prisma.InputJsonValue,
        },
      });

      const br = await tx.bookingRequest.create({
        data: {
          leadId: lead.id,
          offeringId: row.offeringSnapshot.id,
          offeringTitle: `${row.offeringSnapshot.titleHe} / ${row.offeringSnapshot.titleEn}`,
          bookingKind: row.offeringSnapshot.kind,
          date: row.localDateIso,
          timeSlot: `${row.slot.localTimeLabelHe} / ${row.slot.localTimeLabelEn}`,
          timezone: "Asia/Jerusalem",
          reference: row.reference,
          notes: row.notes,
          preferredContactMethod: null,
          status: "new",
        },
      });

      return { lead, br };
    });

    return this.composeBooking(result.lead.id, result.lead, result.br);
  }

  async appendNewsletter(
    row: Omit<NewsletterLeadRecord, "id" | "createdAt" | "status" | "type">,
  ): Promise<NewsletterLeadRecord> {
    const lead = await this.db.$transaction(async (tx) => {
      const l = await tx.lead.create({
        data: {
          type: "newsletter",
          status: "new",
          email: row.email,
          name: null,
          phone: null,
          message: null,
          source: row.source,
          metadata: { language: row.language } as Prisma.InputJsonValue,
        },
      });

      await tx.newsletterSubscriber.upsert({
        where: { email: row.email },
        create: {
          email: row.email,
          source: row.source,
          language: row.language,
          status: "active",
          lastSignupLeadId: l.id,
        },
        update: {
          source: row.source,
          language: row.language,
          status: "active",
          subscribedAt: new Date(),
          lastSignupLeadId: l.id,
        },
      });

      return l;
    });

    return this.mapNewsletterLead(lead.id);
  }

  async appendContact(
    row: Omit<ContactLeadRecord, "id" | "createdAt" | "status" | "type">,
  ): Promise<ContactLeadRecord> {
    const { lead, ci } = await this.db.$transaction(async (tx) => {
      const l = await tx.lead.create({
        data: {
          type: "contact",
          status: "new",
          name: row.name,
          phone: row.phone || null,
          email: row.email || null,
          message: row.message,
          source: row.source ?? "/contact",
          metadata: {
            language: row.language,
            interestType: row.interestType,
            preferredMethod: row.preferredMethod,
          } as Prisma.InputJsonValue,
        },
      });

      const c = await tx.contactInquiry.create({
        data: {
          leadId: l.id,
          name: row.name,
          phone: row.phone || null,
          email: row.email || null,
          interestType: row.interestType ?? "not_sure",
          preferredMethod: row.preferredMethod ?? "whatsapp",
          message: row.message,
          source: row.source ?? "/contact",
        },
      });

      return { lead: l, ci: c };
    });

    return this.composeContact(lead, ci);
  }

  async listBookings(): Promise<BookingLeadRecord[]> {
    const rows = await this.db.lead.findMany({
      where: { type: "booking" },
      orderBy: { createdAt: "desc" },
      include: { bookingRequest: true },
    });
    return rows.filter((r) => r.bookingRequest).map((r) => this.composeBooking(r.id, r, r.bookingRequest!));
  }

  async listNewsletters(): Promise<NewsletterLeadRecord[]> {
    const rows = await this.db.lead.findMany({
      where: { type: "newsletter" },
      orderBy: { createdAt: "desc" },
    });
    return rows.map((r) => this.mapNewsletterLeadRow(r));
  }

  async listContacts(): Promise<ContactLeadRecord[]> {
    const rows = await this.db.lead.findMany({
      where: { type: "contact" },
      orderBy: { createdAt: "desc" },
      include: { contactInquiry: true },
    });
    return rows.filter((r) => r.contactInquiry).map((r) => this.composeContact(r, r.contactInquiry!));
  }

  async updateBookingStatus(id: string, status: LeadWorkflowStatus): Promise<void> {
    const ls = workflowToPrismaLeadStatus(status);
    const pipe = leadStatusToBookingPipe(ls);
    await this.db.$transaction([
      this.db.lead.update({ where: { id }, data: { status: ls } }),
      this.db.bookingRequest.update({
        where: { leadId: id },
        data: { status: pipe },
      }),
    ]);
  }

  async updateNewsletterStatus(id: string, status: LeadWorkflowStatus): Promise<void> {
    const ls = workflowToPrismaLeadStatus(status);
    await this.db.$transaction(async (tx) => {
      await tx.lead.update({ where: { id }, data: { status: ls } });
      const lead = await tx.lead.findUnique({ where: { id } });
      if (lead?.email && status === "archived") {
        await tx.newsletterSubscriber.updateMany({
          where: { email: lead.email },
          data: { status: "unsubscribed" },
        });
      }
    });
  }

  async updateContactStatus(id: string, status: LeadWorkflowStatus): Promise<void> {
    const ls = workflowToPrismaLeadStatus(status);
    await this.db.lead.update({ where: { id }, data: { status: ls } });
  }

  async listAllLeads(): Promise<StoredLead[]> {
    const [bookings, newsletters, contacts] = await Promise.all([
      this.listBookings(),
      this.listNewsletters(),
      this.listContacts(),
    ]);
    const merged: StoredLead[] = [...bookings, ...newsletters, ...contacts];
    merged.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return merged;
  }

  private async mapBookingLead(leadId: string): Promise<BookingLeadRecord> {
    const row = await this.db.lead.findUniqueOrThrow({
      where: { id: leadId },
      include: { bookingRequest: true },
    });
    if (!row.bookingRequest) throw new Error("BookingRequest missing");
    return this.composeBooking(leadId, row, row.bookingRequest);
  }

  private composeBooking(
    leadId: string,
    lead: {
      status: LeadStatus;
      createdAt: Date;
      metadata: Prisma.JsonValue | null;
      name: string | null;
      phone: string | null;
      email: string | null;
    },
    br: {
      offeringId: string;
      offeringTitle: string;
      bookingKind: string;
      date: string;
      timeSlot: string;
      timezone: string;
      reference: string;
      notes: string;
      status: BookingRequestStatus;
    },
  ): BookingLeadRecord {
    const meta = (lead.metadata ?? {}) as Record<string, unknown>;
    const snap = meta.offeringSnapshot as
      | { id?: string; kind?: string; titleHe?: string; titleEn?: string }
      | undefined;
    const slotMeta = meta.slot as
      | {
          startUtcIso?: string;
          localTimeLabel?: { he?: string; en?: string };
          localTimeLabelHe?: string;
          localTimeLabelEn?: string;
        }
      | undefined;
    const localDateIso = typeof meta.localDateIso === "string" ? meta.localDateIso : br.date;
    const parts = br.offeringTitle.split(" / ");
    const offeringSnapshot = {
      id: snap?.id ?? br.offeringId,
      kind: snap?.kind ?? br.bookingKind,
      titleHe: snap?.titleHe ?? parts[0] ?? br.offeringTitle,
      titleEn: snap?.titleEn ?? (parts.slice(1).join(" / ") || parts[0] || br.offeringTitle),
    };
    const slot = {
      startUtcIso: slotMeta?.startUtcIso ?? br.date,
      localTimeLabelHe: slotMeta?.localTimeLabel?.he ?? slotMeta?.localTimeLabelHe ?? br.timeSlot,
      localTimeLabelEn: slotMeta?.localTimeLabel?.en ?? slotMeta?.localTimeLabelEn ?? br.timeSlot,
    };
    return {
      id: leadId,
      type: "booking",
      status: prismaLeadStatusToWorkflow(lead.status),
      createdAt: lead.createdAt.toISOString(),
      reference: br.reference,
      offeringSnapshot,
      localDateIso,
      slot,
      name: lead.name ?? "",
      phone: lead.phone ?? "",
      email: lead.email ?? "",
      notes: br.notes,
      language: meta.language === "en" ? "en" : "he",
    };
  }

  private mapNewsletterLead(leadId: string): Promise<NewsletterLeadRecord> {
    return this.db.lead.findUniqueOrThrow({ where: { id: leadId } }).then((r) => this.mapNewsletterLeadRow(r));
  }

  private mapNewsletterLeadRow(lead: {
    id: string;
    status: LeadStatus;
    createdAt: Date;
    email: string | null;
    source: string | null;
    metadata: Prisma.JsonValue | null;
  }): NewsletterLeadRecord {
    const meta = (lead.metadata ?? {}) as { language?: string };
    return {
      id: lead.id,
      type: "newsletter",
      status: prismaLeadStatusToWorkflow(lead.status),
      createdAt: lead.createdAt.toISOString(),
      email: lead.email ?? "",
      source: (lead.source as NewsletterLeadRecord["source"]) ?? "footer",
      language: meta.language === "en" ? "en" : "he",
    };
  }

  private composeContact(
    lead: {
      id: string;
      status: LeadStatus;
      createdAt: Date;
      metadata: Prisma.JsonValue | null;
    },
    ci: {
      name: string;
      phone: string | null;
      email: string | null;
      interestType: string;
      preferredMethod: string;
      message: string;
      source: string;
    },
  ): ContactLeadRecord {
    const meta = (lead.metadata ?? {}) as { language?: string; interestType?: string; preferredMethod?: string };
    return {
      id: lead.id,
      type: "contact",
      status: prismaLeadStatusToWorkflow(lead.status),
      createdAt: lead.createdAt.toISOString(),
      name: ci.name,
      email: ci.email ?? "",
      phone: ci.phone ?? "",
      message: ci.message,
      language: meta.language === "en" ? "en" : "he",
      source: ci.source,
      interestType: (ci.interestType as ContactLeadRecord["interestType"]) ?? undefined,
      preferredMethod: (ci.preferredMethod as ContactLeadRecord["preferredMethod"]) ?? undefined,
    };
  }
}
