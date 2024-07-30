import { useContext } from "react";
import { CheckBox } from "../components/form/input";
import { updateTask } from "./crud";
import { TaskDataType } from "./meta/types";
import { TasksContext } from "../hooks/tasks";

export function TaskCheck(args: { task: TaskDataType }) {
  const { task } = args;
  const { reloadTasks } = useContext(TasksContext);
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
}
