import { DefaultTheme } from "styled-components";
import { invert } from "polished";
import { LightTheme } from "./light";

export const DarkTheme: DefaultTheme = {
  ...LightTheme,
  name: "dark",
  mode: "dark",
  textColor: LightTheme.bgColor,
  bgColor: LightTheme.textColor,
  variantColors: {
    ...LightTheme.variantColors,
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
