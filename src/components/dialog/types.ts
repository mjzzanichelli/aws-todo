import { ChildrenType, VariantElementProps } from "../../utils/types";

export type BoxProps = VariantElementProps & {
  loading?: boolean;
  tools?: ChildrenType;
};

export type DialogProps = VariantElementProps & {
  title?: string;
  onClose?: () => void;
  children: ChildrenType;
};
