import { useContext } from "react";
import { FlexBox, FlexContainer } from "../components/layout/styled";
import { TaskCheck } from "./check";
import { TaskDateRead } from "./date";
import { TaskDetailsRead } from "./details";
import { TaskDataType } from "./meta/types";
import { StyledTaskInfo } from "./styled";
import { TaskTagRead } from "./tag";
import { AuthContext } from "../hooks/auth";

export function TaskInfo(args: { task: TaskDataType }) {
  const { user } = useContext(AuthContext);
  const { task } = args;
  return (
    <FlexContainer mobileDirection="row">
      {user && (
        <FlexBox mobileSize={"none"}>
          <TaskCheck task={task} />
        </FlexBox>
      )}
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
