import { FlexBox, FlexContainer } from "../components/layout/styled";
import { TaskCheck } from "./check";
import { TaskDateRead } from "./date";
import { TaskDetailsRead } from "./details";
import { TaskDataType } from "./meta/types";
import { StyledTaskInfo } from "./styled";
import { TaskTagRead } from "./tag";

export function TaskInfo(args: { task: TaskDataType }) {
  const { task } = args;
  return (
    <FlexContainer mobileDirection="row">
      <FlexBox mobileSize={"none"}>
        <TaskCheck task={task} />
      </FlexBox>
      <StyledTaskInfo>
        <FlexBox>
          <TaskDetailsRead task={task} />
        </FlexBox>
        <FlexBox>
          <TaskDateRead task={task} />
        </FlexBox>
        <FlexBox>
          <TaskTagRead task={task} />
        </FlexBox>
      </StyledTaskInfo>
    </FlexContainer>
  );
}
