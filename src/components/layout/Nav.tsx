"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

const navLabels = {
  home: { he: "בית", en: "Home" },
  ...nav,
} as const;

type NavLabelKey = keyof typeof navLabels;

type NavItem =
  | { kind: "hash"; href: string; id: string; labelKey: NavLabelKey }
  | { kind: "route"; href: string; id: string; labelKey: NavLabelKey };

const NAV_ITEMS: NavItem[] = [
  { kind: "hash", href: "/#home", id: "home", labelKey: "home" },
  { kind: "hash", href: "/#trust", id: "trust", labelKey: "trust" },
  { kind: "hash", href: "/#services", id: "services", labelKey: "services" },
  { kind: "hash", href: "/#about", id: "about", labelKey: "about" },
  {
    kind: "hash",
    href: "/#transformation",
    id: "transformation",
    labelKey: "transformation",
  },
  {
    kind: "hash",
    href: "/#testimonials",
    id: "testimonials",
    labelKey: "testimonials",
  },
  { kind: "hash", href: "/#articles", id: "articles", labelKey: "articles" },
  { kind: "route", href: "/blog", id: "journal", labelKey: "journal" },
  { kind: "route", href: "/book", id: "book", labelKey: "book" },
  { kind: "route", href: "/contact", id: "contact", labelKey: "contact" },
  { kind: "hash", href: "/#journey", id: "journey", labelKey: "journey" },
];

