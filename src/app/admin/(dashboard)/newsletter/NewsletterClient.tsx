"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { updateNewsletterSubscriberAction } from "@/app/actions/admin-newsletter";

type SubStatus = "active" | "unsubscribed";

type Row = {
  id: string;
  email: string;
  source: string;
  language: string;
  status: SubStatus;
  subscribedAt: string;
};

type Props = { rows: Row[] };

export function NewsletterClient({ rows }: Props) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [pending, setPending] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((r) => r.email.toLowerCase().includes(s));
  }, [rows, q]);

  const onStatus = async (id: string, status: SubStatus) => {
    setPending(id);
    const r = await updateNewsletterSubscriberAction({ id, status });
    setPending(null);
    if (r.ok) router.refresh();
    else alert(r.error);
  };

  return (
    <>
      <div className="admin-leads__toolbar" style={{ marginBottom: "1rem" }}>
        <label>
          Search email
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="admin-leads__date"
            placeholder="contains…"
          />
        </label>
        <a className="admin-leads__btn admin-leads__btn--primary" href="/api/admin/newsletter-export">
          Export CSV
        </a>
      </div>
      <div className="admin-leads__table-wrap">
        {filtered.length === 0 ? (
          <p className="admin-leads__empty">No subscribers match this search.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Source</th>
                <th>Lang</th>
                <th>Subscribed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>{r.email}</td>
                  <td>{r.source}</td>
                  <td>{r.language}</td>
                  <td className="admin-leads__mono">{r.subscribedAt.slice(0, 19).replace("T", " ")}</td>
                  <td>
                    <select
                      value={r.status}
                      disabled={pending === r.id}
                      onChange={(e) => void onStatus(r.id, e.target.value as SubStatus)}
                    >
                      <option value="active">active</option>
                      <option value="unsubscribed">unsubscribed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
