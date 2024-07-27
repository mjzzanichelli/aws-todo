import { VariantProps } from "../../theme/theme.types";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps & {
    outlined?: boolean;
    noBorder?: boolean;
    off?: boolean;
    preventDefault?: boolean;
  };
