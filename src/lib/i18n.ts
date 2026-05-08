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
    he: "מרחב מקודש לאמהות. יוגה לאחר לידה, יוגה להריון, עיסוי תינוקות, ריטריט לאמהות עובדות, אימון NLP אישי ועיצוב בית אנרגטי. עם אורטל חזן.",
    en: "A sacred space for mothers: postnatal yoga, pregnancy yoga, baby massage, working-mom retreats, NLP coaching & energetic home design with Ortal Hazan.",
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
  /** Primary booking route — `/book` */
  book: { he: "קביעה", en: "Book" },
  /** `/contact` — soft conversion */
  contact: { he: "קשר", en: "Contact" },
  cta: { he: "הזמיני שיעור", en: "Book a session" },
  langToggle: { he: "EN / עב", en: "HE / EN" },
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
    he: "תודה — נתראה בדוא״ל.",
    en: "Thank you — see you in your inbox.",
  },
  newsletterPrivacy: {
    he: "לא מעבירים לצד שלישי. ניתן לבטל בכל עת.",
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
  eyebrow: { he: "מרחב מקודש לאמהות", en: "A sacred space for mothers" },
  titleBeforeEm: { he: "את", en: "You are the" },
  titleEm: { he: " ראשית", en: " origin" },
  titleAccent: { he: "הכוח שלך", en: "of your own power" },
  sub: {
    he: "יוגה לאחר לידה, יוגה להריון, עיסוי תינוקות, ריטריט לאמהות עובדות ואימון NLP אישי — עם אורטל חזן.",
    en: "Postnatal yoga, pregnancy yoga, baby massage, working-mom retreats and personal NLP coaching — with Ortal Hazan.",
  },
  primaryCta: { he: "בואי להתחיל →", en: "Begin your journey →" },
  ghostCta: { he: "קראי עליי", en: "Meet Ortal" },
  pills: [
    { icon: "🧘", he: "יוגה לאחר לידה", en: "Postnatal yoga" },
    { icon: "🤰", he: "יוגה בהריון", en: "Pregnancy yoga" },
    { icon: "👶", he: "עיסוי תינוקות", en: "Baby massage", sage: true },
    { icon: "🌿", he: "NLP", en: "NLP coaching", sage: true },
  ] as const,
  credentialName: { he: "אורטל חזן", en: "Ortal Hazan" },
  credentialTags: {
    he: "מדריכת יוגה ואשטנגה · עיסוי תינוקות\nמאמנת NLP מוסמכת · מעצבת פנים",
    en: "Yoga & Ashtanga instructor · baby massage\nCertified NLP coach · interior designer",
  },
  imageAlt: {
    he: "אורטל חזן עם תינוקה — מדריכת יוגה ו-NLP",
    en: "Ortal Hazan with her baby — yoga & NLP guide",
  },
} as const;

export const marqueeItems: Bilingual[] = [
  { he: "יוגה לאמהות", en: "Yoga for Moms" },
  { he: "עיסוי תינוקות", en: "Baby Massage" },
  { he: "ריטריט נשים", en: "Women's Retreat" },
  { he: "מעגל נשים", en: "Women's Circle" },
  { he: "אימון NLP", en: "NLP Coaching" },
  { he: "עיצוב אנרגטי", en: "Energy Design" },
];

export const trustSection = {
  label: { he: "למה לסמוך", en: "Why women trust this space" },
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
      value: "4",
      label: { he: "התמחויות מרכזיות", en: "Core disciplines" },
    },
    {
      value: "∞",
      label: { he: "מעגלים של הקשבה", en: "Circles of listening" },
    },
  ] as const,
  credentials: [
    { he: "מדריכת יוגה ואשטנגה מוסמכת", en: "Certified yoga & Ashtanga teacher" },
    { he: "מומחית עיסוי תינוקות", en: "Baby massage specialist" },
    { he: "מאמנת NLP מוסמכת", en: "Certified NLP coach" },
    { he: "מעצבת פנים ומרחבי אנרגיה", en: "Interior & energetic space design" },
  ] as const satisfies readonly Bilingual[],
} as const;

export const transformationSection = {
  label: { he: "המעבר", en: "The shift" },
  titleLine1: { he: "ממקום של עומס", en: "From a place of load" },
  titleEm: { he: "אל נחות", en: "toward rest" },
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
  label: { he: "מהזין את הנשמה", en: "For the soul & SEO" },
  titleLine1: { he: "מגזין", en: "Editorial" },
  titleEm: { he: "קצר ועמוק", en: "short & deep" },
  readMore: { he: "קראי עוד →", en: "Read more →" },
} as const;

