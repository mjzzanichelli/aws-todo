export type DefaultVariant = "default";

export type VariantType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "off"
  | "disabled"
  | "success"
  | "warning"
  | "error";

export type ThemeVariantType = VariantType | DefaultVariant;

export interface VariantProps {
  variant?: ThemeVariantType;
}

export type ThemeColorType = "bgColor" | "textColor";

export type VariantColorType = {
  text: ThemeColorType | string;
  bg: ThemeColorType | string;
};

export type ThemeVariants = {
  [key in VariantType]: VariantColorType;
};

export type ThemeMode = "light" | "dark";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    mode: ThemeMode;
    sizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    fontSize: number;
    textColor: string;
    bgColor: string;
    variantColors: ThemeVariants;
  }
}
