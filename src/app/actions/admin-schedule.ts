"use server";

import { revalidatePath } from "next/cache";
import type { LessonScheduleLocationType } from "@prisma/client";
import { createLessonSchedule, updateLessonSchedule } from "@/server/services/schedule-admin.service";

export type AdminMutationResult = { ok: true } | { ok: false; error: string };

export async function createLessonScheduleAction(input: {
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  locationType: LessonScheduleLocationType;
  locationText?: string | null;
}): Promise<AdminMutationResult> {
  const r = await createLessonSchedule(input);
  if (r.ok) {
    revalidatePath("/admin/schedule");
    revalidatePath("/admin");
  }
  return r;
}

export async function updateLessonScheduleAction(input: {
  id: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  capacity?: number;
  bookedCount?: number;
  active?: boolean;
  locationType?: LessonScheduleLocationType;
  locationText?: string | null;
}): Promise<AdminMutationResult> {
  const r = await updateLessonSchedule(input);
  if (r.ok) {
    revalidatePath("/admin/schedule");
    revalidatePath("/admin");
  }
  return r;
}
