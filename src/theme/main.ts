import { LightTheme } from "../theme/light";
import { DarkTheme } from "../theme/dark";
import { ThemeMode } from "../theme/theme.types";
import { DefaultTheme } from "styled-components";

let preferedTheme: ThemeMode | null = null;
if (matchMedia) {
  preferedTheme = matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : null;
}

const themeMode = localStorage.getItem("theme") || preferedTheme;
export const defaultTheme =
  [LightTheme, DarkTheme].find((item) => item.mode === themeMode) || LightTheme;

export function getNextTheme(theme: DefaultTheme) {
  return theme === DarkTheme ? LightTheme : DarkTheme;
}
