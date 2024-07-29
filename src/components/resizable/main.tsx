import { useState, useCallback } from "react";
import { useResizable } from "../../hooks/resizable";
import { ResizableContainerProps } from "./types";
import { StyledResizableContainer } from "./styled";

export function ResizableContainer({
  children,
  ...props
}: ResizableContainerProps) {
  const [panel, setPanel] = useState<HTMLDivElement>();

  const size = useResizable(panel);

  const panelRef = useCallback(
    (element: HTMLDivElement | null) => {
      element && element !== panel && setPanel(element);
    },
    [panel]
  );

  return (
    <StyledResizableContainer ref={panelRef} {...props}>
      {size && children && children(size)}
    </StyledResizableContainer>
  );
}
