import { TasksMetaType } from "./types";
import { TaskInfo } from "../info";

export const TasksListMeta: TasksMetaType[] = [
  {
    key: "info",
    value: (task) => {
      return <TaskInfo task={task} />;
    },
  },
];
