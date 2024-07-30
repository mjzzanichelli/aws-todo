import { StyledH1, StyledHeader } from "./styled";
import { Menu } from "./menu";

export function Header() {
  return (
    <StyledHeader>
      <StyledH1>Checked</StyledH1>
      <Menu />
    </StyledHeader>
  );
}
