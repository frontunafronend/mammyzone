import { getPrisma } from "@/server/db";

export const newsletterSubscriberRepository = {
  findById(id: string) {
    return getPrisma().newsletterSubscriber.findUnique({ where: { id } });
  },

  updateStatus(id: string, status: "active" | "unsubscribed") {
    return getPrisma().newsletterSubscriber.update({
      where: { id },
      data: { status },
    });
  },

  listForAdmin(take = 500) {
    return getPrisma().newsletterSubscriber.findMany({
      orderBy: { subscribedAt: "desc" },
      take,
    });
  },

  listAllForExport() {
    return getPrisma().newsletterSubscriber.findMany({
      orderBy: { subscribedAt: "desc" },
    });
  },
};
