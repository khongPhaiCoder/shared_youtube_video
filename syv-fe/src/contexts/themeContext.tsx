import { createContext } from "react";

export const ThemeContext = createContext<{
  theme: "light" | "dark";
  themeToggle?: () => void;
}>({
  theme: "light",
  themeToggle: () => {},
});
