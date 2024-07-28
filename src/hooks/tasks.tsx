import { createContext, useCallback, useEffect, useState } from "react";
import {
  getMetaActions,
  getMetaCheck,
  MetaCheckLabel,
  TasksMeta,
} from "../tasks/meta";
import { listTasks, updateTask } from "../tasks/crud";
import { TaskDataType, TasksMetaType } from "../tasks/types";

export const TasksContext = createContext<{
  tasks?: TaskDataType[];
  metaTodo?: TasksMetaType[];
  metaDone?: TasksMetaType[];
  setTasks?: (tasks: TaskDataType[]) => void;
  reloadTasks?: () => void;
}>({});

export function useTasksMeta() {
  const [tasks, setTasks] = useState<TaskDataType[]>();

  const reloadTasks = useCallback(() => {
    listTasks().then((tasks) => {
      setTasks(tasks as TaskDataType[]);
    });
  }, [setTasks]);

  useEffect(() => {
    reloadTasks();
  }, [reloadTasks]);

  const makeEditable = useCallback(
    (task: TaskDataType) => {
      if (!tasks) return;
      if (!task.editable) {
        task.editable = !task.editable;
        setTasks([...tasks]);
      } else {
        const { id, name } = task;
        updateTask({ id, name }).then(reloadTasks);
      }
    },
    [tasks, reloadTasks]
  );

  const metaCheck = getMetaCheck(reloadTasks);

  const metaActions = getMetaActions({ makeEditable, reloadTasks });

  const checkMetaTodo: TasksMetaType = {
    ...metaCheck,
    label: <MetaCheckLabel tasks={tasks} reloadTasks={reloadTasks} done />,
  };

  const checkMetaDone: TasksMetaType = {
    ...metaCheck,
    label: <MetaCheckLabel tasks={tasks} reloadTasks={reloadTasks} />,
  };

  return {
    tasks,
    setTasks,
    reloadTasks,
    metaTodo: [checkMetaTodo, ...TasksMeta, metaActions],
    metaDone: [checkMetaDone, ...TasksMeta, metaActions],
  };
}
