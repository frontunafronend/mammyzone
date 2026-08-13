import type { Bilingual, StudioGalleryCategory, StudioGalleryItem } from "@/types";
import { studioPhotos } from "./sources";

const b = (he: string, en: string): Bilingual => ({ he, en });

export const GALLERY_CATEGORIES = [
  "postnatal-yoga",
  "prenatal-yoga",
  "baby-massage",
  "workshops",
  "nlp",
] as const satisfies readonly StudioGalleryCategory[];

type ItemOpts = Pick<StudioGalleryItem, "shape" | "featured">;

const prenatalPostnatal = ["prenatal-yoga", "postnatal-yoga"] as const;
const prenatalPostnatalNlp = ["prenatal-yoga", "postnatal-yoga", "nlp"] as const;
const babyYoga = ["baby-massage"] as const;
const babyAndCircle = ["baby-massage", "workshops"] as const;
const nlp = ["nlp"] as const;
const workshops = ["workshops"] as const;

function photo(
  id: string,
  src: string,
  alt: Bilingual,
  categories: StudioGalleryCategory | readonly StudioGalleryCategory[],
  opts?: ItemOpts,
): StudioGalleryItem {
  return {
    id,
    kind: "photo",
    src,
    alt,
    categories: typeof categories === "string" ? [categories] : categories,
    ...opts,
  };
}

function still(
  id: string,
  alt: Bilingual,
  categories: StudioGalleryCategory | readonly StudioGalleryCategory[],
  opts?: ItemOpts,
): StudioGalleryItem {
  return photo(`still-${id}`, `/photos/studio-IMG_${id}.jpg`, alt, categories, opts);
}

/**
 * Studio library tagged by offering. Pregnancy stills sit in both prenatal and
 * postnatal; baby/child yoga sits with infant massage; group and family frames
 * sit in circles; arms-open stills also feed NLP.
 */
