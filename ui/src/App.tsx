import "@aws-amplify/ui-react/styles.css";
import { useContext, useEffect, useState } from "react";
import outputs from "./amplify_outputs.json";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { ThemeProvider } from "styled-components";
import { ThemeContext, useThemeSwitch } from "./hooks/theme-switch";
import { GlobalStyles } from "./utils/styles";
import { AppContainer, FlexBox } from "./components/layout/styled";
import { Button } from "./components/button/main";
import { getValuesEntries, useFormData } from "./hooks/form-data";
import { Input } from "./components/form/input";
import { FieldComponent } from "./components/form/field";
import { Icon } from "./components/icon/main";
import { Header } from "./partials/header";
import { AuthContext } from "./hooks/auth";
import { TasksContext } from "./tasks/data";
import { TasksEditor, TasksTable } from "./tasks/editor";

Amplify.configure(outputs);

export default function App() {
  const { theme, switchTheme } = useThemeSwitch();
  const formData = useFormData({
    onChange: (values) => {
      console.log(getValuesEntries(values).strings);
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppContainer flexDirection="column">
          <Authenticator>
            {(auth) => (
              <AuthContext.Provider value={auth}>
                <Header />
                <FlexBox size={"none"} display="flex" flexDirection="row">
                  <FlexBox as="h2" mobileSize={1} margin="0">
                    My Tasks for next month
                  </FlexBox>
                  <FlexBox size={"none"}>
                    <FieldComponent id="search" noLabel formData={formData}>
                      <Input placeholder="Search" />
                    </FieldComponent>
                  </FlexBox>
                </FlexBox>
                <FlexBox size={"none"}>
                  <Button>
                    <Icon name="xmark" />
                    <label>Add task</label>
                  </Button>
                </FlexBox>
                <TasksEditor />
              </AuthContext.Provider>
            )}
          </Authenticator>
        </AppContainer>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
