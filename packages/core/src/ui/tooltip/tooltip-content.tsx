"use client";

import type { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { TooltipArrow } from "./tooltip-arrow";
import { TooltipPopup } from "./tooltip-popup";
import { TooltipPortal } from "./tooltip-portal";
import { TooltipPositioner } from "./tooltip-positioner";
import {
  useResolvedTooltipSize,
  type TooltipSize,
} from "./tooltip-size-context";
import { TooltipViewport } from "./tooltip-viewport";
export type TooltipContentProps = TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    size?: TooltipSize;
  };

const TooltipContent = ({
  className,
  side = "top",
  sideOffset = 4,
  size,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipContentProps) => {
  const resolvedSize = useResolvedTooltipSize(size);

  return (
    <TooltipPortal>
      <TooltipPositioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <TooltipPopup
          className={className}
          data-size={resolvedSize}
          data-slot="tooltip-content"
          size={resolvedSize}
          {...props}
        >
          <TooltipViewport>{children}</TooltipViewport>
          <TooltipArrow />
        </TooltipPopup>
      </TooltipPositioner>
    </TooltipPortal>
  );
};

export { TooltipContent };
