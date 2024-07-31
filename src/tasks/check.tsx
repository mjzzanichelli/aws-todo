import { useContext } from "react";
import { TasksContext } from "../context";
import { CheckBox } from "../components/form/input";
import { TaskDataType } from "./meta/types";
import { updateTask } from "./crud";
import { GlobalError } from "../hooks/error";

export function TaskCheck(args: { task: TaskDataType }) {
  const { task } = args;
  const { reloadTasks } = useContext(TasksContext);
  const { id } = task;
  let { done } = task;
  done = done ?? false;
  return (
    <CheckBox
      key={id}
      variant="primary"
      defaultChecked={done}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onChange={() => {
        updateTask({ id, done: !done }).then(reloadTasks, (e) => {
          GlobalError.setError(e);
        });
      }}
    />
  );
}
