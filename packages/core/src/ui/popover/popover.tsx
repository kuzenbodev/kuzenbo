"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import { useComponentSize } from "../shared/size/size-provider";
import { PopoverArrow } from "./popover-arrow";
import { PopoverBackdrop } from "./popover-backdrop";
import { PopoverClose } from "./popover-close";
import { PopoverContent } from "./popover-content";
import { PopoverDescription } from "./popover-description";
import { PopoverHeader } from "./popover-header";
import { PopoverPopup } from "./popover-popup";
import { PopoverPortal } from "./popover-portal";
import { PopoverPositioner } from "./popover-positioner";
import { PopoverSizeContext, type PopoverSize } from "./popover-size-context";
import { PopoverTitle } from "./popover-title";
import { PopoverTrigger } from "./popover-trigger";
import { PopoverViewport } from "./popover-viewport";
export type PopoverProps = PopoverPrimitive.Root.Props & {
  size?: PopoverSize;
};

const Popover = ({ size: providedSize, ...props }: PopoverProps) => {
  const size = useComponentSize(providedSize);

  return (
    <PopoverSizeContext.Provider value={{ size }}>
      <PopoverPrimitive.Root data-size={size} data-slot="popover" {...props} />
    </PopoverSizeContext.Provider>
  );
};

Popover.Content = PopoverContent;
Popover.Description = PopoverDescription;
Popover.Header = PopoverHeader;
Popover.Arrow = PopoverArrow;
Popover.Backdrop = PopoverBackdrop;
Popover.Close = PopoverClose;
Popover.Popup = PopoverPopup;
Popover.Portal = PopoverPortal;
Popover.Positioner = PopoverPositioner;
Popover.Title = PopoverTitle;
Popover.Trigger = PopoverTrigger;
Popover.Viewport = PopoverViewport;

export type { PopoverArrowProps } from "./popover-arrow";
export type { PopoverBackdropProps } from "./popover-backdrop";
export type { PopoverCloseProps } from "./popover-close";
export type { PopoverPopupProps } from "./popover-popup";
export type { PopoverPortalProps } from "./popover-portal";
export type { PopoverPositionerProps } from "./popover-positioner";
export type { PopoverViewportProps } from "./popover-viewport";

export {
  Popover,
  PopoverArrow,
  PopoverBackdrop,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
  PopoverViewport,
};

export type { PopoverContentProps } from "./popover-content";
export type { PopoverDescriptionProps } from "./popover-description";
export type { PopoverHeaderProps } from "./popover-header";
export type { PopoverSize } from "./popover-size-context";
export type { PopoverTitleProps } from "./popover-title";
export type { PopoverTriggerProps } from "./popover-trigger";
