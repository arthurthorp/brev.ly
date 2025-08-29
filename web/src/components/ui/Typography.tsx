import React from "react";
import { tv } from "tailwind-variants";

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

const typography = tv({
  base: "font-sans",
  variants: {
    variant: {
      xl: "text-2xl leading-[32px] font-bold",
      lg: "text-lg leading-[24px] font-bold",
      md: "text-sm leading-[18px] font-semibold",
      sm: "text-xs leading-[16px]",
      xs: "text-[10px] leading-[14px]",
    },
    weight: {
      regular: "font-normal",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    uppercase: {
      true: "uppercase",
    },
  },
  defaultVariants: {
    variant: "md",
    weight: "regular",
    uppercase: false,
  },
});

export function Typography({
  variant,
  weight,
  uppercase,
  className,
  children,
  as: Component = "p",
}: TypographyProps) {
  return (
    <Component
      className={typography({ variant, weight, uppercase, className })}
    >
      {children}
    </Component>
  );
}