export const studioGalleryItems: readonly StudioGalleryItem[] = [
  photo("pregnancy-beach-salute", studioPhotos.pregnancyBeachSalute, b("יוגה בהריון על החוף — ידיים לשמיים", "Prenatal yoga on the beach — arms to the sky"), prenatalPostnatalNlp, { shape: "portrait", featured: true }),
  photo("pregnancy-bw", studioPhotos.pregnancyBw, b("דיוקן בהריון בשחור־לבן", "Black-and-white pregnancy portrait"), prenatalPostnatal, { shape: "portrait", featured: true }),
  photo("pregnancy-beach-arms", studioPhotos.pregnancyBeachArms, b("יוגה בהריון מול הגלים", "Prenatal yoga facing the waves"), prenatalPostnatalNlp, { shape: "portrait" }),
  photo("beach-yoga-arms", studioPhotos.beachYogaArms, b("יוגה בהריון — עמידה פתוחה על החול", "Prenatal yoga — an open stance on the sand"), prenatalPostnatalNlp, { shape: "portrait" }),
  photo("pregnancy-pool", studioPhotos.pregnancyPool, b("שחרור במים בהריון", "Ease in the water during pregnancy"), prenatalPostnatal),

  still("8154", b("מתיחה עם עגלה על הטיילת", "A stretch with the stroller on the promenade"), babyYoga, { shape: "wide" }),
  still("8161", b("שיווי משקל רך ליד העגלה", "Soft balance beside the stroller"), babyYoga, { shape: "wide", featured: true }),
  still("8163", b("תנועה עם העגלה מול הים", "Movement with the stroller facing the sea"), babyYoga),
  still("8165", b("תרגול קצר ליד העגלה", "A short practice beside the stroller"), babyYoga),
  still("8173", b("כלב מביט למטה נשען על העגלה", "Downward dog using the stroller"), babyYoga, { shape: "wide" }),
  still("8210", b("הליכה ותרגול על הטיילת", "Walking and practice on the promenade"), babyYoga),
  still("8220", b("רגע עם העגלה מול החוף", "A moment with the stroller facing the beach"), babyYoga),
  still("8234", b("מתיחה רכה על הטיילת", "A gentle stretch on the promenade"), babyYoga),
  photo("promenade-stretch", studioPhotos.promenadeStretch, b("מתיחה על הטיילת", "A stretch on the promenade"), babyYoga),
  photo("promenade-child", studioPhotos.promenadeChild, b("רגע עם ילד על הטיילת", "A moment with a child on the promenade"), babyAndCircle),
  still("8277", b("משחק מעוף בפארק", "Airplane play in the park"), babyAndCircle, { shape: "portrait", featured: true }),
  still("8268", b("משחק על הדשא בעיר", "Play on the city grass"), babyAndCircle, { shape: "wide" }),
  still("8261", b("רגע משחק בפארק", "A playful moment in the park"), babyAndCircle, { shape: "wide" }),
  photo("park-airplane", studioPhotos.parkAirplane, b("מטוס קטן על הדשא", "Airplane pose on the grass"), babyAndCircle, { shape: "portrait" }),
  photo("park-airplane-wide", studioPhotos.parkAirplaneWide, b("משחק רחב בפארק", "Wide play in the park"), babyAndCircle, { shape: "wide" }),
  photo("mom-toddler-park", studioPhotos.momToddlerPark, b("אמא ופעוט בפארק", "Mother and toddler in the park"), babyAndCircle, { shape: "portrait" }),

  photo("baby-massage-smile", studioPhotos.babyMassageSmile, b("עיסוי תינוקות — חיוך", "Baby massage — a smile"), babyYoga, { featured: true }),
  photo("baby-massage-head", studioPhotos.babyMassageHead, b("מגע עדין לראש", "Gentle touch for the head"), babyYoga),
  photo("baby-massage-arms", studioPhotos.babyMassageArms, b("עיסוי ידיים לתינוק", "Baby arm massage"), babyYoga),
  photo("baby-massage-legs", studioPhotos.babyMassageLegs, b("עיסוי רגליים לתינוק", "Baby leg massage"), babyYoga),
  photo("baby-massage-tummy", studioPhotos.babyMassageTummy, b("עיסוי בטן רך", "A soft tummy massage"), babyYoga),
  photo("baby-class", studioPhotos.babyClass, b("מפגש עיסוי תינוקות", "A baby massage gathering"), babyAndCircle, { featured: true }),
  still("8304", b("מגע עדין על הדשא", "Gentle touch on the grass"), babyYoga),
  still("8306", b("עיסוי ומשחק בפארק", "Massage and play in the park"), babyAndCircle, { featured: true }),
  still("8308", b("קרבה על הדשא", "Closeness on the grass"), babyYoga),
  photo("img-9118", "/photos/img_9118.jpg", b("צחוק משותף עם תינוק", "Shared laughter with a baby"), babyAndCircle, { shape: "portrait", featured: true }),
  photo("img-9101", "/photos/img_9101.jpg", b("נשיקה קטנה לכף רגל", "A small kiss on a baby’s foot"), babyYoga, { featured: true }),
  photo("img-9102", "/photos/img_9102.jpg", b("רגע ביתי עם תינוק", "A home moment with a baby"), babyYoga),
  photo("img-9107", "/photos/img_9107.jpg", b("קרבה רכה בסלון", "Soft closeness on the sofa"), babyYoga),
  photo("img-9135", "/photos/img_9135.jpg", b("מבט משותף בבית", "A shared look at home"), babyYoga),

  still("8214", b("ברכה לשמיים על החוף", "Upward salute on the beach"), nlp, { shape: "portrait", featured: true }),
  still("8215", b("מתיחה לשמיים מול הים", "A stretch toward the sky by the sea"), nlp, { shape: "portrait" }),
  still("8185", b("פתיחת חזה מול האופק", "Opening the chest toward the horizon"), nlp, { shape: "wide" }),
  still("8193", b("קוברה על החול", "Cobra on the sand"), nlp, { shape: "wide" }),
  still("8201", b("כלב מביט למטה עם רגל פתוחה על החול", "Three-legged downward dog on the sand"), nlp, { shape: "wide" }),
  still("8196", b("יוגה על החוף באור רך", "Yoga on the beach in soft light"), nlp),
  still("8224", b("תנוחה על החוף מול הגלים", "A pose on the beach facing the waves"), nlp),
  photo("beach-updog", studioPhotos.beachUpdog, b("כלב מביט מעלה על החול", "Upward-facing dog on the sand"), nlp),
  photo("beach-downdog", studioPhotos.beachDowndog, b("כלב מביט למטה על החול", "Downward-facing dog on the sand"), nlp),
  photo("yoga-coast-stretch", studioPhotos.yogaCoastStretch, b("מתיחה על הדשא ליד הים", "A stretch on the grass by the sea"), nlp, { featured: true }),
  photo("yoga-coast-cobra", studioPhotos.yogaCoastCobra, b("תנוחת קוברה ליד החוף", "Cobra near the shore"), nlp),
  photo("yoga-coast-plank", studioPhotos.yogaCoastPlank, b("פלאנק רך ליד הים", "A soft plank by the sea"), nlp),
  photo("yoga-coast-seated", studioPhotos.yogaCoastSeated, b("ישיבה שקטה מול הים", "A quiet seat facing the sea"), nlp),

  photo("family-home", studioPhotos.familyHome, b("רגע משפחתי בבית", "A family moment at home"), workshops, { shape: "portrait" }),
];

export const homepageGalleryItems: readonly StudioGalleryItem[] = studioGalleryItems.filter(
  (item) => item.featured,
);

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
