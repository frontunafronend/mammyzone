"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { updateLeadStatus } from "@/app/actions/leads";
import type { UpdateLeadStatusInput } from "@/app/actions/leads";
import type {
  BookingLeadRecord,
  ContactLeadRecord,
  LeadWorkflowStatus,
  NewsletterLeadRecord,
} from "@/lib/leads/types";
import { adminT } from "@/lib/admin-i18n";
import { useLanguage, type Language } from "@/lib/i18n";

type Props = {
  bookings: BookingLeadRecord[];
  newsletters: NewsletterLeadRecord[];
  contacts: ContactLeadRecord[];
};

type Row =
  | { kind: "booking"; row: BookingLeadRecord }
  | { kind: "newsletter"; row: NewsletterLeadRecord }
  | { kind: "contact"; row: ContactLeadRecord };

const STATUSES: LeadWorkflowStatus[] = ["new", "contacted", "booked", "closed", "archived"];

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

function rowKindLabel(kind: Row["kind"], lang: Language): string {
  if (kind === "booking") return adminT("leadsOptionBooking", lang);
  if (kind === "newsletter") return adminT("leadsOptionNewsletter", lang);
  return adminT("leadsOptionContact", lang);
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
  const { language } = useLanguage();
  const router = useRouter();
  const [typeFilter, setTypeFilter] = useState<"all" | "booking" | "newsletter" | "contact">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | LeadWorkflowStatus>("all");
  const [sourceFilter, setSourceFilter] = useState("");
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
      if (sourceFilter.trim()) {
        const s = sourceFilter.toLowerCase();
        if (r.kind === "booking") {
          const blob = `book ${r.row.reference}`.toLowerCase();
          if (!blob.includes(s)) return false;
        } else if (r.kind === "newsletter") {
          if (!r.row.source.toLowerCase().includes(s)) return false;
        } else if (!(r.row.source ?? "").toLowerCase().includes(s)) return false;
      }
      return true;
    });
  }, [rows, typeFilter, statusFilter, dateFrom, dateTo, sourceFilter]);

  const onStatusChange = async (input: UpdateLeadStatusInput) => {
    setPendingId(input.id);
    const res = await updateLeadStatus(input);
    setPendingId(null);
    if (res.ok) router.refresh();
    else alert(res.error);
  };

  return (
    <div className="admin-leads">
      <header className="admin-leads__head">
        <div>
          <h1>{adminT("leadsTitle", language)}</h1>
          <p className="admin-leads__meta">
            {bookings.length} {adminT("leadsNounBookings", language)} · {newsletters.length}{" "}
            {adminT("leadsNounNewsletters", language)} · {contacts.length} {adminT("leadsNounContacts", language)}
          </p>
        </div>
        <div className="admin-leads__toolbar">
          <label>
            {adminT("leadsLabelType", language)}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
            >
              <option value="all">{adminT("leadsOptionAll", language)}</option>
              <option value="booking">{adminT("leadsOptionBooking", language)}</option>
              <option value="newsletter">{adminT("leadsOptionNewsletter", language)}</option>
              <option value="contact">{adminT("leadsOptionContact", language)}</option>
            </select>
          </label>
          <label>
            {adminT("leadsLabelStatus", language)}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            >
              <option value="all">{adminT("leadsOptionAll", language)}</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label>
            {adminT("leadsLabelSourceContains", language)}
            <input
              type="text"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="admin-leads__date"
              placeholder={adminT("leadsPlaceholderSource", language)}
            />
          </label>
          <label>
            {adminT("leadsLabelFrom", language)}
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="admin-leads__date"
            />
          </label>
          <label>
            {adminT("leadsLabelTo", language)}
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="admin-leads__date"
            />
          </label>
          <a className="admin-leads__btn admin-leads__btn--primary" href="/api/admin/leads-export">
            {adminT("leadsExportCsv", language)}
          </a>
        </div>
      </header>

      <div className="admin-leads__table-wrap">
        {filtered.length === 0 ? (
          <p className="admin-leads__empty">{adminT("leadsEmpty", language)}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>{adminT("leadsColCreated", language)}</th>
                <th>{adminT("leadsColType", language)}</th>
                <th>{adminT("leadsColSummary", language)}</th>
                <th>{adminT("leadsColDetails", language)}</th>
                <th>{adminT("leadsColStatus", language)}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={`${r.kind}-${r.row.id}`}>
                  <td className="admin-leads__mono">{r.row.createdAt.slice(0, 19).replace("T", " ")}</td>
                  <td>{rowKindLabel(r.kind, language)}</td>
                  <td>{rowSummary(r)}</td>
                  <td className="admin-leads__detail">{rowDetail(r)}</td>
                  <td>
                    <select
                      aria-label={adminT("leadsStatusAria", language)}
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