export const socialGallerySection = {
  label: { he: "מהאינסטגרם", en: "From Instagram" },
  titleLine1: { he: "רגעים", en: "Moments" },
  titleEm: { he: "חיים מהשטיח", en: "off the mat" },
  sub: {
    he: "תמונות מהשיעורים, הריטריטים והמעגלים — מוזמנות להצטרף לקהילה.",
    en: "Scenes from classes, retreats, and circles — you’re welcome in this community.",
  },
  followCta: { he: "עקבי אחריי באינסטגרם", en: "Follow on Instagram" },
  /** Placeholder — replace with real @ handle when live */
  followHref: "https://www.instagram.com/",
} as const;

/** Unsplash-backed gallery tiles — see `src/lib/media/sources.ts` */
export const socialGalleryImages = socialGalleryStock;

export const finalJourneySection = {
  heroLine: {
    he: "את לא צריכה להוכיח כלום כדי להשתייך כאן.",
    en: "You don’t have to prove anything to belong here.",
  },
  supporting: {
    he: "צעד אחד קטן — הודעה או שיחה — מספיק כדי שנתחיל ביחד.",
    en: "One small step — a message or a call — is enough for us to begin together.",
  },
  promise: {
    he: "נשימה שמרגיעה, גבול ברור, וליווי שמכבד את מה שאת עוברת.",
    en: "Breath that steadies you, clear boundaries, and guidance that honors what you’re moving through.",
  },
} as const;

export const servicesSection = {
  label: { he: "הזמנה עדינה", en: "A gentle invitation" },
  titleLine1: { he: "מרחב שמכבד", en: "Space that honors" },
  titleEm: { he: "את הדרך שלך", en: "your own rhythm" },
  unsureHint: {
    he: "לא בטוחה מה נכון לך עכשיו?",
    en: "Not sure what feels right for you right now?",
  },
  unsureCta: { he: "דף קשר רך", en: "Visit the gentle contact page" },
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
    title: { he: "יוגה בהריון", en: "Pregnancy yoga" },
    description: {
      he: "אשטנגה רכה לפי שלב — תמיכה בגב, באגן ובלב שמתרחב.",
      en: "Soft Ashtanga by trimester — support for your back, pelvis, and the heart that is growing room.",
    },
    tag: { he: "כל ההריון", en: "All trimesters" },
  },
  {
    num: "03",
    icon: "🧠",
    title: { he: "אימון NLP אישי", en: "NLP coaching" },
    description: {
      he: "מפגשים שמנקים רעש פנימי, בונים ביטחון ומחברים מחדש לבחירות שמשרתות אותך.",
      en: "Sessions that quiet inner noise, rebuild confidence, and reconnect you with choices that truly serve you.",
    },
    tag: { he: "מוסמכת NLP", en: "NLP certified" },
    tagVariant: "sage",
  },
  {
    num: "04",
    icon: "👶",
    title: { he: "עיסוי ויוגה לתינוקות", en: "Baby massage & yoga" },
    description: {
      he: "מגע מסודר לשחרור, שינה וקשר — כלים פשוטים שאת לוקחת הביתה.",
      en: "Structured touch for ease, sleep, and bonding — simple tools you take home with you.",
    },
    tag: { he: "בית או מרחב קבוצתי", en: "Home or small group" },
  },
  {
    num: "05",
    icon: "✨",
    title: { he: "סדנאות ומעגלים", en: "Workshops & circles" },
    description: {
      he: "מפגשים קצרים ועמוקים — נשים, נשימה, וכלים ליומיום המורכב של אמאות.",
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
      he: "יום שלם של הזנה: יוגה, מדיטציה, ארוחה ומעגל — מקומות מצומצמים, אווירה אינטימית.",
      en: "A full day of nourishment: yoga, meditation, meal, and circle — small groups, intimate air.",
    },
    tag: { he: "הרשמה מוקדמת", en: "Early registration" },
    featured: true,
  },
];

export const aboutOrtal = {
  quote: {
    he: '"מאמינה שכל אמא היא כוח טבע"',
    en: '"Every mother is a force of nature"',
  },
  label: { he: "הסיפור שלי", en: "Founder story" },
  storyLabel: { he: "במילים שלי", en: "In my words" },
  titleBeforeEm: { he: "אורטל חזן — ", en: "Ortal Hazan — " },
  titleEm: { he: "המדריכה שלך", en: "your guide" },
  bio: {
    he: "אורטל חזן היא מדריכת יוגה ואשטנגה, מומחית עיסוי תינוקות, מאמנת NLP מוסמכת ומעצבת פנים. היא מאמינה שכל אמא היא כוח טבע — ושהמרחב הנכון, בגוף ובבית, יכול לשחרר אותו.",
    en: "Ortal Hazan is a yoga and Ashtanga instructor, baby massage specialist, certified NLP coach and interior designer. She believes every mother is a force of nature — and that the right space, in body and home, can release it.",
  },
  story2: {
    he: "הגעתי לשילוב הזה לא מתוך קורס אחד — אלא מתוך חיים: לידות, עייפות, רגעים של התרחבות ושל צמצום. לכן אני יודעת שאין \"נכון\" אחד לכולן — יש קצב שמתאים לך.",
    en: "I arrived at this blend not from a single course — but from life: births, fatigue, moments of expansion and of pulling inward. That’s why I know there isn’t one “right” for everyone — there is a pace that fits you.",
  },
  story3: {
    he: "השיעורים והריטריטים שלי נשענים על הקשבה, על דיוק מקצועי, ועל אווירה שמרשה לך להיות בדיוק איפה שאת.",
    en: "My classes and retreats lean on listening, professional precision, and an atmosphere that lets you be exactly where you are.",
  },
  creds: [
    {
      he: "מדריכת יוגה ואשטנגה מוסמכת",
      en: "Certified Yoga & Ashtanga Instructor",
    },
    { he: "מומחית עיסוי תינוקות", en: "Baby Massage Specialist" },
    {
      he: "מאמנת NLP מוסמכת ואדריכלית",
      en: "Certified NLP Coach & Architect",
    },
    {
      he: "מעצבת פנים ועיצוב אנרגטי",
      en: "Interior & Energy Space Designer",
    },
  ] as const satisfies readonly Bilingual[],
  cta: { he: "בואי נדבר →", en: "Let’s talk →" },
} as const;

