import { cn } from "../utils/cn";

type TypographyVariant = "xl" | "lg" | "md" | "sm" | "xs";

interface TypographyProps {
  variant?: TypographyVariant;
  weight?: "regular" | "semibold" | "bold";
  uppercase?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<TypographyVariant, string> = {
  xl: "text-[--text-xl] leading-[--leading-xl] font-bold",
  lg: "text-[--text-lg] leading-[--leading-lg] font-bold",
  md: "text-[--text-md] leading-[--leading-md] font-semibold",
  sm: "text-[--text-sm] leading-[--leading-sm]",
  xs: "text-[--text-xs] leading-[--leading-xs] uppercase",
};

export function Typography({
  variant = "md",
  weight,
  uppercase,
  className,
  children,
}: TypographyProps) {
  let base = variantStyles[variant];

  if (variant === "sm") {
    if (weight === "semibold") base += " font-semibold";
    else base += " font-normal";
  }

  if (weight === "bold" && variant !== "sm") base += " font-bold";
  if (weight === "regular" && variant !== "sm") base += " font-normal";

  if (uppercase) base += " uppercase";

  return <p className={cn("font-sans", base, className)}>{children}</p>;
}
