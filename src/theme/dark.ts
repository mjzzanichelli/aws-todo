import { DefaultTheme } from "styled-components";
import { invert } from "polished";
import { LightTheme } from "./light";

export const DarkTheme: DefaultTheme = {
  ...LightTheme,
  mode: "dark",
  textColor: LightTheme.bgColor,
  bgColor: LightTheme.textColor,
  variantColors: {
    ...LightTheme.variantColors,
    warning: {
      ...LightTheme.variantColors.warning,
      bg: LightTheme.textColor,
    },
    off: {
      ...LightTheme.variantColors.off,
      text: invert(LightTheme.variantColors.off.text),
    },
    disabled: {
      ...LightTheme.variantColors.disabled,
      text: invert(LightTheme.variantColors.disabled.text),
    },
  },
};
