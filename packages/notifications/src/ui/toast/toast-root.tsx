"use client";

import type { ComponentProps } from "react";

import { Toast as BaseToast } from "@base-ui/react/toast";
import { cn, tv } from "tailwind-variants";

import {
  DEFAULT_UI_SIZE,
  type UISize,
  useKuzenboComponentDefaults,
  useResolvedToastSize,
} from "./toast-size";

export type ToastRootProps = ComponentProps<typeof BaseToast.Root> & {
  size?: UISize;
};

const toastRootVariants = tv({
  base: "group/toast-root z-toast-stack border border-border bg-popover text-popover-foreground shadow-lg",
  variants: {
    anchored: {
      true: "w-max origin-(--transform-origin) rounded-md transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      false:
        "absolute right-0 bottom-0 left-auto mr-0 h-[var(--height)] w-full origin-bottom bg-clip-padding select-none [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s] after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-[ending-style]:opacity-0 data-[expanded]:h-[var(--toast-height)] data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))] data-[limited]:opacity-0 data-[starting-style]:[transform:translateY(150%)] data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-[expanded]:data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-[expanded]:data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-[expanded]:data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] data-[expanded]:data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
  },
  compoundVariants: [
    {
      anchored: true,
      class: "max-w-[16rem] px-2 py-1.5 text-xs",
      size: "xs",
    },
    {
      anchored: true,
      class: "max-w-[17rem] px-2.5 py-2 text-sm",
      size: "sm",
    },
    {
      anchored: true,
      class: "max-w-[18rem] px-3 py-2 text-sm",
      size: "md",
    },
    {
      anchored: true,
      class: "max-w-[19rem] px-3.5 py-2.5 text-sm",
      size: "lg",
    },
    {
      anchored: true,
      class: "max-w-[20rem] px-4 py-3 text-base",
      size: "xl",
    },
    {
      anchored: false,
      class: "rounded-md p-2.5 text-xs [--gap:0.5rem] [--peek:0.5rem]",
      size: "xs",
    },
    {
      anchored: false,
      class: "rounded-lg p-3 text-sm [--gap:0.625rem] [--peek:0.625rem]",
      size: "sm",
    },
    {
      anchored: false,
      class: "rounded-lg p-4 text-sm [--gap:0.75rem] [--peek:0.75rem]",
      size: "md",
    },
    {
      anchored: false,
      class: "rounded-lg p-5 text-sm [--gap:0.875rem] [--peek:0.875rem]",
      size: "lg",
    },
    {
      anchored: false,
      class: "rounded-xl p-6 text-base [--gap:1rem] [--peek:1rem]",
      size: "xl",
    },
  ],
  defaultVariants: {
    size: DEFAULT_UI_SIZE,
  },
});

export const ToastRoot = ({
  className,
  size: providedSize,
  toast,
  ...props
}: ToastRootProps) => {
  const { size: componentDefaultSize } =
    useKuzenboComponentDefaults<ToastRootProps>("ToastRoot");
  const size = useResolvedToastSize(providedSize, componentDefaultSize);
  const hasAnchoredPositioning = Boolean(toast.positionerProps);

  return (
    <BaseToast.Root
      className={cn(
        toastRootVariants({ anchored: hasAnchoredPositioning, size }),
        className
      )}
      data-size={size}
      data-slot="toast-root"
      toast={toast}
      {...props}
    />
  );
};
