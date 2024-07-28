import { Button } from "../components/button/main";
import { CheckBox, Input } from "../components/form/input";
import { Icon } from "../components/icon/main";
import {
  StyledTableCell,
  StyledTableCellStyckyLeft,
  StyledTableCellStyckyRight,
} from "../components/table/styled";
import { TableDataType, TableMetaType } from "../components/table/types";
import { Confirmation } from "../hooks/confirmation";
import { GlobalError } from "../hooks/error";
import { Void } from "../utils/helpers";
import { deleteTask, updateTask } from "./crud";

export interface TaskDataType extends TableDataType {
  id: string;
  name: string;
  done?: boolean;
  editable?: boolean;
}

export type TasksMetaType = TableMetaType<TaskDataType>;

export const TasksMeta: TasksMetaType[] = [
  {
    key: "name",
    label: "Task name",
    thStyled: <StyledTableCell style={{ width: "50%" }} />,
    value: function (task) {
      if (!task.editable) return task.name;
      return (
        <Input
          defaultValue={task.name}
          onChange={(value) => {
            task.name = value as string;
          }}
        />
      );
    },
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

export function getMetaCheck(reloadTasks: () => void): TasksMetaType {
  return {
    key: "done",
    thStyled: (
      <StyledTableCellStyckyLeft align="center" style={{ width: "2.5rem" }} />
    ),
    tdStyled: <StyledTableCellStyckyLeft align="center" />,
    value: (task) => {
      const { id } = task;
      let { done } = task;
      done = done ?? false;
      return (
        <CheckBox
          key={id}
          defaultChecked={done}
          onChange={() => {
            updateTask({ id, done: !done }).then(reloadTasks);
          }}
        />
      );
    },
  };
}

export function MetaCheckLabel(args: {
  tasks?: TaskDataType[];
  done?: boolean;
  reloadTasks: () => void;
}) {
  const { tasks, done = false, reloadTasks } = args;
  return (
    <CheckBox
      key={Math.random()}
      defaultChecked={false}
      onChange={() => {
        const todo = tasks?.filter((item) => !!item.done !== done);
        if (!todo?.length) return;
        Promise.all(todo.map(({ id }) => updateTask({ id, done }))).then(
          reloadTasks
        );
      }}
    />
  );
}

export function getMetaActions(args: {
  makeEditable: (task: TaskDataType) => void;
  reloadTasks: () => void;
}): TasksMetaType {
  const { makeEditable, reloadTasks } = args;
  return {
    key: "actions",
    label: "Actions",
    thStyled: (
      <StyledTableCellStyckyRight
        align="center"
        style={{ minWidth: "6rem", width: "6rem" }}
      />
    ),
    tdStyled: (
      <StyledTableCellStyckyRight
        align="center"
        style={{ minWidth: "6rem", width: "6rem" }}
      />
    ),
    value: (task) => {
      const { id } = task;
      return (
        <>
          <Button
            onClick={() => {
              makeEditable(task);
            }}
          >
            <Icon name="xmark" />
          </Button>
          &nbsp;
          <Button
            onClick={() => {
              Confirmation.prompt((resolve, reject) => {
                return (
                  <>
                    <strong>{task.name}</strong>
                    <p>Are you sure you want to delete?</p>
                    <div>
                      <Button variant="success" onClick={resolve}>
                        Confirm
                      </Button>
                      &nbsp;
                      <Button variant="error" onClick={reject}>
                        Cancel
                      </Button>
                    </div>
                  </>
                );
              }).then(() => deleteTask({ id }).then(reloadTasks), Void);
            }}
          >
            <Icon name="xmark" />
          </Button>
        </>
      );
    },
  };
}
