import type { DefaultTheme } from "styled-components";
import { darken, lighten } from "polished";
import { ThemeColorType, VariantType } from "./theme.types";
import {
  ThemeColorValue,
  ThemeProps,
  ThemeVariantValue,
  VariantValues,
} from "./styled.types";

export const LightColor = "#DADADA";
export const DarkColor = "#202020";

export function isThemeColorType(
  val: string | ThemeColorType
): val is ThemeColorType {
  const themeTypes: ThemeColorType[] = ["textColor", "bgColor"];
  const type = themeTypes.find((item) => item === val);
  return !!type;
}

export function themeTextColor(theme: DefaultTheme, variant: VariantType) {
  const { text } = theme.variantColors[variant];
  return isThemeColorType(text) ? theme[text] : text;
}

export function themeBgColor(theme: DefaultTheme, variant: VariantType) {
  const { bg } = theme.variantColors[variant];
  return isThemeColorType(bg) ? theme[bg] : bg;
}

export function themeVariant(values: VariantValues) {
  return function (props: ThemeProps) {
    const { variant = "default", theme } = props;
    return values[variant]({ theme });
  };
}

export function getVariantValues(
  defaultType: ThemeColorType,
  variantFn: typeof themeTextColor | typeof themeBgColor
) {
  return themeVariant({
    default: ({ theme }: ThemeProps) => theme[defaultType],
    primary: ({ theme }: ThemeProps) => variantFn(theme, "primary"),
    secondary: ({ theme }: ThemeProps) => variantFn(theme, "secondary"),
    tertiary: ({ theme }: ThemeProps) => variantFn(theme, "tertiary"),
    quaternary: ({ theme }: ThemeProps) => variantFn(theme, "quaternary"),
    off: ({ theme }: ThemeProps) => variantFn(theme, "off"),
    disabled: ({ theme }: ThemeProps) => variantFn(theme, "disabled"),
    success: ({ theme }: ThemeProps) => variantFn(theme, "success"),
    warning: ({ theme }: ThemeProps) => variantFn(theme, "warning"),
    error: ({ theme }: ThemeProps) => variantFn(theme, "error"),
  });
}

export const variantTextColor = getVariantValues("textColor", themeTextColor);
export const variantBgColor = getVariantValues("bgColor", themeBgColor);

export function lightenColor({ theme, color, value }: ThemeColorValue) {
  const fn = theme.mode === "light" ? lighten : darken;
  return fn(value, color);
}

export function darkenColor({ theme, color, value }: ThemeColorValue) {
  const fn = theme.mode === "dark" ? lighten : darken;
  return fn(value, color);
}

export function lightenVariantTextColor({
  theme,
  variant,
  value,
}: ThemeVariantValue) {
  const color = variantTextColor({ theme, variant });
  return lightenColor({ theme, color, value });
}

export function darkenVariantTextColor({
  theme,
  variant,
  value,
}: ThemeVariantValue) {
  const color = variantTextColor({ theme, variant });
  return darkenColor({ theme, color, value });
}

export function lightenVariantBgColor({
  theme,
  variant,
  value,
}: ThemeVariantValue) {
  const color = variantBgColor({ theme, variant });
  return lightenColor({ theme, color, value });
}

export function darkenVariantBgColor({
  theme,
  variant,
  value,
}: ThemeVariantValue) {
  const color = variantBgColor({ theme, variant });
  return darkenColor({ theme, color, value });
}
