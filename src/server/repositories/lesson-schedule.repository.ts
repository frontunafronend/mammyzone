import type { Prisma } from "@prisma/client";
import { getPrisma } from "@/server/db";

export const lessonScheduleRepository = {
  findById(id: string) {
    return getPrisma().lessonSchedule.findUnique({ where: { id } });
  },

  create(data: Prisma.LessonScheduleCreateInput) {
    return getPrisma().lessonSchedule.create({ data });
  },

  update(id: string, data: Prisma.LessonScheduleUpdateInput) {
    return getPrisma().lessonSchedule.update({ where: { id }, data });
  },

  listWithService(take = 400) {
    return getPrisma().lessonSchedule.findMany({
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
      take,
      include: { service: true },
    });
  },
};
