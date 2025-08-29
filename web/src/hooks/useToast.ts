import { useContext } from "react";
import {
  ToastContext,
  type ToastContextProps,
} from "../context/toast/ToastContext";

export function useToast(): ToastContextProps {
  return useContext(ToastContext);
}
