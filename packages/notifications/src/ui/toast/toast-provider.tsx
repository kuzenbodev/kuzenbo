"use client";

import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ComponentProps } from "react";
import { useMemo } from "react";

import { ToastAction } from "./toast-action";
import { ToastClose } from "./toast-close";
import { ToastContent } from "./toast-content";
import { ToastDescription } from "./toast-description";
import { ToastPortal } from "./toast-portal";
import { ToastRoot } from "./toast-root";
import type { UISize } from "./toast-size";
import {
  ToastSizeContext,
  useKuzenboComponentDefaults,
  useResolvedToastSize,
} from "./toast-size";
import { ToastTitle } from "./toast-title";
import { ToastViewport } from "./toast-viewport";

export interface ToastProviderProps extends ComponentProps<
  typeof BaseToast.Provider
> {
  size?: UISize;
}

const ToastList = () => {
  const { toasts } = BaseToast.useToastManager();

  return toasts.map((toast) => (
    <ToastRoot key={toast.id} toast={toast}>
      <ToastContent>
        <ToastTitle />
        <ToastDescription />
        {toast.actionProps ? <ToastAction /> : null}
        <ToastClose />
      </ToastContent>
    </ToastRoot>
  ));
};

export const ToastProvider = ({
  children,
  size: providedSize,
  ...providerProps
}: ToastProviderProps) => {
  const { size: componentDefaultSize } =
    useKuzenboComponentDefaults<ToastProviderProps>("ToastProvider");
  const size = useResolvedToastSize(providedSize, componentDefaultSize);
  const contextValue = useMemo(() => ({ size }), [size]);

  return (
    <ToastSizeContext.Provider value={contextValue}>
      <BaseToast.Provider data-size={size} data-slot="toast" {...providerProps}>
        {children}
        <ToastPortal>
          <ToastViewport>
            <ToastList />
          </ToastViewport>
        </ToastPortal>
      </BaseToast.Provider>
    </ToastSizeContext.Provider>
  );
};
