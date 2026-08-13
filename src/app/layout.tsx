import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { DeployFreshness } from "@/components/layout/DeployFreshness";
import { FloatingCTACluster } from "@/components/layout/FloatingCTACluster";
import { Footer } from "@/components/layout/Footer";
import { NewsletterSignupModal } from "@/components/layout/NewsletterSignupModal";
import { Nav } from "@/components/layout/Nav";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { getDeployId, PALETTE_INLINE_CSS } from "@/lib/deploy-id";
import { LanguageProvider, siteMeta } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const rubik = Rubik({
  subsets: ["hebrew", "latin", "latin-ext"],
  variable: "--font-rubik",
  weight: "variable",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteMeta.title.he,
    template: "%s | MammyZone",
  },
  description: siteMeta.description.he,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    alternateLocale: ["en_US"],
    siteName: "MammyZone",
    title: siteMeta.title.he,
    description: siteMeta.description.he,
    images: [
      {
        url: "/photos/pregnancy-beach-salute.jpg",
        alt: "אורטל חזן בהריון — יוגה מול הים",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title.he,
    description: siteMeta.description.he,
    images: ["/photos/pregnancy-beach-salute.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const deployId = getDeployId();
  return (
    <html
      lang="he"
      dir="rtl"
      className={rubik.variable}
      data-build={deployId}
      suppressHydrationWarning
    >
      <body className={`${rubik.className} antialiased`}>
        <style
          id="mz-palette"
          dangerouslySetInnerHTML={{ __html: PALETTE_INLINE_CSS }}
        />
        <DeployFreshness deployId={deployId} />
        <span
          hidden
          aria-hidden
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: A mother rests in a warm lilac courtyard — dusty purple, light turquoise — then books. Softer than cream-and-pink, still quiet.
OWN-WORLD: Lilac-warm field, purple accent, turquoise secondary. Rubik. Rounded pills. Quiet vine lattice. Marks instead of emoji.
STORY: Ortal holds body, mind, and space as one practice. Believe the pace; book or write.
FIRST VIEWPORT: Cream copy column, sun photograph with a faint lattice, glass name plaque.
FORM: Pastel courtyard quiet pass over grounded direction 4. Seed key a4cd0422.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`,
          }}
        />
        <LanguageProvider>
          <ScrollProgress />
          <Nav />
          {children}
          <Footer />
          <FloatingCTACluster />
          <NewsletterSignupModal />
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
