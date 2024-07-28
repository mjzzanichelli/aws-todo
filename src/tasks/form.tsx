import { uploadData } from "aws-amplify/storage";
import { Properties } from "../utils/types";
import { Button } from "../components/button/main";
import { FieldComponent } from "../components/form/field";
import { Input, InputFile } from "../components/form/input";
import { FormComponent } from "../components/form/main";
import { FormEntries, FormEntriesType, useFormData } from "../hooks/form-data";
import { GlobalError } from "../hooks/error";
import { TaskSchemaCreate } from "./crud";

export function CreateTask(args: {
  onSubmit: (task: TaskSchemaCreate) => void;
}) {
  const { onSubmit } = args;
  const formData = useFormData({
    validation: (formEntries: FormEntries) => {
      const errors: Properties<string> = {};
      const { name } = formEntries.strings;
      if (!name) errors.name = "Invalid name";
      return errors;
    },
    onSubmit: async (entries: FormEntriesType) => {
      const { name, dueDate } = entries.strings;
      const { tags = [] } = entries.stringArrays;
      const { attachment } = entries.files;
      const task: TaskSchemaCreate = {
        name: name!,
        dueDate,
        tags,
        done: false,
      };
      if (!attachment) return onSubmit(task);
      try {
        const result = await uploadData({
          path: ({ identityId }) =>
            `attachments/${identityId}/${attachment.name}`,
          data: attachment,
        }).result;
        onSubmit({ ...task!, attachment: result.path });
      } catch (e) {
        GlobalError.setError(new Error("File upload failed"));
      }
    },
  });
  return (
    <FormComponent formData={formData} style={{ margin: "1rem" }}>
      <FieldComponent id="name"></FieldComponent>
      <FieldComponent id="dueDate">
        <Input type="date" />
      </FieldComponent>
      <FieldComponent id="attachment">
        <InputFile />
      </FieldComponent>
      <br />
      <Button onClick={formData.submit}>Create Task</Button>
    </FormComponent>
  );
}
