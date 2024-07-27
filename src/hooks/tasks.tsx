import { createContext, useCallback, useEffect, useState } from "react";
import {
  StyledTableCellStyckyLeft,
  StyledTableCellStyckyRight,
} from "../components/table/styled";
import { CheckBox } from "../components/form/input";
import {
  getMetaActions,
  getMetaCheck,
  MetaCheckLabel,
  TaskDataType,
  TasksMeta,
  TasksMetaType,
} from "../tasks/meta";
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

  const makeEditable = useCallback(
    (task: TaskDataType) => {
      if (!tasks) return;
      if (!task.editable) {
        task.editable = !task.editable;
        setTasks([...tasks]);
      } else {
        const { id, name } = task;
        updateTask({ id, name }).then(refreshTasks);
      }
    },
    [tasks, refreshTasks]
  );

  const metaCheck = getMetaCheck(refreshTasks);

  const metaActions = getMetaActions({ makeEditable, refreshTasks });

  const checkMetaTodo: TasksMetaType = {
    ...metaCheck,
    label: <MetaCheckLabel tasks={tasks} refreshTasks={refreshTasks} done />,
  };

  const checkMetaDone: TasksMetaType = {
    ...metaCheck,
    label: <MetaCheckLabel tasks={tasks} refreshTasks={refreshTasks} />,
  };

  return {
    tasks,
    setTasks,
    refreshTasks,
    metaTodo: [checkMetaTodo, ...TasksMeta, metaActions],
    metaDone: [checkMetaDone, ...TasksMeta, metaActions],
  };
}
