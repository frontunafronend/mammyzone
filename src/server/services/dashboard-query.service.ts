import { dashboardRepository } from "@/server/repositories/dashboard.repository";

export type DashboardStats = {
  newLeads: number;
  bookingRequests: number;
  newsletterSubscribers: number;
  contactInquiries: number;
  upcomingSchedules: number;
  recentAudit: {
    id: string;
    action: string;
    entityType: string;
    entityId: string | null;
    createdAt: string;
    actor: string | null;
  }[];
};

export async function loadDashboardStats(): Promise<DashboardStats | null> {
  if (!process.env.DATABASE_URL?.trim()) return null;
  const { newLeads, bookingRequests, newsletterSubscribers, contactInquiries, upcomingSchedules, recentAudit } =
    await dashboardRepository.aggregateCounts();
  return {
    newLeads,
    bookingRequests,
    newsletterSubscribers,
    contactInquiries,
    upcomingSchedules,
    recentAudit: recentAudit.map((a) => ({
      ...a,
      createdAt: a.createdAt.toISOString(),
    })),
  };
}
