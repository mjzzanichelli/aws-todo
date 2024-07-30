import { useContext, useState } from "react";
import { useResizable } from "../hooks/resizable";
import { useThemeSwitch } from "../hooks/theme-switch";
import { TasksContext } from "../hooks/tasks";
import { Table } from "../components/table/main";
import { TasksTableMeta } from "./meta/table";
import { TasksListMeta } from "./meta/list";
import { Button } from "../components/button/main";
import { Icon } from "../components/icon/main";
import { StyledTasksTableSection } from "./styled";
import { AuthContext } from "../hooks/auth";

export function Tasks() {
  return (
    <>
      <TasksList />
      <TasksList done />
    </>
  );
}

export function TasksList(args: { done?: boolean }) {
  const { done = false } = args;
  const { user } = useContext(AuthContext);
  const { size, ref } = useResizable<HTMLDivElement>();
  const { tasks } = useContext(TasksContext);
  const { theme } = useThemeSwitch();
  const [showData, setShowData] = useState(!done);

  const data = tasks?.filter((item) => Boolean(item.done) === done);

  const isSmall = size && size.width < theme.sizes.md ? true : false;
  const title = done ? "Tasks done" : "Tasks to do";
  const meta = isSmall
    ? TasksListMeta
    : TasksTableMeta({ done: !done, editable: !!user });

  if (!data?.length) return null;
  return (
    <StyledTasksTableSection ref={ref}>
      <h3>
        {title}
        <Button slim outlined onClick={() => setShowData(!showData)}>
          <Icon name="chevron-up" rotate={showData ? "bottom" : "top"} />
        </Button>
      </h3>
      {showData && (
        <Table
          meta={meta}
          data={data}
          outlined
          hideHeader={isSmall}
          draggable={
            !user
              ? undefined
              : (start, end) => {
                  console.log(start, end);
                }
          }
        />
      )}
    </StyledTasksTableSection>
  );
}
