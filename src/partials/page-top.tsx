import { useContext } from "react";
import { Button } from "../components/button/main";
import { Input } from "../components/form/input";
import { Icon } from "../components/icon/main";
import { FlexBox } from "../components/layout/styled";
import { createTask } from "../tasks/crud";
import { TasksContext } from "../hooks/tasks";

export function PageTop() {
  const { search, addTask, setSearch } = useContext(TasksContext);

  return (
    <>
      <FlexBox
        size={"none"}
        display="flex"
        flexDirection="row"
        mobileDirection="column"
      >
        <FlexBox as="h2" size={1} margin="0">
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
          variant="primary"
          onClick={() => {
            createTask({ name: "" }).then(addTask);
          }}
        >
          <Icon name="plus" />
          <label>Add task</label>
        </Button>
      </FlexBox>
    </>
  );
}
