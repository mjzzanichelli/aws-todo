import styled from "styled-components";
import { Icon } from "../components/icon/main";

export const StyleTaskAttachment = styled.a`
  margin-left: 0.5rem;
  float: right;
`;

StyleTaskAttachment.defaultProps = {
  children: <Icon name="paperclip" />,
};
