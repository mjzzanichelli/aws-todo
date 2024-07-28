import { useEffect, useState } from "react";
import { getUrl } from "aws-amplify/storage";
import { TaskDataType } from "./meta";
import { StyleTaskAttachment } from "./styled";

export function TaskDetails(args: { task: TaskDataType }) {
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
