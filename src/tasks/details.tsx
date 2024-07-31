import { useEffect, useState } from "react";
import { getUrl, list } from "aws-amplify/storage";
import { StyledTaskDetails, StyleTaskAttachment } from "./styled";
import { Input, InputFile } from "../components/form/input";
import { FlexBox, FlexContainer } from "../components/layout/styled";
import { TaskDataType } from "./meta/types";
import { FieldComponent } from "../components/form/field";
import { formatByteSize, formatDateTime } from "../utils/helpers";

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
  const [fileProps, setFileProps] = useState<{
    name?: string;
    size?: number;
    lastModified?: Date;
  }>();

  useEffect(() => {
    if (!task.attachment) return setLink(undefined);

    Promise.all([
      list({ path: task.attachment }),
      getUrl({
        path: task.attachment,
      }),
    ]).then(([{ items }, { url }]) => {
      const [file] = items;
      const name = file.path.split("/").pop();
      const { size, lastModified } = file;
      setFileProps({
        name,
        size,
        lastModified,
      });
      setLink(url.href);
    });
  }, [task.attachment]);

  let title = fileProps?.name;
  if (fileProps?.size) title = `${title} (${formatByteSize(fileProps.size)})`;
  if (fileProps?.lastModified)
    title = `${title} ${formatDateTime(fileProps.lastModified.toUTCString())}`;

  return (
    <StyledTaskDetails title={title}>
      {link && <StyleTaskAttachment href={link} target="_blank" />}
      {task.name}
    </StyledTaskDetails>
  );
}

export function TaskDetailsForm(args: { task: TaskDataType }) {
  const { task } = args;
  return (
    <FlexContainer margin="-0.5rem 0 0 -0.5rem" flexDirection="column">
      <FlexBox margin="0.5rem 0 0 0.5rem">
        <FieldComponent id="name" label={"Task name"} variant="primary">
          <Input
            id="name"
            ref={(el) => el?.focus()}
            placeholder="Task name"
            fullWidth
            defaultValue={task.name}
            onChange={(value = "") => {
              task.name = value;
            }}
          />
        </FieldComponent>
      </FlexBox>
      <FlexBox margin="0.5rem 0 0 0.5rem">
        <FieldComponent id="attachment" variant="primary">
          <InputFile
            id="attachment"
            fullWidth
            onChange={(file) => {
              task.attachmentFile = file;
            }}
          />
        </FieldComponent>
      </FlexBox>
    </FlexContainer>
  );
}
