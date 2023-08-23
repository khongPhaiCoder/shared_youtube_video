import { LocalStorage } from "@/utils/localStorage";
import { ThemeMode, darkTheme, lightTheme } from "@/utils/themes";
import { useCallback, useEffect, useMemo, useState } from "react";

type Mode = "light" | "dark";

export const useDarkMode = () => {
  const [theme, setTheme] = useState<Mode>("light");
  const [mountedComponent, setMountedComponent] = useState<boolean>(false);

  const setMode = useCallback((mode: Mode) => {
    LocalStorage.set("theme", mode);
    setTheme(mode);
  }, []);

  const themeToggle = useCallback(() => {
    theme === "light" ? setMode("dark") : setMode("light");
  }, [theme]);

  const themeMode: ThemeMode = useMemo(
    () => (theme === "light" ? lightTheme : darkTheme),
    [theme]
  );

  useEffect(() => {
    const localTheme = LocalStorage.get("theme");
    localTheme ? setTheme(localTheme) : setMode("light");
    setMountedComponent(true);
  }, []);

  return { theme, themeToggle, mountedComponent, themeMode };
};
