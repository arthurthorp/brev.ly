import { cn } from "../../utils/cn";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const baseStyle = "bg-gray-100 w-full rounded-lg p-6 md:p-8";

  return <div className={cn(baseStyle, className)}>{children}</div>;
}
