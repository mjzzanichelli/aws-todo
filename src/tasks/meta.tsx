import { CheckBox } from "../components/form/input";
import {
  StyledTableCell,
  StyledTableCellStyckyRight,
} from "../components/table/styled";
import { TableDataType, TableMetaType } from "../components/table/types";

export interface TaskDataType extends TableDataType {
  id: string;
  name: string;
  done?: boolean;
}

export type TasksMetaType = TableMetaType<TaskDataType>;

export const TasksMeta: TasksMetaType[] = [
  {
    key: "name",
    label: "Task name",
    thStyled: <StyledTableCell style={{ width: "50%" }} />,
  },
  {
    key: "date",
    label: "Due date",
  },
  {
    key: "tag",
    label: "Tag",
  },
  {
    key: "note",
    label: "Note",
  },
];
