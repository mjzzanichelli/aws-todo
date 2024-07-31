import {
  FlexBox,
  FlexBoxCentered,
  FlexContainer,
} from "../components/layout/styled";
import { TaskDateForm } from "./date";
import { TaskDetailsForm } from "./details";
import { getTaskValues, TaskDataType } from "./meta/types";
import { StyledTaskInfo } from "./styled";
import { TaskTagForm } from "./tag";
import { Button } from "../components/button/main";
import { Icon } from "../components/icon/main";
import { Confirmation } from "../hooks/confirmation";
import { deleteTask, updateTask } from "./crud";
import { GlobalError } from "../hooks/error";

export function TaskForm(args: {
  task: TaskDataType;
  onSave: (value: TaskDataType) => void;
  onDelete: (isDeleted?: boolean) => void;
}) {
  const { task, onSave, onDelete } = args;
  return (
    <>
      <FlexContainer flexDirection="column" padding={"1rem"}>
        <StyledTaskInfo>
          <FlexBox>
            <TaskDetailsForm task={task} />
          </FlexBox>
          <FlexBox margin={"1rem 0 0"}>
            <TaskDateForm task={task} />
          </FlexBox>
          <FlexBox margin={"1rem 0 0"}>
            <TaskTagForm task={task} />
          </FlexBox>
        </StyledTaskInfo>
        <FlexBoxCentered
          display="flex"
          mobileDirection="row"
          flexDirection="row"
          margin={"1rem 0 0"}
        >
          <FlexBox size={"none"}>
            <Button
              variant="success"
              outlined
              onClick={() =>
                getTaskValues(task)
                  .then(updateTask)
                  .then(
                    () => onSave(task),
                    (e) => {
                      GlobalError.setError(e);
                    }
                  )
              }
            >
              <Icon name="floppy-disk" />
            </Button>
          </FlexBox>
          <FlexBox size={"none"}>
            <Button
              variant="error"
              outlined
              onClick={() =>
                deleteTask(task.id).then(
                  () => onDelete(true),
                  (e) => {
                    GlobalError.setError(e);
                  }
                )
              }
            >
              <Icon name="trash-can" />
            </Button>
          </FlexBox>
        </FlexBoxCentered>
      </FlexContainer>
    </>
  );
}

export function promptTaskForm(task: TaskDataType) {
  return Confirmation.prompt<TaskDataType, boolean>((resolve, reject) => {
    return (
      <>
        <TaskForm task={task} onSave={resolve} onDelete={reject} />
      </>
    );
  });
}
