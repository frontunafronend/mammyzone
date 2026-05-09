"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteContact } from "@/lib/contact";
import { layoutShell, useLanguage } from "@/lib/i18n";

const ACTIONS = [
  {
    key: "wa",
    href: siteContact.whatsappUrl,
    external: true,
    labelKey: "floatingWhatsapp" as const,
    style: "floating-cta__btn--wa",
  },
  {
    key: "contact",
    href: "/contact",
    external: false,
    labelKey: "floatingContact" as const,
    style: "floating-cta__btn--contact",
  },
  {
    key: "book",
    href: "/book",
    external: false,
    labelKey: "floatingBook" as const,
    style: "floating-cta__btn--book",
  },
  {
    key: "news",
    href: "#newsletter",
    external: false,
    labelKey: "floatingNewsletter" as const,
    style: "floating-cta__btn--news",
  },
  {
    key: "workshop",
    href: "/contact",
    external: false,
    labelKey: "floatingWorkshop" as const,
    style: "floating-cta__btn--work",
  },
] as const;

export function FloatingCTACluster() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [wide, setWide] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 901px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open, close]);

  const bodyFont = language === "he" ? "font-bodyHe" : "font-bodyEn";

  if (pathname.startsWith("/admin")) return null;

  return (
    <div
      ref={rootRef}
      className={`floating-cta ${open ? "floating-cta--open" : ""}`}
    >
      <div className="floating-cta__stack">
        {(wide || open ? ACTIONS : ACTIONS.slice(0, 1)).map((a) => {
          const label = layoutShell[a.labelKey][language];
          const inner = (
            <span className={`floating-cta__label ${bodyFont}`}>{label}</span>
          );
          if (a.external) {
            return (
              <a
                key={a.key}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`floating-cta__btn ${a.style}`}
                aria-label={label}
              >
                {inner}
              </a>
            );
          }
          return (
            <Link
              key={a.key}
              href={a.href}
              className={`floating-cta__btn ${a.style}`}
              aria-label={label}
              onClick={close}
            >
              {inner}
            </Link>
          );
        })}
      </div>
      <button
        type="button"
        className={`floating-cta__toggle ${bodyFont}`}
        aria-expanded={open}
        aria-label={
          open
            ? layoutShell.floatingCollapse[language]
            : layoutShell.floatingExpand[language]
        }
        onClick={() => setOpen((o) => !o)}
      >
        <span className="floating-cta__toggle-icon" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>
    </div>
  );
}
