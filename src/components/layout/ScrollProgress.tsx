"use client";

import { useEffect, useState } from "react";
import { layoutShell, useLanguage } from "@/lib/i18n";

export function ScrollProgress() {
  const { language } = useLanguage();
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      const next = scrollable <= 0 ? 0 : el.scrollTop / scrollable;
      setP(Math.min(1, Math.max(0, next)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="scroll-progress-track"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(p * 100)}
      aria-label={layoutShell.scrollProgressAria[language]}
    >
      <div
        className="scroll-progress-fill"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}
