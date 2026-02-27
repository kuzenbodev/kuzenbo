"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "tailwind-variants";
export type TooltipTriggerProps = TooltipPrimitive.Trigger.Props;

const TooltipTrigger = ({ className, ...props }: TooltipTriggerProps) => (
  <TooltipPrimitive.Trigger
    className={cn("cursor-clickable", className)}
    data-slot="tooltip-trigger"
    {...props}
  />
);

export { TooltipTrigger };
