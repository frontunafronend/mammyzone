import type {
  Bilingual,
  CalendarEvent,
  MarketplaceCard,
  ServiceCard,
  Testimonial,
} from "@/types";
import { socialGalleryStock } from "@/lib/media/sources";
import { siteContact } from "@/lib/contact";

export const siteMeta = {
  title: {
    he: "MammyZone — אורטל חזן | יוגה, ריטריט ועיצוב אנרגטי לנשים",
    en: "MammyZone — Ortal Hazan | Yoga, retreats & energy design for women",
  },
  description: {
    he: "מרחב מקודש לאמהות. יוגה אשטנגה, יוגה להריון, עיסוי תינוקות ובייבי יוגה, יוגה לאחר לידה, ריטריט לאמהות עובדות, מאסטרית NLP מוסמכת ועיצוב בית אנרגטי. עם אורטל.",
    en: "A sacred space for mothers: Ashtanga Yoga, prenatal yoga, infant massage and baby yoga, postnatal yoga, working-mom retreats, certified NLP Master & energetic home design with Ortal.",
  },
} as const;

export { siteContact };

export const nav = {
  trust: { he: "אמון", en: "Trust" },
  services: { he: "המסע", en: "Offerings" },
  about: { he: "הסיפור", en: "Story" },
  transformation: { he: "לפני ואחרי", en: "Shift" },
  testimonials: { he: "קולות", en: "Voices" },
  articles: { he: "קריאה", en: "Journal" },
  journey: { he: "התחילי כאן", en: "Begin" },
  journal: { he: "מגזין", en: "Journal" },
  gallery: { he: "גלריה", en: "Gallery" },
  /** Primary booking route — `/book` */
  book: { he: "הזמנה", en: "Book" },
  /** `/contact` — soft conversion */
  contact: { he: "קשר", en: "Contact" },
  cta: { he: "הזמיני שיעור", en: "Book a session" },
  langToggle: { he: "English", en: "עברית" },
  /** Mobile menu — text control, not icon-first chrome */
  menu: { he: "תפריט", en: "Menu" },
  menuClose: { he: "סגור", en: "Close" },
  drawerTitle: { he: "ניווט", en: "Navigation" },
  ariaMenuOpen: { he: "פתיחת תפריט ניווט", en: "Open navigation menu" },
  ariaMenuClose: { he: "סגירת תפריט ניווט", en: "Close navigation menu" },
  ariaDrawer: { he: "קישורי ניווט באתר", en: "Site navigation links" },
  ariaSwitchToEnglish: { he: "החלפת שפת האתר לאנגלית", en: "Switch site language to English" },
  ariaSwitchToHebrew: { he: "החלפת שפת האתר לעברית", en: "Switch site language to Hebrew" },
} as const satisfies Record<string, Bilingual>;

/** Global chrome — footer newsletter, floating actions, scroll UI */
export const layoutShell = {
  scrollProgressAria: {
    he: "התקדמות קריאה בדף",
    en: "Page read progress",
  },
  newsletterTitle: { he: "ניוזלטר עדין", en: "A gentle newsletter" },
  newsletterSub: {
    he: "מכתבים נדירים — תאריכים, מעגלים, והשראה. בלי רעש.",
    en: "Rare letters — dates, circles, inspiration. No noise.",
  },
  newsletterPlaceholder: {
    he: "האימייל שלך",
    en: "Your email",
  },
  newsletterSubmit: { he: "הצטרפי", en: "Join" },
  newsletterSuccess: {
    he: "תודה — ניפגש בתיבת הדואר.",
    en: "Thank you — see you in your inbox.",
  },
  newsletterPrivacy: {
    he: "הכתובת לא מועברת לצד שלישי. אפשר לבטל בכל עת.",
    en: "Never shared. Unsubscribe anytime.",
  },
  newsletterModalClose: { he: "סגור", en: "Close" },
  newsletterModalLater: { he: "אחר כך", en: "Remind me later" },
  newsletterModalInstagramHint: {
    he: "רוצה רק רגעים מהשטיח? עקבי גם באינסטגרם.",
    en: "Want moments from the mat? Follow on Instagram too.",
  },
  footerClosing: {
    he: "בואי כמו שאת — המרחב כבר מחכה.",
    en: "Come as you are — the space is already waiting.",
  },
  footerContactLabel: { he: "קשר ישיר", en: "Direct line" },
  floatingWhatsapp: { he: "וואטסאפ", en: "WhatsApp" },
  floatingInstagram: { he: "אינסטגרם", en: "Instagram" },
  floatingContact: { he: "לדף קשר", en: "Contact page" },
  floatingBook: { he: "הזמנה", en: "Book" },
  floatingNewsletter: { he: "ניוזלטר", en: "Newsletter" },
  floatingWorkshop: { he: "לא בטוחה מה מתאים?", en: "Not sure what fits?" },
  floatingExpand: { he: "עוד פעולות", en: "More actions" },
  floatingCollapse: { he: "סגור תפריט צף", en: "Close floating menu" },
} as const;

