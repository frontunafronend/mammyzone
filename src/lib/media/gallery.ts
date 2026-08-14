import type { Bilingual, StudioGalleryCategory, StudioGalleryItem } from "@/types";
import { studioPhotos } from "./sources";

const b = (he: string, en: string): Bilingual => ({ he, en });

export const GALLERY_CATEGORIES = [
  "yoga",
  "baby-massage",
] as const satisfies readonly StudioGalleryCategory[];

type ItemOpts = Pick<StudioGalleryItem, "shape" | "featured">;

function photo(
  id: string,
  src: string,
  alt: Bilingual,
  category: StudioGalleryCategory,
  opts?: ItemOpts,
): StudioGalleryItem {
  return {
    id,
    kind: "photo",
    src,
    alt,
    categories: [category],
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
 * Two public gallery families only: yoga poses (Ashtanga, prenatal, postnatal)
 * and infant massage / baby yoga. No stock photos of other people.
 */
export const studioGalleryItems: readonly StudioGalleryItem[] = [
  photo("beach-updog", studioPhotos.beachUpdog, b("אשטנגה — כלב מביט מעלה על החול", "Ashtanga — upward-facing dog on the sand"), "yoga", { shape: "wide", featured: true }),
  photo("bay-updog", studioPhotos.bayUpdog, b("אשטנגה — כלב מביט מעלה מול המפרץ", "Ashtanga — upward-facing dog facing the bay"), "yoga", { featured: true }),
  photo("class-deck-salute", studioPhotos.classDeckSalute, b("שיעור יוגה על הדק — ידיים לשמיים", "A yoga class on the deck — arms to the sky"), "yoga", { shape: "portrait" }),
  photo("class-deck-downdog", studioPhotos.classDeckDowndog, b("שיעור יוגה על הדק — כלב מביט למטה", "A yoga class on the deck — downward-facing dog"), "yoga", { shape: "portrait" }),
  photo("class-deck-updog", studioPhotos.classDeckUpdog, b("שיעור יוגה על הדק — כלב מביט מעלה", "A yoga class on the deck — upward-facing dog"), "yoga", { shape: "portrait" }),
  photo("lobby-stroller-balance", studioPhotos.lobbyStrollerBalance, b("שיווי משקל ליד העגלה", "Balance beside the stroller"), "yoga", { shape: "wide" }),
  photo("beach-downdog", studioPhotos.beachDowndog, b("כלב מביט למטה על החול", "Downward-facing dog on the sand"), "yoga"),
  still("8193", b("קוברה על החול", "Cobra on the sand"), "yoga", { shape: "wide", featured: true }),
  still("8201", b("כלב מביט למטה עם רגל פתוחה על החול", "Three-legged downward dog on the sand"), "yoga", { shape: "wide" }),
  still("8196", b("יוגה על החוף באור רך", "Yoga on the beach in soft light"), "yoga"),
  still("8224", b("תנוחה על החוף מול הגלים", "A pose on the beach facing the waves"), "yoga"),
  still("8185", b("פתיחת חזה מול האופק", "Opening the chest toward the horizon"), "yoga", { shape: "wide" }),
  photo("yoga-coast-cobra", studioPhotos.yogaCoastCobra, b("תנוחת קוברה ליד החוף", "Cobra near the shore"), "yoga"),
  photo("yoga-coast-plank", studioPhotos.yogaCoastPlank, b("פלאנק רך ליד הים", "A soft plank by the sea"), "yoga"),
  photo("yoga-coast-seated", studioPhotos.yogaCoastSeated, b("ישיבה שקטה מול הים", "A quiet seat facing the sea"), "yoga"),
  photo("beach-yoga-arms", studioPhotos.beachYogaArms, b("ידיים לשמיים על החוף", "Arms to the sky on the beach"), "yoga", { shape: "portrait", featured: true }),
  photo("yoga-coast-stretch", studioPhotos.yogaCoastStretch, b("ידיים פתוחות לצדדים ליד הים", "Arms open to the sides by the sea"), "yoga"),
  photo("pregnancy-bw", studioPhotos.pregnancyBw, b("יוגה להריון — דיוקן", "Prenatal yoga — portrait"), "yoga", { shape: "portrait" }),
  photo("pregnancy-pool", studioPhotos.pregnancyPool, b("שחרור במים בהריון", "Ease in the water during pregnancy"), "yoga"),
  still("8154", b("מתיחה עם עגלה על הטיילת", "A stretch with the stroller on the promenade"), "yoga", { shape: "wide" }),
  still("8161", b("שיווי משקל רך ליד העגלה", "Soft balance beside the stroller"), "yoga", { shape: "wide" }),
  still("8163", b("תנועה עם העגלה מול הים", "Movement with the stroller facing the sea"), "yoga"),
  still("8165", b("תרגול קצר ליד העגלה", "A short practice beside the stroller"), "yoga"),
  still("8173", b("כלב מביט למטה נשען על העגלה", "Downward dog using the stroller"), "yoga", { shape: "wide" }),
  still("8210", b("הליכה ותרגול על הטיילת", "Walking and practice on the promenade"), "yoga"),
  still("8220", b("רגע עם העגלה מול החוף", "A moment with the stroller facing the beach"), "yoga"),
  still("8234", b("מתיחה רכה על הטיילת", "A gentle stretch on the promenade"), "yoga"),
  photo("promenade-stretch", studioPhotos.promenadeStretch, b("מתיחה על הטיילת", "A stretch on the promenade"), "yoga"),
  photo("baby-class-standing", studioPhotos.babyClassStanding, b("מפגש בייבי יוגה — חיבוק במעגל", "A baby yoga gathering — holding in a circle"), "baby-massage"),
  photo("baby-class-circle", studioPhotos.babyClassCircle, b("מעגל הורים ותינוקות", "A circle of parents and babies"), "baby-massage"),
  photo("baby-class-seated", studioPhotos.babyClassSeated, b("מפגש עיסוי תינוקות בישיבה", "A seated infant-massage gathering"), "baby-massage", { shape: "wide" }),
  photo("toddler-yoga-smile", studioPhotos.toddlerYogaSmile, b("בייבי יוגה עם פעוטה", "Baby yoga with a toddler"), "baby-massage", { shape: "portrait", featured: true }),
  photo("toddler-yoga-fold", studioPhotos.toddlerYogaFold, b("כפיפה קדימה יחד עם פעוטה", "A forward fold together with a toddler"), "baby-massage", { shape: "wide" }),
  photo("baby-massage-smile", studioPhotos.babyMassageSmile, b("עיסוי תינוקות — חיוך", "Baby massage — a smile"), "baby-massage", { featured: true }),
  photo("baby-massage-head", studioPhotos.babyMassageHead, b("מגע עדין לראש", "Gentle touch for the head"), "baby-massage"),
  photo("baby-massage-arms", studioPhotos.babyMassageArms, b("עיסוי ידיים לתינוק", "Baby arm massage"), "baby-massage"),
  photo("baby-massage-legs", studioPhotos.babyMassageLegs, b("עיסוי רגליים לתינוק", "Baby leg massage"), "baby-massage"),
  photo("baby-massage-tummy", studioPhotos.babyMassageTummy, b("עיסוי בטן רך", "A soft tummy massage"), "baby-massage"),
  still("8304", b("מגע עדין על הדשא", "Gentle touch on the grass"), "baby-massage"),
  still("8308", b("קרבה על הדשא", "Closeness on the grass"), "baby-massage"),
  photo("img-9101", "/photos/img_9101.jpg", b("נשיקה קטנה לכף רגל", "A small kiss on a baby’s foot"), "baby-massage", { featured: true }),
  photo("img-9102", "/photos/img_9102.jpg", b("רגע ביתי עם תינוק", "A home moment with a baby"), "baby-massage"),
  photo("img-9107", "/photos/img_9107.jpg", b("קרבה רכה בסלון", "Soft closeness on the sofa"), "baby-massage"),
  photo("img-9135", "/photos/img_9135.jpg", b("מבט משותף בבית", "A shared look at home"), "baby-massage"),
  photo("baby-class", studioPhotos.babyClass, b("מפגש עיסוי תינוקות", "A baby massage gathering"), "baby-massage", { featured: true }),
  photo("family-home", studioPhotos.familyHome, b("רגע משפחתי בבית", "A family moment at home"), "baby-massage", { shape: "portrait" }),
  photo("promenade-child", studioPhotos.promenadeChild, b("רגע עם ילד על הטיילת", "A moment with a child on the promenade"), "baby-massage"),
  still("8277", b("משחק מעוף בפארק", "Airplane play in the park"), "baby-massage", { shape: "portrait" }),
  still("8268", b("משחק על הדשא בעיר", "Play on the city grass"), "baby-massage", { shape: "wide" }),
  still("8261", b("רגע משחק בפארק", "A playful moment in the park"), "baby-massage", { shape: "wide" }),
  photo("park-airplane", studioPhotos.parkAirplane, b("מטוס קטן על הדשא", "Airplane pose on the grass"), "baby-massage", { shape: "portrait" }),
  photo("park-airplane-wide", studioPhotos.parkAirplaneWide, b("משחק רחב בפארק", "Wide play in the park"), "baby-massage", { shape: "wide" }),
  photo("mom-toddler-park", studioPhotos.momToddlerPark, b("אמא ופעוט בפארק", "Mother and toddler in the park"), "baby-massage", { shape: "portrait" }),
  still("8306", b("עיסוי ומשחק בפארק", "Massage and play in the park"), "baby-massage"),
  photo("img-9118", "/photos/img_9118.jpg", b("צחוק משותף עם תינוק", "Shared laughter with a baby"), "baby-massage", { shape: "portrait" }),
];

export const homepageGalleryItems: readonly StudioGalleryItem[] = (() => {
  const seen = new Set<string>();
  return studioGalleryItems.filter((item) => {
    if (!item.featured || seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  });
})();

export function itemsByGalleryCategory(
  category: StudioGalleryCategory,
): StudioGalleryItem[] {
  return studioGalleryItems.filter((item) => item.categories.includes(category));
}

export function galleryPhotoSources(category: StudioGalleryCategory, limit = 4): string[] {
  return itemsByGalleryCategory(category)
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
