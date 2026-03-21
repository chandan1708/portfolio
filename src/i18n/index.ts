import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";

// All translation resources - English is the base, others will be loaded dynamically
const resources: Record<string, { translation: typeof en }> = {
  EN: { translation: en },
};

// We'll populate translations at runtime via addResourceBundle
i18n.use(initReactI18next).init({
  resources,
  lng: "EN",
  fallbackLng: "EN",
  interpolation: {
    escapeValue: false,
  },
});

// Dynamic translation loader - loads JSON files on demand
const translationCache = new Map<string, boolean>();

export async function loadLanguage(code: string): Promise<void> {
  if (code === "EN" || translationCache.has(code)) {
    i18n.changeLanguage(code);
    return;
  }

  try {
    const modules = import.meta.glob("./*.json");
    const key = `./${code.toLowerCase()}.json`;
    if (modules[key]) {
      const mod = (await modules[key]()) as { default: typeof en };
      i18n.addResourceBundle(code, "translation", mod.default, true, true);
      translationCache.set(code, true);
    }
  } catch {
    // fallback to English
  }
  i18n.changeLanguage(code);
}

export default i18n;
