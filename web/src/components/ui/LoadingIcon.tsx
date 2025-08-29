import { SpinnerIcon } from "@phosphor-icons/react";

interface LoadingProps {
  size?: number;
  className?: string;
}

export function LoadingIcon({ size = 16, className }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <SpinnerIcon size={size} className="animate-spin text-gray-500" />
    </div>
  );
}