export const retreat = {
  label: { he: "ריטריט יום", en: "Day Retreat" },
  titleLine1: { he: "יום שלם רק", en: "A whole day" },
  titleEm: { he: "בשבילך", en: "just for you" },
  sub: {
    he: "ריטריט יום מיוחד לאמהות עובדות — שילוב של יוגה, מדיטציה, ארוחת שף, מעגל שיתוף ואמצאות לחיזוק האישה — הכל ביום אחד מיוחד.",
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
  cta: {
    he: "הרשמי לריטריט הקרוב →",
    en: "Register for next retreat →",
  },
} as const;

export const testimonialsSection = {
  label: { he: "קולות אמיתיות", en: "True voices" },
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
      he: '"הריטריט היה חוויה שאיינה ניתנת לתיאור. בכיתי, צחקתי, ויצאתי אחרת."',
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
        he: "יוגה בהריון — שיעור פרטי",
        en: "Pregnancy Yoga — Private",
      },
      meta: {
        he: "פניות להזמנה דרך WhatsApp",
        en: "Book via WhatsApp",
      },
      price: "₪ 400",
    },
  ] as const satisfies readonly CalendarEvent[],
  ctaTitle: { he: "מוכנה להתחיל?", en: "Ready to begin?" },
  ctaSub: {
    he: "השיעור הראשון הוא תמיד הצעד הכי קשה. ביחד, נעשה אותו פשוט.",
    en: "The first session is always the hardest step. Together, we make it simple.",
  },
  ctaPhoneEyebrow: {
    he: "ליצירת קשר ישירות עם אורטל",
    en: "Reach Ortal directly",
  },
  ctaEmailEyebrow: { he: "אימייל", en: "Email" },
  whatsapp: { he: "שלחי הודעה בוואטסאפ →", en: "Message on WhatsApp →" },
  bookOnline: { he: "קביעה עדינה באתר →", en: "Book gently online →" },
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
  colContact: { he: "צור קשר", en: "Contact" },
  links: {
    services: [
      { he: "יוגה לאחר לידה", en: "Postnatal Yoga", href: "#services" },
      { he: "יוגה בהריון", en: "Pregnancy Yoga", href: "#services" },
      { he: "עיסוי תינוקות", en: "Baby Massage", href: "#services" },
      { he: "ריטריט יום", en: "Day Retreat", href: "#services" },
      { he: "NLP אימון", en: "NLP Coaching", href: "#services" },
    ],
    community: [
      { he: "הבלוג", en: "Blog", href: "/blog" },
      { he: "מעגל הנשים", en: "Women's circle", href: "#" },
      { he: "Marketplace", en: "Marketplace", href: "#marketplace" },
      { he: "לא בטוחה מה מתאים?", en: "Not sure what fits?", href: "/contact" },
    ],
    contact: [
      {
        he: "דף קשר עדין",
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
        he: "ortitul@gmail.com",
        en: "ortitul@gmail.com",
        href: siteContact.mailto,
      },
      { he: "לוח שיעורים", en: "Class calendar", href: "/book" },
      { he: "הרשמה לניוזלטר", en: "Newsletter signup", href: "#newsletter" },
    ],
  },
  social: [
    { label: "Instagram", abbr: "ig", href: "#" },
    { label: "Facebook", abbr: "fb", href: "#" },
    { label: "TikTok", abbr: "tk", href: "#" },
    { label: "WhatsApp", abbr: "wa", href: siteContact.whatsappUrl },
  ],
  bottomLeft: { he: "© 2026 MammyZone · אורטל חזן", en: "© 2026 MammyZone · Ortal Hazan" },
  bottomRight: {
    he: "עיצוב ופיתוח · mammyzone.co.il",
    en: "Design & Development · mammyzone.co.il",
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
