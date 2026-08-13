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
      he: "מורה ליוגה · מאסטרית NLP מוסמכת · עיסוי תינוקות ובייבי יוגה",
      en: "Yoga teacher · certified NLP Master · infant massage & baby yoga",
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
