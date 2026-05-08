import type { BookingKind } from "./types";
import type { Bilingual } from "@/types";

export const bookingCopy = {
  metaTitle: {
    he: "קביעת מפגש",
    en: "Book a session",
  },
  metaDescription: {
    he: "בחרי שירות, תאריך ושעה — בקצב עדין. כל השעות לפי שעון ישראל.",
    en: "Choose a service, date, and time — at a gentle pace. All times are Israel local time.",
  },
  heroEyebrow: { he: "הזמנה", en: "Reservations" },
  heroTitle: {
    he: "מקום שמכבד את הקצב שלך",
    en: "A rhythm that honors yours",
  },
  heroSub: {
    he: "בחרי את המסגרת, התאריך והשעה. נאשר ידנית ונשלח תזכורות עדינות — בלי לחץ.",
    en: "Pick your offering, date, and time. We confirm personally and send gentle reminders — no pressure.",
  },
  timezoneNote: {
    he: "כל השעות מוצגות לפי שעון ישראל (Asia/Jerusalem), כולל שעון קיץ/חורף.",
    en: "All times are shown in Israel time (Asia/Jerusalem), including daylight changes.",
  },
  kindFilterAll: { he: "הכל", en: "All" },
  kindLabels: {
    workshop: { he: "סדנאות", en: "Workshops" },
    private_session: { he: "פרטי", en: "Private" },
    yoga_class: { he: "יוגה בקבוצה", en: "Group yoga" },
    retreat: { he: "ריטריטים", en: "Retreats" },
    package: { he: "חבילות", en: "Packages" },
  } satisfies Record<BookingKind, Bilingual>,
  stepService: { he: "שירות", en: "Service" },
  stepDate: { he: "תאריך", en: "Date" },
  stepTime: { he: "שעה", en: "Time" },
  stepConfirm: { he: "אישור", en: "Confirm" },
  continue: { he: "המשיכי", en: "Continue" },
  back: { he: "חזרה", en: "Back" },
  changeService: { he: "שינוי שירות", en: "Change service" },
  duration: { he: "משך", en: "Duration" },
  minutes: { he: "דק׳", en: "min" },
  selectDateTitle: { he: "בחרי תאריך", en: "Choose a date" },
  selectTimeTitle: { he: "בחרי שעה", en: "Choose a time" },
  noSlots: {
    he: "אין שעות פנויות ליום הזה — נסי יום אחר.",
    en: "No open times that day — try another date.",
  },
  calendarPrev: { he: "חודש קודם", en: "Previous month" },
  calendarNext: { he: "חודש הבא", en: "Next month" },
  confirmTitle: { he: "פרטים אחרונים", en: "Final details" },
  confirmIntro: {
    he: "נשמח לוודא את המקום יחד. השאירי פרטים — נחזור אליך לאישור סופי.",
    en: "We’ll confirm your spot together. Leave your details — we’ll reply with final confirmation.",
  },
  fieldName: { he: "שם מלא", en: "Full name" },
  fieldPhone: { he: "טלפון", en: "Phone" },
  fieldEmail: { he: "אימייל (רשות)", en: "Email (optional)" },
  fieldNotes: { he: "הערות (רשות)", en: "Notes (optional)" },
  remindersTitle: { he: "תזכורות", en: "Reminders" },
  remindersBody: {
    he: "לאחר האישור נשלח לך תזכורת בוואטסאפ ובמייל (כשיתחברו לספקים). אפשר לבטל עד 24 שעות לפני.",
    en: "After confirmation we’ll send a WhatsApp and email reminder (once providers are connected). Cancel up to 24h before.",
  },
  submit: { he: "שליחת הבקשה", en: "Send request" },
  submitting: { he: "שולחת…", en: "Sending…" },
  successTitle: { he: "הבקשה נקלטה", en: "Request received" },
  successBody: {
    he: "שמרנו את הפרטים. אורטל תחזור אליך לאישור — או המשיכי בוואטסאפ עם הקוד למטה.",
    en: "We’ve saved your details. Ortal will reply to confirm — or continue on WhatsApp with the code below.",
  },
  successRef: { he: "קוד פנייה", en: "Reference" },
  openWhatsapp: { he: "פתיחת וואטסאפ", en: "Open WhatsApp" },
  futureStripe: {
    he: "תשלום מאובטח (PayPlus / Tranzila) יתווסף כאן בשלב הבא.",
    en: "Secure checkout (PayPlus / Tranzila) will plug in here next.",
  },
} as const;
