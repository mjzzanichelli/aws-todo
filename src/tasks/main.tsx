import { useContext } from "react";
import { useResizable } from "../hooks/resizable";
import { useThemeSwitch } from "../hooks/theme-switch";
import { TasksContext } from "../hooks/tasks";
import { Table } from "../components/table/main";
import { StyledTableSection } from "../components/table/styled";
import { TasksTableMeta } from "./meta/table";
import { TasksListMeta } from "./meta/list";

export function TasksTable(args: { done?: boolean }) {
  const { done = false } = args;
  const { size, ref } = useResizable<HTMLDivElement>();
  const { tasks } = useContext(TasksContext);
  const { theme } = useThemeSwitch();

  const data = size && tasks?.filter((item) => Boolean(item.done) === done);

  const isSmall = size && size.width < theme.sizes.md ? true : false;
  const title = done ? "Tasks done" : "Tasks to do";
  const meta = isSmall ? TasksListMeta : TasksTableMeta(!done);

  return (
    <StyledTableSection as="section" ref={ref}>
      <h3>{title}</h3>
      {data && (
        <Table meta={meta} data={data} outlined hideHeader={isSmall}></Table>
      )}
    </StyledTableSection>
  );
}

export function Tasks() {
  return (
    <>
      <TasksTable />
      <TasksTable done />
    </>
  );
}
