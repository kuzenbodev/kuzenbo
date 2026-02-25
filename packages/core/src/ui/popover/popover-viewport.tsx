"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

export type PopoverViewportProps = PopoverPrimitive.Viewport.Props;

const PopoverViewport = ({ ...props }: PopoverViewportProps) => (
  <PopoverPrimitive.Viewport data-slot="popover-viewport" {...props} />
);

export { PopoverViewport };
