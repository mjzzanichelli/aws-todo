import { useContext } from "react";
import { getNextTheme, ThemeContext } from "../hooks/theme-switch";
import { AuthContext } from "../hooks/auth";
import { Button } from "../components/button/main";
import { StyledH1, StyledHeader, StyledMenu } from "./styled";

export function Header() {
  return (
    <StyledHeader>
      <StyledH1>Checked</StyledH1>
      <Menu />
    </StyledHeader>
  );
}

export function Menu() {
  const { user, signOut } = useContext(AuthContext);
  const { theme, switchTheme } = useContext(ThemeContext);
  console.log(user);
  return (
    <StyledMenu>
      <Button onClick={signOut} variant="primary" noBorder>
        Sign out
      </Button>
      <Button onClick={switchTheme} variant="primary" noBorder>
        Switch to {getNextTheme(theme).mode} theme
      </Button>
    </StyledMenu>
  );
}
