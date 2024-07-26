import styled from "styled-components";
import { variantTextColor } from "../../theme/variants";
import { blur, borderColor, borderRadius } from "../../utils/styles";
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
  label & {
    width: 2rem;
    height: 2rem;
    appearance: none;
    ${blur()}
    ${borderRadius()}
    cursor: pointer;
    line-height: 1;
    font-size: 1.25rem;
    font-style: normal;
    display: inline-flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    ${({ theme }) =>
      borderColor(variantTextColor({ theme, variant: "primary" }))}
    color: ${({ theme }) => variantTextColor({ theme })};
    &:not(:checked) {
      color: ${({ theme }) => variantTextColor({ theme, variant: "disabled" })};
    }
    &:before {
      font-family: customicons !important;
      font-style: normal;
      text-rendering: optimizeLegibility;
      content: "${getCharCode("xmark")}";
    }

    &:checked:before {
      content: "${getCharCode("check")}";
    }
  }
`;

StyledCheckbox.defaultProps = {
  type: "checkbox",
};
