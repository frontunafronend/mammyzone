"use client";

import { adminT } from "@/lib/admin-i18n";
import { useLanguage } from "@/lib/i18n";

export function AdminBookingsPageChrome({ timezone }: { timezone: string }) {
  const { language } = useLanguage();
  return (
    <>
      <header style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", marginBottom: "0.5rem" }}>
        <h1 style={{ margin: 0 }}>{adminT("bookingsTitle", language)}</h1>
        <a className="admin-leads__btn admin-leads__btn--primary" href="/api/admin/bookings-export">
          {adminT("bookingsExport", language)}
        </a>
      </header>
      <p className="admin-panel__muted">
        {adminT("bookingsPipelineMuted", language)} {timezone}
      </p>
    </>
  );
}
