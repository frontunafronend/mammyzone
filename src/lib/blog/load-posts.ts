import fs from "fs";
import path from "path";
import type { ReactElement } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { blogMdxComponents } from "@/components/blog/mdx/registry";
import { getAuthor } from "./authors";
import { isBlogCategory, type BlogCategory } from "./categories";
import type { BlogPostFrontmatter, BlogPostMeta, TocItem } from "./types";
import { extractTocFromMarkdown } from "./toc";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function postFilePath(slug: string) {
  return path.join(CONTENT_DIR, `${slug}.mdx`);
}

function assertFrontmatter(data: unknown): BlogPostFrontmatter {
  if (!data || typeof data !== "object") throw new Error("Missing frontmatter");
  const d = data as Record<string, unknown>;
  const category = d.category;
  if (typeof category !== "string" || !isBlogCategory(category)) {
    throw new Error(`Invalid category: ${category}`);
  }
  if (typeof d.slug !== "string" || typeof d.authorSlug !== "string") {
    throw new Error("slug and authorSlug are required");
  }
  if (!getAuthor(d.authorSlug)) throw new Error(`Unknown author: ${d.authorSlug}`);
  const title = d.title;
  const excerpt = d.excerpt;
  const imageAlt = d.imageAlt;
  if (
    !title ||
    typeof title !== "object" ||
    typeof (title as { he?: string }).he !== "string" ||
    typeof (title as { en?: string }).en !== "string"
  ) {
    throw new Error("title.he and title.en required");
  }
  if (
    !excerpt ||
    typeof excerpt !== "object" ||
    typeof (excerpt as { he?: string }).he !== "string" ||
    typeof (excerpt as { en?: string }).en !== "string"
  ) {
    throw new Error("excerpt.he and excerpt.en required");
  }
  if (
    !imageAlt ||
    typeof imageAlt !== "object" ||
    typeof (imageAlt as { he?: string }).he !== "string" ||
    typeof (imageAlt as { en?: string }).en !== "string"
  ) {
    throw new Error("imageAlt.he and imageAlt.en required");
  }
  if (typeof d.publishedAt !== "string" || typeof d.image !== "string") {
    throw new Error("publishedAt and image required");
  }
  if (!Array.isArray(d.tags)) throw new Error("tags must be an array");
  return d as BlogPostFrontmatter;
}

export const getPostSlugs = cache((): string[] => {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
});

export function getPostMeta(slug: string): BlogPostMeta | null {
  const fp = postFilePath(slug);
  if (!fs.existsSync(fp)) return null;
  const raw = fs.readFileSync(fp, "utf8");
  const { data, content } = matter(raw);
  const fm = assertFrontmatter(data);
  const rt = readingTime(content);
  const minutes = Math.max(1, Math.round(rt.minutes));
  return {
    ...fm,
    readingMinutesHe: minutes,
    readingMinutesEn: minutes,
    body: content,
  };
}

export const getAllPostMetas = cache((): BlogPostMeta[] => {
  return getPostSlugs()
    .map((slug) => getPostMeta(slug))
    .filter((m): m is BlogPostMeta => m !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
});

export function getFeaturedPostMetas(): BlogPostMeta[] {
  return getAllPostMetas().filter((p) => p.featured);
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  if (!isBlogCategory(category)) return [];
  return getAllPostMetas().filter((p) => p.category === category);
}

export function getRelatedPostMetas(
  slug: string,
  category: BlogCategory,
  limit = 3,
): BlogPostMeta[] {
  const all = getAllPostMetas();
  const same = all.filter((p) => p.slug !== slug && p.category === category);
  if (same.length >= limit) return same.slice(0, limit);
  const usedSlugs = new Set<string>([slug, ...same.map((p) => p.slug)]);
  const filler = all.filter((p) => !usedSlugs.has(p.slug));
  return [...same, ...filler].slice(0, limit);
}

export type CompiledPost = {
  meta: BlogPostMeta;
  toc: TocItem[];
  content: ReactElement;
};

export async function compilePost(slug: string): Promise<CompiledPost | null> {
  const fp = postFilePath(slug);
  if (!fs.existsSync(fp)) return null;
  const raw = fs.readFileSync(fp, "utf8");
  const parsed = matter(raw);
  const fm = assertFrontmatter(parsed.data);
  const rt = readingTime(parsed.content);
  const minutes = Math.max(1, Math.round(rt.minutes));
  const meta: BlogPostMeta = {
    ...fm,
    readingMinutesHe: minutes,
    readingMinutesEn: minutes,
    body: parsed.content,
  };
  const toc = extractTocFromMarkdown(parsed.content);

  const { content: MDXContent } = await compileMDX({
    source: raw,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["blog-heading-link"],
              },
            },
          ],
        ],
      },
    },
    components: blogMdxComponents,
  });

  return { meta, toc, content: MDXContent };
}
