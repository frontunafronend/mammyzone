import type { Bilingual, SocialGalleryImage } from "@/types";
import { dedupeSources, unsplashPhoto } from "./unsplash";

/**
 * Curated Unsplash stacks — IDs are reused from this repo / MDX for stable CDN URLs.
 * `SafeImage` always appends `/media-fallback.svg` after these remotes.
 */
const P = {
  yogaWindow: "photo-1545205597-3d9d02c29597",
  stretch: "photo-1571019613454-1cb2f99b2d8b",
  /** Replaced 2026-05: prior Unsplash IDs returned 404 from images.unsplash.com (Imgix). */
  meditate: "photo-1438761681033-6461ffad8d80",
  momBaby: "photo-1518611012118-696072aa579a",
  meal: "photo-1511895426328-dc8714191300",
  heroYoga: "photo-1544367567-0f2fcb009e0b",
  journalZen: "photo-1506126613408-eca07ce68773",
  journalNlp: "photo-1515378791036-0648a3ef77b2",
  circle: "photo-1529156069898-49953e39b3ac",
} as const;

/** Same vetted Unsplash ids as `P` — for service landings and other stacks. */
export const unsplashCuratedPhotoIds = P;

export const heroImageSources = dedupeSources([
  unsplashPhoto(P.heroYoga, 1200),
  unsplashPhoto(P.yogaWindow, 1200),
  unsplashPhoto(P.journalZen, 1200),
  unsplashPhoto(P.stretch, 1200),
]);

export const aboutPortraitSources = dedupeSources([
  unsplashPhoto(P.momBaby, 900),
  unsplashPhoto(P.heroYoga, 900),
  unsplashPhoto(P.yogaWindow, 900),
  unsplashPhoto(P.meditate, 900),
]);

const BLOG_FALLBACKS = dedupeSources([
  unsplashPhoto(P.journalZen, 1400),
  unsplashPhoto(P.journalNlp, 1400),
  unsplashPhoto(P.heroYoga, 1400),
  unsplashPhoto(P.stretch, 1400),
]);

export function blogCoverSources(primaryUrl: string | undefined | null): string[] {
  const p = primaryUrl?.trim();
  return dedupeSources([...(p ? [p] : []), ...BLOG_FALLBACKS]);
}

export function authorAvatarSources(primaryUrl: string | undefined | null): string[] {
  const p = primaryUrl?.trim();
  return dedupeSources([
    ...(p ? [p] : []),
    unsplashPhoto(P.momBaby, 200),
    unsplashPhoto(P.journalNlp, 200),
    unsplashPhoto(P.meditate, 200),
  ]);
}

export const serviceCardImageSources: Record<"01" | "02", string[]> = {
  "01": dedupeSources([
    unsplashPhoto(P.heroYoga, 900),
    unsplashPhoto(P.yogaWindow, 900),
    unsplashPhoto(P.stretch, 900),
  ]),
  "02": dedupeSources([
    unsplashPhoto(P.stretch, 900),
    unsplashPhoto(P.momBaby, 900),
    unsplashPhoto(P.meditate, 900),
  ]),
};

export const socialGalleryStock: readonly SocialGalleryImage[] = [
  {
    alt: { he: "מעגל נשים יושבות במעגל", en: "Women seated in circle" },
    sources: dedupeSources([
      unsplashPhoto(P.circle, 800),
      unsplashPhoto(P.yogaWindow, 800),
      unsplashPhoto(P.momBaby, 800),
    ]),
  },
  {
    alt: { he: "יוגה באור חלון", en: "Yoga by window light" },
    sources: dedupeSources([
      unsplashPhoto(P.yogaWindow, 800),
      unsplashPhoto(P.heroYoga, 800),
      unsplashPhoto(P.journalZen, 800),
    ]),
  },
  {
    alt: { he: "מתיחה עדינה", en: "Gentle stretch" },
    sources: dedupeSources([
      unsplashPhoto(P.stretch, 800),
      unsplashPhoto(P.meditate, 800),
      unsplashPhoto(P.heroYoga, 800),
    ]),
  },
  {
    alt: { he: "מדיטציה יושבת", en: "Seated meditation" },
    sources: dedupeSources([
      unsplashPhoto(P.meditate, 800),
      unsplashPhoto(P.journalZen, 800),
      unsplashPhoto(P.yogaWindow, 800),
    ]),
  },
  {
    alt: { he: "אמא ותינוק במבט רך", en: "Mother and baby, soft gaze" },
    sources: dedupeSources([
      unsplashPhoto(P.momBaby, 800),
      unsplashPhoto(P.circle, 800),
      unsplashPhoto(P.meal, 800),
    ]),
  },
  {
    alt: { he: "ארוחה משותפת על שולחן", en: "Shared meal at a table" },
    sources: dedupeSources([
      unsplashPhoto(P.meal, 800),
      unsplashPhoto(P.momBaby, 800),
      unsplashPhoto(P.journalNlp, 800),
    ]),
  },
];
