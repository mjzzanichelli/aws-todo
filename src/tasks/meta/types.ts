import { uploadData } from "aws-amplify/storage";
import { TableMetaType } from "../../components/table/types";
import { TaskSchema, TaskSchemaUpdate } from "../crud";

export interface TaskDataType extends TaskSchema {
  editable?: boolean;
  attachmentFile?: File;
}

export type TasksMetaType = TableMetaType<TaskDataType>;

export async function getTaskValues(
  task: TaskDataType
): Promise<TaskSchemaUpdate> {
  const { id, name, attachment, attachmentFile, done, dueDate, tag } = task;
  let result;
  if (attachmentFile) {
    result = await uploadData({
      path: ({ identityId }) =>
        `attachments/${identityId}/${attachmentFile.name}`,
      data: attachmentFile,
    }).result;
  }
  return Promise.resolve({
    id,
    name,
    attachment: result?.path || attachment,
    done,
    dueDate,
    tag,
  });
}