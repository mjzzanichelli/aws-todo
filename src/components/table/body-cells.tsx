import { cloneElement } from "react";
import { RowCellsProps, TableDataType } from "./types";

export function TableBodyCells<T extends TableDataType>({
  row,
  meta,
  values,
}: RowCellsProps<T>): JSX.Element {
  return (
    <>
      {values &&
        meta.map(({ key, value, tdStyled: CellRenderer }, col) => {
          const children = value ? value(values, key, row, col) : values[key];
          return CellRenderer ? (
            cloneElement(CellRenderer, { key: col, as: "td" }, children)
          ) : (
            <td key={col}>{children}</td>
          );
        })}
    </>
  );
}
