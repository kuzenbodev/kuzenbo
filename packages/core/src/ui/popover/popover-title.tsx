"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "tailwind-variants";
export type PopoverTitleProps = PopoverPrimitive.Title.Props;

const PopoverTitle = ({ className, ...props }: PopoverTitleProps) => (
  <PopoverPrimitive.Title
    className={cn("font-medium", className)}
    data-slot="popover-title"
    {...props}
  />
);

export { PopoverTitle };
