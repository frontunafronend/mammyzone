import type { Prisma } from "@prisma/client";
import { getPrisma } from "@/server/db";

export const contentPageRepository = {
  upsertBySlug(slug: string, create: Prisma.ContentPageCreateInput, update: Prisma.ContentPageUpdateInput) {
    return getPrisma().contentPage.upsert({
      where: { slug },
      create,
      update,
    });
  },

  listOrderedByUpdated() {
    return getPrisma().contentPage.findMany({ orderBy: { updatedAt: "desc" } });
  },
};
