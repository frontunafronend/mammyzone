"use client";

import { useEffect, useState } from "react";
import { scrollChrome, useLanguage } from "@/lib/i18n";

function scrollY() {
  if (typeof window === "undefined") return 0;
  return (
    window.scrollY ||
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

export function ScrollToTop() {
  const { language } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(scrollY() > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`scroll-top${show ? " scroll-top--visible" : ""}`}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      aria-label={scrollChrome.toTopAria[language]}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </button>
  );
}
