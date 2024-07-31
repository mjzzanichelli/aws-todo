import styled, { css } from "styled-components";
import { borderColor, borderRadius } from "../utils/styles";
import { TagProps } from "../theme/theme.types";
import { darkenColor, tagBgColor, tagTextColor } from "../theme/variants";
import { FlexBox } from "../components/layout/styled";

export const StyledTasksTableSection = styled(FlexBox)`
  overflow-x: auto;
  & > h3 {
    margin: 2rem 0;
  }
  th {
    font-weight: normal;
  }
`;

StyledTasksTableSection.defaultProps = {
  as: "section",
};

export const StyleTaskAttachment = styled.a`
  margin-right: 0.5rem;
`;

export const StyledTag = styled.span.withConfig({
  shouldForwardProp: (prop) => !["variant"].includes(prop),
})<TagProps>`
  ${borderRadius()};
  ${(props) => {
    const textColor = tagTextColor(props);
    const bgColor = tagBgColor(props);
    const outileColor = darkenColor({ ...props, color: bgColor, value: 0.3 });
    return css`
      background-color: ${bgColor};
      color: ${textColor};
      ${props.selected && borderColor(outileColor)}
      ${typeof props.selected === "boolean" && `cursor:pointer;`}
    `;
  }}
  display: inline-block;
  padding: 0.5em;
  margin: 0.25em 0;
  line-height: 1;
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const StyledTaskDetails = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledTaskInfo = styled(FlexBox)`
  overflow: hidden;
  label {
    align-items: start;
  }
`;

StyledTaskInfo.defaultProps = {
  display: "flex",
  flexDirection: "column",
  mobileSize: 1,
};
