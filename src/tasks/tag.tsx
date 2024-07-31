import { TagName, Tags } from "./crud";
import { TaskDataType } from "./meta/types";
import { StyledTag } from "./styled";
import { useCallback, useState } from "react";

export function TaskTag(args: { task: TaskDataType }) {
  const { task } = args;
  return task.editable ? (
    <TaskTagForm task={task} />
  ) : (
    <TaskTagRead task={task} />
  );
}

export function TaskTagRead(args: { task: TaskDataType }) {
  const { task } = args;
  return (
    task.tag && (
      <StyledTag variant={task.tag}>{task.tag.formatLabel()}</StyledTag>
    )
  );
}

export function TaskTagForm(args: { task: TaskDataType }) {
  const { task } = args;
  const [tag, setTag] = useState(task.tag ?? undefined);

  const updateTag = useCallback(
    (curr?: TagName) => {
      setTag((prev?: TagName) => {
        if (curr === prev) curr = undefined;
        task.tag = curr;
        return curr;
      });
    },
    [task]
  );

  return (
    <>
      <label>Tag</label>
      <br />
      {Tags.map((tagName: TagName, key: number) => {
        return (
          <StyledTag
            key={key}
            variant={tagName}
            selected={tagName === tag}
            onClick={() => {
              updateTag(tagName);
            }}
          >
            {tagName.formatLabel()}
          </StyledTag>
        );
      })}
    </>
  );
}
