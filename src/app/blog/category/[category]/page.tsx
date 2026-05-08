import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { blogCategories, blogCategoryLabels, isBlogCategory } from "@/lib/blog/categories";
import { getPostsByCategory } from "@/lib/blog/load-posts";
import { blogIndexUi } from "@/lib/blog/ui-strings";
import { absoluteUrl } from "@/lib/site-url";
import type { Metadata } from "next";

export const revalidate = 3600;

export const dynamicParams = false;

type Props = { params: { category: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isBlogCategory(params.category)) return {};
  const lab = blogCategoryLabels[params.category];
  const url = absoluteUrl(`/blog/category/${params.category}`);
  return {
    title: `${lab.he} | מגזין`,
    description: `${lab.he} — ${lab.en}`,
    alternates: { canonical: url },
    openGraph: { url, title: `${lab.he} / ${lab.en}` },
  };
}

export function generateStaticParams() {
  return blogCategories.map((category) => ({ category }));
}

export default function BlogCategoryPage({ params }: Props) {
  if (!isBlogCategory(params.category)) notFound();
  const posts = getPostsByCategory(params.category);
  const lab = blogCategoryLabels[params.category];

  return (
    <main>
      <PageShell withNavOffset className="py-14 md:py-20">
        <Link href="/blog" className="blog-cat-back">
          <span className="he">← חזרה למגזין</span>
          <span className="en">← Back to journal</span>
        </Link>
        <h1 className="section-title mt-6">
          <span className="he">{lab.he}</span>
          <span className="en">{lab.en}</span>
        </h1>
        {posts.length === 0 ? (
          <p className="mt-8 text-ink-soft">
            <span className="he">{blogIndexUi.empty.he}</span>
            <span className="en">{blogIndexUi.empty.en}</span>
          </p>
        ) : (
          <ul className="blog-index-list mt-10">
            {posts.map((p) => (
              <li key={p.slug} className="blog-index-row">
                <Link href={`/blog/${p.slug}`} className="blog-index-row__link">
                  <span className="he">{p.title.he}</span>
                  <span className="en">{p.title.en}</span>
                </Link>
                <span className="blog-index-row__meta">
                  {p.readingMinutesHe}
                  <span className="he"> דק׳</span>
                  <span className="en"> min</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </PageShell>
    </main>
  );
}
