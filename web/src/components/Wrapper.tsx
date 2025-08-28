import { cn } from "../utils/cn";

export function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const baseStyle = "w-full mx-auto max-w-[980px]";

  return <section className={cn(baseStyle, className)}>{children}</section>;
}
