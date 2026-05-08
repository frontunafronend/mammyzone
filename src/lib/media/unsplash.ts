/**
 * Stock photography via Unsplash (https://unsplash.com/license — free use with attribution appreciated).
 * All URLs use images.unsplash.com (configured in next.config.mjs).
 */

export const MEDIA_FALLBACK_PATH = "/media-fallback.svg";

/** Build a single optimized Unsplash CDN URL (photo id includes `photo-` prefix). Remotes can 404 over time — render with `SafeImage` + `MEDIA_FALLBACK_PATH`. */
export function unsplashPhoto(photoId: string, width: number, quality = 82): string {
  const id = photoId.startsWith("photo-") ? photoId : `photo-${photoId}`;
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export function dedupeSources(urls: readonly string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const u of urls) {
    const t = u.trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out;
}
