import { DateTime } from "luxon";
import type { Bilingual } from "@/types";
import { BOOKING_ZONE } from "./timezone";
import type { BookingOffering } from "./types";

export type TimeSlot = {
  startUtcIso: string;
  localTimeLabel: Bilingual;
};

const BASE_HOURS = [8, 9, 10, 11, 14, 15, 16, 17, 18];

function seedFromId(id: string): number {
  return id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

/** Deterministic “open” hours — replaces Cal.com until integrated */
function hoursForOffering(offering: BookingOffering, weekday: number): number[] {
  const seed = seedFromId(offering.id);
  const filtered = BASE_HOURS.filter((h, i) => (seed + weekday * 7 + i * 3) % 4 !== 0);
  if (offering.kind === "retreat") return [10, 11];
  if (offering.kind === "workshop") return filtered.filter((h) => h >= 9 && h <= 19);
  return filtered.length ? filtered : [10, 15];
}

export function minBookableDateIso(): string {
  return DateTime.now().setZone(BOOKING_ZONE).toISODate() ?? "";
}

export function maxBookableDateIso(daysAhead = 56): string {
  return (
    DateTime.now()
      .setZone(BOOKING_ZONE)
      .plus({ days: daysAhead })
      .toISODate() ?? ""
  );
}

export function isDateBookable(localDateIso: string): boolean {
  const day = DateTime.fromISO(localDateIso, { zone: BOOKING_ZONE });
  if (!day.isValid) return false;
  const min = DateTime.fromISO(minBookableDateIso(), { zone: BOOKING_ZONE }).startOf("day");
  const max = DateTime.fromISO(maxBookableDateIso(), { zone: BOOKING_ZONE }).endOf("day");
  return day >= min && day <= max;
}

/**
 * Slots are wall-clock instants in `BOOKING_ZONE`, returned as UTC ISO for calendars APIs later.
 */
export function getSlotsForDate(
  localDateIso: string,
  offering: BookingOffering,
): TimeSlot[] {
  if (!isDateBookable(localDateIso)) return [];

  const startOfDay = DateTime.fromISO(localDateIso, { zone: BOOKING_ZONE }).startOf("day");
  if (!startOfDay.isValid) return [];

  const weekday = startOfDay.weekday;
  const hours = hoursForOffering(offering, weekday);

  return hours
    .map((hour) => {
      const local = startOfDay.set({ hour, minute: 0, second: 0, millisecond: 0 });
      const utc = local.toUTC();
      const startUtcIso = utc.toISO();
      if (!startUtcIso) return null;
      return {
        startUtcIso,
        localTimeLabel: {
          he: local.setLocale("he").toFormat("HH:mm"),
          en: local.setLocale("en").toFormat("h:mm a"),
        },
      };
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);
}

export function formatLongDate(localDateIso: string, lang: "he" | "en"): string {
  const d = DateTime.fromISO(localDateIso, { zone: BOOKING_ZONE });
  if (!d.isValid) return localDateIso;
  if (lang === "he") {
    return d.setLocale("he").toFormat("cccc, d בMMMM yyyy");
  }
  return d.setLocale("en").toFormat("cccc, MMMM d, yyyy");
}
