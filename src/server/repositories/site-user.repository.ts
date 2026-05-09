import { getPrisma } from "@/server/db";

export const siteUserRepository = {
  listForAdmin(take = 200) {
    return getPrisma().siteUser.findMany({ orderBy: { createdAt: "desc" }, take });
  },
};
