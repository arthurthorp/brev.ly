import { Controller, type Control } from "react-hook-form";
import { WarningIcon } from "@phosphor-icons/react";
import { cn } from "../../utils/cn";

type InputProps = {
  name: string;
  label: string;
  control: Control;
  placeholder?: string;
  type?: string;
};

export function Input({
  name,
  label,
  control,
  placeholder,
  type = "text",
}: InputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;
        const isFilled = field.value && field.value.length > 0;

        return (
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor={name}
              className={cn(
                "text-xs font-semibold uppercase",
                hasError
                  ? "text-danger"
                  : isFilled
                  ? "text-blue-base"
                  : "text-gray-700"
              )}
            >
              {label}
            </label>

            <input
              id={name}
              type={type}
              placeholder={placeholder}
              {...field}
              className={cn(
                "rounded-md border px-3 py-2 text-sm outline-none transition-colors",
                hasError
                  ? "border-danger focus:border-danger"
                  : "border-gray-300 focus:border-blue-base"
              )}
            />

            {hasError && fieldState && (
              <span className="flex items-center gap-1 text-xs text-danger mt-1">
                <WarningIcon className="w-4 h-4" />
                {fieldState.error?.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
}
