import { useContext, useState } from "react";
import { Table } from "../components/table/main";
import { TasksTableMeta } from "./meta/table";
import { TasksListMeta } from "./meta/list";
import { Button } from "../components/button/main";
import { Icon } from "../components/icon/main";
import { StyledTasksTableSection } from "./styled";

import { updateTask } from "./crud";
import { AuthContext, ScreenContext, TasksContext } from "../context";

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
  const { isMobile } = useContext(ScreenContext);
  const { tasks, reloadTasks } = useContext(TasksContext);

  const [showData, setShowData] = useState(!done);

  const data = tasks?.filter((item) => Boolean(item.done) === done);

  const title = done ? "Tasks done" : "Tasks to do";
  const meta = isMobile
    ? TasksListMeta
    : TasksTableMeta({ done: !done, isOwner: !!user });

  if (!data?.length) return null;
  return (
    <StyledTasksTableSection>
      <h3>
        {title}&nbsp;({data.length})
        <Button slim outlined onClick={() => setShowData(!showData)}>
          <Icon name="chevron-up" rotate={showData ? "bottom" : "top"} />
        </Button>
      </h3>
      {showData && (
        <Table
          meta={meta}
          data={data}
          outlined
          hideHeader={isMobile}
          draggable={
            !user || !tasks
              ? undefined
              : (start, end) => {
                  const newData = [...tasks];
                  const startIndex = newData.indexOf(start);
                  newData.splice(startIndex, 1);
                  const endIndex = newData.indexOf(end);
                  newData.splice(
                    endIndex + (endIndex >= startIndex ? 1 : 0),
                    0,
                    start
                  );
                  Promise.all(
                    newData
                      .reverse()
                      .map(({ id }, order) => updateTask({ id, order }))
                  ).then(reloadTasks);
                }
          }
        />
      )}
    </StyledTasksTableSection>
  );
}
