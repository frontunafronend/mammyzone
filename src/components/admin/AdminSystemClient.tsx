"use client";

import { useLanguage } from "@/lib/i18n";
import { adminT } from "@/lib/admin-i18n";
import type { SystemHealthSnapshot } from "@/server/services/system-health-query.service";

export function AdminSystemClient({ health }: { health: SystemHealthSnapshot }) {
  const { language } = useLanguage();

  return (
    <div className="admin-leads">
      <header className="admin-leads__header">
        <div>
          <h1>{adminT("systemTitle", language)}</h1>
          <p className="admin-leads__hint">{adminT("systemHint", language)}</p>
        </div>
      </header>

      <div className="admin-leads__cards" style={{ display: "grid", gap: "1rem", maxWidth: "42rem" }}>
        <section className="admin-leads__panel">
          <h2>{adminT("systemSectionDatabase", language)}</h2>
          <p>
            <strong>{adminT("systemConnected", language)}</strong>{" "}
            {health.dbConnected ? adminT("systemYes", language) : adminT("systemNo", language)}
          </p>
          {!health.dbConnected ? (
            <p className="admin-leads__empty">{adminT("systemDbCheck", language)}</p>
          ) : null}
        </section>

        <section className="admin-leads__panel">
          <h2>{adminT("systemSectionLeadStorage", language)}</h2>
          <p>
            <strong>{adminT("systemActiveDriver", language)}</strong> {health.storageDriverLabel}
          </p>
        </section>

        <section className="admin-leads__panel">
          <h2>{adminT("systemSectionLastAudit", language)}</h2>
          {health.lastAudit ? (
            <ul className="admin-leads__meta" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <strong>{adminT("systemAction", language)}</strong> {health.lastAudit.action}
              </li>
              <li>
                <strong>{adminT("systemWhen", language)}</strong> {health.lastAudit.createdAt}
              </li>
              <li>
                <strong>{adminT("systemActor", language)}</strong> {health.lastAudit.actor ?? "—"}
              </li>
              <li>
                <strong>{adminT("systemId", language)}</strong>{" "}
                <span className="admin-leads__mono">{health.lastAudit.id}</span>
              </li>
            </ul>
          ) : (
            <p className="admin-leads__empty">{adminT("systemNoAuditRows", language)}</p>
          )}
        </section>

        <section className="admin-leads__panel">
          <h2>{adminT("systemSectionBuild", language)}</h2>
          <p>
            <strong>{adminT("systemAppVersion", language)}</strong> {health.appVersion}
          </p>
          <p>
            <strong>{adminT("systemGit", language)}</strong> {health.gitCommit ?? "—"}
          </p>
          <p>
            <strong>{adminT("systemEnvironment", language)}</strong> {health.environmentLabel}
          </p>
        </section>
      </div>
    </div>
  );
}
