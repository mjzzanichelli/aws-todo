import { HTMLAttributes } from "react";
import { Size } from "../../utils/types";

export interface ResizableContainerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children?: (size: Size) => JSX.Element;
}
