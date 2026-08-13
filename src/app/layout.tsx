import type { Metadata } from "next";
import { Archivo, Heebo, Karantina } from "next/font/google";
import { FloatingCTACluster } from "@/components/layout/FloatingCTACluster";
import { Footer } from "@/components/layout/Footer";
import { NewsletterSignupModal } from "@/components/layout/NewsletterSignupModal";
import { Nav } from "@/components/layout/Nav";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { LanguageProvider, siteMeta } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin", "latin-ext"],
  variable: "--font-heebo",
  weight: "variable",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

const karantina = Karantina({
  subsets: ["hebrew", "latin"],
  weight: ["400", "700"],
  variable: "--font-karantina",
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
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title.he,
    description: siteMeta.description.he,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${archivo.variable} ${karantina.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <span
          hidden
          aria-hidden
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: Sit in the courtyard shade and look into noon — a mother rests under the vine, then books. Refuses the cream/blush wellness split-hero.
OWN-WORLD: Limestone field, indigo pergola shade, bougainvillea magenta, terracotta clay. Karantina wall type in Hebrew, Archivo in English, Heebo body. Rooms not cards; lattice light is the material.
STORY: Ortal holds body, mind, and space as one practice. Believe the pace; book or write.
FIRST VIEWPORT: Indigo shade column with wall-scale title and clay CTA; noon photograph under a drifting vine lattice; terracotta name plaque on the sun side.
FORM: Mediterranean courtyard at noon. Grounded list index 4. Seed key a4cd0422.
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
