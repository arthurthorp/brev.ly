import { Controller, type Control } from "react-hook-form";
import { WarningIcon } from "@phosphor-icons/react";
import { tv } from "tailwind-variants";
import { Typography } from "./Typography";

type InputProps = {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder?: string;
  type?: string;
  addon?: string;
};

const wrapperVariants = tv({
  base: "flex items-center w-full h-12 rounded-md border px-3 py-2 transition-colors focus-within:border-blue-base",
  variants: {
    state: {
      normal: "border-gray-300",
      error: "border-danger",
    },
  },
  defaultVariants: {
    state: "normal",
  },
});

const inputVariants = tv({
  base: "flex-1 text-sm outline-none border-none placeholder-gray-300",
});

const labelVariants = tv({
  base: "text-[10px] leading-[14px] uppercase transition-colors",
  variants: {
    state: {
      normal:
        "text-gray-500 font-normal group-focus-within:text-blue-base group-focus-within:font-bold",
      error: "text-danger font-bold",
    },
  },
  defaultVariants: {
    state: "normal",
  },
});

export function Input({
  name,
  label,
  control,
  placeholder,
  type = "text",
  addon,
}: InputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;

        return (
          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-col gap-1 w-full group">
              <label
                htmlFor={name}
                className={labelVariants({
                  state: hasError ? "error" : "normal",
                })}
              >
                {label}
              </label>

              <div
                className={wrapperVariants({
                  state: hasError ? "error" : "normal",
                })}
              >
                {addon && (
                  <Typography
                    variant="md"
                    className="text-gray-400"
                    weight="regular"
                  >
                    {addon}
                  </Typography>
                )}
                <input
                  id={name}
                  type={type}
                  placeholder={placeholder}
                  {...field}
                  className={inputVariants()}
                />
              </div>
            </div>

            {hasError && (
              <span className="flex items-center gap-1 text-xs text-danger mt-1">
                <WarningIcon className="w-4 h-4 shrink-0" />
                {fieldState.error?.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
}
