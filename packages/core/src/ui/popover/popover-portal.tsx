"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

export type PopoverPortalProps = PopoverPrimitive.Portal.Props;

const PopoverPortal = ({ ...props }: PopoverPortalProps) => (
  <PopoverPrimitive.Portal data-slot="popover-portal" {...props} />
);

export { PopoverPortal };
