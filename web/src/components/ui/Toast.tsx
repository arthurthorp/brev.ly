import { tv } from "tailwind-variants";
import { WarningIcon, InfoIcon } from "@phosphor-icons/react";
import { useToast } from "../../hooks/useToast";

export function Toast() {
  const { toast, hideToast } = useToast();

  if (!toast.active) return null;

  const toastVariants = tv({
    base: "fixed bottom-5 right-5 max-w-[350px] flex items-center gap-2 p-4 rounded shadow-lg cursor-pointer transition-all",
    variants: {
      type: {
        info: "bg-blue-100 text-blue-base",
        error: "bg-red-100 text-danger",
      },
    },
  });

  return (
    <div className={toastVariants({ type: toast.type })} onClick={hideToast}>
      {toast.type === "info" ? (
        <InfoIcon className="shrink-0" weight="bold" size={20} />
      ) : (
        <WarningIcon className="shrink-0" weight="bold" size={20} />
      )}
      <div>
        <span className="text-xs block font-bold">{toast.title}</span>
        <span className="text-xs">{toast.message}</span>
      </div>
    </div>
  );
}
