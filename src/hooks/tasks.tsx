import { createContext, useCallback, useEffect, useState } from "react";
import {
  getMetaActions,
  getMetaCheck,
  getTaskValues,
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
  search?: string;
  addTask?: (task: TaskSchema) => void;
  setSearch?: (search?: string) => void;
  setTasks?: (tasks: TaskDataType[]) => void;
  reloadTasks?: () => void;
}>({});

export function useTasksMeta() {
  const [tasks, setTasks] = useState<TaskDataType[]>([]);
  const [search, setSearch] = useState<string>();

  const reloadTasks = useCallback(() => {
    listTasks(
      search
        ? {
            filter: {
              name: {
                contains: search,
              },
            },
          }
        : undefined
    ).then((tasks) => {
      setTasks(
        tasks.sort((a: TaskSchema, b: TaskSchema) => {
          const aCreatedAt = new Date(a.createdAt);
          const bCreatedAt = new Date(b.createdAt);
          return aCreatedAt.getTime() < bCreatedAt.getTime() ? -1 : 1;
        })
      );
    });
  }, [setTasks, search]);

  useEffect(() => {
    const search = setTimeout(() => {
      reloadTasks();
    }, 200);
    return () => {
      clearTimeout(search);
    };
  }, [reloadTasks]);

  const makeEditable = useCallback(
    (task: TaskDataType) => {
      if (!tasks) return;
      if (!task.editable) {
        setTasks(
          tasks.map((item) => {
            const { attachmentFile, ...others } = item;
            return {
              ...others,
              editable: item === task ? true : false,
            };
          })
        );
      } else {
        getTaskValues(task).then(updateTask).then(reloadTasks);
      }
    },
    [tasks, reloadTasks]
  );

  const addTask = useCallback(
    (task: TaskSchema) => {
      setTasks([
        ...tasks.map((item) => {
          return {
            ...item,
            editable: false,
          };
        }),
        { ...task, editable: true },
      ]);
    },
    [tasks, setTasks]
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
    metaTodo: [checkMetaTodo, ...TasksMeta, metaActions],
    metaDone: [checkMetaDone, ...TasksMeta, metaActions],
    search,
    addTask,
    setSearch,
    setTasks,
    reloadTasks,
  };
}
