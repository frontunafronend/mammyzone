import { DateTime } from "luxon";
import type { LessonScheduleLocationType } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { getAdminUsernameFromCookies, isAdminAuthenticated } from "@/server/auth/admin-session";
import { writeAuditLog } from "@/server/services/audit-log.service";
import { toJsonSnapshot } from "@/server/services/json-snapshot";
import { lessonScheduleRepository } from "@/server/repositories/lesson-schedule.repository";
import { lessonServiceRepository } from "@/server/repositories/lesson-service.repository";

export type AdminMutationResult = { ok: true } | { ok: false; error: string };

const ZONE = "Asia/Jerusalem";

const LOCATIONS: LessonScheduleLocationType[] = ["studio", "online", "home", "retreat"];

function parseLocal(date: string, time: string): DateTime | null {
  const t = time.length === 5 ? `${time}:00` : time;
  const dt = DateTime.fromISO(`${date}T${t}`, { zone: ZONE });
  return dt.isValid ? dt : null;
}

export async function createLessonSchedule(input: {
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  locationType: LessonScheduleLocationType;
  locationText?: string | null;
}): Promise<AdminMutationResult> {
  if (!(await isAdminAuthenticated())) return { ok: false, error: "Unauthorized." };
  if (!process.env.DATABASE_URL?.trim()) return { ok: false, error: "Database not configured." };

  const serviceId = input.serviceId.trim();
  if (!serviceId) return { ok: false, error: "Service is required." };

  const date = input.date.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { ok: false, error: "Date must be YYYY-MM-DD." };

  const start = parseLocal(date, input.startTime.trim());
  const end = parseLocal(date, input.endTime.trim());
  if (!start || !end) return { ok: false, error: "Invalid time." };
  if (end <= start) return { ok: false, error: "End time must be after start time." };

  if (!LOCATIONS.includes(input.locationType)) return { ok: false, error: "Invalid location type." };

  const capacity = Math.max(1, Math.min(500, Math.floor(input.capacity)));

  const service = await lessonServiceRepository.findById(serviceId);
  if (!service) return { ok: false, error: "Unknown service." };

  const row = await lessonScheduleRepository.create({
    service: { connect: { id: serviceId } },
    date,
    startTime: input.startTime.trim().slice(0, 8),
    endTime: input.endTime.trim().slice(0, 8),
    capacity,
    bookedCount: 0,
    locationType: input.locationType,
    locationText: input.locationText?.trim().slice(0, 500) || null,
    active: true,
  });

  await writeAuditLog({
    action: "schedule.create",
    entityType: "LessonSchedule",
    entityId: row.id,
    after: { date, start: input.startTime, end: input.endTime },
    actor: await getAdminUsernameFromCookies(),
  });

  return { ok: true };
}

export async function updateLessonSchedule(input: {
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
  if (!(await isAdminAuthenticated())) return { ok: false, error: "Unauthorized." };
  if (!process.env.DATABASE_URL?.trim()) return { ok: false, error: "Database not configured." };

  const id = input.id.trim();
  const before = await lessonScheduleRepository.findById(id);
  if (!before) return { ok: false, error: "Not found." };

  const data: Prisma.LessonScheduleUpdateInput = {};
  const date = input.date ?? before.date;
  if (input.date !== undefined) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date.trim())) return { ok: false, error: "Date must be YYYY-MM-DD." };
    data.date = input.date.trim();
  }
  if (input.startTime !== undefined) data.startTime = input.startTime.trim().slice(0, 8);
  if (input.endTime !== undefined) data.endTime = input.endTime.trim().slice(0, 8);
  if (input.capacity !== undefined) data.capacity = Math.max(1, Math.min(500, Math.floor(input.capacity)));
  if (input.bookedCount !== undefined) data.bookedCount = Math.max(0, Math.floor(input.bookedCount));
  if (input.active !== undefined) data.active = input.active;
  if (input.locationType !== undefined) {
    if (!LOCATIONS.includes(input.locationType)) return { ok: false, error: "Invalid location type." };
    data.locationType = input.locationType;
  }
  if (input.locationText !== undefined) data.locationText = input.locationText?.trim().slice(0, 500) || null;

  const startT = (input.startTime ?? before.startTime).trim();
  const endT = (input.endTime ?? before.endTime).trim();
  const start = parseLocal(date, startT);
  const end = parseLocal(date, endT);
  if (!start || !end) return { ok: false, error: "Invalid time." };
  if (end <= start) return { ok: false, error: "End time must be after start time." };

  if (Object.keys(data).length === 0) return { ok: false, error: "Nothing to update." };

  const row = await lessonScheduleRepository.update(id, data);
  await writeAuditLog({
    action: "schedule.update",
    entityType: "LessonSchedule",
    entityId: id,
    before: toJsonSnapshot(before),
    after: toJsonSnapshot(row),
    actor: await getAdminUsernameFromCookies(),
  });

  return { ok: true };
}
