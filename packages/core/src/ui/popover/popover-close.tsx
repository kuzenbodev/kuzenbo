"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "tailwind-variants";

export type PopoverCloseProps = PopoverPrimitive.Close.Props;

const PopoverClose = ({ className, ...props }: PopoverCloseProps) => (
  <PopoverPrimitive.Close
    className={cn("cursor-clickable", className)}
    data-slot="popover-close"
    {...props}
  />
);

export { PopoverClose };
