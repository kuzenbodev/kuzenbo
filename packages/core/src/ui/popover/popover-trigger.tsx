"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "tailwind-variants";
export type PopoverTriggerProps = PopoverPrimitive.Trigger.Props;

const PopoverTrigger = ({ className, ...props }: PopoverTriggerProps) => (
  <PopoverPrimitive.Trigger
    className={cn("cursor-clickable", className)}
    data-slot="popover-trigger"
    {...props}
  />
);

export { PopoverTrigger };
