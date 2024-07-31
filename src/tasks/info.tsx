import { FlexBox, FlexContainer } from "../components/layout/styled";
import { TaskCheck } from "./check";
import { TaskDateRead } from "./date";
import { TaskDetailsRead } from "./details";
import { TaskDataType } from "./meta/types";
import { StyledTaskInfo } from "./styled";
import { TaskTagRead } from "./tag";
import { TasksOwner } from "./owner";

export function TaskInfo(args: { task: TaskDataType }) {
  const { task } = args;
  return (
    <FlexContainer mobileDirection="row">
      <TasksOwner>
        <FlexBox mobileSize={"none"} margin={"0 1rem 0 0"}>
          <TaskCheck task={task} />
        </FlexBox>
      </TasksOwner>
      <StyledTaskInfo>
        <FlexBox>
          <TaskDetailsRead task={task} />
        </FlexBox>
        {task.dueDate && (
          <FlexBox>
            <TaskDateRead task={task} />
          </FlexBox>
        )}
        {task.tag && (
          <FlexBox>
            <TaskTagRead task={task} />
          </FlexBox>
        )}
      </StyledTaskInfo>
    </FlexContainer>
  );
}
