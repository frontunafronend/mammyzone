import type {
  Bilingual,
  CalendarEvent,
  MarketplaceCard,
  ServiceCard,
  Testimonial,
} from "@/types";

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

/** Primary contact — CTA, footer, WhatsApp deep links */
export const siteContact = {
  phoneDisplay: "054-425-6903",
  phoneTel: "tel:+972544256903",
  whatsappUrl: "https://wa.me/972544256903",
  email: "ortitul@gmail.com",
  mailto: "mailto:ortitul@gmail.com",
} as const;

export const nav = {
  services: { he: "שירותים", en: "Services" },
  about: { he: "אודות", en: "About" },
  retreat: { he: "ריטריט", en: "Retreat" },
  calendar: { he: "לוח שיעורים", en: "Calendar" },
  marketplace: { he: "Marketplace", en: "Marketplace" },
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

export const servicesSection = {
  label: { he: "השירותים שלי", en: "What I offer" },
  titleLine1: { he: "כל מה שאת צריכה,", en: "Everything you need," },
  titleEm: { he: "במקום אחד", en: "in one place" },
} as const;

export const services: ServiceCard[] = [
  {
    num: "01",
    icon: "🧘",
    title: { he: "יוגה לאחר לידה", en: "Postnatal Yoga" },
    description: {
      he: "שיעורים אישיים וקבוצתיים לחיזוק הגוף והנפש אחרי הלידה. מחזקים את כוח האישה מבפנים.",
      en: "Private and group sessions to restore strength and inner power after birth.",
    },
    tag: { he: "1:1 + קבוצה", en: "1:1 + group" },
  },
  {
    num: "02",
    icon: "🤰",
    title: { he: "יוגה בהריון", en: "Pregnancy Yoga" },
    description: {
      he: "יוגת אשטנגה עדינה ומותאמת לכל שלבי ההריון. תמיכה בגוף ובנפש לאורך כל הדרך.",
      en: "Gentle Ashtanga yoga adapted for every trimester, supporting body and spirit.",
    },
    tag: { he: "כל השלבים", en: "All trimesters" },
  },
  {
    num: "03",
    icon: "🌿",
    title: {
      he: "ריטריט יום לאמהות עובדות",
      en: "Working Mom Retreat Day",
    },
    description: {
      he: "יוגה, מדיטציה, ארוחת שף, מעגל שיתוף ואמצאות לחיזוק האישה — הכל ביום אחד מיוחד.",
      en: "Yoga, meditation, shared lunch, women's circle and tools for inner strength — all in one day.",
    },
    tag: { he: "ריטריט יום שלם", en: "Full day retreat" },
    featured: true,
  },
  {
    num: "04",
    icon: "👶",
    title: {
      he: "יוגה ועיסוי לתינוקות",
      en: "Baby Yoga & Massage",
    },
    description: {
      he: "סדנאות ביתיות לסיוע בגזים, פיתוח מוטורי וחיזוק הקשר בין אמא לתינוק.",
      en: "Home workshops for gas relief, motor development and deepening the mother-baby bond.",
    },
    tag: { he: "ביקור בית", en: "Home visits" },
  },
  {
    num: "05",
    icon: "🧠",
    title: { he: "אימון NLP אישי", en: "Personal NLP Coaching" },
    description: {
      he: "מפגשים אישיים לחיזוק הכוח הפנימי, שינוי דפוסים ובניית חיים מלאים. מוסמכת NLP.",
      en: "Personal sessions to strengthen inner power, shift patterns and build a full life. NLP certified.",
    },
    tag: { he: "מפגשים אישיים", en: "Private sessions" },
    tagVariant: "sage",
  },
  {
    num: "06",
    icon: "🏡",
    title: { he: "עיצוב בית אנרגטי", en: "Energy-Space Design" },
    description: {
      he: "ייעוץ עיצוב פנים שמחבר אנרגיה וצמיחה. הבית שלך כמרחב שמזין ומחזק אותך.",
      en: "Interior design consulting that connects energy and growth. Your home as a space that nourishes you.",
    },
    tag: { he: "פנים + אנרגיה", en: "Design + energy" },
    tagVariant: "sage",
  },
];

export const aboutOrtal = {
  quote: {
    he: '"מאמינה שכל אמא היא כוח טבע"',
    en: '"Every mother is a force of nature"',
  },
  label: { he: "אודות אורטל", en: "About Ortal" },
  titleBeforeEm: { he: "אורטל חזן — ", en: "Ortal Hazan — " },
  titleEm: { he: "המדריכה שלך", en: "your guide" },
  bio: {
    he: "אורטל חזן היא מדריכת יוגה ואשטנגה, מומחית עיסוי תינוקות, מאמנת NLP מוסמכת ומעצבת פנים. היא מאמינה שכל אמא היא כוח טבע — ושהמרחב הנכון, בגוף ובבית, יכול לשחרר אותו.",
    en: "Ortal Hazan is a yoga and Ashtanga instructor, baby massage specialist, certified NLP coach and interior designer. She believes every mother is a force of nature — and that the right space, in body and home, can release it.",
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
  cta: { he: "קבעי שיעור ראשון →", en: "Book your first session →" },
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
  label: { he: "אמרו עליי", en: "What they say" },
  titleBeforeEm: { he: "נשים שעברו ", en: "Women who walked " },
  titleEm: { he: "את הדרך", en: "the path" },
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
      { he: "ריטריט יום", en: "Day Retreat", href: "#retreat" },
      { he: "NLP אימון", en: "NLP Coaching", href: "#services" },
    ],
    community: [
      { he: "הבלוג", en: "Blog", href: "#" },
      { he: "מעגל הנשים", en: "Women's circle", href: "#" },
      { he: "Marketplace", en: "Marketplace", href: "#marketplace" },
      { he: "כתבי לנו", en: "Write for us", href: "#" },
    ],
    contact: [
      {
        he: "054-425-6903 · וואטסאפ",
        en: "054-425-6903 · WhatsApp",
        href: "tel:+972544256903",
      },
      {
        he: "ortitul@gmail.com",
        en: "ortitul@gmail.com",
        href: "mailto:ortitul@gmail.com",
      },
      { he: "לוח שיעורים", en: "Class calendar", href: "#calendar" },
      { he: "הרשמה לניוזלטר", en: "Newsletter signup", href: "#" },
    ],
  },
  social: [
    { label: "Instagram", abbr: "ig", href: "#" },
    { label: "Facebook", abbr: "fb", href: "#" },
    { label: "TikTok", abbr: "tk", href: "#" },
    { label: "WhatsApp", abbr: "wa", href: "https://wa.me/972544256903" },
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
  servicesSection,
  services,
  aboutOrtal,
  retreat,
  testimonialsSection,
  testimonials,
  calendarSection,
  marketplaceSection,
  footer,
} as const;

export {
  LanguageContext,
  LanguageProvider,
  useLanguage,
} from "./i18n-context";
export type { Language } from "./i18n-context";
