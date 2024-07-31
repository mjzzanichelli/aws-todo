import { DefaultTheme } from "styled-components";
import { DarkColor, LightColor } from "./variants";

export const LightTheme: DefaultTheme = {
  mode: "light",
  fontSize: 12,
  sizes: {
    xs: 0,
    sm: 300,
    md: 660,
    lg: 980,
    xl: 1240,
  },
  textColor: DarkColor,
  bgColor: LightColor,
  variantColors: {
    primary: { text: "#00C495", bg: "bgColor" },
    secondary: { text: "#40A4FF", bg: "bgColor" },
    tertiary: { text: "#CA2C87", bg: "bgColor" },
    quaternary: { text: "#1A5767", bg: "bgColor" },
    off: { text: "#d5caca", bg: "textColor" },
    disabled: { text: "#7B7B7B", bg: "bgColor" },
    success: { text: "#72b945", bg: "bgColor" },
    warning: { text: "#f7ce84", bg: "textColor" },
    error: { text: "#ed4c4c", bg: "bgColor" },
  },
  tags: {
    Urgent: { text: DarkColor, bg: "#FFEEB4" },
    High: { text: DarkColor, bg: "#FFB4DC" },
    Medium: { text: DarkColor, bg: "#FFEEB4" },
    Low: { text: DarkColor, bg: "#DDDDDD" },
    NotUrgent: { text: DarkColor, bg: "#DDDDDD" },
  },
};
