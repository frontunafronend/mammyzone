import type { Bilingual, StudioGalleryItem } from "@/types";
import { studioPhotos } from "./sources";

const b = (he: string, en: string): Bilingual => ({ he, en });

function photo(
  id: string,
  src: string,
  alt: Bilingual,
  opts?: Pick<StudioGalleryItem, "shape" | "featured">,
): StudioGalleryItem {
  return { id, kind: "photo", src, alt, ...opts };
}

function live(
  id: string,
  alt: Bilingual,
  opts?: Pick<StudioGalleryItem, "shape" | "featured">,
): StudioGalleryItem {
  const file = `IMG_${id}`;
  return {
    id: `live-${id}`,
    kind: "video",
    src: `/videos/studio-${file}.mp4`,
    poster: `/photos/studio-${file}.jpg`,
    alt,
    ...opts,
  };
}

function still(id: string, alt: Bilingual, opts?: Pick<StudioGalleryItem, "shape" | "featured">) {
  return photo(`still-${id}`, `/photos/studio-IMG_${id}.jpg`, alt, opts);
}

/**
 * Full studio library: named photos already on the site, enhanced HEIC stills,
 * extra indoor portraits, and Live Photo clips (muted, a few seconds each).
 */
export const studioGalleryItems: readonly StudioGalleryItem[] = [
  photo("pregnancy-beach-salute", studioPhotos.pregnancyBeachSalute, b("יוגה בהריון על החוף — ידיים לשמיים", "Prenatal yoga on the beach — arms to the sky"), { shape: "portrait", featured: true }),
  photo("pregnancy-bw", studioPhotos.pregnancyBw, b("דיוקן בהריון בשחור־לבן", "Black-and-white pregnancy portrait"), { shape: "portrait", featured: true }),
  photo("pregnancy-beach-arms", studioPhotos.pregnancyBeachArms, b("יוגה בהריון מול הגלים", "Prenatal yoga facing the waves"), { shape: "portrait" }),
  photo("beach-yoga-arms", studioPhotos.beachYogaArms, b("עמידה פתוחה על החול", "An open stance on the sand"), { shape: "portrait" }),
  still("8214", b("ברכה לשמיים על החוף", "Upward salute on the beach"), { shape: "portrait", featured: true }),
  still("8215", b("מתיחה לשמיים מול הים", "A stretch toward the sky by the sea"), { shape: "portrait" }),
  live("8214", b("תנועה חיה — ברכה לשמיים על החוף", "Living movement — upward salute on the beach"), { shape: "portrait" }),
  still("8185", b("פתיחת חזה מול האופק", "Opening the chest toward the horizon"), { shape: "wide" }),
  live("8185", b("נשימה חיה מול הים", "Living breath facing the sea"), { shape: "wide" }),
  still("8193", b("קוברה על החול", "Cobra on the sand"), { shape: "wide", featured: true }),
  live("8193", b("קוברה חיה על החוף", "Living cobra on the beach"), { shape: "wide", featured: true }),
  still("8201", b("כלב מביט למטה עם רגל פתוחה על החול", "Three-legged downward dog on the sand"), { shape: "wide" }),
  live("8201", b("תנועה על החול — כלב מביט למטה", "Movement on the sand — downward dog"), { shape: "wide" }),
  still("8196", b("יוגה על החוף באור רך", "Yoga on the beach in soft light"), { shape: "landscape" }),
  live("8196", b("יוגה חיה על החול", "Living yoga on the sand"), { shape: "landscape" }),
  still("8224", b("תנוחה על החוף מול הגלים", "A pose on the beach facing the waves"), { shape: "landscape" }),
  live("8224", b("תנועה חיה מול הגלים", "Living movement facing the waves"), { shape: "landscape" }),
  photo("beach-updog", studioPhotos.beachUpdog, b("כלב מביט מעלה על החול", "Upward-facing dog on the sand")),
  photo("beach-downdog", studioPhotos.beachDowndog, b("כלב מביט למטה על החול", "Downward-facing dog on the sand")),
  photo("yoga-coast-stretch", studioPhotos.yogaCoastStretch, b("מתיחה על הדשא ליד הים", "A stretch on the grass by the sea"), { featured: true }),
  photo("yoga-coast-cobra", studioPhotos.yogaCoastCobra, b("תנוחת קוברה ליד החוף", "Cobra near the shore")),
  photo("yoga-coast-plank", studioPhotos.yogaCoastPlank, b("פלאנק רך ליד הים", "A soft plank by the sea")),
  photo("yoga-coast-seated", studioPhotos.yogaCoastSeated, b("ישיבה שקטה מול הים", "A quiet seat facing the sea")),

  still("8154", b("מתיחה עם עגלה על הטיילת", "A stretch with the stroller on the promenade"), { shape: "wide" }),
  live("8154", b("תנועה חיה על הטיילת עם העגלה", "Living movement on the promenade with the stroller"), { shape: "wide" }),
  still("8161", b("שיווי משקל רך ליד העגלה", "Soft balance beside the stroller"), { shape: "wide", featured: true }),
  live("8161", b("יוגה חיה ליד העגלה בטיילת", "Living yoga beside the stroller on the promenade"), { shape: "wide", featured: true }),
  still("8163", b("תנועה עם העגלה מול הים", "Movement with the stroller facing the sea")),
  live("8163", b("רגע חי על הטיילת", "A living moment on the promenade")),
  still("8165", b("תרגול קצר ליד העגלה", "A short practice beside the stroller")),
  live("8165", b("תרגול חי ליד העגלה", "A living practice beside the stroller")),
  still("8173", b("כלב מביט למטה נשען על העגלה", "Downward dog using the stroller"), { shape: "wide" }),
  live("8173", b("כלב מביט למטה חי על הטיילת", "Living downward dog on the promenade"), { shape: "wide", featured: true }),
  still("8210", b("הליכה ותרגול על הטיילת", "Walking and practice on the promenade")),
  live("8210", b("תנועה חיה על הטיילת", "Living movement on the promenade")),
  still("8220", b("רגע עם העגלה מול החוף", "A moment with the stroller facing the beach")),
  live("8220", b("רגע חי עם העגלה", "A living moment with the stroller")),
  still("8234", b("מתיחה רכה על הטיילת", "A gentle stretch on the promenade")),
  live("8234", b("מתיחה חיה על הטיילת", "A living stretch on the promenade")),
  photo("promenade-stretch", studioPhotos.promenadeStretch, b("מתיחה על הטיילת", "A stretch on the promenade")),
  photo("promenade-child", studioPhotos.promenadeChild, b("רגע עם ילד על הטיילת", "A moment with a child on the promenade")),

  still("8277", b("משחק מעוף בפארק", "Airplane play in the park"), { shape: "portrait", featured: true }),
  still("8268", b("משחק על הדשא בעיר", "Play on the city grass"), { shape: "wide" }),
  still("8261", b("רגע משחק בפארק", "A playful moment in the park"), { shape: "wide" }),
  still("8304", b("מגע עדין על הדשא", "Gentle touch on the grass")),
  live("8304", b("מגע חי על הדשא", "Living touch on the grass")),
  still("8306", b("עיסוי ומשחק בפארק", "Massage and play in the park"), { featured: true }),
  live("8306", b("רגע חי של מגע בפארק", "A living moment of touch in the park"), { shape: "wide", featured: true }),
  still("8308", b("קרבה על הדשא", "Closeness on the grass")),
  live("8308", b("קרבה חיה על הדשא", "Living closeness on the grass")),
  photo("park-airplane", studioPhotos.parkAirplane, b("מטוס קטן על הדשא", "Airplane pose on the grass"), { shape: "portrait" }),
  photo("park-airplane-wide", studioPhotos.parkAirplaneWide, b("משחק רחב בפארק", "Wide play in the park"), { shape: "wide" }),
  photo("mom-toddler-park", studioPhotos.momToddlerPark, b("אמא ופעוט בפארק", "Mother and toddler in the park"), { shape: "portrait" }),

  photo("baby-massage-smile", studioPhotos.babyMassageSmile, b("עיסוי תינוקות — חיוך", "Baby massage — a smile"), { featured: true }),
  photo("baby-massage-head", studioPhotos.babyMassageHead, b("מגע עדין לראש", "Gentle touch for the head")),
  photo("baby-massage-arms", studioPhotos.babyMassageArms, b("עיסוי ידיים לתינוק", "Baby arm massage")),
  photo("baby-massage-legs", studioPhotos.babyMassageLegs, b("עיסוי רגליים לתינוק", "Baby leg massage")),
  photo("baby-massage-tummy", studioPhotos.babyMassageTummy, b("עיסוי בטן רך", "A soft tummy massage")),
  photo("baby-class", studioPhotos.babyClass, b("מפגש עיסוי תינוקות", "A baby massage gathering")),
  photo("img-9118", "/photos/img_9118.jpg", b("צחוק משותף עם תינוק", "Shared laughter with a baby"), { shape: "portrait", featured: true }),
  photo("img-9101", "/photos/img_9101.jpg", b("נשיקה קטנה לכף רגל", "A small kiss on a baby’s foot"), { featured: true }),
  photo("img-9102", "/photos/img_9102.jpg", b("רגע ביתי עם תינוק", "A home moment with a baby")),
  photo("img-9107", "/photos/img_9107.jpg", b("קרבה רכה בסלון", "Soft closeness on the sofa")),
  photo("img-9135", "/photos/img_9135.jpg", b("מבט משותף בבית", "A shared look at home")),
  photo("family-home", studioPhotos.familyHome, b("רגע משפחתי בבית", "A family moment at home"), { shape: "portrait" }),
  photo("pregnancy-pool", studioPhotos.pregnancyPool, b("שחרור במים בהריון", "Ease in the water during pregnancy")),
];

export const homepageGalleryItems: readonly StudioGalleryItem[] = studioGalleryItems.filter(
  (item) => item.featured,
);

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
