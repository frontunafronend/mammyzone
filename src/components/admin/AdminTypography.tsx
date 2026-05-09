"use client";

import { useLanguage } from "@/lib/i18n";
import { adminT, type AdminPanelKey } from "@/lib/admin-i18n";

type Props = { k: AdminPanelKey; className?: string };

export function AdminH1({ k, className }: Props) {
  const { language } = useLanguage();
  return <h1 className={className}>{adminT(k, language)}</h1>;
}

export function AdminH2({ k, className }: Props) {
  const { language } = useLanguage();
  return <h2 className={className}>{adminT(k, language)}</h2>;
}

export function AdminMuted({ k, className = "admin-panel__muted" }: Props) {
  const { language } = useLanguage();
  return <p className={className}>{adminT(k, language)}</p>;
}

export function AdminDashTitle({ k }: { k: AdminPanelKey }) {
  const { language } = useLanguage();
  return <h1 className="admin-dash__title">{adminT(k, language)}</h1>;
}

export function AdminDashMuted({ k }: { k: AdminPanelKey }) {
  const { language } = useLanguage();
  return <p className="admin-dash__muted">{adminT(k, language)}</p>;
}
