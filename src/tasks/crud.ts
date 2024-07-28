import { GlobalError } from "../hooks/error";
import { client } from "./../amplify";
import {
  TaskDataCreateType,
  TaskDataDeleteType,
  TaskDataUpdateType,
} from "./types";

export function setApiError(errors: { message: string }[]) {
  return GlobalError.setError(
    new Error(errors.map((item) => item.message).join("\n"))
  );
}

export async function createTask(task: TaskDataCreateType) {
  const { data, errors } = await client.models.Tasks.create(task);
  if (errors) return setApiError(errors);
  return data;
}

export async function getTask(id: string) {
  const { data, errors } = await client.models.Tasks.get({ id });
  if (errors) return setApiError(errors);
  return data;
}

export async function listTasks() {
  const { data, errors } = await client.models.Tasks.list();
  if (errors) return setApiError(errors);
  return data;
}

export async function updateTask(task: TaskDataUpdateType) {
  const { data, errors } = await client.models.Tasks.update(task);
  if (errors) return setApiError(errors);
  return data;
}

export async function deleteTask(task: TaskDataDeleteType) {
  const { data, errors } = await client.models.Tasks.delete(task);
  if (errors) return setApiError(errors);
  return data;
}