export const scrollChrome = {
  toTopAria: {
    he: "חזרה לראש הדף",
    en: "Scroll to top",
  },
} as const;

export const hero = {
  brandKicker: "Ortal MammyZone",
  eyebrow: { he: "מרחב מקודש לאמהות", en: "A sacred space for mothers" },
  titleBeforeEm: { he: "", en: "A " },
  titleEm: { he: "מרחב מקודש לאמהות", en: "sacred space for mothers" },
  titleAccent: { he: "", en: "" },
  sub: {
    he: "יוגה אשטנגה, יוגה להריון, עיסוי תינוקות ובייבי יוגה, יוגה לאחר לידה, ריטריטים לאמהות עובדות, ומאסטרית NLP מוסמכת.",
    en: "Ashtanga Yoga, prenatal yoga, infant massage and baby yoga, postnatal yoga, retreats for working moms, and certified NLP Master.",
  },
  primaryCta: { he: "בואי להתחיל →", en: "Begin your journey →" },
  ghostCta: { he: "קראי עליי", en: "Meet Ortal" },
  pills: [
    { icon: "🧘", he: "יוגה אשטנגה", en: "Ashtanga Yoga" },
    { icon: "🤰", he: "יוגה להריון", en: "Prenatal yoga" },
    { icon: "👶", he: "עיסוי תינוקות ובייבי יוגה", en: "Infant massage & baby yoga", sage: true },
    { icon: "🌸", he: "יוגה לאחר לידה", en: "Postnatal yoga" },
  ] as const,
  credentialName: { he: "אורטל חזן", en: "Ortal Hazan" },
  credentialTags: {
    he: "אמא · מורה ליוגה אשטנגה\nיוגה להריון · עיסוי תינוקות ובייבי יוגה · יוגה לאחר לידה\nריטריטים לאמהות עובדות · מאסטרית NLP מוסמכת",
    en: "Mom · Ashtanga Yoga teacher\nPrenatal yoga · infant massage & baby yoga · postnatal yoga\nWorking-mom retreats · certified NLP Master",
  },
  imageAlt: {
    he: "אורטל ביוגה על החוף — ידיים לשמיים",
    en: "Ortal in yoga on the beach — arms to the sky",
  },
} as const;

export const marqueeItems: Bilingual[] = [
  { he: "יוגה לאמהות", en: "Yoga for Moms" },
  { he: "עיסוי תינוקות", en: "Baby Massage" },
  { he: "ריטריט נשים", en: "Women's Retreat" },
  { he: "מעגל נשים", en: "Women's Circle" },
  { he: "מאסטרית NLP", en: "NLP Master" },
  { he: "עיצוב אנרגטי", en: "Energy Design" },
];

