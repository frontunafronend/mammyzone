"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateBookingRequestAction } from "@/app/actions/admin-bookings";
import { customerTelHref, customerWhatsAppUrl } from "@/lib/contact/customer-links";

export type BookingPipe = "new" | "contacted" | "booked" | "completed" | "cancelled";

export type BookingRow = {
  id: string;
  status: BookingPipe;
  reference: string;
  offeringTitle: string;
  date: string;
  timeSlot: string;
  timezone: string;
  internalNotes: string | null;
  leadName: string | null;
  leadPhone: string | null;
  leadEmail: string | null;
  notes: string;
  createdAt: string;
};

const STATUSES: BookingPipe[] = ["new", "contacted", "booked", "completed", "cancelled"];

type Props = { rows: BookingRow[] };

export function BookingsClient({ rows }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);

  const onStatus = async (id: string, status: BookingPipe) => {
    setPending(id);
    const r = await updateBookingRequestAction({ id, status });
    setPending(null);
    if (r.ok) router.refresh();
    else alert(r.error);
  };

  const onSaveNotes = async (id: string) => {
    const el = document.getElementById(`notes-${id}`) as HTMLTextAreaElement | null;
    setPending(id);
    const r = await updateBookingRequestAction({ id, internalNotes: el?.value ?? "" });
    setPending(null);
    if (r.ok) router.refresh();
    else alert(r.error);
  };

  if (rows.length === 0) {
    return <p className="admin-leads__empty">No booking requests in the database yet.</p>;
  }

  return (
    <div className="admin-leads__table-wrap">
      <table>
        <thead>
          <tr>
            <th>When</th>
            <th>Service</th>
            <th>Customer</th>
            <th>Slot</th>
            <th>Status</th>
            <th>Quick</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((b) => {
            const wa = b.leadPhone ? customerWhatsAppUrl(b.leadPhone) : null;
            const tel = b.leadPhone ? customerTelHref(b.leadPhone) : null;
            const mailto = b.leadEmail?.trim() ? `mailto:${b.leadEmail.trim()}` : null;
            return (
              <tr key={b.id}>
                <td className="admin-leads__mono">
                  {b.createdAt.slice(0, 16).replace("T", " ")}
                  <div className="admin-leads__meta">Ref {b.reference}</div>
                </td>
                <td>
                  <strong>{b.offeringTitle}</strong>
                </td>
                <td>
                  {b.leadName ?? "—"}
                  <div className="admin-leads__meta">{b.leadPhone ?? ""}</div>
                  <div className="admin-leads__meta">{b.leadEmail ?? ""}</div>
                </td>
                <td>
                  {b.date} · {b.timeSlot}
                  <div className="admin-leads__meta">{b.timezone}</div>
                </td>
                <td>
                  <select
                    aria-label="Booking status"
                    value={b.status}
                    disabled={pending === b.id}
                    onChange={(e) => void onStatus(b.id, e.target.value as BookingPipe)}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className="admin-table-actions">
                    {wa ? (
                      <a href={wa} target="_blank" rel="noreferrer">
                        WhatsApp
                      </a>
                    ) : null}
                    {tel ? (
                      <a href={tel}>
                        Call
                      </a>
                    ) : null}
                    {mailto ? (
                      <a href={mailto}>
                        Email
                      </a>
                    ) : null}
                  </div>
                </td>
                <td style={{ minWidth: "12rem" }}>
                  <textarea
                    id={`notes-${b.id}`}
                    rows={3}
                    defaultValue={b.internalNotes ?? ""}
                    style={{ width: "100%", fontSize: "0.78rem" }}
                  />
                  <div className="admin-leads__meta">Customer: {b.notes || "—"}</div>
                  <button type="button" className="admin-leads__btn" disabled={pending === b.id} onClick={() => void onSaveNotes(b.id)}>
                    Save internal notes
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
