import { Fragment, useCallback, useEffect, useState } from "react";
import { Button } from "../components/button/main";
import { Icon } from "../components/icon/main";
import { TaskDataType } from "./meta";
import { Input } from "../components/form/input";
import { FlexBox, FlexContainer } from "../components/layout/styled";
import { StyledTagInputContainer } from "./styled";

export function TaskTags(args: { task: TaskDataType }) {
  const { task } = args;
  return task.editable ? (
    <TaskTagsForm task={task} />
  ) : (
    <TaskTagsRead task={task} />
  );
}

export function TaskTagsRead(args: { task: TaskDataType }) {
  const { task } = args;
  return (
    <>
      {task.tags?.map((tag: string | null, i: number) => {
        return (
          tag && (
            <Fragment key={i}>
              <span>{tag}</span>
              <br />
            </Fragment>
          )
        );
      })}
    </>
  );
}

export function TaskTagsForm(args: { task: TaskDataType }) {
  const { task } = args;
  const [tags, setTags] = useState(task.tags ?? []);

  const removeTag = useCallback(
    (i: number) => () => {
      const filter = [...tags];
      filter.splice(i, 1);
      setTags(filter);
    },
    [tags]
  );

  const updateTag = useCallback(
    (i: number) =>
      (value = "") => {
        tags[i] = value;
        setTags([...tags]);
      },
    [tags]
  );

  const addTag = useCallback(() => {
    setTags([...tags, null]);
  }, [tags]);

  useEffect(() => {
    task.tags = tags.filter((item: string | null) => !!item);
  }, [tags, task]);

  return (
    <>
      {tags.map((tag: string | null, i: number) => {
        return (
          <FlexContainer key={i}>
            <StyledTagInputContainer>
              <Input defaultValue={tag ?? ""} onChange={updateTag(i)} />
            </StyledTagInputContainer>
            <FlexBox size="none">
              <Button onClick={removeTag(i)}>
                <Icon name="trash-can" />
              </Button>
            </FlexBox>
          </FlexContainer>
        );
      })}
      <Button onClick={addTag}>
        <Icon name="plus" />
        <label>add tag</label>
      </Button>
    </>
  );
}
