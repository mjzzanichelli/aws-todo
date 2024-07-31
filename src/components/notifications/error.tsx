import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Dialog } from "../dialog/main";
import { ChildrenType } from "../../utils/types";
import { GlobalError, useError } from "../../hooks/error";
import { Icon } from "../icon/main";

export const ErrorDialogTitle = "Oooops!";

export function ErrorNotification(args: {
  message?: ChildrenType;
  children?: ChildrenType;
}) {
  const error = useError();
  const [active, setActive] = useState(false);
  const { message = "An Error Occurred", children } = args;

  const goHome = (
    <>
      <br />
      <br />
      <a href="/">
        <Icon name="house" />
      </a>
    </>
  );

  return (
    <ErrorBoundary
      onReset={() => setActive(true)}
      FallbackComponent={({ resetErrorBoundary }) => (
        <Dialog
          variant="error"
          title={ErrorDialogTitle}
          onClose={resetErrorBoundary}
        >
          <>{message}</>
          {goHome}
        </Dialog>
      )}
    >
      {active ? null : children}
      {error && (
        <Dialog
          variant="error"
          title={ErrorDialogTitle}
          onClose={GlobalError.setError}
        >
          <>{error.message}</>
          {goHome}
        </Dialog>
      )}
    </ErrorBoundary>
  );
}
