import type { DefaultTheme } from "styled-components";
import type { VariantProps, ThemeVariantType } from "./theme.types";

export interface ThemeProps extends VariantProps {
  theme: DefaultTheme;
}

export type VariantValues = {
  [key in ThemeVariantType]: (props: ThemeProps) => string;
};

export interface ThemeVariantValue extends ThemeProps {
  value: number;
}

export interface ThemeColorValue {
  theme: DefaultTheme;
  color: string;
  value: number;
}
