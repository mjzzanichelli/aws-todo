import { Children } from "react";
import { VariantProps } from "../theme/theme.types";

export interface Properties<T = unknown> {
  [key: string]: T;
}

export type StringNumber = string | number;

export interface JsonProperties<T = never> {
  [key: string]: StringNumber | boolean | null | JsonProperties<T> | undefined | T;
}

export type ChildrenType = Parameters<typeof Children.toArray>["0"];

export type VariantElementProps<T extends HTMLElement = HTMLElement> =
  React.HTMLAttributes<T> & VariantProps;