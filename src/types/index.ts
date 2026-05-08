export type Locale = "he" | "en";

export type Bilingual = {
  he: string;
  en: string;
};

export type ServiceCard = {
  num: string;
  icon: string;
  title: Bilingual;
  description: Bilingual;
  tag: Bilingual;
  tagVariant?: "sage";
  featured?: boolean;
};

export type CalendarEvent = {
  day: string;
  month: Bilingual;
  title: Bilingual;
  meta: Bilingual;
  price: string;
};

export type Testimonial = {
  text: Bilingual;
  author: Bilingual;
  role: Bilingual;
};

export type MarketplaceCard = {
  icon: string;
  title: Bilingual;
  sub: Bilingual;
  discount: Bilingual;
};

export type SocialGalleryImage = {
  alt: Bilingual;
  /** Primary URL first, then alternates; `SafeImage` appends a local SVG fallback. */
  sources: readonly string[];
};
