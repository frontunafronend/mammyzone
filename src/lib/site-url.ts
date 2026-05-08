/** Canonical site origin for metadata, sitemap, and OG URLs */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mammyzone.co.il";

export function absoluteUrl(path: string) {
  const base = siteUrl.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
