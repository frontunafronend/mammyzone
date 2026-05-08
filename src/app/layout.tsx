import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Heebo } from "next/font/google";
import { LocaleProvider } from "@/components/layout/LocaleProvider";
import { Nav } from "@/components/layout/Nav";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { siteMeta } from "@/lib/i18n";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  adjustFontFallback: true,
  fallback: ["Georgia", "Times New Roman", "Times", "serif"],
  preload: true,
});

const heebo = Heebo({
  subsets: ["hebrew", "latin", "latin-ext"],
  variable: "--font-heebo",
  weight: "variable",
  display: "swap",
  adjustFontFallback: true,
  fallback: [
    "Segoe UI",
    "Segoe UI Hebrew",
    "Arial Hebrew",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
  adjustFontFallback: true,
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
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
      className={`${cormorant.variable} ${heebo.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <LocaleProvider>
          <RevealObserver />
          <Nav />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
