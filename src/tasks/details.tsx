import { useEffect, useState } from "react";
import { getUrl } from "aws-amplify/storage";
import {
  StyledFlexBoxInput,
  StyledTaskDetails,
  StyleTaskAttachment,
} from "./styled";
import { Input, InputFile } from "../components/form/input";
import { FlexContainer } from "../components/layout/styled";
import { TaskDataType } from "./meta/types";

export function TaskDetails(args: { task: TaskDataType }) {
  const { task } = args;
  return task.editable ? (
    <TaskDetailsForm task={task} />
  ) : (
    <TaskDetailsRead task={task} />
  );
}

export function TaskDetailsRead(args: { task: TaskDataType }) {
  const { task } = args;
  const [link, setLink] = useState<string>();

  useEffect(() => {
    if (!task.attachment) return setLink(undefined);
    getUrl({
      path: task.attachment,
    }).then(({ url }) => setLink(url.href));
  }, [task.attachment]);

  return (
    <StyledTaskDetails title={task.name}>
      {link && <StyleTaskAttachment href={link} target="_blank" />}
      {task.name}
    </StyledTaskDetails>
  );
}

export function TaskDetailsForm(args: { task: TaskDataType }) {
  const { task } = args;
  return (
    <FlexContainer margin="-0.5rem 0 0 -0.5rem" flexDirection="column">
      <StyledFlexBoxInput margin="0.5rem 0 0 0.5rem">
        <Input
          ref={(el) => el?.focus()}
          defaultValue={task.name}
          onChange={(value = "") => {
            task.name = value;
          }}
        />
      </StyledFlexBoxInput>
      <StyledFlexBoxInput margin="0.5rem 0 0 0.5rem">
        <InputFile
          onChange={(file) => {
            task.attachmentFile = file;
          }}
        />
      </StyledFlexBoxInput>
    </FlexContainer>
  );
}
