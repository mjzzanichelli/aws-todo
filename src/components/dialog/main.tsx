import { useEffect } from "react";
import { Button } from "../button/main";
import { Icon } from "../icon/main";
import { StyledDialog, StyledDialogBG, StyledDialogBox } from "./styled";
import { DialogProps } from "./types";

export function Dialog({
  title,
  children,
  variant,
  onClose,
  ...props
}: DialogProps) {
  useEffect(() => {
    if (!onClose) return;
    function escapeHandler(ev: KeyboardEvent) {
      onClose && ev.key === "Escape" && onClose();
    }
    window.addEventListener("keyup", escapeHandler);
    return () => {
      window.removeEventListener("keyup", escapeHandler);
    };
  }, [onClose]);
  return (
    <StyledDialog title={title} {...props}>
      <StyledDialogBG />
      <StyledDialogBox
        variant={variant}
        title={title}
        tools={
          onClose && (
            <Button onClick={() => onClose()} variant={variant}>
              <Icon name={"xmark"} />
            </Button>
          )
        }
      >
        {children}
      </StyledDialogBox>
    </StyledDialog>
  );
}
