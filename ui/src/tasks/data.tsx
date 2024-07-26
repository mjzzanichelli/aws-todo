import { createContext } from "react";
import { TableDataType } from "../components/table/types";

export interface TaskDataType extends TableDataType {
  name: string;
  done?: boolean;
}

export const TasksContext = createContext<TaskDataType[]>([
  {
    name: "foo",
  },
  {
    name: "bar",
    done: true,
  },
]);
