import type { Bilingual, StudioGalleryCategory, StudioGalleryItem } from "@/types";
import { studioPhotos, workshopCircleSources } from "./sources";

const b = (he: string, en: string): Bilingual => ({ he, en });

export const GALLERY_CATEGORIES = [
  "postnatal-yoga",
  "prenatal-yoga",
  "baby-massage",
  "workshops",
  "nlp",
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
 * One photo, one category — no repeats when browsing All or a filter.
 * Prenatal = pregnancy stills; postnatal = gentle solo practice;
 * baby = massage + yoga with children; workshops = gatherings;
 * NLP = open-arm empowerment stills.
 */
export const studioGalleryItems: readonly StudioGalleryItem[] = [
  photo("pregnancy-bw", studioPhotos.pregnancyBw, b("דיוקן בהריון בשחור־לבן", "Black-and-white pregnancy portrait"), "prenatal-yoga", { shape: "portrait", featured: true }),
  photo("pregnancy-pool", studioPhotos.pregnancyPool, b("שחרור במים בהריון", "Ease in the water during pregnancy"), "prenatal-yoga"),

  still("8193", b("קוברה על החול", "Cobra on the sand"), "postnatal-yoga", { shape: "wide", featured: true }),
  still("8201", b("כלב מביט למטה עם רגל פתוחה על החול", "Three-legged downward dog on the sand"), "postnatal-yoga", { shape: "wide" }),
  still("8196", b("יוגה על החוף באור רך", "Yoga on the beach in soft light"), "postnatal-yoga"),
  still("8224", b("תנוחה על החוף מול הגלים", "A pose on the beach facing the waves"), "postnatal-yoga"),
  still("8185", b("פתיחת חזה מול האופק", "Opening the chest toward the horizon"), "postnatal-yoga", { shape: "wide" }),
  photo("beach-updog", studioPhotos.beachUpdog, b("כלב מביט מעלה על החול", "Upward-facing dog on the sand"), "postnatal-yoga"),
  photo("beach-downdog", studioPhotos.beachDowndog, b("כלב מביט למטה על החול", "Downward-facing dog on the sand"), "postnatal-yoga"),
  photo("yoga-coast-cobra", studioPhotos.yogaCoastCobra, b("תנוחת קוברה ליד החוף", "Cobra near the shore"), "postnatal-yoga"),
  photo("yoga-coast-plank", studioPhotos.yogaCoastPlank, b("פלאנק רך ליד הים", "A soft plank by the sea"), "postnatal-yoga"),
  photo("yoga-coast-seated", studioPhotos.yogaCoastSeated, b("ישיבה שקטה מול הים", "A quiet seat facing the sea"), "postnatal-yoga"),

  still("8154", b("מתיחה עם עגלה על הטיילת", "A stretch with the stroller on the promenade"), "baby-massage", { shape: "wide" }),
  still("8161", b("שיווי משקל רך ליד העגלה", "Soft balance beside the stroller"), "baby-massage", { shape: "wide", featured: true }),
  still("8163", b("תנועה עם העגלה מול הים", "Movement with the stroller facing the sea"), "baby-massage"),
  still("8165", b("תרגול קצר ליד העגלה", "A short practice beside the stroller"), "baby-massage"),
  still("8173", b("כלב מביט למטה נשען על העגלה", "Downward dog using the stroller"), "baby-massage", { shape: "wide" }),
  still("8210", b("הליכה ותרגול על הטיילת", "Walking and practice on the promenade"), "baby-massage"),
  still("8220", b("רגע עם העגלה מול החוף", "A moment with the stroller facing the beach"), "baby-massage"),
  still("8234", b("מתיחה רכה על הטיילת", "A gentle stretch on the promenade"), "baby-massage"),
  photo("promenade-stretch", studioPhotos.promenadeStretch, b("מתיחה על הטיילת", "A stretch on the promenade"), "baby-massage"),
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
  still("8277", b("משחק מעוף בפארק", "Airplane play in the park"), "baby-massage", { shape: "portrait", featured: true }),
  still("8268", b("משחק על הדשא בעיר", "Play on the city grass"), "baby-massage", { shape: "wide" }),
  still("8261", b("רגע משחק בפארק", "A playful moment in the park"), "baby-massage", { shape: "wide" }),
  photo("park-airplane", studioPhotos.parkAirplane, b("מטוס קטן על הדשא", "Airplane pose on the grass"), "baby-massage", { shape: "portrait" }),
  photo("park-airplane-wide", studioPhotos.parkAirplaneWide, b("משחק רחב בפארק", "Wide play in the park"), "baby-massage", { shape: "wide" }),
  photo("mom-toddler-park", studioPhotos.momToddlerPark, b("אמא ופעוט בפארק", "Mother and toddler in the park"), "baby-massage", { shape: "portrait" }),
  still("8306", b("עיסוי ומשחק בפארק", "Massage and play in the park"), "baby-massage"),
  photo("img-9118", "/photos/img_9118.jpg", b("צחוק משותף עם תינוק", "Shared laughter with a baby"), "baby-massage", { shape: "portrait" }),

  photo("workshop-circle", workshopCircleSources[0], b("מעגל נשים — ידיים שמתחברות", "A women's circle — hands meeting"), "workshops"),
  photo("workshop-gathering", workshopCircleSources[1], b("מפגש משותף במעגל", "A shared gathering in circle"), "workshops"),
  photo("workshop-yoga-room", workshopCircleSources[2], b("סדנה בתנועה ובנשימה", "A workshop in movement and breath"), "workshops", { shape: "wide" }),
  photo("workshop-women", workshopCircleSources[3], b("נשים יחד — סדנה ומעגל", "Women together — workshop and circle"), "workshops", { shape: "wide" }),

  photo("beach-yoga-arms", studioPhotos.beachYogaArms, b("ידיים לשמיים על החוף", "Arms to the sky on the beach"), "nlp", { shape: "portrait", featured: true }),
  photo("yoga-coast-stretch", studioPhotos.yogaCoastStretch, b("ידיים פתוחות לצדדים ליד הים", "Arms open to the sides by the sea"), "nlp", { featured: true }),
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
