import { TableRowProps } from "./types";
import { StyledTableRow } from "./styled";

export function TableRow<T>(args: TableRowProps<T>) {
  const { row, rowType, values, children: RowRenderer, ...props } = args;

  if (!(RowRenderer instanceof Function))
    return (
      <StyledTableRow as={"tr"} {...props}>
        {RowRenderer}
      </StyledTableRow>
    );

  return <RowRenderer row={row} rowType={rowType} values={values} />;
}
