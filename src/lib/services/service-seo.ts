import type { Metadata } from "next";
import { absoluteUrl, siteUrl } from "@/lib/site-url";
import type { ServiceFaqItem, ServicePageDefinition, ServicePageSlug } from "./service-pages";
import { getServiceDefinition } from "./service-pages";

/** Root layout uses `template: "%s | MammyZone"` — strip trailing brand from copy. */
function titleForDocument(t: string) {
  return t.replace(/\s*[—–-]\s*MammyZone\s*$/i, "").trim() || t;
}

function primaryHeroImageUrl(sources: readonly string[]) {
  return sources.find((s) => s.startsWith("http"));
}

export function generateServiceMetadata(slug: ServicePageSlug): Metadata {
  const d = getServiceDefinition(slug);
  const path = `/${slug}`;
  const url = absoluteUrl(path);
  const titleHe = titleForDocument(d.metaTitle.he);
  const titleEn = titleForDocument(d.metaTitle.en);
  const heroImg = primaryHeroImageUrl(d.heroVisual.sources);
  return {
    title: titleHe,
    description: d.metaDescription.he,
    alternates: { canonical: path },
    openGraph: {
      url,
      title: titleHe,
      description: d.metaDescription.he,
      locale: "he_IL",
      siteName: "MammyZone",
      ...(heroImg
        ? {
            images: [{ url: heroImg, alt: titleHe }],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: titleEn,
      description: d.metaDescription.en,
      ...(heroImg ? { images: [heroImg] } : {}),
    },
  };
}

export function buildServiceJsonLd(d: ServicePageDefinition): string {
  const base = siteUrl.replace(/\/$/, "");
  const pageUrl = `${base}/${d.slug}`;
  const heroImg = primaryHeroImageUrl(d.heroVisual.sources);
  const obj = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: d.schemaName.he,
    alternateName: d.schemaName.en,
    description: d.metaDescription.he,
    url: pageUrl,
    serviceType: d.schemaServiceType,
    areaServed: { "@type": "Country", name: "Israel" },
    provider: {
      "@type": "Organization",
      name: "MammyZone",
      url: base,
    },
    ...(heroImg ? { image: [heroImg] } : {}),
  };
  return JSON.stringify(obj);
}

export function buildServiceFaqJsonLd(faqs: ServiceFaqItem[], pageUrl: string): string {
  const obj = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q.he,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a.he,
      },
    })),
    url: pageUrl,
  };
  return JSON.stringify(obj);
}
