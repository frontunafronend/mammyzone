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
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=200&q=80",
    imageAlt: {
      he: "אורטל חזן",
      en: "Ortal Hazan",
    },
  },
};

export function getAuthor(slug: string): BlogAuthor | undefined {
  return blogAuthors[slug];
}
