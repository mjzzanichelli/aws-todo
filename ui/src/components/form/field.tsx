import { ReactElement, cloneElement } from "react";
import { ChildrenType } from "../../utils/types";
import { FormDataType, getValuesEntries } from "../../hooks/form-data";
import { StyledFieldComponent } from "./styled";
import { Input } from "./input";

export type FieldPropsType = Partial<ReturnType<typeof getFieldProps>>;

export interface FieldComponentProps {
  id: string;
  hidden?: boolean;
  formData?: FormDataType;
  label?: ChildrenType;
  noLabel?: boolean;
  noError?: boolean;
  children?: ReactElement<FieldPropsType>;
}

export function isFieldComponent(
  element: any
): element is ReactElement<FieldComponentProps> {
  if (!(element instanceof Object)) return false;
  const i = Object.keys(element).indexOf("type");
  const type = Object.values(element)[i];
  return type === FieldComponent;
}

export function getFieldProps(formData: FormDataType, key: string) {
  const { getValue } = formData;
  const defaultValue = getValue(key);
  let defaultChecked: boolean | undefined;
  if (defaultValue !== null) {
    defaultChecked =
      getValuesEntries({ checked: defaultValue }).booleans.checked || false;
  }
  return {
    id: key,
    name: key,
    defaultChecked,
    defaultValue,
    onChange: (value?: FormDataEntryValue) => {
      formData.setValue(key, value);
    },
  };
}

export function FieldComponent(args: FieldComponentProps) {
  const { formData, id, hidden, noLabel, noError } = args;
  const {
    label = id.capitalise(),
    children = <Input type={hidden ? "hidden" : "text"} />,
  } = args;
  const errorMessage = formData?.errors[id];

  const inputElement = formData
    ? cloneElement(children, getFieldProps(formData, id))
    : children;
  if (hidden) return inputElement;
  return (
    <>
      <StyledFieldComponent htmlFor={id}>
        {!noLabel && label}
        {inputElement}
      </StyledFieldComponent>
      {!noError && errorMessage && (
        <p data-testid="error-message">{errorMessage}</p>
      )}
    </>
  );
}
