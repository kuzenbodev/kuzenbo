"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

export type PopoverCloseProps = PopoverPrimitive.Close.Props;

const PopoverClose = ({ ...props }: PopoverCloseProps) => (
  <PopoverPrimitive.Close data-slot="popover-close" {...props} />
);

export { PopoverClose };
