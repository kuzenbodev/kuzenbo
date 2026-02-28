"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "tailwind-variants";

export type PopoverBackdropProps = PopoverPrimitive.Backdrop.Props;

const PopoverBackdrop = ({ className, ...props }: PopoverBackdropProps) => (
  <PopoverPrimitive.Backdrop
    className={cn(
      "z-overlay data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0 fixed inset-0 isolate bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs",
      className
    )}
    data-slot="popover-backdrop"
    {...props}
  />
);

export { PopoverBackdrop };
