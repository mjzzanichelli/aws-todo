import { ThemeProvider } from "styled-components";
import { useThemeSwitch } from "./hooks/theme-switch";
import { GlobalStyles } from "./utils/styles";
import { StyledAppContainer } from "./components/layout/styled";
import { ErrorNotification } from "./components/notifications/error";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { FlexContainerProps } from "./components/layout/types";
import { useContext, useEffect, useState } from "react";
import { useResizable } from "./hooks/resizable";
import { ScreenContext, ThemeContext } from "./context";

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
          </BrowserRouter>
        </AppContainer>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function AppContainer(args: FlexContainerProps) {
  const { children, ...props } = args;

  const { theme } = useContext(ThemeContext);
  const { size, ref } = useResizable<HTMLDivElement>();
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    if (!size) return;
    setIsMobile(size.width < theme.sizes.md);
  }, [size, theme]);

  return (
    <StyledAppContainer {...props} ref={ref}>
      <ScreenContext.Provider value={{ isMobile, size }}>
        {children}
      </ScreenContext.Provider>
    </StyledAppContainer>
  );
}
