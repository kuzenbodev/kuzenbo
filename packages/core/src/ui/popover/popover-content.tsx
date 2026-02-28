"use client";

import type { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import { PopoverPopup } from "./popover-popup";
import { PopoverPortal } from "./popover-portal";
import { PopoverPositioner } from "./popover-positioner";
import { useResolvedPopoverSize } from "./popover-size-context";
import type { PopoverSize } from "./popover-size-context";
import { PopoverViewport } from "./popover-viewport";
export type PopoverContentProps = PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    size?: PopoverSize;
  };

const PopoverContent = ({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  size,
  children,
  ...props
}: PopoverContentProps) => {
  const resolvedSize = useResolvedPopoverSize(size);

  return (
    <PopoverPortal>
      <PopoverPositioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <PopoverPopup
          className={className}
          data-size={resolvedSize}
          data-slot="popover-content"
          size={resolvedSize}
          {...props}
        >
          <PopoverViewport>{children}</PopoverViewport>
        </PopoverPopup>
      </PopoverPositioner>
    </PopoverPortal>
  );
};

export { PopoverContent };
