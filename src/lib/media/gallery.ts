import type { Bilingual, StudioGalleryCategory, StudioGalleryItem } from "@/types";
import { studioPhotos } from "./sources";

const b = (he: string, en: string): Bilingual => ({ he, en });

export const GALLERY_CATEGORIES = [
  "pregnancy-yoga",
  "yoga-children",
  "baby-massage",
  "yoga",
  "family",
] as const satisfies readonly StudioGalleryCategory[];

type ItemOpts = Pick<StudioGalleryItem, "shape" | "featured">;

function photo(
  id: string,
  src: string,
  alt: Bilingual,
  category: StudioGalleryCategory,
  opts?: ItemOpts,
): StudioGalleryItem {
  return { id, kind: "photo", src, alt, category, ...opts };
}

function live(
  id: string,
  alt: Bilingual,
  category: StudioGalleryCategory,
  opts?: ItemOpts,
): StudioGalleryItem {
  const file = `IMG_${id}`;
  return {
    id: `live-${id}`,
    kind: "video",
    src: `/videos/studio-${file}.mp4`,
    poster: `/photos/studio-${file}.jpg`,
    alt,
    category,
    ...opts,
  };
}

function still(
  id: string,
  alt: Bilingual,
  category: StudioGalleryCategory,
  opts?: ItemOpts,
): StudioGalleryItem {
  return photo(`still-${id}`, `/photos/studio-IMG_${id}.jpg`, alt, category, opts);
}

/**
 * Full studio library, tagged by offering: pregnancy yoga, yoga with children,
 * baby massage, yoga, and home.
 */
