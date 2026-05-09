import { lessonServiceRepository } from "@/server/repositories/lesson-service.repository";

export async function listLessonServicesForAdmin() {
  return lessonServiceRepository.listAllOrderedByUpdated();
}

export async function listActiveLessonServicesForSchedule() {
  return lessonServiceRepository.listActiveOrderedByTitleEn();
}
