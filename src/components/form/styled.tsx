import styled, { css } from "styled-components";
import { variantBgColor, variantTextColor } from "../../theme/variants";
import { borderColor, borderRadius } from "../../utils/styles";
import { getCharCode, iconPseudo } from "../icon/styled";
import { InputProps } from "./types";
import { IconProps } from "../icon/types";
import { VariantProps } from "../../theme/theme.types";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const StyledFieldComponent = styled.label.withConfig({
  shouldForwardProp: (prop) => {
    return !["variant"].includes(prop);
  },
})<VariantProps>`
  display: flex;
  flex-direction: column;
  & + label {
    margin-top: 1rem;
  }

  color: ${(props) => variantTextColor(props)};

  input,
  select,
  textarea {
    box-sizing: border-box;
  }

  textarea {
    min-height: 9rem;
  }

  & + p[data-testid="error-message"] {
    color: ${({ theme }) => variantTextColor({ theme, variant: "error" })};
    margin: 0;
    line-height: 2;
  }
`;

export const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) => {
    return !["fullWidth", "iconName", "iconRotate", "variant"].includes(prop);
  },
})<InputProps>`
  ${({ fullWidth, ...props }) => {
    const offColor = variantTextColor({ ...props, variant: "off" });
    const activeColor = variantTextColor(props);
    const bgColor = variantBgColor({ ...props, variant: "default" });
    const textColor = variantTextColor({ ...props, variant: "default" });
    return css`
      ${borderRadius()};
      outline: none;
      ${borderColor(offColor)};
      background-color: ${bgColor};
      color: ${textColor};
      &:focus {
        border-color: ${activeColor};
      }
      ${fullWidth && "width: 100%;"}
    `;
  }}
  padding: 0.45rem 1rem;
`;

export const StyledInputContainer = styled.div.withConfig({
  shouldForwardProp: (props) => !["name", "rotate", "variant"].includes(props),
})<VariantProps & Partial<IconProps>>`
  ${(props) => {
    if (!props.name) return;

    return css`
      position: relative;
      ${iconPseudo(props)}
      &:before {
        position: absolute;
        top: 50%;
        transform: translate(1rem, -50%);
      }

      & > input {
        padding-left: 2.5rem;
      }
    `;
  }}
`;

export const StyledCheckbox = styled.input.withConfig({
  shouldForwardProp: (props) => !["variant"].includes(props),
})<VariantProps>`
  width: 1.25rem;
  height: 1.25rem;
  appearance: none;
  ${borderRadius()}
  cursor: pointer;
  line-height: 1;
  font-size: 0.75rem;
  font-style: normal;
  display: inline-flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 0;
  ${(props) => {
    const strokeColor = variantTextColor({ ...props, variant: "default" });
    const bgColor = variantTextColor(props);
    return css`
      ${borderColor(strokeColor)}
      color: transparent;
      &:checked {
        background-color: ${bgColor};
        color: ${strokeColor};
      }
    `;
  }}
  &:before {
    font-family: customicons !important;
    font-style: normal;
    text-rendering: optimizeLegibility;
    content: "${getCharCode("check")}";
  }
`;

StyledCheckbox.defaultProps = {
  type: "checkbox",
};
