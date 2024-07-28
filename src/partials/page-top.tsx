import { useContext } from "react";
import { Button } from "../components/button/main";
import { Input } from "../components/form/input";
import { Icon } from "../components/icon/main";
import { FlexBox } from "../components/layout/styled";
import { createTask } from "../tasks/crud";
import { TasksContext } from "../hooks/tasks";
import { Confirmation } from "../hooks/confirmation";
import { CreateTask } from "../tasks/form";
import { Void } from "../utils/helpers";

export function PageTop() {
  const { search, setSearch, reloadTasks } = useContext(TasksContext);

  return (
    <>
      <FlexBox size={"none"} display="flex" flexDirection="row">
        <FlexBox as="h2" mobileSize={1} margin="0">
          My Tasks for next month
        </FlexBox>
        <FlexBox size={"none"}>
          <Input
            placeholder="Search"
            defaultValue={search}
            onChange={setSearch}
          />
        </FlexBox>
      </FlexBox>
      <FlexBox size={"none"}>
        <Button
          onClick={() => {
            Confirmation.prompt(
              (resolve) => {
                return (
                  <CreateTask
                    onSubmit={(task) =>
                      createTask(task).then(reloadTasks).then(resolve)
                    }
                  />
                );
              },
              { title: "Create new task" }
            ).catch(Void);
          }}
        >
          <Icon name="plus" />
          <label>Add task</label>
        </Button>
      </FlexBox>
    </>
  );
}
