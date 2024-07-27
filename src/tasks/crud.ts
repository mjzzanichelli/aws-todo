import { client } from "./../amplify";
import { TaskDataType } from "./meta";

export async function createTask() {
  const { data, errors } = await client.models.Tasks.create({
    name: "New Task",
  });
  if (errors) return;
  return data;
}

export async function getTask(id: string) {
  const { data, errors } = await client.models.Tasks.get({ id });
  if (errors) return;
  return data;
}

export async function listTasks() {
  const { data, errors } = await client.models.Tasks.list();
  if (errors) return;
  return data;
}

export async function updateTask(
  task: Partial<TaskDataType> & Pick<TaskDataType, "id">
) {
  const { data, errors } = await client.models.Tasks.update(task);
  if (errors) return;
  return data;
}

export async function deleteTask(task: Pick<TaskDataType, "id">) {
  const { data, errors } = await client.models.Tasks.delete(task);
  if (errors) return;
  return data;
}
