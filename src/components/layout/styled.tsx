import styled, { css } from "styled-components";
import { ThemeProps } from "../../theme/styled.types";
import {
  boxShadow as makeBoxShadow,
  backgrounMixin,
  borderRadius,
  minWidthPx,
  sizeMixin,
} from "../../utils/styles";
import { FlexBoxProps, FlexContainerProps } from "./types";
export const containerProps = [
  "display",
  "flexDirection",
  "flexWrap",
  "padding",
  "margin",
  "mobileDirection",
  "mobileWidth",
  "boxShadow",
  "centered",
];

export const boxProps = [...containerProps, "size", "mobileSize"];

export function flexMixin({
  display,
  flexDirection,
  flexWrap,
  mobileDirection,
  padding,
  margin,
  boxShadow,
  centered,
  mobileWidth = minWidthPx,
}: ThemeProps &
  Pick<
    FlexContainerProps,
    | "flexDirection"
    | "flexWrap"
    | "display"
    | "mobileDirection"
    | "padding"
    | "margin"
    | "boxShadow"
    | "centered"
    | "mobileWidth"
  >) {
  return css`
    ${padding && `padding: ${padding === true ? "0.5rem" : padding};`}
    ${margin && `margin: ${margin === true ? "0.5rem" : margin};`}
    ${display && `display: ${display};`}
    ${flexDirection && `flex-direction: ${flexDirection};`}
    ${flexWrap && `flex-wrap: ${flexWrap};`}
    ${boxShadow && boxShadow === true
      ? makeBoxShadow()
      : boxShadow && `box-shadow:${boxShadow};`}
    ${centered &&
    `justify-content: center;
    justify-items: center;
    align-content: center;
    align-items: center;`}
    ${mobileDirection &&
    `@media (max-width: ${mobileWidth}) {
        flex-direction: ${mobileDirection};
      }`}
  `;
}

export const FlexContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => {
    return !containerProps.includes(prop);
  },
})<FlexContainerProps>`
  ${({
    display = "flex",
    flexDirection = "row",
    mobileDirection = "column",
    flexWrap = "nowrap",
    ...props
  }) => {
    return flexMixin({
      display,
      flexDirection,
      flexWrap,
      mobileDirection,
      ...props,
    });
  }}}
`;

export const FlexContainerCentered = styled(FlexContainer)``;

FlexContainerCentered.defaultProps = {
  flexDirection: "column",
  centered: true,
};

export const FlexBox = styled.div.withConfig({
  shouldForwardProp: (prop) => {
    return !boxProps.includes(prop);
  },
})<FlexBoxProps>`
  ${({ size = 1, mobileSize = "none", mobileWidth = minWidthPx, ...props }) => {
    return css`
      flex: ${size};
      ${flexMixin({ ...props, mobileWidth })}
      ${String(mobileSize) &&
      `@media (max-width: ${mobileWidth}) {
          flex: ${mobileSize};
        }`}
    `;
  }}
`;

export const FlexBoxShadow = styled(FlexBox)`
  ${borderRadius()}
  ${backgrounMixin()}
  & > h3 {
    margin: 0;
  }
`;

FlexBoxShadow.defaultProps = {
  boxShadow: true,
  margin: true,
  padding: "1rem",
};

export const FlexBoxCentered = styled(FlexBox)``;

FlexBoxCentered.defaultProps = {
  display: "flex",
  flexDirection: "column",
  centered: true,
};

export const FlexBoxResizable = styled(FlexBox)`
  overflow: hidden;
`;

export const StyledAppContainer = styled(FlexContainer)`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const AppBody = styled(FlexBox)`
  max-width: ${(props) => sizeMixin(props.theme.sizes.xl)};
  width: 100%;
`;

AppBody.defaultProps = {
  margin: "1rem auto",
  padding: "0 1rem",
};
