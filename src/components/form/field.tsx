import { ReactElement, cloneElement } from "react";
import { VariantProps } from "../../theme/theme.types";
import { IconName, IconRotation } from "../icon/types";
import { ChildrenType } from "../../utils/types";
import { FormDataType, getValuesEntries } from "../../hooks/form-data";
import { StyledFieldComponent, StyledInputContainer } from "./styled";
import { Input } from "./input";

export type FieldPropsType = Partial<ReturnType<typeof getFieldProps>>;

export interface FieldComponentProps extends VariantProps {
  id: string;
  hidden?: boolean;
  formData?: FormDataType;
  label?: ChildrenType;
  noLabel?: boolean;
  noError?: boolean;
  children?: ReactElement<FieldPropsType>;
  iconName?: IconName;
  iconRotate?: IconRotation;
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
  const {
    formData,
    id,
    hidden,
    noLabel,
    noError,
    iconName,
    iconRotate,
    variant,
  } = args;
  const {
    label = id.capitalise(),
    children = <Input type={hidden ? "hidden" : "text"} />,
  } = args;
  const errorMessage = formData?.errors[id];

  const inputProps = formData ? getFieldProps(formData, id) : {};

  const inputElement = cloneElement(children, { variant, ...inputProps });

  if (hidden) return inputElement;
  return (
    <>
      <StyledFieldComponent htmlFor={id} variant={variant}>
        {!noLabel && label}
        <StyledInputContainer
          variant={variant}
          name={iconName}
          rotate={iconRotate}
        >
          {inputElement}
        </StyledInputContainer>
      </StyledFieldComponent>
      {!noError && errorMessage && (
        <p data-testid="error-message">{errorMessage}</p>
      )}
    </>
  );
}
