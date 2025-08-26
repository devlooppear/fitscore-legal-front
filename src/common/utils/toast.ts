// src/common/utils/toast.ts
import { toast as reactToast, ToastOptions, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    reactToast.success(message, { ...defaultOptions, ...options });
  },
  error: (message: string, options?: ToastOptions) => {
    reactToast.error(message, { ...defaultOptions, ...options });
  },
  info: (message: string, options?: ToastOptions) => {
    reactToast.info(message, { ...defaultOptions, ...options });
  },
  warn: (message: string, options?: ToastOptions) => {
    reactToast.warn(message, { ...defaultOptions, ...options });
  },
};
