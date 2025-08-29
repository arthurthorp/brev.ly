import React from "react";
import { tv } from "tailwind-variants";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const card = tv({
  base: "bg-gray-100 w-full rounded-lg p-6 md:p-8",
});

export function Card({ children, className }: CardProps) {
  return <div className={card({ className })}>{children}</div>;
}
