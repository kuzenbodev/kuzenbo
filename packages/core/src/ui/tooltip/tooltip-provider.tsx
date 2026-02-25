"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
export type TooltipProviderProps = TooltipPrimitive.Provider.Props;

const TooltipProvider = ({ delay = 0, ...props }: TooltipProviderProps) => (
  <TooltipPrimitive.Provider
    data-slot="tooltip-provider"
    delay={delay}
    {...props}
  />
);

export { TooltipProvider };
