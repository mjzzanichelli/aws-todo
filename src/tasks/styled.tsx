import styled, { css } from "styled-components";
import { Icon } from "../components/icon/main";
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

StyleTaskAttachment.defaultProps = {
  children: <Icon name="paperclip" />,
};

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
`;

StyledTaskInfo.defaultProps = {
  display: "flex",
  mobileDirection: "column",
  mobileSize: 1,
  margin: "0 0 0 1rem",
};
