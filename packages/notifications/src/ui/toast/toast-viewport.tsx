"use client";

import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";

import {
  DEFAULT_UI_SIZE,
  type UISize,
  useKuzenboComponentDefaults,
  useResolvedToastSize,
} from "./toast-size";

export type ToastViewportProps = ComponentProps<typeof BaseToast.Viewport> & {
  size?: UISize;
};

const toastViewportVariants = tv({
  base: "z-toast-viewport fixed top-auto right-4 bottom-4 mx-auto flex sm:right-8 sm:bottom-8",
  variants: {
    size: {
      xs: "w-[220px] sm:w-[260px]",
      sm: "w-[240px] sm:w-[280px]",
      md: "w-[250px] sm:w-[300px]",
      lg: "w-[280px] sm:w-[340px]",
      xl: "w-[320px] sm:w-[380px]",
    },
  },
  defaultVariants: {
    size: DEFAULT_UI_SIZE,
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
