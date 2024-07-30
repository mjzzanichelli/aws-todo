import { FlexBox } from "../components/layout/styled";
import { getNextTheme, ThemeContext } from "../hooks/theme-switch";
import { Button } from "../components/button/main";
import { useContext } from "react";
import { AuthContext } from "../hooks/auth";
import styled from "styled-components";

export const StyledHeding = styled(FlexBox)`
  text-overflow: ellipsis;
  overflow: hidden;
`;

StyledHeding.defaultProps = {
  as: "h1",
  mobileSize: 1,
  margin: 0,
};

export function Header() {
  const { user, signOut } = useContext(AuthContext);
  const { theme, switchTheme } = useContext(ThemeContext);
  return (
    <FlexBox as="header" size={"none"} display="flex" flexDirection="row">
      <StyledHeding as="h1" mobileSize={1} margin="0">
        Hello {user?.signInDetails?.loginId}
      </StyledHeding>
      <Button onClick={signOut} variant="primary" noBorder>
        Sign out
      </Button>
      <Button onClick={switchTheme} variant="primary" noBorder>
        Switch to {getNextTheme(theme).mode} theme
      </Button>
    </FlexBox>
  );
}
