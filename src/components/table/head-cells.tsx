import { cloneElement } from "react";
import { RowCellsProps, TableDataType } from "./types";

export function TableHeadCells<T extends TableDataType>({
  meta,
}: RowCellsProps<T>): JSX.Element {
  return (
    <>
      {meta.map((item, i) => {
        const { key, label, thStyled: CellRenderer } = item;
        const children = label || key;
        return CellRenderer ? (
          cloneElement(CellRenderer, { key: i, as: "th" }, children)
        ) : (
          <th key={i}>{children}</th>
        );
      })}
    </>
  );
}