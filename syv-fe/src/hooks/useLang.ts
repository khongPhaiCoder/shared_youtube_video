import { changeLanguage } from "@/utils/i18n";
import { LocalStorage } from "@/utils/localStorage";
import { useCallback, useEffect, useState } from "react";

type Lang = "en" | "vi";

export const useLang = () => {
  const [lang, setLang] = useState<Lang>("en");

  const changeLang = useCallback((lang: Lang) => {
    setLang(lang);
    LocalStorage.set("lang", lang);
    changeLanguage(lang);
  }, []);

  useEffect(() => {
    const localLang = LocalStorage.get("lang");
    localLang ? setLang(localLang) : setLang("en");
  }, []);

  return { lang, changeLang };
};
