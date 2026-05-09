import { lessonScheduleRepository } from "@/server/repositories/lesson-schedule.repository";

export async function listLessonSchedulesForAdmin() {
  return lessonScheduleRepository.listWithService();
}
