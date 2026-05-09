import type { Prisma } from "@prisma/client";
import { getPrisma } from "@/server/db";

export const lessonServiceRepository = {
  create(data: Prisma.LessonServiceCreateInput) {
    return getPrisma().lessonService.create({ data });
  },

  findById(id: string) {
    return getPrisma().lessonService.findUnique({ where: { id } });
  },

  update(id: string, data: Prisma.LessonServiceUpdateInput) {
    return getPrisma().lessonService.update({ where: { id }, data });
  },

  listActiveOrderedByTitleEn() {
    return getPrisma().lessonService.findMany({ where: { active: true }, orderBy: { titleEn: "asc" } });
  },

  listAllOrderedByUpdated() {
    return getPrisma().lessonService.findMany({ orderBy: { updatedAt: "desc" } });
  },
};
