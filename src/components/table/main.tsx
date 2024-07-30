import { StyledTable } from "./styled";
import { TableProps, TableRowType } from "./types";
import { TableBodyCells } from "./body-cells";
import { TableHeadCells } from "./head-cells";
import { TableRow } from "./table-row";

export function Table<T>(args: TableProps<T>) {
  const {
    meta,
    data,
    selected,
    hover,
    hideHeader,
    useRowVariant,
    onRowClick,
    onRowHover,
    children,
    ...props
  } = args;
  const { variant } = props;

  return (
    <StyledTable {...props}>
      {!hideHeader && (
        <thead>
          <TableRow<T> row={0} rowType={TableRowType.Head} variant={variant}>
            {children || <TableHeadCells row={0} meta={meta} />}
          </TableRow>
        </thead>
      )}
      <tbody>
        {data &&
          data.map((values, row) => {
            const props = {
              key: row,
              row,
              values,
              variant,
              hover: values === hover,
              selected: !!selected?.includes(values),
              onMouseOver:
                onRowHover &&
                function () {
                  onRowHover(values);
                },
              onClick:
                onRowClick &&
                function () {
                  onRowClick(values);
                },
            };
            return (
              <TableRow<T>
                {...props}
                key={row}
                rowType={TableRowType.Body}
                variant={useRowVariant ? variant : undefined}
              >
                {children || (
                  <TableBodyCells row={row} meta={meta} values={values} />
                )}
              </TableRow>
            );
          })}
      </tbody>
    </StyledTable>
  );
}
