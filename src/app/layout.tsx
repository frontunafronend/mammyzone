import type { Metadata } from "next";
import { DM_Sans, Heebo } from "next/font/google";
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

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  weight: "variable",
  style: ["normal", "italic"],
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
      className={`${heebo.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
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
