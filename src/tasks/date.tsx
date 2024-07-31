import { FieldComponent } from "../components/form/field";
import { Input } from "../components/form/input";
import { formatDate } from "../utils/helpers";
import { TaskDataType } from "./meta/types";

export function TaskDate(args: { task: TaskDataType }) {
  const { task } = args;
  if (!task.editable) return <TaskDateRead task={task} />;
  return <TaskDateForm task={task} />;
}

export function TaskDateRead(args: { task: TaskDataType }) {
  const { task } = args;
  return task.dueDate && formatDate(task.dueDate);
}

export function TaskDateForm(args: { task: TaskDataType }) {
  const { task } = args;
  return (
    <FieldComponent id="dueDate" label="Due date" variant="primary">
      <Input
        id="dueDate"
        type="date"
        placeholder="Due date"
        defaultValue={task.dueDate ?? undefined}
        onChange={(value) => {
          task.dueDate = value ?? null;
        }}
      />
    </FieldComponent>
  );
}
