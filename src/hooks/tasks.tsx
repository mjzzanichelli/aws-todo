import { createContext, useCallback, useEffect, useState } from "react";
import {
  StyledTableCellStyckyLeft,
  StyledTableCellStyckyRight,
} from "../components/table/styled";
import { CheckBox } from "../components/form/input";
import { TaskDataType, TasksMeta, TasksMetaType } from "../tasks/meta";
import { deleteTask, listTasks, updateTask } from "../tasks/crud";
import { Button } from "../components/button/main";
import { Icon } from "../components/icon/main";

export const TasksContext = createContext<{
  tasks?: TaskDataType[];
  metaTodo?: TasksMetaType[];
  metaDone?: TasksMetaType[];
  setTasks?: (tasks: TaskDataType[]) => void;
}>({});

export function useTasksMeta() {
  const [tasks, setTasks] = useState<TaskDataType[]>();

  const refreshTasks = useCallback(() => {
    listTasks().then((tasks) => {
      setTasks(tasks as TaskDataType[]);
    });
  }, [setTasks]);

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  const checkMeta: TasksMetaType = {
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
          defaultChecked={done}
          onChange={() => {
            updateTask({ id, done: !done }).then(refreshTasks);
          }}
        />
      );
    },
  };

  const actionsMeta: TasksMetaType = {
    key: "actions",
    label: "Actions",
    thStyled: (
      <StyledTableCellStyckyRight align="center" style={{ width: "6rem" }} />
    ),
    tdStyled: <StyledTableCellStyckyRight align="center" />,
    value: (task) => {
      const { id } = task;
      let { done } = task;
      done = done ?? false;
      return (
        <>
          <Button
            onClick={() => {
              deleteTask({ id }).then(refreshTasks);
            }}
          >
            <Icon name="xmark" />
          </Button>
        </>
      );
    },
  };

  const checkMetaTodo: TasksMetaType = {
    ...checkMeta,
    label: (
      <CheckBox
        key={Math.random()}
        defaultChecked={false}
        onChange={() => {
          const todo = tasks?.filter((item) => !item.done);
          if (!todo?.length) return;
          Promise.all(
            todo.map(({ id }) => updateTask({ id, done: true }))
          ).then(refreshTasks);
        }}
      />
    ),
  };

  const checkMetaDone: TasksMetaType = {
    ...checkMeta,
    label: (
      <CheckBox
        key={Math.random()}
        defaultChecked={false}
        onChange={() => {
          const done = tasks?.filter((item) => !!item.done);
          if (!done?.length) return;
          Promise.all(
            done.map(({ id }) => updateTask({ id, done: false }))
          ).then(refreshTasks);
        }}
      />
    ),
  };

  return {
    tasks,
    setTasks,
    refreshTasks,
    metaTodo: [checkMetaTodo, ...TasksMeta, actionsMeta],
    metaDone: [checkMetaDone, ...TasksMeta, actionsMeta],
  };
}
