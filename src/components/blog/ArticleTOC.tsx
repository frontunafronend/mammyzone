"use client";

import { blogArticleUi } from "@/lib/blog/ui-strings";
import { useLanguage } from "@/lib/i18n";
import type { TocItem } from "@/lib/blog/types";

export function ArticleTOC({ items }: { items: TocItem[] }) {
  const { language } = useLanguage();
  if (items.length === 0) return null;

  return (
    <nav
      className="blog-toc"
      aria-label={blogArticleUi.tocAria[language]}
    >
      <p className="blog-toc__title">{blogArticleUi.tocTitle[language]}</p>
      <ol className="blog-toc__list">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.depth === 3 ? "blog-toc__item blog-toc__item--sub" : "blog-toc__item"}
          >
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
