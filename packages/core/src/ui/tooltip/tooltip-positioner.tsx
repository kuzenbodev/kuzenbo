"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "tailwind-variants";

export type TooltipPositionerProps = TooltipPrimitive.Positioner.Props;

const TooltipPositioner = ({ className, ...props }: TooltipPositionerProps) => (
  <TooltipPrimitive.Positioner
    className={cn(
      "isolate z-overlay h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)]",
      className
    )}
    data-slot="tooltip-positioner"
    {...props}
  />
);

export { TooltipPositioner };
