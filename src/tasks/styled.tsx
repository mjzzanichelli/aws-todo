import styled, { css } from "styled-components";
import { Icon } from "../components/icon/main";
import { borderColor, borderRadius } from "../utils/styles";
import { TagProps } from "../theme/theme.types";
import { darkenColor, tagBgColor, tagTextColor } from "../theme/variants";
import { FlexBox } from "../components/layout/styled";

export const StyleTaskAttachment = styled.a`
  margin-right: 0.5rem;
`;

StyleTaskAttachment.defaultProps = {
  children: <Icon name="paperclip" />,
};

export const StyledTag = styled.span<TagProps>`
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
  padding: 0.5rem;
  margin: 0.25rem 0;
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const StyledFlexBoxInput = styled(FlexBox)`
  overflow: hidden;
  input {
    width: 100%;
    max-width: 20rem;
  }
`;
