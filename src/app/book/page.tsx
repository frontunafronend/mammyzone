import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { OrganicTextureBackground } from "@/components/backgrounds/OrganicTextureBackground";
import { SoftWellnessBackground } from "@/components/backgrounds/SoftWellnessBackground";
import { PageShell } from "@/components/layout/PageShell";
import { bookingCopy } from "@/lib/booking/copy";
import { absoluteUrl } from "@/lib/site-url";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  const url = absoluteUrl("/book");
  return {
    title: bookingCopy.metaTitle.he,
    description: bookingCopy.metaDescription.he,
    alternates: { canonical: "/book" },
    openGraph: {
      url,
      title: bookingCopy.metaTitle.he,
      description: bookingCopy.metaDescription.he,
      locale: "he_IL",
    },
    twitter: {
      card: "summary_large_image",
      title: bookingCopy.metaTitle.en,
      description: bookingCopy.metaDescription.en,
    },
  };
}

export default function BookPage() {
  return (
    <main className="page-root page-root--book">
      <header className="book-hero relative overflow-hidden">
        <SoftWellnessBackground showBotanical={false} />
        <OrganicTextureBackground />
        <PageShell withNavOffset className="book-hero__inner relative z-[1]">
          <p className="book-hero__eyebrow">
            <span className="he">{bookingCopy.heroEyebrow.he}</span>
            <span className="en">{bookingCopy.heroEyebrow.en}</span>
          </p>
          <h1 className="book-hero__title font-display">
            <span className="he">{bookingCopy.heroTitle.he}</span>
            <span className="en">{bookingCopy.heroTitle.en}</span>
          </h1>
          <p className="book-hero__sub">
            <span className="he">{bookingCopy.heroSub.he}</span>
            <span className="en">{bookingCopy.heroSub.en}</span>
          </p>
        </PageShell>
      </header>
      <PageShell withNavOffset className="book-main-shell">
        <BookingWizard />
      </PageShell>
    </main>
  );
}
