"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { nav, useLanguage } from "@/lib/i18n";

const SCROLL_THRESHOLD_PX = 40;

const NAV_LINKS = [
  { href: "#services", labelKey: "services" as const },
  { href: "#about", labelKey: "about" as const },
  { href: "#retreat", labelKey: "retreat" as const },
  { href: "#calendar", labelKey: "calendar" as const },
  { href: "#marketplace", labelKey: "marketplace" as const },
] as const;

export function Nav() {
  const { language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const drawerTitleId = useId();

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 900px)");
    const applyBodyLock = () => {
      if (mobileOpen && mq.matches) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "";
    };
    applyBodyLock();
    mq.addEventListener("change", applyBodyLock);
    return () => {
      mq.removeEventListener("change", applyBodyLock);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const prevMobileOpen = useRef(false);

  useEffect(() => {
    if (mobileOpen) {
      const id = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          drawerRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
        });
      });
      prevMobileOpen.current = true;
      return () => window.cancelAnimationFrame(id);
    }
    if (prevMobileOpen.current) {
      menuButtonRef.current?.focus();
    }
    prevMobileOpen.current = mobileOpen;
  }, [mobileOpen]);

  useLayoutEffect(() => {
    const el = drawerRef.current;
    if (!el) return;
    if (mobileOpen) el.removeAttribute("inert");
    else el.setAttribute("inert", "");
  }, [mobileOpen]);

  const onDrawerKeyDown = (e: ReactKeyboardEvent<HTMLElement>) => {
    if (e.key !== "Tab" || !drawerRef.current) return;
    const nodes = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([aria-hidden="true"])',
    );
    const list = [...nodes].filter((el) => !el.hasAttribute("tabindex") || el.tabIndex >= 0);
    if (list.length === 0) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const bodyFont = language === "he" ? "font-bodyHe" : "font-bodyEn";

  const bar = scrolled
    ? "bg-[rgba(250,247,242,0.92)] shadow-[0_1px_0_rgba(42,31,26,0.08)] backdrop-blur-[20px]"
    : "bg-transparent shadow-none backdrop-blur-0";

  const linkClass = `text-[0.82rem] font-normal tracking-[0.06em] text-ink-soft transition-colors duration-200 hover:text-rose ${bodyFont}`;

  const ctaClass = `inline-flex min-h-[44px] w-full items-center justify-center rounded-pill bg-rose px-[22px] py-2.5 text-[0.8rem] font-medium tracking-[0.05em] text-paper transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-rose-deep ${bodyFont}`;

  const langAria =
    language === "he"
      ? nav.ariaSwitchToEnglish[language]
      : nav.ariaSwitchToHebrew[language];

  return (
    <>
      <nav
        id="nav"
        className={`fixed inset-x-0 top-0 z-[100] flex h-nav items-center justify-between px-6 transition-[background-color,backdrop-filter,box-shadow] duration-500 ease-out min-[901px]:px-[clamp(1.5rem,5vw,4rem)] ${bar}`}
      >
        <Link
          href="#home"
          className="font-display text-[1.6rem] font-normal leading-none tracking-[0.02em] text-ink"
          onClick={closeMobile}
        >
          mammy<span className="text-rose">zone</span>
        </Link>

        <ul className="hidden min-[901px]:flex min-[901px]:list-none min-[901px]:items-center min-[901px]:gap-10">
          {NAV_LINKS.map(({ href, labelKey }) => (
            <li key={href}>
              <Link href={href} className={linkClass}>
                {nav[labelKey][language]}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-[1.2rem]">
          <button
            ref={menuButtonRef}
            type="button"
            className={`hidden max-[900px]:inline-flex max-[900px]:min-h-[40px] max-[900px]:items-center max-[900px]:rounded-pill max-[900px]:border max-[900px]:border-sand-deep max-[900px]:px-3 max-[900px]:py-1.5 max-[900px]:text-[0.68rem] max-[900px]:font-medium max-[900px]:uppercase max-[900px]:tracking-[0.12em] max-[900px]:text-ink-soft max-[900px]:transition-colors max-[900px]:duration-200 max-[900px]:hover:border-rose max-[900px]:hover:text-rose ${bodyFont}`}
            aria-expanded={mobileOpen}
            aria-controls="nav-drawer"
            aria-label={mobileOpen ? nav.ariaMenuClose[language] : nav.ariaMenuOpen[language]}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? nav.menuClose[language] : nav.menu[language]}
          </button>
          <button
            type="button"
            className={`rounded-pill border border-sand-deep px-2.5 py-1 text-[0.75rem] font-medium tracking-[0.1em] text-ink-muted transition-colors duration-200 hover:border-rose hover:text-rose ${bodyFont}`}
            aria-label={langAria}
            onClick={toggleLanguage}
          >
            {language === "he" ? nav.langToggle.he : nav.langToggle.en}
          </button>
          <Link
            href="#calendar"
            className={`hidden min-[901px]:inline-flex min-[901px]:items-center min-[901px]:justify-center min-[901px]:rounded-pill min-[901px]:bg-rose min-[901px]:px-[22px] min-[901px]:py-2.5 min-[901px]:text-[0.8rem] min-[901px]:font-medium min-[901px]:tracking-[0.05em] min-[901px]:text-paper min-[901px]:transition-[background-color,transform] min-[901px]:duration-200 min-[901px]:hover:-translate-y-px min-[901px]:hover:bg-rose-deep ${bodyFont}`}
          >
            {nav.cta[language]}
          </Link>
        </div>
      </nav>

      {/* Mobile: light scrim over page only (below bar); div avoids focus trap issues */}
      <div
        role="presentation"
        className={`fixed inset-x-0 bottom-0 top-nav z-[98] bg-[rgba(42,31,26,0.07)] transition-opacity duration-300 ease-out min-[901px]:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMobile}
      />

      <aside
        ref={drawerRef}
        id="nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={drawerTitleId}
        tabIndex={-1}
        onKeyDown={onDrawerKeyDown}
        className={`fixed start-0 top-nav z-[99] flex h-[calc(100dvh-var(--nav-h))] w-[min(300px,86vw)] max-w-[320px] flex-col border-e border-[rgba(42,31,26,0.1)] bg-[rgba(250,247,242,0.98)] shadow-[0_4px_28px_rgba(42,31,26,0.07)] transition-transform duration-300 ease-out min-[901px]:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[rgba(42,31,26,0.08)] px-5 py-4">
          <p
            id={drawerTitleId}
            className="font-display text-[1.15rem] font-normal tracking-[0.02em] text-ink"
          >
            {nav.drawerTitle[language]}
          </p>
          <button
            type="button"
            className={`rounded-pill border border-sand-deep px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-ink-muted transition-colors duration-200 hover:border-rose hover:text-rose ${bodyFont}`}
            aria-label={nav.ariaMenuClose[language]}
            onClick={closeMobile}
          >
            {nav.menuClose[language]}
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto px-5 pt-2">
          <ul className="flex list-none flex-col">
            {NAV_LINKS.map(({ href, labelKey }) => (
              <li key={href} className="border-b border-[rgba(232,221,208,0.9)] last:border-b-0">
                <Link
                  href={href}
                  className={`${linkClass} flex min-h-[48px] items-center py-3`}
                  onClick={closeMobile}
                >
                  {nav[labelKey][language]}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3 border-t border-[rgba(42,31,26,0.08)] pt-5 pb-6">
            <Link href="#calendar" className={ctaClass} onClick={closeMobile}>
              {nav.cta[language]}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
