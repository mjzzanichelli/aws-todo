import { useEffect, useState } from "react";
import { getUrl } from "aws-amplify/storage";
import { TaskDataType } from "./meta";
import { StyleTaskAttachment } from "./styled";
import { Input, InputFile } from "../components/form/input";
import { FlexBox, FlexContainer } from "../components/layout/styled";

export function TaskDetails(args: { task: TaskDataType }) {
  const { task } = args;
  return task.editable ? <TaskDetailsForm task={task} /> : <TaskDetailsRead task={task} />;
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
      {task.name}
      {link && <StyleTaskAttachment href={link} target="_blank" />}
    </>
  );
}

export function TaskDetailsForm(args: { task: TaskDataType }) {
  const { task } = args;
  return (
    <FlexContainer margin="-0.5rem 0 0 -0.5rem">
      <FlexBox margin="0.5rem 0 0 0.5rem">
        <Input
          ref={(el) => el?.focus()}
          defaultValue={task.name}
          onChange={(value = "") => {
            task.name = value;
          }}
        />
      </FlexBox>
      <FlexBox margin="0.5rem 0 0 0.5rem">
        <InputFile
          onChange={(file) => {
            task.attachmentFile = file;
          }}
        />
      </FlexBox>
    </FlexContainer>
  );
}
