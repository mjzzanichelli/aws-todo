import { useEffect, useState } from "react";
import { getUrl } from "aws-amplify/storage";
import { TaskDataType } from "./meta";
import { StyledFlexBoxInput, StyleTaskAttachment } from "./styled";
import { Input, InputFile } from "../components/form/input";
import { FlexContainer } from "../components/layout/styled";

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
    <>
      {link && <StyleTaskAttachment href={link} target="_blank" />}
      {task.name}
    </>
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
