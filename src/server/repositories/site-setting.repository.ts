import type { Prisma } from "@prisma/client";
import { getPrisma } from "@/server/db";

export const siteSettingRepository = {
  upsert(key: string, value: Prisma.InputJsonValue) {
    return getPrisma().siteSetting.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
  },

  listAll() {
    return getPrisma().siteSetting.findMany({ orderBy: { key: "asc" } });
  },
};
