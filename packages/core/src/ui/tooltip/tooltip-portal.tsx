"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

export type TooltipPortalProps = TooltipPrimitive.Portal.Props;

const TooltipPortal = ({ ...props }: TooltipPortalProps) => (
  <TooltipPrimitive.Portal data-slot="tooltip-portal" {...props} />
);

export { TooltipPortal };
