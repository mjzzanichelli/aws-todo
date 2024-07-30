import { ThemeProvider } from "styled-components";
import { ThemeContext, useThemeSwitch } from "./hooks/theme-switch";
import { GlobalStyles } from "./utils/styles";
import { AppContainer } from "./components/layout/styled";
import { ErrorNotification } from "./components/notifications/error";
import { ConfirmationNotification } from "./components/notifications/confirmation";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";

export function App() {
  const themeValues = useThemeSwitch();
  return (
    <ThemeContext.Provider value={themeValues}>
      <ThemeProvider theme={themeValues.theme}>
        <GlobalStyles />
        <AppContainer flexDirection="column">
          <BrowserRouter>
            <ErrorNotification>
              <AppRouter />
            </ErrorNotification>
            <ConfirmationNotification />
          </BrowserRouter>
        </AppContainer>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
