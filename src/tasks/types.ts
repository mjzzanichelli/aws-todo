import { TableDataType, TableMetaType } from "../components/table/types";

export interface TaskSchema {
  id: string;
  name: string;
  dueDate?: string;
  attachment?: string;
  done?: boolean;
  editable?: boolean;
}

export interface TaskDataType extends TableDataType {
  id: string;
  name: string;
  dueDate?: string;
  attachment?: string;
  done?: boolean;
  editable?: boolean;
}

export type TasksMetaType = TableMetaType<TaskDataType>;

export type TaskDataCreateType = Omit<TaskSchema, "id">;

export type TaskDataUpdateType = Partial<TaskSchema> & Pick<TaskSchema, "id">;

export type TaskDataDeleteType = Pick<TaskSchema, "id">;