export function Nav() {
  const pathname = usePathname() ?? "";
  const { language, toggleLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const drawerTitleId = useId();

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const journalActive = pathname.startsWith("/blog");
  const bookActive = pathname.startsWith("/book");
  const contactActive = pathname.startsWith("/contact");
  const adminRoute = pathname.startsWith("/admin");
  const offHomeSections = journalActive || bookActive || contactActive;

  useEffect(() => {
    if (bookActive) setActiveId("book");
    else if (journalActive) setActiveId("journal");
    else if (contactActive) setActiveId("contact");
  }, [bookActive, journalActive, contactActive]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/blog") || pathname.startsWith("/book") || pathname.startsWith("/contact"))
      return;
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash && NAV_ITEMS.some((l) => l.kind === "hash" && l.id === hash)) {
      setActiveId(hash);
    }
  }, [pathname]);

  useEffect(() => {
    if (offHomeSections) return;
    const sections = NAV_ITEMS.filter((l) => l.kind === "hash")
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.12, 0.25] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [offHomeSections]);

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
          panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
        });
      });
      prevMobileOpen.current = true;
      return () => window.cancelAnimationFrame(id);
    }
    if (prevMobileOpen.current) menuButtonRef.current?.focus();
    prevMobileOpen.current = mobileOpen;
  }, [mobileOpen]);

  useLayoutEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (mobileOpen) el.removeAttribute("inert");
    else el.setAttribute("inert", "");
  }, [mobileOpen]);

  const onPanelKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const nodes = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([aria-hidden="true"])',
    );
    const list = [...nodes].filter(
      (el) => !el.hasAttribute("tabindex") || el.tabIndex >= 0,
    );
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
  const langAria =
    language === "he"
      ? nav.ariaSwitchToEnglish[language]
      : nav.ariaSwitchToHebrew[language];

  const shellClass = [
    "nav-shell",
    adminRoute ? "nav-shell--document-flow" : "",
    scrolled ? "nav-shell--scrolled" : "",
    mobileOpen ? "z-[103]" : "z-[100]",
  ]
    .filter(Boolean)
    .join(" ");

  const linkActive = (item: NavItem) => {
    if (item.kind === "route") {
      if (item.id === "journal") return journalActive;
      if (item.id === "book") return bookActive;
      if (item.id === "contact") return contactActive;
      return false;
    }
    if (offHomeSections) return false;
    return activeId === item.id;
  };

  return (
    <>
      <div className={shellClass}>
        <nav
          id="nav"
          className="mx-auto flex h-nav max-w-site items-center justify-between px-6 min-[901px]:px-[clamp(1.5rem,5vw,4rem)]"
        >
          <Link
            href="/#home"
            className="font-display text-[1.55rem] font-medium leading-none tracking-[0.02em] text-ink transition-[color,opacity] duration-300 hover:opacity-85 focus-visible:opacity-90"
            onClick={closeMobile}
          >
            mammy<span className="text-rose">zone</span>
          </Link>

          <ul className="hidden min-[901px]:flex min-[901px]:list-none min-[901px]:items-center min-[901px]:gap-5 min-[1200px]:gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href + item.id}>
                <Link
                  href={item.href}
                  className={`nav-link text-[0.78rem] font-normal tracking-[0.06em] text-ink-soft min-[1200px]:text-[0.82rem] min-[1200px]:tracking-[0.07em] ${bodyFont} ${
                    linkActive(item) ? "nav-link--active" : ""
                  }`}
                  onClick={closeMobile}
                >
                  {navLabels[item.labelKey][language]}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 min-[901px]:gap-4">
            <button
              ref={menuButtonRef}
              type="button"
              className={`hamburger max-[900px]:inline-flex min-[901px]:hidden ${mobileOpen ? "hamburger--open" : ""}`}
              aria-expanded={mobileOpen}
              aria-controls="nav-mobile-panel"
              aria-label={
                mobileOpen ? nav.ariaMenuClose[language] : nav.ariaMenuOpen[language]
              }
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span className="sr-only">
                {mobileOpen ? nav.ariaMenuClose[language] : nav.ariaMenuOpen[language]}
              </span>
              <span className="hamburger__line" aria-hidden />
              <span className="hamburger__line" aria-hidden />
              <span className="hamburger__line" aria-hidden />
            </button>

            <button
              type="button"
              className={`rounded-pill border border-sand-deep/90 px-3 py-2 text-[0.72rem] font-medium tracking-[0.12em] text-ink-muted transition-[border-color,color,background-color] duration-300 hover:border-rose/50 hover:bg-rose-pale/40 hover:text-rose-deep ${bodyFont}`}
              aria-label={langAria}
              onClick={toggleLanguage}
            >
              {language === "he" ? nav.langToggle.he : nav.langToggle.en}
            </button>

            <Link
              href="/book"
              className={`hidden min-h-[44px] min-[901px]:inline-flex min-[901px]:items-center min-[901px]:justify-center min-[901px]:rounded-pill min-[901px]:bg-rose min-[901px]:px-5 min-[901px]:py-2.5 min-[901px]:text-[0.78rem] min-[901px]:font-medium min-[901px]:tracking-[0.06em] min-[901px]:text-paper min-[901px]:shadow-[0_6px_24px_rgba(184,80,112,0.2)] min-[901px]:transition-[background-color,transform,box-shadow] min-[901px]:duration-300 min-[901px]:hover:-translate-y-0.5 min-[901px]:hover:bg-rose-deep min-[901px]:hover:shadow-[0_10px_28px_rgba(122,45,69,0.22)] ${bodyFont}`}
              onClick={closeMobile}
            >
              {nav.cta[language]}
            </Link>
          </div>
        </nav>
      </div>

      <div
        role="presentation"
        className={`mobile-menu-scrim hidden max-[900px]:block min-[901px]:hidden ${
          mobileOpen ? "mobile-menu-scrim--open" : ""
        }`}
        onClick={closeMobile}
        aria-hidden
      />

      <div
        ref={panelRef}
        id="nav-mobile-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={drawerTitleId}
        tabIndex={-1}
        onKeyDown={onPanelKeyDown}
        className={`mobile-menu-panel hidden max-[900px]:flex max-[900px]:flex-col min-[901px]:hidden ${
          mobileOpen ? "mobile-menu-panel--open" : ""
        }`}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 pb-2">
          <p
            id={drawerTitleId}
            className={`font-display text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-muted ${bodyFont}`}
          >
            {nav.drawerTitle[language]}
          </p>
          <button
            type="button"
            className={`min-h-[44px] rounded-pill border border-sand-deep/80 px-4 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink-soft transition-colors duration-300 hover:border-rose hover:text-rose ${bodyFont}`}
            aria-label={nav.ariaMenuClose[language]}
            onClick={closeMobile}
          >
            {nav.menuClose[language]}
          </button>
        </div>

        <ul className="mobile-menu-panel__links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href + item.id}>
              <Link href={item.href} onClick={closeMobile}>
                {navLabels[item.labelKey][language]}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mobile-menu-panel__footer">
          <button
            type="button"
            className={`w-full min-h-[48px] rounded-pill border border-sand-deep/80 text-[0.75rem] font-medium tracking-[0.1em] text-ink-soft transition-colors duration-300 hover:border-rose hover:text-rose ${bodyFont}`}
            aria-label={langAria}
            onClick={toggleLanguage}
          >
            {language === "he" ? nav.langToggle.he : nav.langToggle.en}
          </button>
          <Link
            href="/book"
            className={`mobile-menu-panel__cta ${bodyFont}`}
            onClick={closeMobile}
          >
            {nav.cta[language]}
          </Link>
        </div>
      </div>
    </>
  );
}
