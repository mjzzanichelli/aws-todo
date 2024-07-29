import { ReactElement } from "react";
import { Dialog } from "../components/dialog/main";
import { Observable } from "../utils/observable";
import { useObservable } from "./observable";
import { VariantType } from "../theme/theme.types";
import { DialogProps } from "../components/dialog/types";
import { ConfirmationContentType } from "../components/notifications/types";

export interface ConfirmationProps {
  title?: string;
  variant?: VariantType;
  dismissable?: boolean;
}

export function confirmationProps(props: ConfirmationProps = {}) {
  const defaultProps: ConfirmationProps = {
    title: "Confirmation Required",
    variant: "warning",
    dismissable: true,
  };
  return {
    ...defaultProps,
    ...props,
  };
}

export class Confirmation {
  static dialog?: ReactElement<DialogProps>;
  static Values = new Observable({
    dialog: Confirmation.dialog,
  });

  static setDialog(dialog: (typeof Confirmation)["dialog"]) {
    Confirmation.Values.setValue("dialog", dialog);
  }

  static prompt<V = unknown, R = unknown>(
    content: ConfirmationContentType<V, R>,
    props?: ConfirmationProps
  ): Promise<V> {
    return new Promise<V>((resolve, reject) => {
      const { title, variant, dismissable } = confirmationProps(props);
      const dialog = (
        <Dialog
          variant={variant}
          title={title}
          onClose={dismissable ? reject : undefined}
        >
          {content(resolve, reject)}
        </Dialog>
      );
      Confirmation.setDialog(dialog);
    }).finally(() => Confirmation.setDialog(undefined));
  }
}

export function useConfirmation() {
  const [values] = useObservable(Confirmation.Values);
  const { dialog } = values;
  return dialog;
}
