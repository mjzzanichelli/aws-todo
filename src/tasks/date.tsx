import { TaskDataType } from "./meta";
import { Input } from "../components/form/input";
import { formatDate } from "../utils/helpers";

export function TaskDate(args: { task: TaskDataType }) {
  const { task } = args;
  if (!task.editable) return task.dueDate && formatDate(task.dueDate);
  return (
    <Input
      type="date"
      defaultValue={task.dueDate ?? undefined}
      onChange={(value) => {
        task.dueDate = value ?? null;
      }}
    />
  );
}