export const trustSection = {
  label: { he: "אמון שנבנה לאט", en: "Why women trust this space" },
  titleLine1: { he: "ניסיון שמורגש", en: "Experience you can feel" },
  titleEm: { he: "בגוף", en: "in the body" },
  reassurance: {
    he: "כל מפגש נבנה סביב הקצב שלך — בלי ביצועים, בלי השוואות. רק נוכחות מקצועית וחמה.",
    en: "Every encounter is built around your pace — no performance, no comparison. Just warm, skilled presence.",
  },
  stats: [
    {
      value: "15+",
      label: { he: "שנות ליווי נשים", en: "Years guiding women" },
    },
    {
      value: "6",
      label: { he: "התמחויות מרכזיות", en: "Core disciplines" },
    },
    {
      value: "∞",
      label: { he: "מעגלים של הקשבה", en: "Circles of listening" },
    },
  ] as const,
  credentials: [
    { he: "יוגה אשטנגה", en: "Ashtanga Yoga" },
    { he: "יוגה להריון", en: "Prenatal yoga" },
    { he: "יוגה לאחר לידה", en: "Postnatal yoga" },
    { he: "עיסוי תינוקות ובייבי יוגה", en: "Infant massage & baby yoga" },
    { he: "סדנאות ומעגלי נשים", en: "Workshops & women's circles" },
    { he: "מאסטרית NLP מוסמכת", en: "Certified NLP Master" },
  ] as const satisfies readonly Bilingual[],
} as const;

export const transformationSection = {
  label: { he: "המעבר", en: "The shift" },
  titleLine1: { he: "מרעש חיצוני", en: "From outer noise" },
  titleEm: { he: "לשקט פנימי", en: "to inner quiet" },
  sub: {
    he: "הגוף והנפש מדברים באותה שפה — כשמקשיבים, משהו מתרכך.",
    en: "Body and mind share one language — when we listen, something softens.",
  },
  beforeTitle: { he: "לפני", en: "Before" },
  afterTitle: { he: "אחרי", en: "After" },
  beforeItems: [
    { he: "עייפות שאין לה שם", en: "Fatigue with no name" },
    { he: "הצפה ורעש פנימי", en: "Overwhelm and inner noise" },
    { he: "תחושת ניתוק מעצמך", en: "A sense of disconnect from yourself" },
  ] as const satisfies readonly Bilingual[],
  afterItems: [
    { he: "נשימה עמוקה יותר", en: "A deeper breath" },
    { he: "ביטחון עדין בגוף", en: "Quiet confidence in your body" },
    { he: "איזון רגשי אמיתי", en: "Real emotional balance" },
  ] as const satisfies readonly Bilingual[],
} as const;

export const articlesSection = {
  label: { he: "שמזין את הנפש", en: "For the soul & SEO" },
  titleLine1: { he: "מילים", en: "Words" },
  titleEm: { he: "לאמהות", en: "for mothers" },
  readMore: { he: "קראי עוד →", en: "Read more →" },
} as const;

export const socialGallerySection = {
  label: { he: "מהסטודיו", en: "From the studio" },
  titleLine1: { he: "גלריה", en: "Gallery" },
  titleEm: { he: "", en: "" },
  sub: {
    he: "תמונות מהחוף, מהטיילת, מהפארק ומהבית.",
    en: "Photos from the beach, the promenade, the park, and home.",
  },
  followCta: { he: "עקבי אחריי באינסטגרם", en: "Follow on Instagram" },
  followHref: siteContact.instagramUrl,
  embedTitle: { he: "רגע מהשטיח", en: "A moment from the mat" },
  embedOpen: { he: "פתיחה באינסטגרם", en: "Open on Instagram" },
  openGallery: { he: "לגלריה המלאה", en: "Open the full gallery" },
} as const;

export const galleryPage = {
  title: { he: "גלריה", en: "Gallery" },
  metaTitle: { he: "גלריה — MammyZone", en: "Gallery — MammyZone" },
  metaDescription: {
    he: "תמונות מאורטל: יוגה (אשטנגה, הריון, לאחר לידה) ועיסוי תינוקות ובייבי יוגה.",
    en: "Photos with Ortal: yoga (Ashtanga, prenatal, postnatal) and infant massage with baby yoga.",
  },
  label: { he: "סטודיו חי", en: "A living studio" },
  titleLine1: { he: "גלריה", en: "Gallery" },
  titleEm: { he: "", en: "" },
  sub: {
    he: "יוגה (אשטנגה, הריון, לאחר לידה) ועיסוי תינוקות ובייבי יוגה. לחצי לתמונה למסך מלא.",
    en: "Yoga (Ashtanga, prenatal, postnatal) and infant massage with baby yoga. Tap a photo for full screen.",
  },
  all: { he: "הכול", en: "All" },
  categories: {
    yoga: { he: "יוגה (אשטנגה, הריון, לאחר לידה)", en: "Yoga (Ashtanga, prenatal, postnatal)" },
    "baby-massage": { he: "עיסוי תינוקות ובייבי יוגה", en: "Infant massage & baby yoga" },
  },
} as const;

