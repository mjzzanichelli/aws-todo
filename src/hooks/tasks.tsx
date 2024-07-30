import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { listTasks, TaskSchema, updateTask } from "../tasks/crud";
import { getTaskValues, TaskDataType } from "../tasks/meta/types";
import { AuthContext } from "./auth";

export const TasksContext = createContext<{
  tasks?: TaskDataType[];
  search?: string;
  makeEditable?: (task: TaskDataType) => void;
  addTask?: (task: TaskSchema) => void;
  setSearch?: (search?: string) => void;
  setTasks?: (tasks: TaskDataType[]) => void;
  reloadTasks?: () => void;
}>({});

export function useTasks() {
  const { guestUserId } = useContext(AuthContext);
  const [tasks, setTasks] = useState<TaskDataType[]>([]);
  const [search, setSearch] = useState<string>();

  const reloadTasks = useCallback(() => {
    const filter: { and: {}[] } = {
      and: [
        {
          name: { contains: search ?? "" },
        },
      ],
    };
    guestUserId &&
      filter.and.push({
        owner: { contains: guestUserId },
      });
    listTasks({
      filter,
      authMode: guestUserId ? "identityPool" : "userPool",
    }).then((tasks) => {
      setTasks(
        tasks.sort((a: TaskSchema, b: TaskSchema) => {
          const aDate = new Date(a.createdAt);
          const bDate = new Date(b.createdAt);
          const aOrder = a.order ?? 0;
          const bOrder = b.order ?? 0;
          return aOrder > bOrder
            ? -1
            : aOrder < bOrder
            ? 1
            : aDate.getTime() < bDate.getTime()
            ? -1
            : 1;
        })
      );
    });
  }, [setTasks, search, guestUserId]);

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

  return {
    tasks,
    search,
    makeEditable,
    addTask,
    setSearch,
    setTasks,
    reloadTasks,
  };
}
