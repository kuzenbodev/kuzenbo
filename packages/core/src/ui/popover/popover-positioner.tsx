"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "tailwind-variants";

export type PopoverPositionerProps = PopoverPrimitive.Positioner.Props;

const PopoverPositioner = ({ className, ...props }: PopoverPositionerProps) => (
  <PopoverPrimitive.Positioner
    className={cn("z-overlay isolate", className)}
    data-slot="popover-positioner"
    {...props}
  />
);

export { PopoverPositioner };
