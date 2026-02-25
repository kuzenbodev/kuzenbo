import { Toast as BaseToast } from "@base-ui/react/toast";

type ToastManager = ReturnType<typeof BaseToast.useToastManager>;
type AddOptions = Parameters<ToastManager["add"]>[0];
type UpdateOptions = Parameters<ToastManager["update"]>[1];
type PromiseOptions = Parameters<ToastManager["promise"]>[1];

type ToastOptions = Omit<AddOptions, "type"> & {
  type?: AddOptions["type"] | "success" | "error" | "info" | "warning";
};

interface UseToastReturn {
  /**
   * Add a toast with custom options
   */
  add: (options: ToastOptions) => string;

  /**
   * Show a success toast
   */
  success: (options: Omit<ToastOptions, "type">) => string;

  /**
   * Show an error toast
   */
  error: (options: Omit<ToastOptions, "type">) => string;

  /**
   * Show an info toast
   */
  info: (options: Omit<ToastOptions, "type">) => string;

  /**
   * Show a warning toast
   */
  warning: (options: Omit<ToastOptions, "type">) => string;

  /**
   * Show a loading toast
   */
  loading: (options: Omit<ToastOptions, "type">) => string;

  /**
   * Create a promise toast with loading, success, and error states
   */
  promise: <Value>(
    promise: Promise<Value>,
    options: PromiseOptions
  ) => Promise<Value>;

  /**
   * Update an existing toast
   */
  update: (toastId: string, options: UpdateOptions) => void;

  /**
   * Close a toast
   */
  close: (toastId: string) => void;

  /**
   * Get all active toasts
   */
  readonly toasts: ToastManager["toasts"];
}

export const useToast = (): UseToastReturn => {
  const toastManager = BaseToast.useToastManager();

  return {
    add: (options: ToastOptions) => toastManager.add(options),

    success: (options: Omit<ToastOptions, "type">) =>
      toastManager.add({
        ...options,
        type: "success",
      }),

    error: (options: Omit<ToastOptions, "type">) =>
      toastManager.add({
        ...options,
        type: "error",
      }),

    info: (options: Omit<ToastOptions, "type">) =>
      toastManager.add({
        ...options,
        type: "info",
      }),

    warning: (options: Omit<ToastOptions, "type">) =>
      toastManager.add({
        ...options,
        type: "warning",
      }),

    loading: (options: Omit<ToastOptions, "type">) =>
      toastManager.add({
        ...options,
        type: "loading",
      }),

    promise: <Value>(promise: Promise<Value>, options: PromiseOptions) =>
      toastManager.promise(promise, options),

    update: (toastId: string, options: UpdateOptions) =>
      toastManager.update(toastId, options),

    close: (toastId: string) => toastManager.close(toastId),

    get toasts() {
      return toastManager.toasts;
    },
  };
};
