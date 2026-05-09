"use client";

import { adminT } from "@/lib/admin-i18n";
import { useLanguage } from "@/lib/i18n";

export default function AdminDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { language } = useLanguage();
  return (
    <div className="admin-leads" role="alert">
      <h1>{adminT("errorTitle", language)}</h1>
      <p className="admin-leads__error">{error.message || adminT("errorFallback", language)}</p>
      <button type="button" className="admin-leads__btn admin-leads__btn--primary" onClick={() => reset()}>
        {adminT("errorRetry", language)}
      </button>
    </div>
  );
}
