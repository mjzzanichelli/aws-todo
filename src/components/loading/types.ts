import { SVGAttributes } from "react";

export enum LoadingSize {
  Xs = "xs",
  Sm = "sm",
  Md = "md",
  Lg = "lg",
  Xl = "xl",
}

export interface LoadingProps extends SVGAttributes<SVGElement> {
  size?: LoadingSize;
  color?: string;
}
