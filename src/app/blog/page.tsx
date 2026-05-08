import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { articlesSection } from "@/lib/i18n";
import { blogCategoryLabels, blogCategories } from "@/lib/blog/categories";
import { blogListingJsonLd } from "@/lib/blog/json-ld";
import { getAllPostMetas, getFeaturedPostMetas } from "@/lib/blog/load-posts";
import { blogIndexUi } from "@/lib/blog/ui-strings";
import { blogCoverSources } from "@/lib/media/sources";
import { absoluteUrl } from "@/lib/site-url";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const url = absoluteUrl("/blog");
  return {
    title: `${blogIndexUi.title.he} | MammyZone`,
    description: blogIndexUi.subtitle.he,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "MammyZone",
      locale: "he_IL",
      alternateLocale: ["en_US"],
      title: `${blogIndexUi.title.he} / ${blogIndexUi.title.en}`,
      description: `${blogIndexUi.subtitle.he}\n${blogIndexUi.subtitle.en}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${blogIndexUi.title.he} | MammyZone`,
      description: blogIndexUi.subtitle.he,
    },
    robots: { index: true, follow: true },
  };
}

export default function BlogIndexPage() {
  const all = getAllPostMetas();
  const featured = getFeaturedPostMetas();
  const listingLd = blogListingJsonLd(
    absoluteUrl("/blog"),
    `${blogIndexUi.title.he} / ${blogIndexUi.title.en}`,
    `${blogIndexUi.subtitle.he} ${blogIndexUi.subtitle.en}`,
  );

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingLd) }}
      />
      <PageShell withNavOffset className="py-14 md:py-20">
        <header className="blog-index-header">
          <p className="section-label">
            <span className="he">{articlesSection.label.he}</span>
            <span className="en">{articlesSection.label.en}</span>
          </p>
          <h1 className="section-title blog-index-title">
            <span className="he">{blogIndexUi.title.he}</span>
            <span className="en">{blogIndexUi.title.en}</span>
          </h1>
          <p className="section-sub blog-index-sub">
            <span className="he">{blogIndexUi.subtitle.he}</span>
            <span className="en">{blogIndexUi.subtitle.en}</span>
          </p>
        </header>

        <nav className="blog-index-cats" aria-label="Categories">
          <Link href="/blog" className="blog-index-cat blog-index-cat--all">
            <span className="he">{blogIndexUi.allCategories.he}</span>
            <span className="en">{blogIndexUi.allCategories.en}</span>
          </Link>
          {blogCategories.map((c) => (
            <Link key={c} href={`/blog/category/${c}`} className="blog-index-cat">
              <span className="he">{blogCategoryLabels[c].he}</span>
              <span className="en">{blogCategoryLabels[c].en}</span>
            </Link>
          ))}
        </nav>

        {featured.length > 0 && (
          <section className="blog-index-featured" aria-labelledby="feat-head">
            <h2 id="feat-head" className="blog-index-section-title">
              <span className="he">נבחרים</span>
              <span className="en">Featured</span>
            </h2>
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
                        <span className="he">דק׳</span>
                        <span className="en">min</span>
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
          </section>
        )}

        <section className="blog-index-all" aria-labelledby="all-head">
          <h2 id="all-head" className="blog-index-section-title">
            <span className="he">כל המאמרים</span>
            <span className="en">All posts</span>
          </h2>
          <ul className="blog-index-list">
            {all.map((p) => (
              <li key={p.slug} className="blog-index-row">
                <Link href={`/blog/${p.slug}`} className="blog-index-row__link">
                  <span className="he">{p.title.he}</span>
                  <span className="en">{p.title.en}</span>
                </Link>
                <span className="blog-index-row__meta">
                  <span className="he">{blogCategoryLabels[p.category].he}</span>
                  <span className="en">{blogCategoryLabels[p.category].en}</span>
                  {" · "}
                  {p.readingMinutesHe}
                  <span className="he"> דק׳</span>
                  <span className="en"> min</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </PageShell>
    </main>
  );
}
