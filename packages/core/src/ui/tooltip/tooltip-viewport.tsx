"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

export type TooltipViewportProps = TooltipPrimitive.Viewport.Props;

const TooltipViewport = ({ ...props }: TooltipViewportProps) => (
  <TooltipPrimitive.Viewport data-slot="tooltip-viewport" {...props} />
);

export { TooltipViewport };
