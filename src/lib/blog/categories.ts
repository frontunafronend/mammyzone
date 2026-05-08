import type { Bilingual } from "@/types";

/** Controlled vocabulary for blog SEO + filtering */
export const blogCategories = [
  "postpartum",
  "pregnancy",
  "yoga",
  "emotional_wellness",
  "motherhood",
  "breathing",
  "nlp",
  "baby_care",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export const blogCategoryLabels: Record<BlogCategory, Bilingual> = {
  postpartum: { he: "אחרי לידה", en: "Postpartum" },
  pregnancy: { he: "הריון", en: "Pregnancy" },
  yoga: { he: "יוגה", en: "Yoga" },
  emotional_wellness: { he: "רווחה רגשית", en: "Emotional wellness" },
  motherhood: { he: "אמהות", en: "Motherhood" },
  breathing: { he: "נשימה", en: "Breathing" },
  nlp: { he: "NLP", en: "NLP" },
  baby_care: { he: "טיפול בתינוקות", en: "Baby care" },
};

export const blogTagLabels: Record<string, Bilingual> = {
  nervous_system: { he: "מערכת עצבים", en: "Nervous system" },
  rest: { he: "מנוחה", en: "Rest" },
  pelvis: { he: "אגן", en: "Pelvis" },
  language: { he: "שפה", en: "Language" },
  patterns: { he: "דפוסים", en: "Patterns" },
  gentle: { he: "עדינות", en: "Gentleness" },
  group: { he: "קבוצה", en: "Group" },
  emotional_wellness: { he: "רווחה רגשית", en: "Emotional wellness" },
};

export function isBlogCategory(s: string): s is BlogCategory {
  return (blogCategories as readonly string[]).includes(s);
}
