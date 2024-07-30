import styled, { css } from "styled-components";
import { FlexBox } from "../components/layout/styled";
import { border, borderRadius } from "../utils/styles";
import { variantTextColor } from "../theme/variants";

export const StyledHeader = styled(FlexBox)`
  ${({ theme }) => {
    return css`
      background-color: ${theme.textColor};
      color: ${theme.bgColor};
    `;
  }}
`;

StyledHeader.defaultProps = {
  as: "header",
  display: "flex",
  size: "none",
  mobileDirection: "row",
  padding: "1rem",
};

export const StyledH1 = styled(FlexBox)`
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0;
`;

StyledH1.defaultProps = {
  as: "h1",
  mobileSize: 1,
};

export const StyledMenu = styled(FlexBox)`
  position: relative;
`;

StyledMenu.defaultProps = {
  size: "none",
  display: "flex",
  centered: true,
  margin: "0 -1rem 0 0",
};

export const StyledUserBubble = styled.span`
  box-sizing: border-box;
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  font-size: 1rem;
  line-height: 2.5;
  ${borderRadius("50%")}
  ${(props) => {
    return css`
      ${border()}
      color:${variantTextColor(props)};
      background-color: ${variantTextColor({ ...props, variant: "secondary" })};
    `;
  }}
  & + button {
    margin: 0 0.5rem;
  }
`;

export const StyledMenuContent = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: -0.5rem;
  transform: translateY(100%);
  padding: 1rem 1rem 0;
  box-sizing: border-box;
  ${borderRadius()}
  ${(props) => {
    return css`
      ${border()}
      color: ${variantTextColor(props)};
      background-color: ${variantTextColor(props)};
    `;
  }}
  button {
    margin: 0 0 1rem 0;
    width: 15rem;
  }
`;
