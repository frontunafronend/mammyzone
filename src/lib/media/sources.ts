import type { Bilingual, SocialGalleryImage } from "@/types";
import { dedupeSources, unsplashPhoto } from "./unsplash";

/** Studio photographs from Ortal — served from `/public/photos`. */
export const studioPhotos = {
  pregnancyBw: "/photos/pregnancy-bw.jpg",
  yogaCoastStretch: "/photos/yoga-coast-stretch.jpg",
  yogaCoastPlank: "/photos/yoga-coast-plank.jpg",
  yogaCoastCobra: "/photos/yoga-coast-cobra.jpg",
  yogaCoastSeated: "/photos/yoga-coast-seated.jpg",
  pregnancyBeachArms: "/photos/pregnancy-beach-arms.jpg",
  pregnancyBeachSalute: "/photos/pregnancy-beach-salute.jpg",
  babyMassageHead: "/photos/baby-massage-head.jpg",
  babyMassageArms: "/photos/baby-massage-arms.jpg",
  babyMassageSmile: "/photos/baby-massage-smile.jpg",
  babyMassageLegs: "/photos/baby-massage-legs.jpg",
  babyMassageTummy: "/photos/baby-massage-tummy.jpg",
  momToddlerPark: "/photos/mom-toddler-park.jpg",
  pregnancyPool: "/photos/pregnancy-pool.jpg",
  familyHome: "/photos/family-home.jpg",
  babyClass: "/photos/baby-class.jpg",
  promenadeStretch: "/photos/promenade-stretch.jpg",
  promenadeChild: "/photos/promenade-child.jpg",
  beachYogaArms: "/photos/beach-yoga-arms.jpg",
  beachUpdog: "/photos/beach-updog.jpg",
  beachDowndog: "/photos/beach-downdog.jpg",
  parkAirplaneWide: "/photos/park-airplane-wide.jpg",
  parkAirplane: "/photos/park-airplane.jpg",
} as const;

export type StudioPhotoKey = keyof typeof studioPhotos;

export function studioStack(...keys: StudioPhotoKey[]): string[] {
  return dedupeSources(keys.map((k) => studioPhotos[k]));
}

export const heroImageSources = studioStack("beachYogaArms", "yogaCoastStretch");

export const aboutPortraitSources = studioStack(
  "pregnancyBw",
  "beachYogaArms",
  "yogaCoastSeated",
);

const BLOG_FALLBACKS = studioStack(
  "yogaCoastSeated",
  "babyMassageSmile",
  "pregnancyBw",
  "yogaCoastStretch",
);

export function blogCoverSources(primaryUrl: string | undefined | null): string[] {
  const p = primaryUrl?.trim();
  return dedupeSources([...(p ? [p] : []), ...BLOG_FALLBACKS]);
}

export function authorAvatarSources(primaryUrl: string | undefined | null): string[] {
  const p = primaryUrl?.trim();
  return dedupeSources([
    ...(p ? [p] : []),
    studioPhotos.familyHome,
    studioPhotos.babyClass,
    studioPhotos.pregnancyBw,
  ]);
}

/** Unsplash — built space in nature (pavilion / house / interior with greenery). */
export const retreatSpaceSources = [
  unsplashPhoto("1600210492486-724fe5c67fb0", 1600),
  unsplashPhoto("1600585154340-be6161a56a0c", 1600),
  unsplashPhoto("1520250497591-112f2f40a3f4", 1600),
];

/** Unsplash — women's gatherings for workshops & circles (no studio circle photos). */
export const workshopCircleSources = [
  unsplashPhoto("1469571486292-0ba58a3f068b", 1600),
  unsplashPhoto("1511632765486-a01980e01a18", 1600),
  unsplashPhoto("1545205597-3d9d02c29597", 1600),
  unsplashPhoto("1529156069898-49953e39b3ac", 1600),
];

export const serviceCardImageSources: Record<"01" | "02" | "03" | "04" | "05" | "06", string[]> = {
  "01": studioStack("yogaCoastSeated", "yogaCoastPlank", "beachDowndog"),
  "02": studioStack("pregnancyBw", "pregnancyPool"),
  "03": studioStack("beachYogaArms", "yogaCoastStretch"),
  "04": studioStack("babyMassageSmile", "babyMassageHead", "babyMassageArms"),
  "05": workshopCircleSources,
  "06": retreatSpaceSources,
};

export const socialGalleryStock: readonly SocialGalleryImage[] = [
  {
    alt: { he: "יוגה מול הים", en: "Yoga by the sea" },
    sources: studioStack("yogaCoastStretch", "yogaCoastCobra", "beachUpdog"),
  },
  {
    alt: { he: "יוגה להריון על החוף", en: "Prenatal yoga on the beach" },
    sources: studioStack("pregnancyBw", "pregnancyPool"),
  },
  {
    alt: { he: "עיסוי תינוקות", en: "Baby massage" },
    sources: studioStack("babyMassageSmile", "babyMassageHead", "babyMassageArms"),
  },
  {
    alt: { he: "תנוחה על הדשא ליד הים", en: "A pose on the grass by the sea" },
    sources: studioStack("yogaCoastCobra", "yogaCoastPlank", "yogaCoastSeated"),
  },
  {
    alt: { he: "רגע של משחק עם פעוט", en: "A playful moment with a toddler" },
    sources: studioStack("parkAirplane", "momToddlerPark", "parkAirplaneWide"),
  },
  {
    alt: { he: "מפגש עיסוי תינוקות", en: "A baby massage gathering" },
    sources: studioStack("babyClass", "babyMassageTummy", "babyMassageLegs"),
  },
  {
    alt: { he: "שחרור במים", en: "Ease in the water" },
    sources: studioStack("pregnancyPool"),
  },
  {
    alt: { he: "יוגה על החול", en: "Yoga on the sand" },
    sources: studioStack("beachUpdog", "beachDowndog", "beachYogaArms"),
  },
];
