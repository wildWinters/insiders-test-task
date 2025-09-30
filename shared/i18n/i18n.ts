"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en/translation.json" assert { type: "json" };
import ukr from "./ukr/translation.json" assert { type: "json" };

try {
  i18n.use(LanguageDetector).use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    supportedLngs: ["en", "ukr"],
    debug: process.env.NODE_ENV === "development",
    resources: {
      en: { translation: en as unknown as Record<string, unknown> },
      ukr: { translation: ukr as unknown as Record<string, unknown> },
    },
    ns: ["translation"],
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

} catch (error) {
}


export default i18n;
