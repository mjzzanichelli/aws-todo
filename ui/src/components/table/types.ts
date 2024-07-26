import { VariantProps } from "../../theme/theme.types";
import { Properties, ChildrenType, VariantElementProps } from "../../utils/types";

export interface TableMetaType<T = unknown> {
  thStyled?: JSX.Element;
  tdStyled?: JSX.Element;
  key: string;
  label?: ChildrenType;
  value?: (values: T, key: string, row: number, col: number) => ChildrenType;
}

export type TableDataType<T = never> = Properties<ChildrenType | T>;

export interface StyledTableProps extends VariantProps {
  outlined?: boolean;
}

export interface TableProps<T extends TableDataType>
  extends Omit<StyledTableProps, "children"> {
  meta: TableMetaType<T>[];
  data?: T[];
  selected?: T[];
  hideHeader?: boolean;
  useRowVariant?: boolean;
  hover?: T;
  onRowHover?: (values: T) => void;
  onRowClick?: (values: T) => void;
  children?: (args: TableRowProps<T>) => JSX.Element;
}

export enum TableRowType {
  Head = "thead",
  Body = "tbody",
}

export interface TableRowProps<T extends TableDataType> extends VariantProps {
  rowType: TableRowType;
  row: number;
  values?: T;
  selected?: boolean;
  hover?: boolean;
  children?: TableProps<T>["children"] | JSX.Element;
}

export interface RowProps extends VariantElementProps<HTMLTableRowElement> {
  onClick?: () => void;
  selected?: boolean;
  hover?: boolean;
}

export interface RowCellsProps<T extends TableDataType> {
  row: number;
  meta: TableMetaType<T>[];
  values?: T;
}

export interface PaginationRequest {
  currentPage: number;
  pageSize: number;
}

export interface PaginationProps extends Partial<PaginationRequest> {
  totalCount: number;
  showCount?: number;
  onChange?: (selectedPage: number) => void;
}

export interface TableCellProps
  extends React.ThHTMLAttributes<HTMLHtmlElement> {
  align?: "left" | "center" | "right";
  width?: string;
  padding?: string;
}