export const galleryUi = {
  videoBadge: { he: "סרטון", en: "Film" },
  close: { he: "סגירה", en: "Close" },
  next: { he: "הבא", en: "Next" },
  prev: { he: "הקודם", en: "Previous" },
} as const;

export const notFoundPage = {
  code: "404",
  title: { he: "העמוד הזה לא נמצא", en: "This page could not be found" },
  sub: {
    he: "יכול להיות שהקישור ישן, או שהעמוד עוד בדרך. בואי נחזור למרחב.",
    en: "The link may be old, or the page is still on its way. Let’s go back to the space.",
  },
  home: { he: "לעמוד הבית", en: "Back home" },
  gallery: { he: "לגלריה", en: "Gallery" },
  contact: { he: "לדף הקשר", en: "Contact" },
  book: { he: "הזמנה", en: "Book" },
} as const;

/** Homepage preview tiles — full set lives in `src/lib/media/gallery.ts`. */
export const socialGalleryImages = socialGalleryStock;

export const finalJourneySection = {
  heroLine: {
    he: "כל אמא שייכת לכאן — בואי כמו שאת.",
    en: "Every mother belongs here — come as you are.",
  },
  supporting: {
    he: "אפשר לפנות אליי בדרך הכי טבעית שיש.",
    en: "You’re welcome to reach out in the most natural way you have.",
  },
  promise: {
    he: "ליווי בריא וטבעי — בקצב שלך, בלי להוכיח דבר.",
    en: "Healthy, natural guidance — at your pace, with nothing to prove.",
  },
} as const;

export const servicesSection = {
  label: { he: "הזמנה עדינה", en: "A gentle invitation" },
  titleLine1: { he: "הדרך הפנימית שלך", en: "Your inner path" },
  titleEm: { he: "מחכה להתגלות", en: "is waiting to be found" },
  unsureHint: {
    he: "לא בטוחה מה נכון לך עכשיו?",
    en: "Not sure what feels right for you right now?",
  },
  unsureCta: { he: "לדף הקשר", en: "Visit the gentle contact page" },
} as const;

