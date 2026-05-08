"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/lib/i18n";
import { useLocale } from "./LocaleProvider";

export function Nav() {
  const { locale, toggleLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav id="nav" className={scrolled ? "scrolled" : undefined}>
      <Link href="#home" className="nav-logo">
        mammy<span>zone</span>
      </Link>
      <ul className="nav-links">
        <li>
          <Link href="#services">
            <span className="he">{nav.services.he}</span>
            <span className="en">{nav.services.en}</span>
          </Link>
        </li>
        <li>
          <Link href="#about">
            <span className="he">{nav.about.he}</span>
            <span className="en">{nav.about.en}</span>
          </Link>
        </li>
        <li>
          <Link href="#retreat">
            <span className="he">{nav.retreat.he}</span>
            <span className="en">{nav.retreat.en}</span>
          </Link>
        </li>
        <li>
          <Link href="#calendar">
            <span className="he">{nav.calendar.he}</span>
            <span className="en">{nav.calendar.en}</span>
          </Link>
        </li>
        <li>
          <Link href="#marketplace">
            <span className="he">{nav.marketplace.he}</span>
            <span className="en">{nav.marketplace.en}</span>
          </Link>
        </li>
      </ul>
      <div className="nav-right">
        <button
          type="button"
          className="lang-btn"
          onClick={toggleLocale}
          aria-label={locale === "he" ? "Switch to English" : "Switch to Hebrew"}
        >
          {locale === "he" ? nav.langToggle.he : nav.langToggle.en}
        </button>
        <Link href="#calendar" className="nav-cta">
          <span className="he">{nav.cta.he}</span>
          <span className="en">{nav.cta.en}</span>
        </Link>
      </div>
    </nav>
  );
}
