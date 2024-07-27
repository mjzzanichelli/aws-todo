import { useContext } from "react";
import { FlexBoxCentered } from "../components/layout/styled";
import { Table } from "../components/table/main";
import { TasksContext } from "../hooks/tasks";
import { TaskDataType, TasksMetaType } from "./meta";

export function TasksTable(args: {
  meta?: TasksMetaType[];
  data?: TaskDataType[];
  title: string;
}) {
  const { meta, data, title } = args;
  if (!meta?.length || !data?.length) return null;
  return (
    <FlexBoxCentered as="section" display="flex" flexDirection="column">
      <h3 style={{ width: "100%", margin: 0 }}>{title}</h3>
      <Table meta={meta} data={data}></Table>
    </FlexBoxCentered>
  );
}

export function TasksEditor() {
  const { metaDone, metaTodo, tasks } = useContext(TasksContext);
  return (
    <>
      <TasksTable
        meta={metaTodo}
        title={"Tasks to do"}
        data={tasks?.filter((item) => !item.done)}
      />
      <TasksTable
        meta={metaDone}
        title={"Tasks done"}
        data={tasks?.filter((item) => !!item.done)}
      />
    </>
  );
}
