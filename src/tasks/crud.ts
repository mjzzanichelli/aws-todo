import { GlobalError } from "../hooks/error";
import { client } from "./../amplify";

export function setApiError(errors: { message: string }[]) {
  GlobalError.setError(
    new Error(errors.map((item) => item.message).join("\n"))
  );
  return Promise.reject(errors);
}

export type TaskSchemaCreate = Parameters<
  typeof client.models.Tasks.create
>["0"];

export async function createTask(task: TaskSchemaCreate) {
  const { data, errors } = await client.models.Tasks.create(task);
  if (errors) return setApiError(errors);
  return data;
}

export async function getTask(id: string) {
  const { data, errors } = await client.models.Tasks.get({ id });
  if (errors) return setApiError(errors);
  if (data === null) return setApiError([{ message: "Task not found" }]);
  return data;
}

export type TaskSchema = Awaited<ReturnType<typeof getTask>>;

export async function listTasks() {
  const { data, errors } = await client.models.Tasks.list();
  if (errors) return setApiError(errors);
  return data;
}

export type TaskSchemaUpdate = Parameters<
  typeof client.models.Tasks.update
>["0"];

export async function updateTask(task: TaskSchemaUpdate) {
  const { data, errors } = await client.models.Tasks.update(task);
  if (errors) return setApiError(errors);
  return data;
}

export async function deleteTask(id: string) {
  const { errors } = await client.models.Tasks.delete({ id });
  if (errors) return setApiError(errors);
  return true;
}
