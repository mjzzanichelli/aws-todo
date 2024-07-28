import { FlexBox } from "../components/layout/styled";
import { getNextTheme, ThemeContext } from "../hooks/theme-switch";
import { Button } from "../components/button/main";
import { useContext } from "react";
import { AuthContext } from "../hooks/auth";

export function Header() {
  const { user, signOut } = useContext(AuthContext);
  const { theme, switchTheme } = useContext(ThemeContext);
  console.log(user);
  return (
    <FlexBox as="header" size={"none"} display="flex" flexDirection="row">
      <FlexBox as="h1" mobileSize={1} margin="0">
        Hello {user?.signInDetails?.loginId}
      </FlexBox>
      <Button onClick={signOut}>Sign out</Button>
      <Button onClick={switchTheme}>
        Switch to {getNextTheme(theme).mode} theme
      </Button>
    </FlexBox>
  );
}
