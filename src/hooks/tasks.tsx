import { useCallback, useContext, useEffect, useState } from "react";
import { deleteTask, listTasks, TaskSchema, updateTask } from "../tasks/crud";
import { getTaskValues, TaskDataType } from "../tasks/meta/types";
import { AuthContext, ScreenContext } from "../context";
import { promptTaskForm } from "../tasks/form";

export function orderTasks(tasks: TaskSchema[]): TaskDataType[] {
  return tasks.sort((a, b) => {
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
  });
}

export function useTasks() {
  const { guestUserId } = useContext(AuthContext);
  const { isMobile } = useContext(ScreenContext);
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
      setTasks(orderTasks(tasks));
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
      if (isMobile) {
        promptTaskForm(task)
          .catch((deleted) => {
            return !deleted && deleteTask(task.id);
          })
          .finally(reloadTasks);
      } else
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
    [tasks, setTasks, reloadTasks, isMobile]
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
