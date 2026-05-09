import type { BookingRequestStatus, LeadStatus, Prisma } from "@prisma/client";
import { getPrisma } from "@/server/db";

export const bookingRequestRepository = {
  findByIdWithLead(id: string) {
    return getPrisma().bookingRequest.findUnique({ where: { id }, include: { lead: true } });
  },

  findById(id: string) {
    return getPrisma().bookingRequest.findUnique({ where: { id } });
  },

  async updateWithLeadStatus(
    id: string,
    leadId: string,
    data: Prisma.BookingRequestUpdateInput,
    leadStatus: LeadStatus | undefined,
  ) {
    const db = getPrisma();
    await db.$transaction(async (tx) => {
      await tx.bookingRequest.update({ where: { id }, data });
      if (leadStatus !== undefined) {
        await tx.lead.update({ where: { id: leadId }, data: { status: leadStatus } });
      }
    });
  },

  listForAdminTable(take = 200) {
    return getPrisma().bookingRequest.findMany({
      orderBy: { createdAt: "desc" },
      take,
      include: { lead: true },
    });
  },
};

export type BookingPipelineStatus = BookingRequestStatus;
