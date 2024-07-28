import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
} from "react";
import { StyledCheckbox } from "./styled";

export const Input = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    defaultValue?: FormDataEntryValue | null;
    onChange?: (value?: string) => void;
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
        onChange && onChange(e.target.value);
      }}
    />
  );
});

export const InputFile = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> & {
    defaultValue?: FormDataEntryValue | null;
    onChange?: (value?: File) => void;
  }
>((args, ref) => {
  const { onChange, ...props } = args;

  if (props.defaultValue instanceof File) {
    delete props.defaultValue;
  }

  return (
    <input
      {...props}
      ref={ref}
      type={"file"}
      onChange={(e) => {
        if (!onChange) return;
        if (!e.target.files) return onChange();
        const [value] = e.target.files;
        onChange(value);
      }}
    />
  );
});

export const CheckBox = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
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
      onChange={(e) => onChange && onChange(String(e.target.checked))}
    />
  );
});

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
    onChange?: (value: string) => void;
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
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> & {
    onChange?: (value: string) => void;
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
