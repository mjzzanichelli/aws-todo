import { TableRowProps } from "./types";
import { StyledTableRow } from "./styled";

export function TableRow<T>(args: TableRowProps<T>) {
  const {
    row,
    rowType,
    values,
    children: RowRenderer,
    draggable,
    dragging,
    draggingHover,
    setDragging,
    setDraggingHover,
    ...props
  } = args;

  if (!(RowRenderer instanceof Function))
    return (
      <StyledTableRow
        as={"tr"}
        draggingOver={draggingHover === values}
        draggable={!!draggable}
        onDragStart={(e) => {
          if (!setDragging) return;
          setDragging && setDragging(values);
          e.dataTransfer.dropEffect = "move";
          e.dataTransfer.effectAllowed = "move";
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDraggingHover && setDraggingHover(values);
        }}
        onDrop={(e) => {
          e.preventDefault();
          draggable && dragging && draggable(dragging, values);
          setDraggingHover && setDraggingHover(undefined);
        }}
        onDragLeave={() => {
          setDraggingHover && setDraggingHover(undefined);
        }}
        {...props}
      >
        {RowRenderer}
      </StyledTableRow>
    );

  return (
    <RowRenderer
      draggable={draggable}
      dragging={dragging}
      draggingHover={draggingHover}
      setDragging={setDragging}
      setDraggingHover={setDraggingHover}
      row={row}
      rowType={rowType}
      values={values}
    />
  );
}
