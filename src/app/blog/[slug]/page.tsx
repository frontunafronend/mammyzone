import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleNewsletter } from "@/components/blog/ArticleNewsletter";
import { ArticleReadingProgress } from "@/components/blog/ArticleReadingProgress";
import { ArticleShare } from "@/components/blog/ArticleShare";
import { ArticleTOC } from "@/components/blog/ArticleTOC";
import { PageShell } from "@/components/layout/PageShell";
import { articleJsonLd } from "@/lib/blog/json-ld";
import { blogCategoryLabels, blogTagLabels } from "@/lib/blog/categories";
import {
  compilePost,
  getPostSlugs,
  getRelatedPostMetas,
  getPostMeta,
} from "@/lib/blog/load-posts";
import { blogArticleUi } from "@/lib/blog/ui-strings";
import { getAuthor } from "@/lib/blog/authors";
import { authorAvatarSources, blogCoverSources } from "@/lib/media/sources";
import { absoluteUrl } from "@/lib/site-url";

export const revalidate = 3600;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = getPostMeta(params.slug);
  if (!meta) return {};
  const url = absoluteUrl(`/blog/${meta.slug}`);
  const titleHe = meta.seoTitle?.he ?? meta.title.he;
  const titleEn = meta.seoTitle?.en ?? meta.title.en;
  const descHe = meta.seoDescription?.he ?? meta.excerpt.he;
  const descEn = meta.seoDescription?.en ?? meta.excerpt.en;

  return {
    title: `${titleHe} | MammyZone`,
    description: descHe,
    alternates: {
      canonical: url,
      languages: {
        he: url,
        en: url,
      },
    },
    openGraph: {
      type: "article",
      url,
      siteName: "MammyZone",
      locale: "he_IL",
      alternateLocale: ["en_US"],
      publishedTime: meta.publishedAt,
      modifiedTime: meta.updatedAt ?? meta.publishedAt,
      title: `${titleHe} / ${titleEn}`,
      description: `${descHe}\n${descEn}`,
      images: [{ url: meta.image, width: 1200, height: 630, alt: meta.imageAlt.he }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${titleHe} | MammyZone`,
      description: descHe,
      images: [meta.image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const compiled = await compilePost(params.slug);
  if (!compiled) notFound();

  const { meta, toc, content } = compiled;
  const author = getAuthor(meta.authorSlug);
  const url = absoluteUrl(`/blog/${meta.slug}`);
  const jsonLd = articleJsonLd(meta, { url, locale: "he" });
  const related = getRelatedPostMetas(meta.slug, meta.category, 3);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div id="article-scroll-root">
        <PageShell withNavOffset className="pb-0 pt-8 md:pt-12">
          <Link
            href="/blog"
            className="mb-8 inline-flex text-[0.78rem] font-medium tracking-[0.06em] text-rose underline-offset-4 hover:underline"
          >
            <span className="he">← {blogArticleUi.backToJournal.he}</span>
            <span className="en">← {blogArticleUi.backToJournal.en}</span>
          </Link>

          <header className="blog-article-header">
            {meta.featured && (
              <p className="blog-article-ribbon">
                <span className="he">{blogArticleUi.featuredRibbon.he}</span>
                <span className="en">{blogArticleUi.featuredRibbon.en}</span>
              </p>
            )}
            <p className="blog-article-meta">
              <span className="he">{blogCategoryLabels[meta.category].he}</span>
              <span className="en">{blogCategoryLabels[meta.category].en}</span>
              <span className="blog-article-meta__dot" aria-hidden>
                ·
              </span>
              <time dateTime={meta.publishedAt}>{meta.publishedAt}</time>
              <span className="blog-article-meta__dot" aria-hidden>
                ·
              </span>
              <span>
                {meta.readingMinutesHe}{" "}
                <span className="he">{blogArticleUi.readTime.he}</span>
                <span className="en">{blogArticleUi.readTime.en}</span>
              </span>
            </p>
            <h1 className="blog-article-title">
              <span className="he">{meta.title.he}</span>
              <span className="en">{meta.title.en}</span>
            </h1>
            <p className="blog-article-dek">
              <span className="he">{meta.excerpt.he}</span>
              <span className="en">{meta.excerpt.en}</span>
            </p>
            {author && (
              <div className="blog-article-author">
                <SafeImage
                  sources={authorAvatarSources(author.image)}
                  alt={`${author.imageAlt.he} / ${author.imageAlt.en}`}
                  width={48}
                  height={48}
                  className="blog-article-author__img"
                  loading="lazy"
                />
                <div>
                  <div className="blog-article-author__name">
                    <span className="he">{author.name.he}</span>
                    <span className="en">{author.name.en}</span>
                  </div>
                  <div className="blog-article-author__role">
                    <span className="he">{author.role.he}</span>
                    <span className="en">{author.role.en}</span>
                  </div>
                </div>
              </div>
            )}
            <ul className="blog-article-tags" aria-label="Tags">
              {meta.tags.map((tag) => (
                <li key={tag}>
                  <span className="he">
                    {blogTagLabels[tag]?.he ?? tag.replace(/_/g, " ")}
                  </span>
                  <span className="en">
                    {blogTagLabels[tag]?.en ?? tag.replace(/_/g, " ")}
                  </span>
                </li>
              ))}
            </ul>
          </header>

          <div className="blog-article-hero">
            <SafeImage
              sources={blogCoverSources(meta.image)}
              alt={`${meta.imageAlt.he} / ${meta.imageAlt.en}`}
              width={1200}
              height={720}
              className="blog-article-hero__img"
              sizes="(max-width: 900px) 100vw, min(1200px, 100vw)"
              priority
            />
          </div>
        </PageShell>

        <ArticleReadingProgress articleRootId="article-scroll-root" />

        <PageShell className="blog-article-body-wrap py-12 md:py-16">
          <div className="blog-article-layout">
            <aside className="blog-article-aside blog-article-aside--start">
              <ArticleTOC items={toc} />
            </aside>
            <div className="blog-article-main prose-blog" id="article-main">
              {content}
            </div>
            <aside className="blog-article-aside blog-article-aside--end">
              <ArticleShare
                url={url}
                titleHe={meta.title.he}
                titleEn={meta.title.en}
              />
              <ArticleNewsletter />
            </aside>
          </div>
        </PageShell>

        {related.length > 0 && (
          <PageShell className="pb-20 pt-4">
            <h2 className="blog-related-title">
              <span className="he">{blogArticleUi.relatedTitle.he}</span>
              <span className="en">{blogArticleUi.relatedTitle.en}</span>
            </h2>
            <ul className="blog-related-list">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}`} className="blog-related-card">
                    <span className="he">{r.title.he}</span>
                    <span className="en">{r.title.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </PageShell>
        )}
      </div>
    </main>
  );
}
