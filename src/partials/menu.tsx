import { useContext, useState } from "react";
import { AuthUser } from "aws-amplify/auth";
import { AuthContext, ThemeContext } from "../context";
import { getNextTheme } from "../theme/main";
import { Button } from "../components/button/main";
import { Icon } from "../components/icon/main";
import { TasksOwner } from "../tasks/owner";
import { StyledMenu, StyledMenuContent, StyledUserBubble } from "./styled";

export function getUserInitial(user?: AuthUser) {
  return user?.signInDetails?.loginId?.charAt(0).toUpperCase();
}

export function Menu() {
  const { user, signOut } = useContext(AuthContext);
  const { theme, switchTheme } = useContext(ThemeContext);
  const [showContent, setShowContent] = useState(false);

  return (
    <StyledMenu>
      <TasksOwner>
        <StyledUserBubble>{getUserInitial(user)}</StyledUserBubble>
      </TasksOwner>
      <Button slim onClick={() => setShowContent(!showContent)}>
        <Icon name="chevron-up" rotate={showContent ? "bottom" : "top"} />
      </Button>
      {showContent && (
        <StyledMenuContent>
          <Button onClick={switchTheme} variant="primary">
            Switch to {getNextTheme(theme).mode} theme
          </Button>
          {signOut && (
            <TasksOwner>
              <Button onClick={signOut} variant="primary">
                Sign out
              </Button>
            </TasksOwner>
          )}
        </StyledMenuContent>
      )}
    </StyledMenu>
  );
}
