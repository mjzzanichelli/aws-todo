import { useContext, useState } from "react";
import { getNextTheme, ThemeContext } from "../hooks/theme-switch";
import { AuthContext } from "../hooks/auth";
import { Button } from "../components/button/main";
import { StyledMenu, StyledMenuContent, StyledUserBubble } from "./styled";
import { Icon } from "../components/icon/main";

export function Menu() {
  const { user, signOut } = useContext(AuthContext);
  const { theme, switchTheme } = useContext(ThemeContext);
  const [showContent, setShowContent] = useState(false);

  const initial = user?.signInDetails?.loginId?.charAt(0).toUpperCase();

  return (
    <StyledMenu>
      {initial && <StyledUserBubble>{initial}</StyledUserBubble>}
      <Button slim onClick={() => setShowContent(!showContent)}>
        <Icon name="chevron-up" rotate={showContent ? "bottom" : "top"} />
      </Button>
      {showContent && (
        <StyledMenuContent>
          <Button onClick={switchTheme} variant="primary">
            Switch to {getNextTheme(theme).mode} theme
          </Button>
          {signOut && (
            <Button onClick={signOut} variant="primary">
              Sign out
            </Button>
          )}
        </StyledMenuContent>
      )}
    </StyledMenu>
  );
}
