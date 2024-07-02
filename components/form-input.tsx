import { useFormStatus } from "react-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { FormErrors } from "./board/form-errors";
import { forwardRef } from "react";

interface FormInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      placeholder,
      type,
      required,
      disabled,
      errors,
      className,
      defaultValue = "",
      onBlur,
    },
    ref,
  ) => {
    const { pending } = useFormStatus();
    return (
      <div>
        <div>
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-primary-foreground"
            >
              {label}
            </Label>
          ) : null}
          <Input
            onBlur={onBlur}
            defaultValue={defaultValue}
            type={type}
            ref={ref}
            required={required}
            id={id}
            placeholder={placeholder}
            disabled={pending || disabled}
            className={cn("text-sm px-2 py-1 h-7", className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
