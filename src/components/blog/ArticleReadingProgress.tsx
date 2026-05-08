"use client";

import { useEffect, useState } from "react";
import { blogArticleUi } from "@/lib/blog/ui-strings";
import { useLanguage } from "@/lib/i18n";

type ArticleReadingProgressProps = {
  articleRootId: string;
};

export function ArticleReadingProgress({
  articleRootId,
}: ArticleReadingProgressProps) {
  const { language } = useLanguage();
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = document.getElementById(articleRootId);
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setP(1);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setP(scrolled / total);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [articleRootId]);

  return (
    <div
      className="blog-read-progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(p * 100)}
      aria-label={blogArticleUi.readingProgressAria[language]}
    >
      <div
        className="blog-read-progress__fill"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}
