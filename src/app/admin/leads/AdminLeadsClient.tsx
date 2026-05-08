"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { logoutAdmin, updateLeadStatus } from "@/app/actions/leads";
import type { UpdateLeadStatusInput } from "@/app/actions/leads";
import type {
  BookingLeadRecord,
  ContactLeadRecord,
  LeadWorkflowStatus,
  NewsletterLeadRecord,
} from "@/lib/leads/types";

type Props = {
  bookings: BookingLeadRecord[];
  newsletters: NewsletterLeadRecord[];
  contacts: ContactLeadRecord[];
};

type Row =
  | { kind: "booking"; row: BookingLeadRecord }
  | { kind: "newsletter"; row: NewsletterLeadRecord }
  | { kind: "contact"; row: ContactLeadRecord };

const STATUSES: LeadWorkflowStatus[] = ["new", "contacted", "booked", "closed"];

function toRows(p: Props): Row[] {
  const out: Row[] = [
    ...p.bookings.map((row) => ({ kind: "booking" as const, row })),
    ...p.newsletters.map((row) => ({ kind: "newsletter" as const, row })),
    ...p.contacts.map((row) => ({ kind: "contact" as const, row })),
  ];
  out.sort((a, b) => (a.row.createdAt < b.row.createdAt ? 1 : -1));
  return out;
}

function rowSummary(r: Row): string {
  if (r.kind === "booking") {
    const b = r.row;
    return `${b.offeringSnapshot.titleEn} · ${b.localDateIso} · ${b.name}`;
  }
  if (r.kind === "newsletter") return r.row.email;
  const c = r.row;
  const tail = c.email?.trim() ? c.email : c.phone;
  return `${c.name} — ${tail}`;
}

function rowDetail(r: Row): string {
  if (r.kind === "booking") {
    const b = r.row;
    return [
      `Ref: ${b.reference}`,
      `Phone: ${b.phone}`,
      b.email ? `Email: ${b.email}` : "",
      `Slot UTC: ${b.slot.startUtcIso}`,
      `Notes: ${b.notes || "—"}`,
    ]
      .filter(Boolean)
      .join("\n");
  }
  if (r.kind === "newsletter") {
    return `Source: ${r.row.source}\nLang: ${r.row.language}`;
  }
  const c = r.row;
  const lines = [
    `Source: ${c.source ?? "—"}`,
    c.interestType ? `Interest: ${c.interestType}` : "",
    c.preferredMethod ? `Reply via: ${c.preferredMethod}` : "",
    `Phone: ${c.phone || "—"}`,
    c.email?.trim() ? `Email: ${c.email}` : "",
    `Message:\n${c.message?.trim() ? c.message : "—"}`,
  ];
  return lines.filter(Boolean).join("\n");
}

export function AdminLeadsClient({ bookings, newsletters, contacts }: Props) {
  const router = useRouter();
  const [typeFilter, setTypeFilter] = useState<"all" | "booking" | "newsletter" | "contact">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | LeadWorkflowStatus>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [pendingId, setPendingId] = useState<string | null>(null);

  const rows = useMemo(() => toRows({ bookings, newsletters, contacts }), [bookings, newsletters, contacts]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (typeFilter !== "all" && r.kind !== typeFilter) return false;
      if (statusFilter !== "all" && r.row.status !== statusFilter) return false;
      const day = r.row.createdAt.slice(0, 10);
      if (dateFrom && day < dateFrom) return false;
      if (dateTo && day > dateTo) return false;
      return true;
    });
  }, [rows, typeFilter, statusFilter, dateFrom, dateTo]);

  const onStatusChange = async (input: UpdateLeadStatusInput) => {
    setPendingId(input.id);
    const res = await updateLeadStatus(input);
    setPendingId(null);
    if (res.ok) router.refresh();
  };

  return (
    <div className="admin-leads">
      <header className="admin-leads__head">
        <div>
          <h1>Leads</h1>
          <p className="admin-leads__meta">
            {bookings.length} booking · {newsletters.length} newsletter · {contacts.length} contact
          </p>
        </div>
        <div className="admin-leads__toolbar">
          <label>
            Type
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
            >
              <option value="all">All</option>
              <option value="booking">Booking</option>
              <option value="newsletter">Newsletter</option>
              <option value="contact">Contact</option>
            </select>
          </label>
          <label>
            Status
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            >
              <option value="all">All</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label>
            From
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="admin-leads__date"
            />
          </label>
          <label>
            To
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="admin-leads__date"
            />
          </label>
          <a className="admin-leads__btn admin-leads__btn--primary" href="/api/admin/leads-export">
            Export CSV
          </a>
          <button
            type="button"
            className="admin-leads__btn"
            onClick={() => void logoutAdmin().then(() => window.location.reload())}
          >
            Log out
          </button>
        </div>
      </header>

      <div className="admin-leads__table-wrap">
        {filtered.length === 0 ? (
          <p className="admin-leads__empty">No rows match these filters.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Created</th>
                <th>Type</th>
                <th>Summary</th>
                <th>Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={`${r.kind}-${r.row.id}`}>
                  <td className="admin-leads__mono">{r.row.createdAt.slice(0, 19).replace("T", " ")}</td>
                  <td>{r.kind}</td>
                  <td>{rowSummary(r)}</td>
                  <td className="admin-leads__detail">{rowDetail(r)}</td>
                  <td>
                    <select
                      aria-label="Status"
                      value={r.row.status}
                      disabled={pendingId === r.row.id}
                      onChange={(e) =>
                        void onStatusChange({
                          kind: r.kind,
                          id: r.row.id,
                          status: e.target.value as LeadWorkflowStatus,
                        })
                      }
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
