import Slugger from "github-slugger";
import type { TocItem } from "./types";

/** Extract ## / ### headings for sticky TOC; IDs align with `rehype-slug`. */
export function extractTocFromMarkdown(mdxBody: string): TocItem[] {
  const slugger = new Slugger();
  const toc: TocItem[] = [];

  for (const line of mdxBody.split("\n")) {
    const trimmed = line.trimEnd();
    const m = /^(#{2,3})\s+(.+)$/.exec(trimmed);
    if (!m) continue;
    const depth = m[1].length as 2 | 3;
    let text = m[2].trim();
    let id: string | undefined;
    const explicit = /\s*\{#([^}]+)\}\s*$/.exec(text);
    if (explicit) {
      id = explicit[1];
      text = text.slice(0, explicit.index).trim();
    } else {
      id = slugger.slug(text.replace(/<[^>]+>/g, "").trim());
    }
    if (!text || text.startsWith("import ") || text.startsWith("{")) continue;
    toc.push({ depth, id, text });
  }

  return toc;
}
