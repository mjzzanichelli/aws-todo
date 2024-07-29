import { useContext } from "react";
import { Table } from "../components/table/main";
import { TasksContext } from "../hooks/tasks";
import { StyledTableSection } from "../components/table/styled";
import { TaskDataType, TasksMetaType } from "./meta";
import { ResizableContainer } from "../components/resizable/main";

export function TasksTable(args: {
  meta?: TasksMetaType[];
  data?: TaskDataType[];
  title: string;
}) {
  const { meta, data, title } = args;
  if (!meta?.length || !data?.length) return null;
  return (
    <StyledTableSection as="section">
      <h3>{title}</h3>
      <Table meta={meta} data={data}></Table>
    </StyledTableSection>
  );
}

export function TasksEditor() {
  const { metaDone, metaTodo, tasks } = useContext(TasksContext);
  return (
    <ResizableContainer>
      {({ width, height }) => {
        console.log(width, height);

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
      }}
    </ResizableContainer>
  );
}
