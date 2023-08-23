import { createContext } from "react";

export const LangContext = createContext<{
  lang: "en" | "vi";
  changeLang: (lang: "en" | "vi") => void;
}>({
  lang: "en",
  changeLang: () => {},
});
