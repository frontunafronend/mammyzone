"use client";

import Link from "next/link";
import { adminT } from "@/lib/admin-i18n";
import { useLanguage } from "@/lib/i18n";

export type AuditLogRow = {
  id: string;
  createdAt: string;
  action: string;
  entityType: string;
  entityId: string | null;
  actor: string | null;
  before: unknown;
  after: unknown;
};

export function AdminAuditLogClient({ rows }: { rows: AuditLogRow[] }) {
  const { language } = useLanguage();
  const dash = "—";

  return (
    <>
      <h1>{adminT("auditTitle", language)}</h1>
      <p className="admin-panel__muted">
        {adminT("auditTrailMuted", language)}{" "}
        <Link href="/admin">{adminT("auditBackDashboard", language)}</Link>
      </p>
      <div className="admin-leads__table-wrap">
        {rows.length === 0 ? (
          <p className="admin-leads__empty">{adminT("auditEmpty", language)}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>{adminT("auditColWhen", language)}</th>
                <th>{adminT("auditColAction", language)}</th>
                <th>{adminT("auditColEntity", language)}</th>
                <th>{adminT("auditColActor", language)}</th>
                <th>{adminT("auditColPayload", language)}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="admin-leads__mono">{r.createdAt.slice(0, 19).replace("T", " ")}</td>
                  <td>{r.action}</td>
                  <td>
                    {r.entityType}
                    {r.entityId ? (
                      <>
                        <br />
                        <span className="admin-leads__meta">{r.entityId}</span>
                      </>
                    ) : null}
                  </td>
                  <td>{r.actor ?? dash}</td>
                  <td className="admin-leads__detail">
                    <pre style={{ margin: 0, fontSize: "0.7rem", maxWidth: "28rem", overflow: "auto" }}>
                      {JSON.stringify({ before: r.before, after: r.after }, null, 2)}
                    </pre>
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
