"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { TooltipSize } from "./tooltip-size-context";
import { useResolvedTooltipSize } from "./tooltip-size-context";

const tooltipPopupVariants = tv({
  base: "z-overlay bg-foreground text-background data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-ending-style:animate-out data-ending-style:fade-out-0 data-ending-style:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-starting-style:animate-in data-starting-style:fade-in-0 data-starting-style:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-fit origin-(--transform-origin)",
  variants: {
    size: {
      xs: "max-w-40 rounded-[min(var(--radius-md),8px)] px-2 py-1 text-xs",
      sm: "max-w-48 rounded-[min(var(--radius-md),10px)] px-2.5 py-1 text-xs",
      md: "max-w-xs rounded-md px-3 py-1.5 text-xs",
      lg: "max-w-sm rounded-md px-3.5 py-2 text-sm",
      xl: "max-w-md rounded-md px-4 py-2.5 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type TooltipPopupVariantProps = Omit<
  VariantProps<typeof tooltipPopupVariants>,
  "size"
> & {
  size?: TooltipSize;
};

export type TooltipPopupProps = TooltipPrimitive.Popup.Props &
  TooltipPopupVariantProps;

const TooltipPopup = ({ className, size, ...props }: TooltipPopupProps) => {
  const resolvedSize = useResolvedTooltipSize(size);

  return (
    <TooltipPrimitive.Popup
      className={mergeBaseUIClassName<TooltipPrimitive.Popup.State>(
        tooltipPopupVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="tooltip-popup"
      {...props}
    />
  );
};

export { TooltipPopup };
