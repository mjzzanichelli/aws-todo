import type { TagName } from "../tasks/crud";

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

export interface TagProps {
  variant: TagName;
  selected?: boolean;
}

export type ThemeColorType = "bgColor" | "textColor";

export type VariantColorType = {
  text: ThemeColorType | string;
  bg: ThemeColorType | string;
};

export type ThemeVariants = {
  [key in VariantType]: VariantColorType;
};

export type TagVariants = {
  [key in TagName]: VariantColorType;
};

export type ThemeMode = "light" | "dark";

declare module "styled-components" {
  export interface DefaultTheme {
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
    tags: TagVariants;
  }
}
