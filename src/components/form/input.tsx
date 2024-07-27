import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
} from "react";
import { StyledCheckbox } from "./styled";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    defaultValue?: FormDataEntryValue | null;
    onChange?: (value?: FormDataEntryValue) => void;
  }
>((args, ref) => {
  const { onChange, type, ...props } = args;

  if (props.defaultValue instanceof File) {
    delete props.defaultValue;
  }

  return (
    <input
      {...props}
      ref={ref}
      type={type}
      onChange={(e) => {
        if (!onChange) return;
        if (type !== "file") return onChange(e.target.value);
        if (!e.target.files) return onChange();
        const [value] = e.target.files;
        onChange(value);
      }}
    />
  );
});

export const CheckBox = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    onChange?: (value?: string) => void;
  }
>((args, ref) => {
  const { onChange, ...props } = args;
  delete props.value;
  delete props.defaultValue;
  return (
    <StyledCheckbox
      {...props}
      ref={ref}
      onChange={(e) => {
        if (!onChange) return;
        onChange(String(e.target.checked));
      }}
    />
  );
});

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    onChange?: (value: FormDataEntryValue) => void;
  }
>((args, ref) => {
  const { onChange, ...props } = args;
  return (
    <textarea
      {...props}
      ref={ref}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
});

export const DropDown = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & {
    onChange?: (value: FormDataEntryValue) => void;
  }
>((args, ref) => {
  const { onChange, ...props } = args;
  return (
    <select
      {...props}
      ref={ref}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
});
