"use client";

import { useLanguage } from "@/lib/i18n";
import { adminT } from "@/lib/admin-i18n";

export function AdminLoadingMessage() {
  const { language } = useLanguage();
  return (
    <div className="admin-leads" aria-busy="true">
      <p className="admin-leads__empty">{adminT("loadingAdmin", language)}</p>
    </div>
  );
}
