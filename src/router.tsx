import { Authenticator } from "@aws-amplify/ui-react";
import type { NonIndexRouteObject } from "react-router-dom";
import { useParams, useRoutes } from "react-router-dom";
import { AuthContext, TasksContext } from "./context";
import { AppBody } from "./components/layout/styled";
import { useTasks } from "./hooks/tasks";
import { Header } from "./partials/header";
import { PageTop } from "./partials/page-top";
import { Tasks } from "./tasks/main";
import { ConfirmationNotification } from "./components/notifications/confirmation";

export const GuestRoute: NonIndexRouteObject = {
  path: "/user/:guestUserId",
  element: <AppGuest />,
};

const AppRoute: NonIndexRouteObject = {
  path: "*",
  element: <AppCheckAuth />,
};

export const Routes: NonIndexRouteObject[] = [GuestRoute, AppRoute];

export function AppRouter() {
  const routeElement = useRoutes(Routes);
  return routeElement;
}

export function AppCheckAuth() {
  return (
    <Authenticator>
      {(auth) => (
        <AuthContext.Provider value={auth}>
          <AppAuthorised />
        </AuthContext.Provider>
      )}
    </Authenticator>
  );
}

export function AppGuest() {
  const { guestUserId } = useParams();

  return (
    <AuthContext.Provider value={{ guestUserId }}>
      <AppAuthorised />
    </AuthContext.Provider>
  );
}

export function AppAuthorised() {
  const tasksValues = useTasks();
  return (
    <>
      <TasksContext.Provider value={tasksValues}>
        <Header />
        <AppBody>
          <PageTop />
          <Tasks />
        </AppBody>
        <ConfirmationNotification />
      </TasksContext.Provider>
    </>
  );
}
