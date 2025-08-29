import { useState, type ReactNode, useCallback } from "react";
import { ToastContext, type Toast, type ToastType } from "./ToastContext";

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast>({
    active: false,
    title: "",
    message: "",
    type: "info",
  });

  const showToast = useCallback(
    (message: string, title: string, type: ToastType = "info") => {
      setToast({ active: true, message, type, title });
      setTimeout(() => setToast((prev) => ({ ...prev, active: false })), 3000);
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, active: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}
