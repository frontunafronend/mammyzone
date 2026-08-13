import type { Metadata } from "next";
import { SoftWellnessBackground } from "@/components/backgrounds/SoftWellnessBackground";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { PageShell } from "@/components/layout/PageShell";
import { galleryPage } from "@/lib/i18n";
import { galleryJsonLd, studioGalleryItems } from "@/lib/media/gallery";
import { absoluteUrl } from "@/lib/site-url";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  const url = absoluteUrl("/gallery");
  return {
    title: galleryPage.metaTitle.he.replace(/\s*[—–-]\s*MammyZone\s*$/i, "").trim(),
    description: galleryPage.metaDescription.he,
    alternates: { canonical: "/gallery" },
    openGraph: {
      url,
      title: galleryPage.metaTitle.he,
      description: galleryPage.metaDescription.he,
      locale: "he_IL",
      siteName: "MammyZone",
      images: [{ url: "/photos/pregnancy-beach-salute.jpg", alt: galleryPage.title.he }],
    },
    twitter: {
      card: "summary_large_image",
      title: galleryPage.metaTitle.en,
      description: galleryPage.metaDescription.en,
      images: ["/photos/pregnancy-beach-salute.jpg"],
    },
  };
}

export default function GalleryPage() {
  const url = absoluteUrl("/gallery");
  const imageUrls = studioGalleryItems
    .filter((item) => item.kind === "photo")
    .map((item) => absoluteUrl(item.src));
  const jsonLd = galleryJsonLd(url, imageUrls);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="gallery-page">
        <SoftWellnessBackground showBotanical={false} />
        <PageShell withNavOffset className="relative z-[1] py-14 md:py-20">
          <header className="gallery-page__head">
            <p className="section-label">
              <span className="he">{galleryPage.label.he}</span>
              <span className="en">{galleryPage.label.en}</span>
            </p>
            <h1 className="section-title">
              <span className="he">
                {galleryPage.titleLine1.he} <em>{galleryPage.titleEm.he}</em>
              </span>
              <span className="en">
                {galleryPage.titleLine1.en} <em>{galleryPage.titleEm.en}</em>
              </span>
            </h1>
            <p className="section-sub gallery-page__sub">
              <span className="he">{galleryPage.sub.he}</span>
              <span className="en">{galleryPage.sub.en}</span>
            </p>
          </header>
          <GalleryExperience items={studioGalleryItems} layout="full" />
        </PageShell>
      </section>
    </main>
  );
}
