import type { BookingOffering } from "./types";

const cap = {
  recurring: true,
  videoSession: true,
  membershipEligible: true,
  communityAccess: true,
} as const;

const capNoVideo = {
  ...cap,
  videoSession: false,
} as const;

export const BOOKING_OFFERINGS: BookingOffering[] = [
  {
    id: "workshop-postpartum-circle",
    kind: "workshop",
    title: {
      he: "מעגל לאחר לידה — מפגש חי",
      en: "Postpartum circle — live workshop",
    },
    description: {
      he: "מעגל קטן ואינטימי: נשימה, עיסוי עדין, ושיחה מחזקת בקצב שלך.",
      en: "A small, intimate circle: breath, gentle touch, and strengthening conversation at your pace.",
    },
    durationMin: 90,
    priceHint: { he: "מ־280 ₪", en: "From ₪280" },
    capabilities: capNoVideo,
  },
  {
    id: "private-yoga",
    kind: "private_session",
    title: {
      he: "יוגה פרטית (אשטנגה / רכה)",
      en: "Private yoga (Ashtanga / gentle)",
    },
    description: {
      he: "שיעור אחד־על־אחד מותאם לגוף שלך — הריון, אחרי לידה, או חזרה לשטיח.",
      en: "One-to-one practice tailored to your body — pregnancy, postpartum, or return to the mat.",
    },
    durationMin: 60,
    priceHint: { he: "מ־350 ₪", en: "From ₪350" },
    capabilities: cap,
  },
  {
    id: "private-nlp",
    kind: "private_session",
    title: {
      he: "אימון NLP אישי",
      en: "Private NLP coaching",
    },
    description: {
      he: "מסגרת בטוחה לעיבוד דפוסים, גבולות, ומעברי אםות — בזום או פרונטלי.",
      en: "A safe frame to work patterns, boundaries, and motherhood transitions — video or in person.",
    },
    durationMin: 75,
    priceHint: { he: "מ־400 ₪", en: "From ₪400" },
    capabilities: cap,
  },
  {
    id: "yoga-prenatal-group",
    kind: "yoga_class",
    title: {
      he: "יוגה להריון — קבוצה",
      en: "Prenatal yoga — group class",
    },
    description: {
      he: "שיעור שבועי קטן, מודע לרצפת אגן ולנשימה, עם ליווי מקצועי.",
      en: "A small weekly class mindful of pelvic floor and breath, with skilled guidance.",
    },
    durationMin: 60,
    priceHint: { he: "מ־120 ₪", en: "From ₪120" },
    capabilities: { ...cap, videoSession: false },
  },
  {
    id: "retreat-mothers-day",
    kind: "retreat",
    title: {
      he: "ריטריט יום לאמהות",
      en: "Mothers' day retreat",
    },
    description: {
      he: "יום שלם של נשימה, תנועה עדינה, ארוחה ומעגל — לפני תאריך יש לוודא מקום.",
      en: "A full day of breath, gentle movement, nourishment, and circle — confirm date with us.",
    },
    durationMin: 360,
    priceHint: { he: "מ־890 ₪", en: "From ₪890" },
    capabilities: capNoVideo,
  },
  {
    id: "package-mothers-journey",
    kind: "package",
    title: {
      he: "מסלול ״מסע אם״ — חבילה",
      en: "“Mother’s journey” — package",
    },
    description: {
      he: "סדרת מפגשים (יוגה + NLP) עם ליווי הדוק — מתאים לעומס רגשי או שינוי תקופתי.",
      en: "A series of sessions (yoga + NLP) with close support — ideal for emotional load or life transitions.",
    },
    durationMin: 60,
    priceHint: { he: "לפי הצעה אישית", en: "Custom quote" },
    capabilities: cap,
  },
];

export function getOfferingById(id: string): BookingOffering | undefined {
  return BOOKING_OFFERINGS.find((o) => o.id === id);
}

export function offeringsByKind(kind: BookingOffering["kind"]): BookingOffering[] {
  return BOOKING_OFFERINGS.filter((o) => o.kind === kind);
}
