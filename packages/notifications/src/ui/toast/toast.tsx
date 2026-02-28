"use client";

import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ComponentProps } from "react";
import { useMemo } from "react";

import { ToastAction } from "./toast-action";
import { ToastArrow } from "./toast-arrow";
import { ToastClose } from "./toast-close";
import { ToastContent } from "./toast-content";
import { ToastDescription } from "./toast-description";
import { ToastPortal } from "./toast-portal";
import { ToastPositioner } from "./toast-positioner";
import { ToastProvider } from "./toast-provider";
import { ToastRoot } from "./toast-root";
import {
  ToastSizeContext,
  useKuzenboComponentDefaults,
  useResolvedToastSize,
} from "./toast-size";
import type { UISize } from "./toast-size";
import { ToastTitle } from "./toast-title";
import { ToastViewport } from "./toast-viewport";
import { useToast } from "./use-toast";

export type ToastProps = ComponentProps<typeof BaseToast.Provider> & {
  size?: UISize;
};

const Toast = ({ size, ...props }: ToastProps) => {
  const { size: componentDefaultSize } =
    useKuzenboComponentDefaults<ToastProps>("Toast");
  const resolvedSize = useResolvedToastSize(size, componentDefaultSize);
  const contextValue = useMemo(() => ({ size: resolvedSize }), [resolvedSize]);

  return (
    <ToastSizeContext.Provider value={contextValue}>
      <BaseToast.Provider
        data-size={resolvedSize}
        data-slot="toast"
        {...props}
      />
    </ToastSizeContext.Provider>
  );
};

Toast.Action = ToastAction;
Toast.Arrow = ToastArrow;
Toast.Close = ToastClose;
Toast.Content = ToastContent;
Toast.Description = ToastDescription;
Toast.Portal = ToastPortal;
Toast.Positioner = ToastPositioner;
Toast.Root = ToastRoot;
Toast.Title = ToastTitle;
Toast.Viewport = ToastViewport;
Toast.Provider = ToastProvider;

// Re-export useToastManager hook
export const { useToastManager } = BaseToast;
export const { createToastManager } = BaseToast;

export type { ToastActionProps } from "./toast-action";
export type { ToastArrowProps } from "./toast-arrow";
export type { ToastCloseProps } from "./toast-close";
export type { ToastContentProps } from "./toast-content";
export type { ToastDescriptionProps } from "./toast-description";
export type { ToastPortalProps } from "./toast-portal";
export type { ToastPositionerProps } from "./toast-positioner";
export type { ToastRootProps } from "./toast-root";
export type { UISize as ToastSize } from "./toast-size";
export type { ToastTitleProps } from "./toast-title";
export type { ToastViewportProps } from "./toast-viewport";

export {
  Toast,
  ToastAction,
  ToastArrow,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastPositioner,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  ToastProvider,
  useToast,
};

export type { ToastProviderProps } from "./toast-provider";
