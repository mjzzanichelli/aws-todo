import { Authenticator } from "@aws-amplify/ui-react";
import { ThemeProvider } from "styled-components";
import { ThemeContext, useThemeSwitch } from "./hooks/theme-switch";
import { GlobalStyles } from "./utils/styles";
import { AppContainer } from "./components/layout/styled";
import { AuthContext } from "./hooks/auth";
import { TasksContext, useTasksMeta } from "./hooks/tasks";
import { Header } from "./partials/header";
import { TasksEditor } from "./tasks/editor";
import { PageTop } from "./partials/page-top";
import { ErrorNotification } from "./components/notifications/error";
import { ConfirmationNotification } from "./components/notifications/confirmation";

export function App() {
  const { theme, switchTheme } = useThemeSwitch();
  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppContainer flexDirection="column">
          <Authenticator>
            {(auth) => (
              <AuthContext.Provider value={auth}>
                <AppAuth />
              </AuthContext.Provider>
            )}
          </Authenticator>
        </AppContainer>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function AppAuth() {
  const { tasks, metaDone, metaTodo, setTasks, reloadTasks } = useTasksMeta();

  return (
    <>
      <ErrorNotification>
        <TasksContext.Provider
          value={{ tasks, metaDone, metaTodo, setTasks, reloadTasks }}
        >
          <Header />
          <PageTop />
          <TasksEditor />
        </TasksContext.Provider>
      </ErrorNotification>
      <ConfirmationNotification />
    </>
  );
}
