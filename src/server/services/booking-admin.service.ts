import type { BookingRequestStatus, LeadStatus } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { getAdminUsernameFromCookies, isAdminAuthenticated } from "@/server/auth/admin-session";
import { writeAuditLog } from "@/server/services/audit-log.service";
import { toJsonSnapshot } from "@/server/services/json-snapshot";
import { bookingRequestRepository } from "@/server/repositories/booking-request.repository";

const PIPE: BookingRequestStatus[] = ["new", "contacted", "booked", "completed", "cancelled"];

function bookingPipeToLeadStatus(s: BookingRequestStatus): LeadStatus {
  if (s === "completed") return "closed";
  if (s === "cancelled") return "archived";
  return s as LeadStatus;
}

export type BookingUpdateResult = { ok: true } | { ok: false; error: string };

export async function updateBookingRequest(input: {
  id: string;
  status?: string;
  internalNotes?: string | null;
}): Promise<BookingUpdateResult> {
  if (!(await isAdminAuthenticated())) return { ok: false, error: "Unauthorized." };
  if (!process.env.DATABASE_URL?.trim()) return { ok: false, error: "Database not configured." };

  const id = input.id.trim();
  if (!id) return { ok: false, error: "Missing id." };

  const data: Prisma.BookingRequestUpdateInput = {};
  if (input.status !== undefined) {
    const st = input.status as BookingRequestStatus;
    if (!PIPE.includes(st)) return { ok: false, error: "Invalid status." };
    data.status = st;
  }
  if (input.internalNotes !== undefined) {
    data.internalNotes = input.internalNotes === null ? null : String(input.internalNotes).slice(0, 12000);
  }

  if (Object.keys(data).length === 0) return { ok: false, error: "Nothing to update." };

  const before = await bookingRequestRepository.findByIdWithLead(id);
  if (!before) return { ok: false, error: "Not found." };

  const leadStatus =
    input.status !== undefined ? bookingPipeToLeadStatus(input.status as BookingRequestStatus) : undefined;

  await bookingRequestRepository.updateWithLeadStatus(id, before.leadId, data, leadStatus);

  const after = await bookingRequestRepository.findById(id);
  await writeAuditLog({
    action: "booking.update",
    entityType: "BookingRequest",
    entityId: id,
    before: toJsonSnapshot(before),
    after: toJsonSnapshot(after ?? {}),
    actor: await getAdminUsernameFromCookies(),
  });

  return { ok: true };
}
