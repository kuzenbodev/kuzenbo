"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { useMemo } from "react";

import { useComponentSize } from "../shared/size/size-provider";
import { TooltipArrow } from "./tooltip-arrow";
import { TooltipContent } from "./tooltip-content";
import { TooltipPopup } from "./tooltip-popup";
import { TooltipPortal } from "./tooltip-portal";
import { TooltipPositioner } from "./tooltip-positioner";
import { TooltipProvider } from "./tooltip-provider";
import { TooltipSizeContext, type TooltipSize } from "./tooltip-size-context";
import { TooltipTrigger } from "./tooltip-trigger";
import { TooltipViewport } from "./tooltip-viewport";
export type TooltipProps = TooltipPrimitive.Root.Props & {
  size?: TooltipSize;
};

const Tooltip = ({ size: providedSize, ...props }: TooltipProps) => {
  const size = useComponentSize(providedSize);
  const contextValue = useMemo(() => ({ size }), [size]);

  return (
    <TooltipSizeContext.Provider value={contextValue}>
      <TooltipProvider>
        <TooltipPrimitive.Root
          data-size={size}
          data-slot="tooltip"
          {...props}
        />
      </TooltipProvider>
    </TooltipSizeContext.Provider>
  );
};

Tooltip.Content = TooltipContent;
Tooltip.Arrow = TooltipArrow;
Tooltip.Popup = TooltipPopup;
Tooltip.Portal = TooltipPortal;
Tooltip.Positioner = TooltipPositioner;
Tooltip.Provider = TooltipProvider;
Tooltip.Trigger = TooltipTrigger;
Tooltip.Viewport = TooltipViewport;

export type { TooltipArrowProps } from "./tooltip-arrow";
export type { TooltipPopupProps } from "./tooltip-popup";
export type { TooltipPortalProps } from "./tooltip-portal";
export type { TooltipPositionerProps } from "./tooltip-positioner";
export type { TooltipViewportProps } from "./tooltip-viewport";

export {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
  TooltipViewport,
};

export type { TooltipContentProps } from "./tooltip-content";
export type { TooltipProviderProps } from "./tooltip-provider";
export type { TooltipSize } from "./tooltip-size-context";
export type { TooltipTriggerProps } from "./tooltip-trigger";
