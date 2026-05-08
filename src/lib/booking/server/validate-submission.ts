import { getSlotsForDate, isDateBookable } from "@/lib/booking/availability";
import { getOfferingById } from "@/lib/booking/catalog";
import type { SelectedSlot } from "@/lib/booking/types";

export type BookingSubmissionValidation =
  | { ok: true; offeringId: string }
  | { ok: false; message: string };

/**
 * Server-side guard: offering must exist, date in range, slot must match generated availability.
 */
export function validateBookingSelection(
  offeringId: string,
  localDateIso: string,
  slot: SelectedSlot,
): BookingSubmissionValidation {
  const offering = getOfferingById(offeringId);
  if (!offering) return { ok: false, message: "Unknown service." };
  if (!isDateBookable(localDateIso)) return { ok: false, message: "Date is not available." };
  const slots = getSlotsForDate(localDateIso, offering);
  const match = slots.some((s) => s.startUtcIso === slot.startUtcIso);
  if (!match) return { ok: false, message: "Time slot is not valid for this date." };
  return { ok: true, offeringId: offering.id };
}
