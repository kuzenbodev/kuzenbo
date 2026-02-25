"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "tailwind-variants";
export type PopoverDescriptionProps = PopoverPrimitive.Description.Props;

const PopoverDescription = ({
  className,
  ...props
}: PopoverDescriptionProps) => (
  <PopoverPrimitive.Description
    className={cn("text-muted-foreground", className)}
    data-slot="popover-description"
    {...props}
  />
);

export { PopoverDescription };
