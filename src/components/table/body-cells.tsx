import { cloneElement } from "react";
import { RowCellsProps } from "./types";

export function TableBodyCells<T>({
  row,
  meta,
  values,
}: RowCellsProps<T>): JSX.Element {
  return (
    <>
      {values &&
        meta.map(({ key, value, tdStyled: CellRenderer }, col) => {
          const children = value(values, key, row, col);
          return CellRenderer ? (
            cloneElement(CellRenderer, { key: col, as: "td" }, children)
          ) : (
            <td key={col}>{children}</td>
          );
        })}
    </>
  );
}
