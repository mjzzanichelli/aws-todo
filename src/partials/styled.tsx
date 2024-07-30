import styled, { css } from "styled-components";
import { FlexBox } from "../components/layout/styled";

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

export const StyledMenu = styled(FlexBox)``;

StyledMenu.defaultProps = {
  size: "none",
};