export const services: ServiceCard[] = [
  {
    num: "01",
    icon: "🧘",
    title: { he: "יוגה לאחר לידה", en: "Postnatal yoga" },
    description: {
      he: "נשימה, עמוד שדרה וכוח עדין — שיעורים שמחזירים גבולות לגוף אחרי לידה, בלי למהר.",
      en: "Breath, spine, and gentle strength — sessions that help your body find its edges again after birth, without rushing.",
    },
    tag: { he: "קבוצה · פרטי", en: "Group · private" },
  },
  {
    num: "02",
    icon: "🤰",
    title: { he: "יוגה להריון", en: "Prenatal yoga" },
    description: {
      he: "תמיכה בגב, באגן ובלב שמתרחב — לפי שלב ההריון, בלי למהר.",
      en: "Support for your back, pelvis, and the heart that is growing room — by trimester, without rushing.",
    },
    tag: { he: "כל ההריון", en: "All trimesters" },
  },
  {
    num: "03",
    icon: "🧠",
    title: { he: "מאסטרית NLP", en: "NLP Master" },
    description: {
      he: "מפגשים שמנקים רעש פנימי, בונים ביטחון ומחברים מחדש לבחירות שמשרתות אותך — עם מאסטרית NLP מוסמכת.",
      en: "Sessions that quiet inner noise, rebuild confidence, and reconnect you with choices that truly serve you — with a certified NLP Master.",
    },
    tag: { he: "מאסטרית NLP מוסמכת", en: "Certified NLP Master" },
    tagVariant: "sage",
  },
  {
    num: "04",
    icon: "👶",
    title: { he: "עיסוי תינוקות ובייבי יוגה", en: "Infant massage & baby yoga" },
    description: {
      he: "מגע מסודר לשחרור, שינה וקשר — כלים פשוטים שאת לוקחת הביתה.",
      en: "Structured touch for ease, sleep, and bonding — simple tools you take home with you.",
    },
    tag: { he: "בית או מרחב קבוצתי", en: "Home or small group" },
  },
  {
    num: "05",
    icon: "✨",
    title: { he: "סדנאות ומעגלי נשים", en: "Workshops & women's circles" },
    description: {
      he: "מפגשים קצרים ועמוקים — נשים, נשימה, וכלים ליומיום המורכב של אמהות.",
      en: "Short, deep gatherings — women, breath, and tools for the layered everyday of motherhood.",
    },
    tag: { he: "תאריכים בניוזלטר", en: "Dates in the newsletter" },
    tagVariant: "sage",
  },
  {
    num: "06",
    icon: "🌿",
    title: { he: "ריטריטים", en: "Retreats" },
    description: {
      he: "יום שלם של הזנה: יוגה, מדיטציה, ארוחה ומעגל — מספר מקומות מוגבל, אווירה אינטימית.",
      en: "A full day of nourishment: yoga, meditation, meal, and circle — small groups, intimate air.",
    },
    tag: { he: "הרשמה מוקדמת", en: "Early registration" },
    featured: true,
  },
];

export const aboutOrtal = {
  quote: {
    he: '"אני מאמינה שכל אמא היא כוח טבע"',
    en: '"Every mother is a force of nature"',
  },
  label: { he: "הסיפור שלי", en: "Founder story" },
  storyLabel: { he: "במילים שלי", en: "In my words" },
  titleBeforeEm: { he: "", en: "" },
  titleEm: { he: "אורטל", en: "Ortal" },
  bio: {
    he: "אורטל היא אמא, מורה ליוגה אשטנגה, ומלווה יוגה להריון, יוגה לאחר לידה, ועיסוי תינוקות ובייבי יוגה. היא מקיימת ריטריטים מיוחדים לאמהות עובדות, אדריכלית ומעצבת מרחבים אנרגטיים, ומאסטרית NLP מוסמכת — ליווי אישי לצמיחה ולהעצמה. היא מאמינה שכל אמא היא כוח טבע — ושהמרחב הנכון, בגוף, בנפש ובבית, יכול לשחרר אותו.",
    en: "Ortal is a mom, an Ashtanga Yoga teacher, and a guide for prenatal yoga, postnatal yoga, and infant massage with baby yoga. She holds special retreats for working moms, is an architect and energy-focused spatial designer, and a certified NLP Master — personal coaching for growth and empowerment. She believes every mother is a force of nature — and that the right space, in body, soul, and home, can release it.",
  },
  story2: {
    he: "הגעתי לשילוב הזה לא מתוך קורס אחד — אלא מתוך חיים: לידות, עייפות, וכל מה שקורה בין לבין. לכן אני יודעת שאין \"נכון\" אחד לכולן — יש קצב שמתאים לך.",
    en: "I arrived at this blend not from a single course — but from life: births, fatigue, and everything that happens in between. That’s why I know there isn’t one “right” for everyone — there is a pace that fits you.",
  },
  story3: {
    he: "השיעורים והריטריטים שלי נשענים על הקשבה, על נוכחות חמה, ועל אווירה שמאפשרת לך להיות בדיוק איפה שאת.",
    en: "My classes and retreats lean on listening, warm presence, and an atmosphere that lets you be exactly where you are.",
  },
  creds: [
    { he: "יוגה אשטנגה", en: "Ashtanga Yoga" },
    { he: "יוגה להריון", en: "Prenatal yoga" },
    { he: "יוגה לאחר לידה", en: "Postnatal yoga" },
    { he: "עיסוי תינוקות ובייבי יוגה", en: "Infant massage & baby yoga" },
    { he: "סדנאות ומעגלי נשים · ריטריטים לאמהות עובדות", en: "Women's circles · retreats for working moms" },
    { he: "מאסטרית NLP מוסמכת", en: "Certified NLP Master" },
    { he: "אדריכלית ומעצבת מרחבים אנרגטיים", en: "Architect and energy-focused spatial designer" },
  ] as const satisfies readonly Bilingual[],
  cta: { he: "בואי נדבר →", en: "Let’s talk →" },
} as const;

