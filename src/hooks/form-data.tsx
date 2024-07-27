
import { useEffect, useState } from "react";
import { hasKeys, prettyJson, randomString } from "../utils/helpers";
import { JsonProperties, Properties } from "../utils/types";
import { isJsonProperties } from "../utils/guardians";

export type FormDataType<T = unknown> = ReturnType<typeof useFormData<T>>;

export type FormDataValue = FormDataEntryValue | null | undefined;

export type FormValuesType = Properties<FormDataValue>;

export type FormDefaultValuesType = Properties<FormDataValue | unknown>;

export class FormEntries {
  strings: Properties<string | undefined> = {};
  numbers: Properties<number | undefined> = {};
  booleans: Properties<boolean | undefined> = {};
  jsons: Properties<JsonProperties | undefined> = {};
  stringArrays: Properties<string[] | undefined> = {};
  files: Properties<File | undefined> = {};
  constructor(formData: FormData) {
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") {
        const stringValue = value.trim();

        this.strings[key] = stringValue;
        this.stringArrays[key] = stringValue.split(";");
        const numeric = parseFloat(value);
        if (!isNaN(numeric)) this.numbers[key] = numeric;
        try {
          this.jsons[key] = JSON.parse(stringValue);
          if (typeof this.jsons[key] === "boolean")
            this.booleans[key] = Boolean(this.jsons[key]);
        } catch (e) {}
      } else {
        this.files[key] = value;
      }
    }
  }
}

export type FormEntriesType = InstanceType<typeof FormEntries>;

export function getValuesEntries(values: FormValuesType) {
  const formData = new FormData();
  for (const key in values) {
    const value = values[key];
    value === null || value === undefined
      ? formData.delete(key)
      : formData.set(key, value);
  }
  return new FormEntries(formData);
}

export function sanitizeFormValues(
  ...defaultValues: (FormDefaultValuesType | undefined)[]
) {
  let formValues: FormValuesType = {};
  for (const i in defaultValues) {
    const group = defaultValues[i];
    if (!group) continue;
    for (const i in group) {
      const value = group[i];
      if (value === undefined || value === null) continue;
      else if (value instanceof File) formValues[i] = value;
      else if (value instanceof Array) {
        formValues[i] = value.join(";");
      } else if (isJsonProperties(value))
        formValues[i] = prettyJson(value);
      else formValues[i] = String(value);
    }
  }
  return formValues;
}

export function getFormValues(
  ...entries: (FormEntriesType | undefined)[]
): FormValuesType {
  let formValues: FormValuesType = {};
  for (const i in entries) {
    const group = entries[i];
    if (!group) continue;
    for (const i in group.strings) {
      const value = group.strings[i];
      if (value === undefined) continue;
      formValues[i] = value;
    }
    for (const i in group.files) {
      const value = group.files[i];
      if (value === undefined) continue;
      formValues[i] = value;
    }
  }
  return formValues;
}

export function getFormData(obj: unknown) {
  const formData = new FormData();
  if (!obj) return formData;
  if (!(obj instanceof Object)) return formData;
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  for (const i in keys) {
    const key = keys[i];
    let value: string | unknown = values[i];
    if (value === undefined) continue;
    if (value instanceof Function) continue;
    if (value instanceof File) formData.set(key, value);
    else if (isJsonProperties(value))
      formData.set(key, prettyJson(value));
    else formData.set(key, String(value));
  }
  return formData;
}

export type FormValidation = (formEntries: FormEntries) => Properties<string>;

export function useFormData<T>(
  props: {
    validateOnInit?: boolean;
    onSubmit?: (entries: FormEntriesType) => Promise<T>;
    onChange?: (values: FormValuesType) => void;
    validation?: FormValidation;
  } = {}
) {
  const { onSubmit, onChange, validation, validateOnInit } = props;
  const [errors, setErrors] = useState<Properties<string>>({});
  const [formData, setFormData] = useState(new FormData());
  const [key, setKey] = useState<string>();

  function init(...formValues: (FormDefaultValuesType | undefined)[]) {
    const formData = new FormData();
    if (!formValues.length) return setFormData(formData);
    const defaultValue = sanitizeFormValues(...formValues);
    for (const key in defaultValue) {
      const value = defaultValue[key];
      value === null || value === undefined
        ? formData.delete(key)
        : formData.set(key, value);
    }
    setFormData(formData);
  }

  useEffect(() => {
    setKey(randomString());
    if (!validateOnInit) return;
    triggerChanges();
  }, [formData]);

  function triggerChanges() {
    const { entries } = validateForm();
    const values = getFormValues(entries);
    onChange && onChange(values);
  }

  function setValue(key: string, value?: FormDataValue) {
    value === null || value === undefined
      ? formData.delete(key)
      : formData.set(key, value);
    triggerChanges();
  }

  function removeValue(key: string) {
    formData.delete(key);
    triggerChanges();
  }

  function getValue(key: string) {
    return formData.get(key);
  }

  function getStringValue(key: string) {
    const value = formData.get(key);
    return typeof value === "string" ? value : undefined;
  }

  function getFileValue(key: string) {
    const value = formData.get(key);
    return value instanceof File ? value : undefined;
  }

  function getEntries() {
    return new FormEntries(formData);
  }

  function validateForm() {
    const entries = new FormEntries(formData);
    let errors = {};
    if (validation) {
      errors = validation(entries);
      setErrors(errors);
    }
    errors = { ...errors };
    return { entries, errors };
  }

  function submit() {
    const { entries, errors } = validateForm();
    if (hasKeys(errors)) return;
    try {
      return onSubmit!(entries);
    } catch (e) {
      return;
    }
  }

  function submitAny() {
    const { entries, errors } = validateForm();
    if (hasKeys(errors)) return Promise.reject(errors);
    return onSubmit ? onSubmit(entries) : Promise.resolve(entries);
  }

  const disabled = hasKeys(errors);

  return {
    key,
    errors,
    disabled,
    init,
    setValue,
    removeValue,
    getValue,
    getStringValue,
    getFileValue,
    getEntries,
    setErrors,
    validateForm,
    triggerChanges,
    submit,
    submitAny,
  };
}
