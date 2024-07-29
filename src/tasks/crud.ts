import { setApiError } from "../hooks/error";
import { client } from "./../amplify";

export type TaskSchemaCreate = Parameters<
  typeof client.models.Tasks.create
>["0"];

export async function createTask(task: TaskSchemaCreate) {
  const { data, errors } = await client.models.Tasks.create(task);
  if (errors) return setApiError(errors);
  if (data === null) return setApiError([{ message: "Task not created" }]);
  return data;
}

export type TaskSchema = Awaited<ReturnType<typeof createTask>>;

export async function getTask(id: string): Promise<TaskSchema> {
  const { data, errors } = await client.models.Tasks.get({ id });
  if (errors) return setApiError(errors);
  if (data === null) return setApiError([{ message: "Task not found" }]);
  return data;
}

export async function listTasks(
  ...params: Parameters<typeof client.models.Tasks.list>
) {
  const { data, errors } = await client.models.Tasks.list(...params);
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

export const Tags = client.enums.Tags.values();

// const weather = await getWeather("London");
