import { StyledTableCell } from "../../components/table/styled";
import { TaskDate } from "../date";
import { TaskDetails } from "../details";
import { Notes } from "../notes";
import { TaskTag } from "../tag";
import { TasksMetaType } from "./types";
import { TaskActions } from "../actions";
import { MetaCheckLabel, MetaLabel } from "./labels";
import { TaskCheck } from "../check";

export function TasksTableMeta(args: {
  done?: boolean;
  isOwner?: boolean;
}): TasksMetaType[] {
  const { done, isOwner } = args;
  const meta: TasksMetaType[] = [
    {
      key: "details",
      label: <MetaLabel icon="task">Task name</MetaLabel>,
      thStyled: <StyledTableCell />,
      value: function (task) {
        return <TaskDetails task={task} />;
      },
    },
    {
      key: "dueDate",
      label: <MetaLabel icon="calendar">Due date</MetaLabel>,
      value: function (task) {
        return <TaskDate task={task} />;
      },
    },
    {
      key: "tag",
      label: <MetaLabel icon="tag">Tag</MetaLabel>,
      value: (task) => {
        return <TaskTag task={task} />;
      },
    },
    {
      key: "notes",
      label: <MetaLabel icon="task">Note</MetaLabel>,
      thStyled: <StyledTableCell />,
      tdStyled: <StyledTableCell />,
      value: (task) => <Notes task={task} />,
    },
  ];
  if (!isOwner) return meta;
  return [
    {
      key: "done",
      thStyled: <StyledTableCell align="center" style={{ width: "2.5rem" }} />,
      tdStyled: <StyledTableCell align="center" />,
      label: <MetaCheckLabel done={done} />,
      value: (task) => {
        return <TaskCheck task={task} />;
      },
    },
    ...meta,
    {
      key: "actions",
      label: "Actions",
      thStyled: (
        <StyledTableCell
          align="center"
          style={{ minWidth: "6rem", width: "6rem" }}
        />
      ),
      tdStyled: (
        <StyledTableCell
          align="center"
          style={{ minWidth: "6rem", width: "6rem" }}
        />
      ),
      value: (task) => {
        return <TaskActions task={task} />;
      },
    },
  ];
}
