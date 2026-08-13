import type { Bilingual } from "@/types";

export type BlogAuthor = {
  slug: string;
  name: Bilingual;
  role: Bilingual;
  image: string;
  imageAlt: Bilingual;
};

export const blogAuthors: Record<string, BlogAuthor> = {
  ortal: {
    slug: "ortal",
    name: { he: "אורטל חזן", en: "Ortal Hazan" },
    role: {
      he: "מדריכת יוגה · מאמנת NLP · מומחית עיסוי תינוקות",
      en: "Yoga guide · NLP coach · Baby massage specialist",
    },
    image: "/photos/family-home.jpg",
    imageAlt: {
      he: "אורטל חזן",
      en: "Ortal Hazan",
    },
  },
};

export function getAuthor(slug: string): BlogAuthor | undefined {
  return blogAuthors[slug];
}
