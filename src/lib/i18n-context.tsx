"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/types";

/** Same as `Locale` — site language code. */
export type Language = Locale;

export type LanguageContextValue = {
  language: Locale;
  setLanguage: (language: Locale) => void;
  toggleLanguage: () => void;
};

export const LanguageContext = createContext<LanguageContextValue | null>(
  null,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Locale>("he");

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language === "he" ? "he" : "en";
    root.dir = language === "he" ? "rtl" : "ltr";
    /* Reference HTML toggles English typography on <body> */
    document.body.classList.toggle("lang-en", language === "en");
  }, [language]);

  const toggleLanguage = useCallback(
    () => setLanguage((prev) => (prev === "he" ? "en" : "he")),
    [],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
    }),
    [language, toggleLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
