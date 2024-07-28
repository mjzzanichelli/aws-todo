import styled from "styled-components";
import { VariantElementProps } from "../../utils/types";
import { shadow, sizeMixin } from "../../utils/styles";
import {
  darkenVariantTextColor,
  variantBgColor,
  variantTextColor,
} from "../../theme/variants";

export const StyledBox = styled.div.withConfig({
  shouldForwardProp: (prop) => !["variant"].includes(prop),
})<VariantElementProps<HTMLDivElement>>`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 0.6rem);
  overflow: hidden;
  box-shadow: 0 0 0.25rem 0 ${shadow};
  border-radius: 0.5rem;
  border: 0.3rem solid ${(props) => variantTextColor(props)};
  min-height: ${({ theme }) => sizeMixin((theme.sizes.sm / 4) * 3)};
  position: relative;
`;

export const StyledBoxHeader = styled.div.withConfig({
  shouldForwardProp: (prop) => !["variant"].includes(prop),
})<VariantElementProps<HTMLDivElement>>`
  flex: none;
  display: flex;
  padding: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem 0 ${shadow};
  background-color: ${(props) => variantTextColor(props)};
  color: ${(props) => variantBgColor(props)};
`;

export const StyledBoxTitle = styled.label.withConfig({
  shouldForwardProp: (prop) => !["variant"].includes(prop),
})<VariantElementProps<HTMLLabelElement>>`
  flex: 1;
  font-size: 1rem;
  line-height: 2;
  text-align: left;
  vertical-align: middle;
  display: inline-block;
`;

export const StyledBoxTools = styled.div.withConfig({
  shouldForwardProp: (prop) => !["variant"].includes(prop),
})<VariantElementProps>`
  flex: none;
  button + button {
    margin-left: 0.25rem;
    &:last-child {
      position: relative;
      margin-left: 1rem;
      &:after {
        content: " ";
        width: 0.125rem;
        height: 2rem;
        background-color: ${(props) =>
          darkenVariantTextColor({ ...props, value: 0.1 })};
        position: absolute;
        left: -0.625rem;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`;

export const StyledBoxBody = styled.div.withConfig({
  shouldForwardProp: (prop) => !["variant"].includes(prop),
})<VariantElementProps<HTMLDivElement>>`
  flex: 1;
  overflow: auto;
  background-color: ${(props) => variantBgColor(props)};
  color: ${(props) => variantTextColor(props)};
`;
