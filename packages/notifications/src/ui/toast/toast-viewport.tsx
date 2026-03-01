"use client";

import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";

import {
  DEFAULT_UI_SIZE,
  useKuzenboComponentDefaults,
  useResolvedToastSize,
} from "./toast-size";
import type { UISize } from "./toast-size";

export type ToastViewportProps = ComponentProps<typeof BaseToast.Viewport> & {
  size?: UISize;
};

const toastViewportVariants = tv({
  base: "z-toast-viewport fixed top-auto right-4 bottom-4 mx-auto flex sm:right-8 sm:bottom-8",
  defaultVariants: {
    size: DEFAULT_UI_SIZE,
  },
  variants: {
    size: {
      lg: "w-[var(--kb-toast-viewport-width-lg,280px)] sm:w-[var(--kb-toast-viewport-width-lg-sm,340px)]",
      md: "w-[var(--kb-toast-viewport-width-md,250px)] sm:w-[var(--kb-toast-viewport-width-md-sm,300px)]",
      sm: "w-[var(--kb-toast-viewport-width-sm,240px)] sm:w-[var(--kb-toast-viewport-width-sm-sm,280px)]",
      xl: "w-[var(--kb-toast-viewport-width-xl,320px)] sm:w-[var(--kb-toast-viewport-width-xl-sm,380px)]",
      xs: "w-[var(--kb-toast-viewport-width-xs,220px)] sm:w-[var(--kb-toast-viewport-width-xs-sm,260px)]",
    },
  },
});

export const ToastViewport = ({
  className,
  size: providedSize,
  ...props
}: ToastViewportProps) => {
  const { size: componentDefaultSize } =
    useKuzenboComponentDefaults<ToastViewportProps>("ToastViewport");
  const size = useResolvedToastSize(providedSize, componentDefaultSize);

  return (
    <BaseToast.Viewport
      className={cn(toastViewportVariants({ size }), className)}
      data-size={size}
      data-slot="toast-viewport"
      {...props}
    />
  );
};
