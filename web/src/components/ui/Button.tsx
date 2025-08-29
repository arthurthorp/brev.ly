import { cn } from "../../utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "md" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-sans font-semibold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-blue-base text-white hover:bg-blue-dark disabled:bg-blue-base/50 disabled:text-white/80",
    secondary:
      "border border-gray-200 bg-gray-200 text-gray-500 hover:border-blue-base disabled:border-gray-200/50 disabled:text-gray-500/200 disabled:bg-gray-200/50",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    md: "px-4 py-2 text-sm",
    icon: "p-2 text-sm aspect-square",
  };

  return (
    <button
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
