import { useContext } from "react";
import { TasksContext } from "../context";
import { CheckBox } from "../components/form/input";
import { TaskDataType } from "./meta/types";
import { updateTask } from "./crud";

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
