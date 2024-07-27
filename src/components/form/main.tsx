import { Children, cloneElement } from "react";
import { FormDataType } from "../../hooks/form-data";
import {
  ChildrenType,
  VariantElementProps,
} from "../../utils/types";
import { isFieldComponent } from "./field";
import { isChildrenElement } from "../../utils/helpers";
import { StyledForm } from "./styled";

export function traverseChildren(
  formData: FormDataType,
  children: ChildrenType
) {
  const childrenArray = Children.toArray(children);
  for (const i in childrenArray) {
    let element = childrenArray[i];
    if (isChildrenElement(element))
      element = cloneElement(
        element,
        {},
        ...traverseChildren(formData, element.props.children)
      );
    if (!(element instanceof Object)) continue;
    if (isFieldComponent(element) && !element.props.formData)
      element = cloneElement(element, { formData });
    childrenArray[i] = element;
  }
  return childrenArray;
}

export function FormComponent(
  args: VariantElementProps<HTMLFormElement> & {
    formData?: FormDataType;
  }
) {
  const { formData, children, ...props } = args;
  const { submit } = formData || {};
  const formChildren = formData
    ? traverseChildren(formData, children)
    : children;

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        submit && submit();
      }}
      {...props}
    >
      {formChildren}
    </StyledForm>
  );
}
