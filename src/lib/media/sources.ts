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
  "pregnancyBeachArms",
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

/** Unsplash — large yoga room with mats, windows onto greenery, and a deck. */
export const retreatSpaceSources = [
  unsplashPhoto("1761971975962-9cc397e2ba2a", 1600),
  unsplashPhoto("1506126613408-eca07ce68773", 1600),
  unsplashPhoto("1687783615476-f4c12358ca9d", 1600),
];

/** Unsplash — circle around a fire, then a women's gathering as fallback. */
export const workshopFireSources = [
  unsplashPhoto("1478131143081-80f7f84ca84d", 1600),
  unsplashPhoto("1545205597-3d9d02c29597", 1600),
];

export const postnatalYogaSources = studioStack(
  "yogaCoastSeated",
  "yogaCoastPlank",
  "beachDowndog",
  "beachUpdog",
);

export const prenatalYogaSources = studioStack("pregnancyBw", "pregnancyPool");

export const nlpEmpowerSources = studioStack("beachYogaArms", "yogaCoastStretch");

export const serviceCardImageSources: Record<"01" | "02" | "03" | "04" | "05" | "06", string[]> = {
  "01": postnatalYogaSources,
  "02": prenatalYogaSources,
  "03": nlpEmpowerSources,
  "04": studioStack("babyMassageSmile", "babyMassageHead", "babyMassageArms"),
  "05": workshopFireSources,
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
