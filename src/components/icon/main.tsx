import { forwardRef } from "react";
import { IconProps } from "./types";
import { StyledFeatherIcon } from "./styled";

export const Icon = forwardRef<HTMLElement, IconProps>((props, ref) => {
  const { name, title } = props;
  return (
    <StyledFeatherIcon
      ref={ref}
      {...props}
      title={title || ""}
      data-iconname={name}
    />
  );
});
