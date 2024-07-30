import { createContext, useCallback, useContext, useState } from "react";
import { LightTheme } from "../theme/light";
import { DarkTheme } from "../theme/dark";
import { ThemeMode } from "../theme/theme.types";
import { DefaultTheme, useTheme } from "styled-components";

let preferedTheme: ThemeMode | null = null;
if (matchMedia) {
  preferedTheme = matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : null;
}

const themeMode = localStorage.getItem("theme") || preferedTheme;
const defaultTheme =
  [LightTheme, DarkTheme].find((item) => item.mode === themeMode) || LightTheme;

export function getNextTheme(theme: DefaultTheme) {
  return theme === DarkTheme ? LightTheme : DarkTheme;
}

export const ThemeContext = createContext({
  theme: defaultTheme,
  switchTheme: () => {},
});

export function useThemeSwitch() {
  const { theme: defaultTheme } = useContext(ThemeContext);
  const [theme, setTheme] = useState(defaultTheme);

  const switchTheme = useCallback(() => {
    return setTheme((previous) => {
      const next = getNextTheme(previous);
      localStorage.setItem("theme", next.mode);
      return next;
    });
  }, [setTheme]);

  return { theme, switchTheme };
}
