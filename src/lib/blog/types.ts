import type { BlogCategory } from "./categories";

export type BlogPostFrontmatter = {
  slug: string;
  title: { he: string; en: string };
  excerpt: { he: string; en: string };
  category: BlogCategory;
  tags: string[];
  authorSlug: string;
  featured?: boolean;
  publishedAt: string;
  updatedAt?: string;
  image: string;
  imageAlt: { he: string; en: string };
  /** Optional SEO overrides */
  seoTitle?: { he?: string; en?: string };
  seoDescription?: { he?: string; en?: string };
};

export type BlogPostMeta = BlogPostFrontmatter & {
  readingMinutesHe: number;
  readingMinutesEn: number;
  body: string;
};

export type TocItem = {
  depth: 2 | 3;
  id: string;
  text: string;
};
