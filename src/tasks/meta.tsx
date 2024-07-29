import { Button } from "../components/button/main";
import { CheckBox } from "../components/form/input";
import { Icon } from "../components/icon/main";
import { StyledTableCell } from "../components/table/styled";
import { Confirmation } from "../hooks/confirmation";
import { Void } from "../utils/helpers";
import { deleteTask, TaskSchema, TaskSchemaUpdate, updateTask } from "./crud";
import { TableDataType, TableMetaType } from "../components/table/types";
import { TaskDetails } from "./details";
import { Notes } from "./notes";
import { uploadData } from "aws-amplify/storage";
import { TaskDate } from "./date";
import { TaskTag } from "./tag";
import { IconName } from "../components/icon/types";

export type TaskDataType = TableDataType &
  TaskSchema & { editable?: boolean; attachmentFile?: File };

export type TasksMetaType = TableMetaType<TaskDataType>;

export async function getTaskValues(
  task: TaskDataType
): Promise<TaskSchemaUpdate> {
  const { id, name, attachment, attachmentFile, done, dueDate, tag } = task;
  let result;
  if (attachmentFile) {
    result = await uploadData({
      path: ({ identityId }) =>
        `attachments/${identityId}/${attachmentFile.name}`,
      data: attachmentFile,
    }).result;
  }
  return Promise.resolve({
    id,
    name,
    attachment: result?.path || attachment,
    done,
    dueDate,
    tag,
  });
}

export function MetaLabel(args: { icon?: IconName; children: string }) {
  const { children, icon } = args;
  return (
    <>
      {icon && <Icon name={icon} style={{ marginRight: "0.5rem" }} />}
      {children}
    </>
  );
}

export const TasksMeta: TasksMetaType[] = [
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

export function getMetaCheck(reloadTasks: () => void): TasksMetaType {
  return {
    key: "done",
    thStyled: <StyledTableCell align="center" style={{ width: "2.5rem" }} />,
    tdStyled: <StyledTableCell align="center" />,
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
      const { id } = task;
      return (
        <>
          <Button
            outlined
            noBorder
            onClick={() => {
              makeEditable(task);
            }}
          >
            <Icon name={task.editable ? "floppy-disk" : "pen"} />
          </Button>
          &nbsp;
          <Button
            outlined
            noBorder
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
              }).then(() => deleteTask(id).then(reloadTasks), Void);
            }}
          >
            <Icon name="trash-can" />
          </Button>
        </>
      );
    },
  };
}
