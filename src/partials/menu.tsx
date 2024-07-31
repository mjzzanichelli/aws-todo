import { useContext, useState } from "react";
import { AuthUser } from "aws-amplify/auth";
import { AuthContext, ThemeContext } from "../context";
import { getNextTheme } from "../theme/main";
import { Button } from "../components/button/main";
import { Icon } from "../components/icon/main";
import { TasksGuest, TasksOwner } from "../tasks/access";
import { StyledMenu, StyledMenuContent, StyledUserBubble } from "./styled";
import { useNavigate } from "react-router-dom";

export function getUserInitial(user?: AuthUser) {
  return user?.signInDetails?.loginId?.charAt(0).toUpperCase();
}

export function Menu() {
  const { user, signOut } = useContext(AuthContext);
  const { theme, switchTheme } = useContext(ThemeContext);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  return (
    <StyledMenu>
      <TasksOwner>
        <>
          <StyledUserBubble>{getUserInitial(user)}</StyledUserBubble>
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
        </>
      </TasksOwner>
      <TasksGuest>
        <Button onClick={(e) => navigate("/")}>
          <Icon name="house" />
        </Button>
      </TasksGuest>
    </StyledMenu>
  );
}
