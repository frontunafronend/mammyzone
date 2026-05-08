import type { Metadata } from "next";
import { DM_Sans, Heebo } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import { Nav } from "@/components/layout/Nav";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { siteMeta } from "@/lib/i18n";
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
  title: siteMeta.title.he,
  description: siteMeta.description.he,
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
          <Nav />
          {children}
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
