"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Lang = "zh" | "en";

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getPreferredLang(): Lang {
  const saved = window.localStorage.getItem("gallery-lang");
  if (saved === "zh" || saved === "en") return saved;

  return window.navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("zh");

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang);
    window.localStorage.setItem("gallery-lang", nextLang);
    document.documentElement.lang = nextLang === "zh" ? "zh-CN" : "en";
  };

  useEffect(() => {
    setLangState(getPreferredLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem("gallery-lang", lang);
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang(lang === "zh" ? "en" : "zh"),
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

export function T({ zh, en }: { zh: string; en: string }) {
  const { lang } = useI18n();
  return <>{lang === "zh" ? zh : en}</>;
}
