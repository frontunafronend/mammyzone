"use server";

import { revalidatePath } from "next/cache";
import { updateBookingRequest } from "@/server/services/booking-admin.service";

export type BookingUpdateResult = { ok: true } | { ok: false; error: string };

export async function updateBookingRequestAction(input: {
  id: string;
  status?: string;
  internalNotes?: string | null;
}): Promise<BookingUpdateResult> {
  const r = await updateBookingRequest(input);
  if (r.ok) {
    revalidatePath("/admin/bookings");
    revalidatePath("/admin/leads");
  }
  return r;
}
