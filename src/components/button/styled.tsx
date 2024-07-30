import styled, { css } from "styled-components";
import { ButtonProps } from "./types";
import { VariantProps } from "../../theme/theme.types";
import {
  darkenColor,
  darkenVariantTextColor,
  lightenColor,
  variantBgColor,
  variantTextColor,
} from "../../theme/variants";
import { borderRadius, borderColor as makeBorderColor } from "../../utils/styles";

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["outlined", "variant", "noBorder", "off", "preventDefault"].includes(
      prop
    ),
})<ButtonProps & VariantProps>`
  padding: 0.25rem 0.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  line-height: 1;
  font-size: 1rem;
  font-weight: normal;
  letter-spacing: 0.03em;
  ${borderRadius()}

  & > label {
    display: inline-block;
    flex: 1;
  }

  & > i {
    font-size: 1.2rem;
    font-weight: normal;
    flex: none;
  }

  & > i + label,
  & > label + i {
    margin-left: 0.25rem;
  }

  ${({ outlined, disabled, noBorder, off, ...props }) => {
    const { theme } = props;
    const textColor = outlined
      ? variantTextColor(props)
      : variantBgColor(props);
    const offColor = off && variantTextColor({ ...props, variant: "off" });
    const backColor = outlined ? "transparent" : variantTextColor(props);
    const borderColor = darkenVariantTextColor({ ...props, value: 0.1 });
    const bgColor = variantBgColor(props);

    const hoverTextColor = lightenColor({
      theme,
      value: 0.1,
      color: offColor ? bgColor : textColor,
    });

    const hoverBgColor = lightenColor({
      theme,
      value: 0.1,
      color: offColor ? borderColor : backColor,
    });

    const hoverBorderColor = lightenColor({
      theme,
      value: 0.1,
      color: borderColor,
    });

    const activeTextColor = darkenColor({
      theme,
      value: 0.1,
      color: offColor ? bgColor : textColor,
    });

    const activeBgColor = darkenColor({
      theme,
      value: 0.1,
      color: offColor ? borderColor : backColor,
    });

    const activeBorderColor = darkenColor({
      theme,
      value: 0.1,
      color: borderColor,
    });

    return css`
      color: ${textColor};
      background-color: ${offColor || backColor};
      ${noBorder ? "border: none;" : makeBorderColor(borderColor)}
      &:not([disabled]) {
        cursor: pointer;
        & > label {
          cursor: pointer;
        }
        &:hover {
          color: ${hoverTextColor};
          background-color: ${hoverBgColor};
          ${!noBorder && `border-color: ${hoverBorderColor};`}
        }
        &:active {
          color: ${activeTextColor};
          background-color: ${activeBgColor};
          ${!noBorder && `border-color: ${activeBorderColor};`}
        }
      }
    `;
  }}
`;
