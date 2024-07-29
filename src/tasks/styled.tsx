import styled from "styled-components";
import { Icon } from "../components/icon/main";
import { FlexBox } from "../components/layout/styled";

export const StyleTaskAttachment = styled.a`
  margin-left: 0.5rem;
  float: right;
`;

StyleTaskAttachment.defaultProps = {
  children: <Icon name="paperclip" />,
};

export const StyledTagInputContainer = styled(FlexBox)`
  overflow: hidden;
  input {
    width: 100%;
  }
`;

StyledTagInputContainer.defaultProps = {
  size: 1,
};
