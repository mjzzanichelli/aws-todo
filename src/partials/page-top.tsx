import { useContext } from "react";
import { Button } from "../components/button/main";
import { FieldComponent } from "../components/form/field";
import { Input } from "../components/form/input";
import { Icon } from "../components/icon/main";
import { FlexBox } from "../components/layout/styled";
import { getValuesEntries, useFormData } from "../hooks/form-data";
import { createTask } from "../tasks/crud";
import { TasksContext } from "../hooks/tasks";
import { Confirmation } from "../hooks/confirmation";
import { CreateTask } from "../tasks/form";

export function PageTop() {
  const { reloadTasks } = useContext(TasksContext);
  const formData = useFormData({
    onChange: (values) => {
      console.log(getValuesEntries(values).strings);
    },
  });
  return (
    <>
      <FlexBox size={"none"} display="flex" flexDirection="row">
        <FlexBox as="h2" mobileSize={1} margin="0">
          My Tasks for next month
        </FlexBox>
        <FlexBox size={"none"}>
          <FieldComponent id="search" noLabel formData={formData}>
            <Input placeholder="Search" />
          </FieldComponent>
        </FlexBox>
      </FlexBox>
      <FlexBox size={"none"}>
        <Button
          onClick={() => {
            Confirmation.prompt((resolve) => {
              return (
                <CreateTask
                  onSubmit={(task) =>
                    createTask(task).then(reloadTasks).then(resolve)
                  }
                />
              );
            });
          }}
        >
          <Icon name="plus" />
          <label>Add task</label>
        </Button>
      </FlexBox>
    </>
  );
}
