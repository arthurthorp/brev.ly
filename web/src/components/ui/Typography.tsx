import { cn } from "../../utils/cn";
import React from "react";

type TypographyVariant = "xl" | "lg" | "md" | "sm" | "xs";

type TextTags =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "strong"
  | "em";

interface TypographyProps {
  variant?: TypographyVariant;
  weight?: "regular" | "semibold" | "bold";
  uppercase?: boolean;
  className?: string;
  children: React.ReactNode;
  as?: TextTags;
}

const variantStyles: Record<TypographyVariant, string> = {
  xl: "text-2xl leading-[32px] font-bold",
  lg: "text-lg leading-[24px] font-bold",
  md: "text-sm leading-[18px] font-semibold",
  sm: "text-xs leading-[16px]",
  xs: "text-[10px] leading-[14px] uppercase",
};

export function Typography({
  variant = "md",
  weight,
  uppercase,
  className,
  children,
  as: Component = "p",
}: TypographyProps) {
  let base = variantStyles[variant];

  if (variant === "sm") {
    base += weight === "semibold" ? " font-semibold" : " font-normal";
  } else {
    if (weight === "bold") base += " font-bold";
    if (weight === "regular") base += " font-normal";
  }

  if (uppercase) base += " uppercase";

  return (
    <Component className={cn("font-sans", base, className)}>
      {children}
    </Component>
  );
}
