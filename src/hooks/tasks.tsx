import { createContext, useCallback, useEffect, useState } from "react";
import {
  getMetaActions,
  getMetaCheck,
  MetaCheckLabel,
  TaskDataType,
  TasksMeta,
  TasksMetaType,
} from "../tasks/meta";
import { listTasks, TaskSchema, updateTask } from "../tasks/crud";

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
      setTasks(tasks);
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
        updateTask(task).then(reloadTasks);
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
