import { forwardRef } from "react";
import { ButtonProps } from "./types";
import { StyledButton } from "./styled";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (args, ref) => {
    const { preventDefault = true, onClick, disabled, type, ...others } = args;
    let { variant, ...props } = others;
    variant = disabled ? "disabled" : variant;
    if (!variant && !disabled && type === "submit") variant = "tertiary";
    variant = variant || "default";
    const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      if (preventDefault) e.preventDefault();
      return onClick && onClick(e);
    };
    return (
      <StyledButton
        disabled={disabled}
        variant={variant}
        ref={ref}
        type={type}
        onClick={handleOnClick}
        {...props}
      />
    );
  }
);
