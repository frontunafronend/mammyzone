"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { logoutAdmin } from "@/app/actions/leads";
import { ADMIN_NAV_ITEMS, adminT } from "@/lib/admin-i18n";
import { nav, useLanguage } from "@/lib/i18n";

type Props = { username: string; children: React.ReactNode };

export function AdminShell({ username, children }: Props) {
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const filteredNav = useMemo(() => {
    const items = ADMIN_NAV_ITEMS.map((item) => ({
      ...item,
      labelHe: adminT(item.key, "he"),
      labelEn: adminT(item.key, "en"),
    }));
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(
      (n) =>
        n.labelHe.includes(s) ||
        n.labelEn.toLowerCase().includes(s) ||
        n.href.toLowerCase().includes(s),
    );
  }, [q]);

  const langAria = language === "he" ? nav.ariaSwitchToEnglish[language] : nav.ariaSwitchToHebrew[language];

  return (
    <div className="admin-shell">
      <button type="button" className="admin-shell__mobile-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
        {adminT("shellMenu", language)}
      </button>
      <aside className={`admin-shell__sidebar ${open ? "admin-shell__sidebar--open" : ""}`}>
        <div className="admin-shell__brand">
          <span className="admin-shell__brand-mark">MZ</span>
          <span className="admin-shell__brand-text">{adminT("shellBrand", language)}</span>
        </div>
        <div className="admin-shell__search">
          <label htmlFor="admin-nav-search" className="sr-only">
            {adminT("shellSearchNav", language)}
          </label>
          <input
            id="admin-nav-search"
            type="search"
            placeholder={adminT("shellSearchPlaceholder", language)}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoComplete="off"
          />
        </div>
        <nav className="admin-shell__nav" aria-label="Admin">
          {filteredNav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "admin-shell__link admin-shell__link--active" : "admin-shell__link"}
                onClick={() => setOpen(false)}
              >
                {adminT(item.key, language)}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="admin-shell__main">
        <header className="admin-shell__topbar">
          <button
            type="button"
            className="admin-shell__lang"
            onClick={toggleLanguage}
            aria-label={langAria}
          >
            {language === "he" ? nav.langToggle.he : nav.langToggle.en}
          </button>
          <p className="admin-shell__user">
            {adminT("shellSignedInAs", language)} {username}
          </p>
          <button
            type="button"
            className="admin-shell__logout"
            onClick={() => void logoutAdmin().then(() => (window.location.href = "/admin/login"))}
          >
            {adminT("shellLogout", language)}
          </button>
        </header>
        <main className="admin-shell__body">{children}</main>
      </div>
    </div>
  );
}
