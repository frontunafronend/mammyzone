import { AdminBookingsPageChrome } from "./AdminBookingsPageChrome";
import { BookingsClient, type BookingRow } from "./BookingsClient";
import { AdminH1, AdminMuted } from "@/components/admin/AdminTypography";
import { listBookingRequestsForAdmin } from "@/server/services/booking-query.service";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  if (!process.env.DATABASE_URL?.trim()) {
    return (
      <div className="admin-panel">
        <AdminH1 k="bookingsTitle" />
        <AdminMuted k="dbConnectBookings" />
      </div>
    );
  }

  const rows = await listBookingRequestsForAdmin();

  const mapped: BookingRow[] = rows.map((r) => ({
    id: r.id,
    status: r.status,
    reference: r.reference,
    offeringTitle: r.offeringTitle,
    date: r.date,
    timeSlot: r.timeSlot,
    timezone: r.timezone,
    internalNotes: r.internalNotes,
    leadName: r.lead.name,
    leadPhone: r.lead.phone,
    leadEmail: r.lead.email,
    notes: r.notes,
    createdAt: r.createdAt.toISOString(),
  }));

  return (
    <div className="admin-panel">
      <AdminBookingsPageChrome timezone={mapped[0]?.timezone ?? "Asia/Jerusalem"} />
      <BookingsClient rows={mapped} />
    </div>
  );
}
