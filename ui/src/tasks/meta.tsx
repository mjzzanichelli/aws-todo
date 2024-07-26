import { CheckBox } from "../components/form/input";
import {
  StyledTableCell,
  StyledTableCellStyckyLeft,
  StyledTableCellStyckyRight,
} from "../components/table/styled";
import { TableMetaType } from "../components/table/types";
import { TaskDataType } from "./data";

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
  {
    key: "actions",
    label: "Actions",
    thStyled: (
      <StyledTableCellStyckyRight align="center" style={{ width: "6rem" }} />
    ),
    tdStyled: <StyledTableCellStyckyRight align="center" />,
    value: () => {
      return <CheckBox />;
    },
  },
];
