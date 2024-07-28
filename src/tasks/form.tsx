import { uploadData } from "aws-amplify/storage";
import { Properties } from "../utils/types";
import { Button } from "../components/button/main";
import { FieldComponent } from "../components/form/field";
import { Input } from "../components/form/input";
import { FormComponent } from "../components/form/main";
import { FormEntries, FormEntriesType, useFormData } from "../hooks/form-data";
import { TaskDataCreateType } from "./types";
import { GlobalError } from "../hooks/error";

export function CreateTask(args: {
  onSubmit: (task: TaskDataCreateType) => void;
}) {
  const { onSubmit } = args;
  const formData = useFormData({
    // onChange: (values) => {
    //   const entries = getValuesEntries(values);
    //   const attachment = entries.files["attachment"];
    // },
    validation: (formEntries: FormEntries) => {
      const errors: Properties<string> = {};
      const { name } = formEntries.strings;
      if (!name) errors.name = "Invalid name";
      return errors;
    },
    onSubmit: async (entries: FormEntriesType) => {
      const { name, dueDate } = entries.strings;
      const { attachment } = entries.files;
      const task: TaskDataCreateType = {
        name: name!,
        dueDate,
        done: false,
      };
      if (!attachment) return onSubmit(task);
      try {
        const result = await uploadData({
          path: ({ identityId }) =>
            `attachments/${identityId}/${attachment.name}`,
          data: attachment,
        }).result;
        task.attachment = result.path;
        onSubmit(task);
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
        <Input type="file" />
      </FieldComponent>
      <br />
      <Button onClick={formData.submit}>Create Task</Button>
    </FormComponent>
  );
}
