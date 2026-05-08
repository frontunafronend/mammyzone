import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { articlesSection } from "@/lib/i18n";
import { blogCategoryLabels } from "@/lib/blog/categories";
import { getFeaturedPostMetas } from "@/lib/blog/load-posts";
import { blogCoverSources } from "@/lib/media/sources";

export async function FeaturedArticles() {
  const featured = getFeaturedPostMetas();

  return (
    <section className="articles-section" id="articles" aria-labelledby="articles-heading">
      <div className="container">
        <header className="articles-section__head">
          <div className="section-label">
            <span className="he">{articlesSection.label.he}</span>
            <span className="en">{articlesSection.label.en}</span>
          </div>
          <h2 id="articles-heading" className="section-title">
            <span className="he">
              {articlesSection.titleLine1.he}{" "}
              <em>{articlesSection.titleEm.he}</em>
            </span>
            <span className="en">
              {articlesSection.titleLine1.en}{" "}
              <em>{articlesSection.titleEm.en}</em>
            </span>
          </h2>
        </header>

        <div className="articles-grid">
          {featured.map((a) => (
            <article key={a.slug} className="article-card">
              <Link href={`/blog/${a.slug}`} className="article-card__media">
                <SafeImage
                  sources={blogCoverSources(a.image)}
                  alt={`${a.imageAlt.he} / ${a.imageAlt.en}`}
                  width={640}
                  height={420}
                  className="article-card__img"
                  sizes="(max-width: 900px) 100vw, 33vw"
                  loading="lazy"
                />
              </Link>
              <div className="article-card__body">
                <p className="article-card__meta">
                  <span>
                    <span className="he">{blogCategoryLabels[a.category].he}</span>
                    <span className="en">{blogCategoryLabels[a.category].en}</span>
                  </span>
                  <span className="article-card__dot" aria-hidden>
                    ·
                  </span>
                  <span>
                    {a.readingMinutesHe}{" "}
                    <span className="he">דק׳ קריאה</span>
                    <span className="en">min read</span>
                  </span>
                </p>
                <h3 className="article-card__title">
                  <Link href={`/blog/${a.slug}`}>
                    <span className="he">{a.title.he}</span>
                    <span className="en">{a.title.en}</span>
                  </Link>
                </h3>
                <p className="article-card__excerpt">
                  <span className="he">{a.excerpt.he}</span>
                  <span className="en">{a.excerpt.en}</span>
                </p>
                <Link href={`/blog/${a.slug}`} className="article-card__link">
                  <span className="he">{articlesSection.readMore.he}</span>
                  <span className="en">{articlesSection.readMore.en}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="articles-section__more mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex text-[0.82rem] font-medium tracking-[0.08em] text-rose underline-offset-4 hover:underline"
          >
            <span className="he">לכל המאמרים →</span>
            <span className="en">Browse the journal →</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