export const retreat = {
  label: { he: "ריטריט יום", en: "Day Retreat" },
  titleLine1: { he: "יום שלם רק", en: "A whole day" },
  titleEm: { he: "בשבילך", en: "just for you" },
  sub: {
    he: "ריטריט יום מיוחד לאמהות עובדות — שילוב של יוגה, מדיטציה, ארוחת שף, מעגל שיתוף וכלים לחיזוק האישה — הכול ביום אחד מיוחד.",
    en: "A special day retreat for working moms — yoga, meditation, chef's lunch, women's circle and tools to strengthen inner power — all in one special day.",
  },
  items: [
    {
      icon: "🧘",
      title: { he: "יוגה פתיחה", en: "Opening yoga" },
      sub: {
        he: "שחרור מתחים ועיגון בגוף",
        en: "Release tension, ground in the body",
      },
    },
    {
      icon: "🍽️",
      title: { he: "ארוחת שף משותפת", en: "Shared chef's lunch" },
      sub: {
        he: "ארוחה בריאה ומחברת עם הנשים",
        en: "Nourishing, connecting meal together",
      },
    },
    {
      icon: "🌸",
      title: { he: "מעגל נשים", en: "Women's circle" },
      sub: {
        he: "שיתוף, האזנה, כלים לחיי יומיום",
        en: "Sharing, listening, tools for daily life",
      },
    },
    {
      icon: "🧘",
      title: { he: "מדיטציה וסיום", en: "Meditation & close" },
      sub: {
        he: "חזרה הביתה עם כוח מחודש",
        en: "Return home renewed and empowered",
      },
    },
  ] as const,
  cardLarge: {
    title: { he: "הריטריט הקרוב", en: "Next Retreat" },
    sub: {
      he: "מקומות מוגבלים — 8 נשים בלבד",
      en: "Limited to 8 women only",
    },
    price: "₪ 650",
  },
  cardTime: {
    title: { he: "9:00 – 14:00", en: "9:00 – 14:00" },
    sub: { he: "ריטריט חצי יום", en: "Half-day retreat" },
    icon: "⏰",
  },
  cardVenue: {
    title: { he: "מיקום אינטימי", en: "Intimate venue" },
    sub: { he: "מרחב נשים מיוחד", en: "Special women's space" },
    icon: "📍",
  },
  photoAlt: {
    he: "דק וחלונות אל הטבע — מקום ליוגה",
    en: "A deck and windows onto nature — a place for yoga",
  },
  cta: {
    he: "הרשמי לריטריט הקרוב →",
    en: "Register for next retreat →",
  },
} as const;

export const testimonialsSection = {
  label: { he: "עדויות אמיתיות", en: "True voices" },
  titleBeforeEm: { he: "מילים שנשארות ", en: "Words that stay " },
  titleEm: { he: "בגוף", en: "in the body" },
} as const;

export const testimonials: Testimonial[] = [
  {
    text: {
      he: '"אורטל שינתה לי את החיים. אחרי הלידה הרגשתי אבודה — השיעורים שלה החזירו אותי לעצמי."',
      en: '"Ortal changed my life. After birth I felt lost — her classes brought me back to myself."',
    },
    author: { he: "מיכל, אמא ל-3", en: "Michal, mother of 3" },
    role: { he: "יוגה לאחר לידה", en: "Postnatal yoga" },
  },
  {
    text: {
      he: '"הריטריט היה חוויה שאינה ניתנת לתיאור. בכיתי, צחקתי, ויצאתי אחרת."',
      en: '"The retreat was indescribable. I cried, laughed, and left as a different woman."',
    },
    author: { he: "שירה, עורכת דין", en: "Shira, attorney" },
    role: {
      he: "ריטריט יום לאמהות עובדות",
      en: "Working mom retreat",
    },
  },
  {
    text: {
      he: '"העיסוי לתינוק שלי עזר לו עם הגזים תוך יומיים. אורטל סבלנית ומקצועית להפליא."',
      en: '"The baby massage helped my son with gas within two days. Ortal is wonderfully patient and professional."',
    },
    author: { he: "נועה, אמא חדשה", en: "Noa, new mom" },
    role: { he: "עיסוי תינוקות", en: "Baby massage" },
  },
];

