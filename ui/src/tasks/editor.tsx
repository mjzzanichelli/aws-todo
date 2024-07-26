import { useContext, useEffect, useState } from "react";
import { CheckBox } from "../components/form/input";
import { FlexBoxCentered } from "../components/layout/styled";
import { Table } from "../components/table/main";
import { TaskDataType, TasksContext } from "./data";
import { TasksMeta, TasksMetaType } from "./meta";
import { StyledTableCellStyckyLeft } from "../components/table/styled";

export function useTasksMeta(meta: TasksMetaType[]) {
  const initialTasks = useContext(TasksContext);
  const [tasks, setTasks] = useState(initialTasks);

  const checkMeta: TasksMetaType = {
    key: "done",
    thStyled: (
      <StyledTableCellStyckyLeft align="center" style={{ width: "2.5rem" }} />
    ),
    tdStyled: <StyledTableCellStyckyLeft align="center" />,
    value: (data) => {
      return (
        <CheckBox
          key={Math.random()}
          defaultChecked={data.done}
          onClick={() => {
            const currentTask = tasks.find((item) => item === data);
            if (!currentTask) return;
            currentTask.done = !data.done;
            setTasks([...tasks]);
          }}
        />
      );
    },
  };

  const checkMetaTodo: TasksMetaType = {
    ...checkMeta,
    label: (
      <CheckBox
        key={Math.random()}
        defaultChecked={false}
        onClick={() => {
          setTasks(
            tasks.map((item) => {
              item.done = true;
              return item;
            })
          );
        }}
      />
    ),
  };

  const checkMetaDone: TasksMetaType = {
    ...checkMeta,
    label: (
      <CheckBox
        key={Math.random()}
        defaultChecked={false}
        onClick={() => {
          setTasks(
            tasks.map((item) => {
              item.done = false;
              return item;
            })
          );
        }}
      />
    ),
  };

  return {
    tasks,
    setTasks,
    metaTodo: [checkMetaTodo, ...meta],
    metaDone: [checkMetaDone, ...meta],
  };
}

export function TasksTable(args: {
  meta: TasksMetaType[];
  data: TaskDataType[];
  title: string;
}) {
  const { meta, data, title } = args;
  return (
    <FlexBoxCentered as="section" display="flex" flexDirection="column">
      <h3 style={{ width: "100%", margin: 0 }}>{title}</h3>
      <Table meta={meta} data={data}></Table>
    </FlexBoxCentered>
  );
}

export function TasksEditor() {
  const { metaDone, metaTodo, tasks } = useTasksMeta(TasksMeta);
  return (
    <TasksContext.Provider value={tasks}>
      <TasksTable
        meta={metaTodo}
        title={"Tasks to do"}
        data={tasks.filter((item) => !item.done)}
      />
      <TasksTable
        meta={metaDone}
        title={"Tasks done"}
        data={tasks.filter((item) => !!item.done)}
      />
    </TasksContext.Provider>
  );
}
