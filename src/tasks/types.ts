import { TableDataType, TableMetaType } from "../components/table/types";

export interface TaskSchema {
  id: string;
  name: string;
  dueDate?: string;
  attachment?: string;
  done?: boolean;
  editable?: boolean;
}

export type TaskKeys = keyof TaskSchema;

export type TaskDataType = TableDataType & TaskSchema;

export type TasksMetaType = TableMetaType<TaskDataType>;

export type TaskDataCreateType = Omit<TaskSchema, "id">;

export type TaskDataUpdateType = Partial<TaskSchema> & Pick<TaskSchema, "id">;
