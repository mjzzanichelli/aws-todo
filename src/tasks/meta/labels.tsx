import { useContext } from "react";
import { TasksContext } from "../../context";
import { CheckBox } from "../../components/form/input";
import { Icon } from "../../components/icon/main";
import { IconName } from "../../components/icon/types";
import { updateTask } from "../crud";
import { GlobalError } from "../../hooks/error";

export function MetaLabel(args: { icon?: IconName; children: string }) {
  const { children, icon } = args;
  return (
    <>
      {icon && <Icon name={icon} style={{ marginRight: "0.5rem" }} />}
      {children}
    </>
  );
}

export function MetaCheckLabel(args: { done?: boolean }) {
  const { tasks, reloadTasks } = useContext(TasksContext);
  const { done = true } = args;
  return (
    <CheckBox
      variant="primary"
      key={Math.random()}
      defaultChecked={false}
      onChange={() => {
        const todo = tasks?.filter((item) => !!item.done !== done);
        if (!todo?.length) return;
        Promise.all(todo.map(({ id }) => updateTask({ id, done }))).then(
          reloadTasks,
          (e) => {
            GlobalError.setError(e);
          }
        );
      }}
    />
  );
}
