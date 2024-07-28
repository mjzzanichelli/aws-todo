import { TableDataType, TableMetaType } from "../components/table/types";
import type { Schema } from "./../../amplify/data/resource";

export interface TaskSchema {
  id: string;
  name: string;
  dueDate?: string;
  tags: string[];
  attachment?: string;
  done?: boolean;
  editable?: boolean;
}

export type TaskDataType = TableDataType & TaskSchema;

export type TasksMetaType = TableMetaType<TaskDataType>;

export type TaskDataCreateType = Omit<TaskSchema, "id">;

export type TaskDataUpdateType = Partial<TaskSchema> & Pick<TaskSchema, "id">;
