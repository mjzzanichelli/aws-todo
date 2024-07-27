import { client } from "./../amplify";
import { TaskDataType } from "./meta";

export async function createTask() {
  const { data, errors } = await client.models.Todo.create({
    name: "New Task",
  });
  if (errors) return;
  return data;
}

export async function getTask(id: string) {
  const { data, errors } = await client.models.Todo.get({ id });
  if (errors) return;
  return data;
}

export async function listTasks() {
  const { data, errors } = await client.models.Todo.list();
  if (errors) return;
  return data;
}

export async function updateTask(
  task: Partial<TaskDataType> & Pick<TaskDataType, "id">
) {
  const { data, errors } = await client.models.Todo.update(task);
  if (errors) return;
  return data;
}

export async function deleteTask(task: Pick<TaskDataType, "id">) {
  const { data, errors } = await client.models.Todo.delete(task);
  if (errors) return;
  return data;
}
