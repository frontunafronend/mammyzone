import { DateTime } from "luxon";
import { getPrisma } from "@/server/db";

const ZONE = "Asia/Jerusalem";

export const dashboardRepository = {
  async aggregateCounts() {
    const db = getPrisma();
    const today = DateTime.now().setZone(ZONE).toISODate()!;
    const [newLeads, bookingRequests, newsletterSubscribers, contactInquiries, upcomingSchedules, recentAudit] =
      await Promise.all([
        db.lead.count({ where: { status: "new" } }),
        db.bookingRequest.count(),
        db.newsletterSubscriber.count({ where: { status: "active" } }),
        db.lead.count({ where: { type: "contact" } }),
        db.lessonSchedule.count({
          where: { active: true, date: { gte: today } },
        }),
        db.auditLog.findMany({
          orderBy: { createdAt: "desc" },
          take: 12,
          select: { id: true, action: true, entityType: true, entityId: true, createdAt: true, actor: true },
        }),
      ]);
    return {
      newLeads,
      bookingRequests,
      newsletterSubscribers,
      contactInquiries,
      upcomingSchedules,
      recentAudit,
    };
  },
};
