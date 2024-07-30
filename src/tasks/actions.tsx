import { useContext } from "react";
import { Button } from "../components/button/main";
import { Icon } from "../components/icon/main";
import { Confirmation } from "../hooks/confirmation";
import { Void } from "../utils/helpers";
import { deleteTask } from "./crud";
import { TaskDataType } from "./meta/types";
import { TasksContext } from "../hooks/tasks";

export function TaskActions(args: { task: TaskDataType }) {
  const { makeEditable, reloadTasks } = useContext(TasksContext);
  const { task } = args;
  const { id } = task;
  if (!makeEditable) return null;
  return (
    <>
      <Button
        outlined
        slim
        onClick={() => {
          makeEditable(task);
        }}
      >
        <Icon name={task.editable ? "floppy-disk" : "pen"} />
      </Button>
      &nbsp;
      <Button
        outlined
        slim
        onClick={() => {
          Confirmation.prompt((resolve, reject) => {
            return (
              <>
                <strong>{task.name}</strong>
                <p>Are you sure you want to delete?</p>
                <div>
                  <Button variant="success" onClick={resolve}>
                    Confirm
                  </Button>
                  &nbsp;
                  <Button variant="error" onClick={reject}>
                    Cancel
                  </Button>
                </div>
              </>
            );
          }).then(() => deleteTask(id).then(reloadTasks), Void);
        }}
      >
        <Icon name="trash-can" />
      </Button>
    </>
  );
}
