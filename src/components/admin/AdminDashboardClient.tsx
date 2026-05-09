"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { adminT, type AdminPanelKey } from "@/lib/admin-i18n";
import type { DashboardStats } from "@/server/services/dashboard-query.service";

function Card({
  titleKey,
  value,
  href,
}: {
  titleKey: AdminPanelKey;
  value: number | string;
  href?: string;
}) {
  const { language } = useLanguage();
  const title = adminT(titleKey, language);
  const inner = (
    <>
      <p className="admin-dash-card__label">{title}</p>
      <p className="admin-dash-card__value">{value}</p>
    </>
  );
  if (href) {
    return (
      <Link href={href} className="admin-dash-card admin-dash-card--link">
        {inner}
      </Link>
    );
  }
  return <div className="admin-dash-card">{inner}</div>;
}

type Props = { stats: DashboardStats | null };

export function AdminDashboardClient({ stats }: Props) {
  const { language } = useLanguage();

  if (!stats) {
    return (
      <div className="admin-dash">
        <h1 className="admin-dash__title">{adminT("dashTitle", language)}</h1>
        <p className="admin-dash__muted">{adminT("dashNoDbMuted", language)}</p>
        <div className="admin-dash__grid">
          <Card titleKey="dashCardDatabase" value={adminT("dashCardDbNotConnected", language)} />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dash">
      <h1 className="admin-dash__title">{adminT("dashTitle", language)}</h1>
      <p className="admin-dash__muted">{adminT("dashLiveMuted", language)}</p>
      <div className="admin-dash__grid">
        <Card titleKey="dashCardNewLeads" value={stats.newLeads} href="/admin/leads" />
        <Card titleKey="dashCardBookingRequests" value={stats.bookingRequests} href="/admin/bookings" />
        <Card titleKey="dashCardNewsletterActive" value={stats.newsletterSubscribers} href="/admin/newsletter" />
        <Card titleKey="dashCardContactInquiries" value={stats.contactInquiries} href="/admin/leads" />
        <Card titleKey="dashCardUpcomingSchedules" value={stats.upcomingSchedules} href="/admin/schedule" />
      </div>
      <section className="admin-dash__section">
        <h2>{adminT("dashRecentActivity", language)}</h2>
        {stats.recentAudit.length === 0 ? (
          <p className="admin-dash__muted">{adminT("dashNoAudit", language)}</p>
        ) : (
          <ul className="admin-dash__audit">
            {stats.recentAudit.map((a) => (
              <li key={a.id}>
                <span className="admin-dash__audit-time">{a.createdAt.slice(0, 19).replace("T", " ")}</span>
                <span className="admin-dash__audit-action">{a.action}</span>
                <span className="admin-dash__audit-meta">
                  {a.entityType}
                  {a.entityId ? ` · ${a.entityId}` : ""}
                  {a.actor ? ` · ${a.actor}` : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="admin-dash__footer-link">
          <Link href="/admin/audit">{adminT("dashViewAudit", language)}</Link>
        </p>
      </section>
    </div>
  );
}
