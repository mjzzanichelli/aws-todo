import { ChildrenType } from "../../utils/types";

export type ConfirmationContentType<V = unknown, R = any> = (
  resolve: (value: V) => void,
  reject: (reason?: R) => void
) => ChildrenType;
