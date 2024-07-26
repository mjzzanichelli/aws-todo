import { HTMLAttributes } from "react";
import { CSSProperties } from "styled-components";

export interface FlexContainerProps extends HTMLAttributes<HTMLDivElement> {
  flexDirection?: CSSProperties["flexDirection"];
  flexWrap?: CSSProperties["flexWrap"];
  display?: CSSProperties["display"];
  mobileDirection?: CSSProperties["flexDirection"];
  mobileWidth?: CSSProperties["maxWidth"];
  padding?: boolean | CSSProperties["padding"];
  margin?: boolean | CSSProperties["margin"];
  boxShadow?: boolean | CSSProperties["boxShadow"];
  centered?: boolean;
}

export interface FlexBoxProps extends FlexContainerProps {
  size?: CSSProperties["flex"];
  mobileSize?: CSSProperties["flex"];
}
