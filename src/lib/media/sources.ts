import type { Bilingual, SocialGalleryImage } from "@/types";
import { dedupeSources } from "./unsplash";

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

export const heroImageSources = studioStack(
  "beachYogaArms",
  "pregnancyBeachArms",
);

export const aboutPortraitSources = studioStack(
  "pregnancyBeachArms",
  "beachYogaArms",
  "pregnancyBeachSalute",
);

const BLOG_FALLBACKS = studioStack(
  "yogaCoastSeated",
  "babyMassageSmile",
  "pregnancyBeachSalute",
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

export const serviceCardImageSources: Record<"01" | "02", string[]> = {
  "01": studioStack("pregnancyBeachSalute", "pregnancyBw", "pregnancyBeachArms"),
  "02": studioStack("pregnancyBeachArms", "pregnancyBeachSalute", "pregnancyBw"),
};

export const socialGalleryStock: readonly SocialGalleryImage[] = [
  {
    alt: { he: "יוגה מול הים", en: "Yoga by the sea" },
    sources: studioStack("yogaCoastStretch", "yogaCoastCobra", "beachUpdog"),
  },
  {
    alt: { he: "יוגה בהריון על החוף", en: "Prenatal yoga on the beach" },
    sources: studioStack("pregnancyBeachSalute", "pregnancyBeachArms", "pregnancyBw"),
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
    sources: studioStack("pregnancyPool", "pregnancyBeachArms"),
  },
  {
    alt: { he: "יוגה על החול", en: "Yoga on the sand" },
    sources: studioStack("beachUpdog", "beachDowndog", "beachYogaArms"),
  },
];
