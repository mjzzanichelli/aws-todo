import { DefaultTheme } from "styled-components";
import { DarkColor, LightColor } from "./variants";

export const LightTheme: DefaultTheme = {
  mode: "light",
  fontSize: 14,
  sizes: {
    xs: 0,
    sm: 300,
    md: 660,
    lg: 980,
    xl: 1400,
  },
  textColor: DarkColor,
  bgColor: LightColor,
  variantColors: {
    primary: { text: "#cf8d55", bg: "bgColor" },
    secondary: { text: "#2fa1b0", bg: "bgColor" },
    tertiary: { text: "#CA2C87", bg: "bgColor" },
    quaternary: { text: "#1A5767", bg: "bgColor" },
    off: { text: "#d5caca", bg: "textColor" },
    disabled: { text: "#7B7B7B", bg: "bgColor" },
    success: { text: "#709856", bg: "textColor" },
    warning: { text: "#f7ce84", bg: "textColor" },
    error: { text: "#ed4c4c", bg: "bgColor" },
  },
};
