import type { Prisma } from "@prisma/client";
import { getPrisma } from "@/server/db";

export const blogPostAdminRepository = {
  upsertBySlug(slug: string, create: Prisma.BlogPostAdminCreateInput, update: Prisma.BlogPostAdminUpdateInput) {
    return getPrisma().blogPostAdmin.upsert({
      where: { slug },
      create,
      update,
    });
  },

  listOrderedByUpdated() {
    return getPrisma().blogPostAdmin.findMany({ orderBy: { updatedAt: "desc" } });
  },
};
