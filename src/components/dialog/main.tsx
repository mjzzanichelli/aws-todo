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
