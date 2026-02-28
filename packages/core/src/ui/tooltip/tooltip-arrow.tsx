"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "tailwind-variants";

export type TooltipArrowProps = TooltipPrimitive.Arrow.Props;

const TooltipArrow = ({ className, ...props }: TooltipArrowProps) => (
  <TooltipPrimitive.Arrow
    className={cn(
      "z-overlay bg-foreground fill-foreground size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5",
      className
    )}
    data-slot="tooltip-arrow"
    {...props}
  />
);

export { TooltipArrow };
