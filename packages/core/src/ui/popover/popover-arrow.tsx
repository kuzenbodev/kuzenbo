"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "tailwind-variants";

export type PopoverArrowProps = PopoverPrimitive.Arrow.Props;

const PopoverArrow = ({ className, ...props }: PopoverArrowProps) => (
  <PopoverPrimitive.Arrow
    className={cn(
      "z-overlay bg-popover fill-popover size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5",
      className
    )}
    data-slot="popover-arrow"
    {...props}
  />
);

export { PopoverArrow };
