"use client";

import { useLanguage } from "@/lib/i18n";
import { adminT } from "@/lib/admin-i18n";

export function AdminNotConfigured() {
  const { language } = useLanguage();
  return (
    <div className="admin-leads" style={{ padding: "2rem" }}>
      <p className="admin-leads__empty">{adminT("layoutNotConfigured", language)}</p>
    </div>
  );
}
