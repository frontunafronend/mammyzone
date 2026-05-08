import type { ContactInterestType, ContactPreferredMethod } from "@/lib/leads/types";
import type { Bilingual } from "@/types";

export const contactPageMeta = {
  title: {
    he: "קשר עדין — MammyZone | אורטל חזן",
    en: "A gentle line to MammyZone | Ortal Hazan",
  },
  description: {
    he: "שיחה רכה על מה שעובר עליך — יוגה, אחרי לידה, NLP או סתם לשאול שאלה. בלי לחץ, בקצב שלך.",
    en: "A soft place to ask what you need — yoga, postpartum, NLP, or simply a question. No pressure, your pace.",
  },
} as const;

export const contactHero = {
  eyebrow: { he: "כאן בשבילך", en: "Right here for you" },
  title: { he: "בואי כמו שאת", en: "Come as you are" },
  sub: {
    he: "אם הלב רועד קצת לפני ששולחות הודעה — זה בסדר. כתבי כמה מילים, או בחרי וואטסאפ. אני כאן.",
    en: "If your heart flutters before you reach out — that is okay. Leave a few words, or choose WhatsApp. I am here.",
  },
} as const;

export const contactCardsIntro = {
  he: "דרכים להתחבר",
  en: "Ways to connect",
} as const;

export const contactCards = {
  whatsapp: {
    title: { he: "וואטסאפ", en: "WhatsApp" } as Bilingual,
    body: {
      he: "הכי טבעי לרוב האמהות — הודעה קצרה, בלי פורמליות.",
      en: "Often the gentlest path — a short message, no formality.",
    } as Bilingual,
    cta: { he: "פתיחת צ'אט", en: "Open chat" } as Bilingual,
  },
  phone: {
    title: { he: "שיחה", en: "Phone" } as Bilingual,
    body: {
      he: "אם נוח לך לשמוע קול — אשמח לשיחה קצרה.",
      en: "If hearing a voice feels right — I would love a brief call.",
    } as Bilingual,
    cta: { he: "חיוג", en: "Call" } as Bilingual,
  },
  email: {
    title: { he: "אימייל", en: "Email" } as Bilingual,
    body: {
      he: "למכתב ארוך יותר, או אם את צריכה לצרף משהו.",
      en: "For a longer letter, or when you need to attach something.",
    } as Bilingual,
    cta: { he: "פתיחת דוא״ל", en: "Compose email" } as Bilingual,
  },
} as const;

export const contactFormCopy = {
  title: { he: "כמה מילים ממך", en: "A few words from you" } as Bilingual,
  intro: {
    he: "אין חובה לפרט הכל — רק מה שמרגיש נכון עכשיו.",
    en: "You do not owe every detail — only what feels true right now.",
  } as Bilingual,
  name: { he: "שם", en: "Name" } as Bilingual,
  phone: { he: "טלפון", en: "Phone" } as Bilingual,
  email: { he: "אימייל (אופציונלי)", en: "Email (optional)" } as Bilingual,
  interest: { he: "מה הכי קרוב ללב?", en: "What feels closest?" } as Bilingual,
  method: { he: "איך נוח לך שאחזור?", en: "How should I reply?" } as Bilingual,
  message: { he: "הודעה (אופציונלי)", en: "Message (optional)" } as Bilingual,
  placeholderMessage: {
    he: "מה שעוזר לך להרגיש נוכחת…",
    en: "Anything that helps you feel seen…",
  } as Bilingual,
  submit: { he: "שליחה", en: "Send" } as Bilingual,
  submitting: { he: "שולחת…", en: "Sending…" } as Bilingual,
  successTitle: { he: "הגיע אליי", en: "It reached me" } as Bilingual,
  successBody: {
    he: "תודה על האומץ לכתוב. אחזור אליך בקרוב, בדרך שבחרת.",
    en: "Thank you for the courage to write. I will be in touch soon, the way you asked.",
  } as Bilingual,
} as const;

export const CONTACT_INTEREST_ORDER: ContactInterestType[] = [
  "private_session",
  "yoga_after_birth",
  "pregnancy_yoga",
  "baby_massage",
  "nlp",
  "workshop",
  "retreat",
  "not_sure",
];

export const contactInterestLabels: Record<ContactInterestType, Bilingual> = {
  private_session: { he: "שיעור פרטי / ליווי אישי", en: "Private session / one-to-one" },
  yoga_after_birth: { he: "יוגה אחרי לידה", en: "Yoga after birth" },
  pregnancy_yoga: { he: "יוגה בהריון", en: "Pregnancy yoga" },
  baby_massage: { he: "עיסוי תינוקות", en: "Baby massage" },
  nlp: { he: "NLP / ליווי רגשי", en: "NLP / emotional support" },
  workshop: { he: "סדנה", en: "Workshop" },
  retreat: { he: "ריטריט", en: "Retreat" },
  not_sure: { he: "עדיין לא בטוחה", en: "Not sure yet" },
};

export const CONTACT_METHOD_ORDER: ContactPreferredMethod[] = ["whatsapp", "phone", "email"];

export const contactMethodLabels: Record<ContactPreferredMethod, Bilingual> = {
  whatsapp: { he: "וואטסאפ", en: "WhatsApp" },
  phone: { he: "טלפון", en: "Phone" },
  email: { he: "אימייל", en: "Email" },
};

export const contactGuidance = {
  title: { he: "לא בטוחה מה לבחור?", en: "Not sure what to choose?" } as Bilingual,
  body: {
    he: "זה מוכר. לפעמים הגוף עדיין מספר סיפור אחד והראש מבולבל. אפשר להתחיל בשיחה קצרה — בלי התחייבות לשום מסלול.",
    en: "That is familiar. Sometimes the body tells one story and the mind feels tangled. We can begin with a short conversation — no commitment to any path.",
  } as Bilingual,
} as const;

export const contactFaq = {
  title: { he: "שאלות נעימות", en: "Gentle questions" } as Bilingual,
  items: [
    {
      q: {
        he: "כמה זמן לוקח לקבל מענה?",
        en: "How long until I hear back?",
      },
      a: {
        he: "בדרך כלל תוך יום־יומיים בימי חול. בסופ״ש אולי קצת יותר.",
        en: "Usually within a day or two on weekdays. Weekends may be a little slower.",
      },
    },
    {
      q: {
        he: "האם צריך ניסיון ביוגה?",
        en: "Do I need yoga experience?",
      },
      a: {
        he: "לא. נכנסות לפי מה שהגוף מאפשר היום — בלי השוואות.",
        en: "No. We meet your body where it allows today — without comparison.",
      },
    },
    {
      q: {
        he: "אפשר לשאול בלי להירשם לשיעור?",
        en: "Can I ask without booking a class?",
      },
      a: {
        he: "בהחלט. הטופס והוואטסאפ שם בדיוק בשביל זה.",
        en: "Absolutely. The form and WhatsApp are there for exactly that.",
      },
    },
  ] as const,
} as const;

export const contactFinalCta = {
  title: { he: "מוכנה לקבוע זמן בשביל עצמך?", en: "Ready to put time on your calendar for you?" } as Bilingual,
  body: {
    he: "אפשר גם לעבור ישר ליומן הדיגיטלי — לבחור שירות ותאריך בקצב שלך.",
    en: "You can also move straight to the booking flow — pick a service and date at your pace.",
  } as Bilingual,
  cta: { he: "לקביעת שיעור", en: "Book a session" } as Bilingual,
} as const;
