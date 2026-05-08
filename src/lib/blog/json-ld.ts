import { absoluteUrl } from "@/lib/site-url";
import type { BlogPostMeta } from "./types";
import { getAuthor } from "./authors";
import { blogCategoryLabels } from "./categories";

export function articleJsonLd(
  post: BlogPostMeta,
  opts: { url: string; locale: "he" | "en" },
) {
  const author = getAuthor(post.authorSlug);
  const title = opts.locale === "he" ? post.title.he : post.title.en;
  const description =
    (opts.locale === "he" ? post.seoDescription?.he : post.seoDescription?.en) ??
    (opts.locale === "he" ? post.excerpt.he : post.excerpt.en);
  const categoryLabel =
    opts.locale === "he"
      ? blogCategoryLabels[post.category].he
      : blogCategoryLabels[post.category].en;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: [post.image],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: author
      ? {
          "@type": "Person",
          name: opts.locale === "he" ? author.name.he : author.name.en,
          url: absoluteUrl("/"),
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "MammyZone",
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": opts.url,
    },
    articleSection: categoryLabel,
    keywords: post.tags.join(", "),
    inLanguage: opts.locale === "he" ? "he-IL" : "en-US",
    isAccessibleForFree: true,
    url: opts.url,
  };
}

export function blogListingJsonLd(url: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name,
    description,
    url,
    publisher: {
      "@type": "Organization",
      name: "MammyZone",
      url: absoluteUrl("/"),
    },
    inLanguage: ["he-IL", "en-US"],
  };
}