export const calendarSection = {
  label: { he: "לוח השיעורים", en: "Upcoming classes" },
  titleLine1: { he: "השיעורים", en: "What's coming" },
  titleEm: { he: "הקרובים", en: "up next" },
  events: [
    {
      day: "12",
      month: { he: "מאי", en: "May" },
      title: { he: "יוגה לאחר לידה — קבוצה", en: "Postnatal Yoga — Group" },
      meta: {
        he: "10:00 – 11:30 · מרכז רעננה",
        en: "10:00 – 11:30 · Ra'anana",
      },
      price: "₪ 250",
    },
    {
      day: "15",
      month: { he: "מאי", en: "May" },
      title: {
        he: "ריטריט יום לאמהות עובדות",
        en: "Working Mom Retreat Day",
      },
      meta: {
        he: "09:00 – 14:00 · 8 מקומות בלבד",
        en: "09:00 – 14:00 · 8 spots only",
      },
      price: "₪ 650",
    },
    {
      day: "19",
      month: { he: "מאי", en: "May" },
      title: {
        he: "יוגה להריון — שיעור פרטי",
        en: "Prenatal yoga — private",
      },
      meta: {
        he: "הרשמה בוואטסאפ",
        en: "Book via WhatsApp",
      },
      price: "₪ 400",
    },
  ] as const satisfies readonly CalendarEvent[],
  ctaTitle: { he: "מוכנה להתחיל?", en: "Ready to begin?" },
  ctaSub: {
    he: "השיעור הראשון הוא תמיד הצעד הכי קשה. יחד נהפוך אותו לפשוט.",
    en: "The first session is always the hardest step. Together, we make it simple.",
  },
  ctaPhoneEyebrow: {
    he: "ליצירת קשר ישירות עם אורטל",
    en: "Reach Ortal directly",
  },
  ctaEmailEyebrow: { he: "אימייל", en: "Email" },
  whatsapp: { he: "שלחי הודעה בוואטסאפ →", en: "Message on WhatsApp →" },
  instagram: { he: "צפי באינסטגרם →", en: "See on Instagram →" },
  bookOnline: { he: "קביעת תור באתר →", en: "Book gently online →" },
} as const;

export const marketplaceSection = {
  label: { he: "Marketplace", en: "Marketplace" },
  titleLine1: { he: "עוד שירותים", en: "More services" },
  titleEm: { he: "בשבילך", en: "for you" },
  sub: {
    he: "ספקים מאומתים שמציעים שירותים לאמהות — כולם עם ההנחה המיוחדת לחברות MammyZone.",
    en: "Vetted practitioners offering services for mothers — all with an exclusive MammyZone discount.",
  },
  cta: { he: "גלי את המרקטפלייס →", en: "Explore the marketplace →" },
  cards: [
    {
      icon: "🤱",
      title: { he: "יועצת הנקה", en: "Lactation consultant" },
      sub: {
        he: "תמיכה מקצועית בהנקה",
        en: "Professional nursing support",
      },
      discount: { he: "15% הנחה לחברות", en: "15% member discount" },
    },
    {
      icon: "🩺",
      title: { he: "פיזיותרפיסטית", en: "Physiotherapist" },
      sub: {
        he: "שיקום רצפת אגן",
        en: "Pelvic floor rehabilitation",
      },
      discount: { he: "10% הנחה לחברות", en: "10% member discount" },
    },
    {
      icon: "🌸",
      title: { he: "דולה", en: "Doula" },
      sub: {
        he: "ליווי בלידה ואחריה",
        en: "Birth and postpartum support",
      },
      discount: { he: "12% הנחה לחברות", en: "12% member discount" },
    },
    {
      icon: "🍵",
      title: { he: "תזונאית", en: "Nutritionist" },
      sub: {
        he: "תזונה לאמהות מניקות",
        en: "Nutrition for nursing moms",
      },
      discount: { he: "10% הנחה לחברות", en: "10% member discount" },
    },
  ] as const satisfies readonly MarketplaceCard[],
} as const;

