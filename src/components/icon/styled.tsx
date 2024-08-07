import styled, { css } from "styled-components";
import { IconName, IconProps, Icons } from "./types";

export function getCharCode(name: IconName) {
  const code = parseInt(Icons[name]);
  return String.fromCharCode(code);
}

export function iconPseudo(props: Partial<IconProps>) {
  const { name, rotate } = props;
  if (!name) return;
  let transform;
  switch (rotate) {
    case "right":
      transform = "transform: rotate3d(0, 0, 1, 90deg) ";
      break;
    case "left":
      transform = "transform: rotate3d(0, 0, 1, -90deg)";
      break;
    case "bottom":
      transform = "transform: rotate3d(0, 0, 1, 180deg) ";
      break;
  }
  return css`
    &:before {
      font-family: customicons !important;
      font-style: normal;
      text-rendering: optimizeLegibility;
      content: "${getCharCode(name)}";
      transition: transform 0.3s;
      ${transform}
    }
  `;
}

export const StyledFeatherIcon = styled.i.withConfig({
  shouldForwardProp: (prop) => !["name", "rotate", "variant"].includes(prop),
})<IconProps>`
  line-height: 1;
  font-style: normal;
  display: inline-flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  ${(props) => iconPseudo(props)}
`;
