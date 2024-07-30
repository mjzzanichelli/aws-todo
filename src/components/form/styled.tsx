import styled, { css } from "styled-components";
import { variantTextColor } from "../../theme/variants";
import { borderColor, borderRadius } from "../../utils/styles";
import { getCharCode } from "../icon/styled";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const StyledFieldComponent = styled.label`
  display: flex;
  flex-direction: column;
  & + label {
    margin-top: 1rem;
  }

  input,
  select,
  textarea {
    width: 100%;
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

export const StyledCheckbox = styled.input`
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
    const defaultColor = variantTextColor({ ...props, variant: "default" });
    const primaryColor = variantTextColor({ ...props, variant: "primary" });
    return css`
      ${borderColor(defaultColor)}
      color: transparent;
      &:checked {
        background-color: ${primaryColor};
        color: ${defaultColor};
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