export const footer = {
  tagline: {
    he: "מרחב מקודש לאמהות — יוגה, צמיחה, קהילה ועיצוב חיים.",
    en: "A sacred space for mothers — yoga, growth, community and life design.",
  },
  colServices: { he: "שירותים", en: "Services" },
  colCommunity: { he: "קהילה", en: "Community" },
  colContact: { he: "יצירת קשר", en: "Contact" },
  links: {
    services: [
      { he: "יוגה לאחר לידה", en: "Postnatal Yoga", href: "#services" },
      { he: "יוגה להריון", en: "Prenatal Yoga", href: "#services" },
      { he: "עיסוי תינוקות ובייבי יוגה", en: "Infant massage & baby yoga", href: "#services" },
      { he: "סדנאות ומעגלי נשים", en: "Women's circles", href: "/workshops" },
      { he: "מאסטרית NLP", en: "NLP Master", href: "/nlp-for-mothers" },
    ],
    community: [
      { he: "הבלוג", en: "Blog", href: "/blog" },
      { he: "גלריה", en: "Gallery", href: "/gallery" },
      { he: "סדנאות ומעגלי נשים", en: "Women's circles", href: "/workshops" },
      { he: "Marketplace", en: "Marketplace", href: "#marketplace" },
      { he: "לא בטוחה מה מתאים?", en: "Not sure what fits?", href: "/contact" },
    ],
    contact: [
      {
        he: "דף הקשר",
        en: "Gentle contact page",
        href: "/contact",
      },
      {
        he: "054-425-6903 · שיחה",
        en: "054-425-6903 · Call",
        href: siteContact.phoneTel,
      },
      {
        he: "וואטסאפ",
        en: "WhatsApp",
        href: siteContact.whatsappUrl,
      },
      {
        he: siteContact.email,
        en: siteContact.email,
        href: siteContact.mailto,
      },
      { he: "לוח שיעורים", en: "Class calendar", href: "/book" },
      { he: "הרשמה לניוזלטר", en: "Newsletter signup", href: "#newsletter" },
      { he: "אינסטגרם", en: "Instagram", href: siteContact.instagramUrl },
    ],
  },
  social: [
    { label: "Instagram", abbr: "ig", href: siteContact.instagramUrl },
    { label: "Facebook", abbr: "fb", href: "#" },
    { label: "TikTok", abbr: "tk", href: "#" },
    { label: "WhatsApp", abbr: "wa", href: siteContact.whatsappUrl },
  ],
  bottomLeft: { he: "© 2026 MammyZone · אורטל חזן", en: "© 2026 MammyZone · Ortal Hazan" },
  bottomRight: {
    he: "עיצוב ופיתוח · mammyzone.com",
    en: "Design & Development · mammyzone.com",
  },
} as const;

/** Single object with every on-page string as `{ he, en }` (same shape as the section exports). */
export const translations = {
  siteMeta,
  siteContact,
  nav,
  scrollChrome,
  hero,
  marqueeItems,
  trustSection,
  transformationSection,
  articlesSection,
  socialGallerySection,
  socialGalleryImages,
  galleryPage,
  galleryUi,
  notFoundPage,
  finalJourneySection,
  servicesSection,
  services,
  aboutOrtal,
  retreat,
  testimonialsSection,
  testimonials,
  calendarSection,
  marketplaceSection,
  footer,
  layoutShell,
} as const;

export {
  LanguageContext,
  LanguageProvider,
  useLanguage,
} from "./i18n-context";
export type { Language } from "./i18n-context";
