import { createContext } from "react";

export type ToastType = "info" | "error";

export interface Toast {
  active: boolean;
  title: string;
  message: string;
  type: ToastType;
}

export interface ToastContextProps {
  toast: Toast;
  showToast: (message: string, title: string, type?: ToastType) => void;
  hideToast: () => void;
}

export const ToastContext = createContext<ToastContextProps>({
  toast: { active: false, message: "", title: "", type: "info" },
  showToast: () => {},
  hideToast: () => {},
});