export const studioGalleryItems: readonly StudioGalleryItem[] = [
  photo("pregnancy-beach-salute", studioPhotos.pregnancyBeachSalute, b("יוגה בהריון על החוף — ידיים לשמיים", "Prenatal yoga on the beach — arms to the sky"), "pregnancy-yoga", { shape: "portrait", featured: true }),
  photo("pregnancy-bw", studioPhotos.pregnancyBw, b("דיוקן בהריון בשחור־לבן", "Black-and-white pregnancy portrait"), "pregnancy-yoga", { shape: "portrait", featured: true }),
  photo("pregnancy-beach-arms", studioPhotos.pregnancyBeachArms, b("יוגה בהריון מול הגלים", "Prenatal yoga facing the waves"), "pregnancy-yoga", { shape: "portrait" }),
  photo("beach-yoga-arms", studioPhotos.beachYogaArms, b("יוגה בהריון — עמידה פתוחה על החול", "Prenatal yoga — an open stance on the sand"), "pregnancy-yoga", { shape: "portrait" }),
  photo("pregnancy-pool", studioPhotos.pregnancyPool, b("שחרור במים בהריון", "Ease in the water during pregnancy"), "pregnancy-yoga"),

  still("8154", b("מתיחה עם עגלה על הטיילת", "A stretch with the stroller on the promenade"), "yoga-children", { shape: "wide" }),
  live("8154", b("תנועה חיה על הטיילת עם העגלה", "Living movement on the promenade with the stroller"), "yoga-children", { shape: "wide" }),
  still("8161", b("שיווי משקל רך ליד העגלה", "Soft balance beside the stroller"), "yoga-children", { shape: "wide", featured: true }),
  live("8161", b("יוגה חיה ליד העגלה בטיילת", "Living yoga beside the stroller on the promenade"), "yoga-children", { shape: "wide", featured: true }),
  still("8163", b("תנועה עם העגלה מול הים", "Movement with the stroller facing the sea"), "yoga-children"),
  live("8163", b("רגע חי על הטיילת", "A living moment on the promenade"), "yoga-children"),
  still("8165", b("תרגול קצר ליד העגלה", "A short practice beside the stroller"), "yoga-children"),
  live("8165", b("תרגול חי ליד העגלה", "A living practice beside the stroller"), "yoga-children"),
  still("8173", b("כלב מביט למטה נשען על העגלה", "Downward dog using the stroller"), "yoga-children", { shape: "wide" }),
  live("8173", b("כלב מביט למטה חי על הטיילת", "Living downward dog on the promenade"), "yoga-children", { shape: "wide", featured: true }),
  still("8210", b("הליכה ותרגול על הטיילת", "Walking and practice on the promenade"), "yoga-children"),
  live("8210", b("תנועה חיה על הטיילת", "Living movement on the promenade"), "yoga-children"),
  still("8220", b("רגע עם העגלה מול החוף", "A moment with the stroller facing the beach"), "yoga-children"),
  live("8220", b("רגע חי עם העגלה", "A living moment with the stroller"), "yoga-children"),
  still("8234", b("מתיחה רכה על הטיילת", "A gentle stretch on the promenade"), "yoga-children"),
  live("8234", b("מתיחה חיה על הטיילת", "A living stretch on the promenade"), "yoga-children"),
  photo("promenade-stretch", studioPhotos.promenadeStretch, b("מתיחה על הטיילת", "A stretch on the promenade"), "yoga-children"),
  photo("promenade-child", studioPhotos.promenadeChild, b("רגע עם ילד על הטיילת", "A moment with a child on the promenade"), "yoga-children"),
  still("8277", b("משחק מעוף בפארק", "Airplane play in the park"), "yoga-children", { shape: "portrait", featured: true }),
  still("8268", b("משחק על הדשא בעיר", "Play on the city grass"), "yoga-children", { shape: "wide" }),
  still("8261", b("רגע משחק בפארק", "A playful moment in the park"), "yoga-children", { shape: "wide" }),
  photo("park-airplane", studioPhotos.parkAirplane, b("מטוס קטן על הדשא", "Airplane pose on the grass"), "yoga-children", { shape: "portrait" }),
  photo("park-airplane-wide", studioPhotos.parkAirplaneWide, b("משחק רחב בפארק", "Wide play in the park"), "yoga-children", { shape: "wide" }),
  photo("mom-toddler-park", studioPhotos.momToddlerPark, b("אמא ופעוט בפארק", "Mother and toddler in the park"), "yoga-children", { shape: "portrait" }),

  photo("baby-massage-smile", studioPhotos.babyMassageSmile, b("עיסוי תינוקות — חיוך", "Baby massage — a smile"), "baby-massage", { featured: true }),
  photo("baby-massage-head", studioPhotos.babyMassageHead, b("מגע עדין לראש", "Gentle touch for the head"), "baby-massage"),
  photo("baby-massage-arms", studioPhotos.babyMassageArms, b("עיסוי ידיים לתינוק", "Baby arm massage"), "baby-massage"),
  photo("baby-massage-legs", studioPhotos.babyMassageLegs, b("עיסוי רגליים לתינוק", "Baby leg massage"), "baby-massage"),
  photo("baby-massage-tummy", studioPhotos.babyMassageTummy, b("עיסוי בטן רך", "A soft tummy massage"), "baby-massage"),
  photo("baby-class", studioPhotos.babyClass, b("מפגש עיסוי תינוקות", "A baby massage gathering"), "baby-massage"),
  still("8304", b("מגע עדין על הדשא", "Gentle touch on the grass"), "baby-massage"),
  live("8304", b("מגע חי על הדשא", "Living touch on the grass"), "baby-massage"),
  still("8306", b("עיסוי ומשחק בפארק", "Massage and play in the park"), "baby-massage", { featured: true }),
  live("8306", b("רגע חי של מגע בפארק", "A living moment of touch in the park"), "baby-massage", { shape: "wide", featured: true }),
  still("8308", b("קרבה על הדשא", "Closeness on the grass"), "baby-massage"),
  live("8308", b("קרבה חיה על הדשא", "Living closeness on the grass"), "baby-massage"),
  photo("img-9118", "/photos/img_9118.jpg", b("צחוק משותף עם תינוק", "Shared laughter with a baby"), "baby-massage", { shape: "portrait", featured: true }),
  photo("img-9101", "/photos/img_9101.jpg", b("נשיקה קטנה לכף רגל", "A small kiss on a baby’s foot"), "baby-massage", { featured: true }),
  photo("img-9102", "/photos/img_9102.jpg", b("רגע ביתי עם תינוק", "A home moment with a baby"), "baby-massage"),
  photo("img-9107", "/photos/img_9107.jpg", b("קרבה רכה בסלון", "Soft closeness on the sofa"), "baby-massage"),
  photo("img-9135", "/photos/img_9135.jpg", b("מבט משותף בבית", "A shared look at home"), "baby-massage"),

  still("8214", b("ברכה לשמיים על החוף", "Upward salute on the beach"), "yoga", { shape: "portrait", featured: true }),
  still("8215", b("מתיחה לשמיים מול הים", "A stretch toward the sky by the sea"), "yoga", { shape: "portrait" }),
  live("8214", b("תנועה חיה — ברכה לשמיים על החוף", "Living movement — upward salute on the beach"), "yoga", { shape: "portrait" }),
  still("8185", b("פתיחת חזה מול האופק", "Opening the chest toward the horizon"), "yoga", { shape: "wide" }),
  live("8185", b("נשימה חיה מול הים", "Living breath facing the sea"), "yoga", { shape: "wide" }),
  still("8193", b("קוברה על החול", "Cobra on the sand"), "yoga", { shape: "wide", featured: true }),
  live("8193", b("קוברה חיה על החוף", "Living cobra on the beach"), "yoga", { shape: "wide", featured: true }),
  still("8201", b("כלב מביט למטה עם רגל פתוחה על החול", "Three-legged downward dog on the sand"), "yoga", { shape: "wide" }),
  live("8201", b("תנועה על החול — כלב מביט למטה", "Movement on the sand — downward dog"), "yoga", { shape: "wide" }),
  still("8196", b("יוגה על החוף באור רך", "Yoga on the beach in soft light"), "yoga"),
  live("8196", b("יוגה חיה על החול", "Living yoga on the sand"), "yoga"),
  still("8224", b("תנוחה על החוף מול הגלים", "A pose on the beach facing the waves"), "yoga"),
  live("8224", b("תנועה חיה מול הגלים", "Living movement facing the waves"), "yoga"),
  photo("beach-updog", studioPhotos.beachUpdog, b("כלב מביט מעלה על החול", "Upward-facing dog on the sand"), "yoga"),
  photo("beach-downdog", studioPhotos.beachDowndog, b("כלב מביט למטה על החול", "Downward-facing dog on the sand"), "yoga"),
  photo("yoga-coast-stretch", studioPhotos.yogaCoastStretch, b("מתיחה על הדשא ליד הים", "A stretch on the grass by the sea"), "yoga", { featured: true }),
  photo("yoga-coast-cobra", studioPhotos.yogaCoastCobra, b("תנוחת קוברה ליד החוף", "Cobra near the shore"), "yoga"),
  photo("yoga-coast-plank", studioPhotos.yogaCoastPlank, b("פלאנק רך ליד הים", "A soft plank by the sea"), "yoga"),
  photo("yoga-coast-seated", studioPhotos.yogaCoastSeated, b("ישיבה שקטה מול הים", "A quiet seat facing the sea"), "yoga"),

  photo("family-home", studioPhotos.familyHome, b("רגע משפחתי בבית", "A family moment at home"), "family", { shape: "portrait" }),
];

export const homepageGalleryItems: readonly StudioGalleryItem[] = studioGalleryItems.filter(
  (item) => item.featured,
);

export function itemsByGalleryCategory(
  category: StudioGalleryCategory,
): StudioGalleryItem[] {
  return studioGalleryItems.filter((item) => item.category === category);
}

export function galleryPhotoSources(category: StudioGalleryCategory, limit = 4): string[] {
  return itemsByGalleryCategory(category)
    .filter((item) => item.kind === "photo")
    .map((item) => item.src)
    .slice(0, limit);
}

export function galleryJsonLd(pageUrl: string, imageUrls: readonly string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "MammyZone gallery",
    url: pageUrl,
    inLanguage: ["he-IL", "en-US"],
    associatedMedia: imageUrls.slice(0, 24).map((url) => ({
      "@type": "ImageObject",
      contentUrl: url,
    })),
  };
}
