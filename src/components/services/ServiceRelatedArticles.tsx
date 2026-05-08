import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog/types";

type Props = {
  posts: BlogPostMeta[];
};

const title = { he: "מהמגזין", en: "From the journal" } as const;

export function ServiceRelatedArticles({ posts }: Props) {
  if (posts.length === 0) return null;
  return (
    <div className="service-lp-related" id="service-related">
      <h2 className="service-lp-related__title font-display">
        <span className="he">{title.he}</span>
        <span className="en">{title.en}</span>
      </h2>
      <ul className="service-lp-related__list">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="service-lp-related__link">
              <span className="he">{p.title.he}</span>
              <span className="en">{p.title.en}</span>
              <span className="service-lp-related__arrow" aria-hidden>
                →
              </span>
            </Link>
            <p className="service-lp-related__ex">
              <span className="he">{p.excerpt.he}</span>
              <span className="en">{p.excerpt.en}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
