"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";

import { SheetBackdrop } from "./sheet-backdrop";
import { SheetClose } from "./sheet-close";
import { SheetContent } from "./sheet-content";
import { SheetDescription } from "./sheet-description";
import { SheetFooter } from "./sheet-footer";
import { SheetHeader } from "./sheet-header";
import { SheetOverlay } from "./sheet-overlay";
import { SheetPopup } from "./sheet-popup";
import { SheetPortal } from "./sheet-portal";
import { SheetTitle } from "./sheet-title";
import { SheetTrigger } from "./sheet-trigger";
import { SheetViewport } from "./sheet-viewport";
export type SheetProps = SheetPrimitive.Root.Props;

const Sheet = ({ ...props }: SheetProps) => (
  <SheetPrimitive.Root data-slot="sheet" {...props} />
);

Sheet.Close = SheetClose;
Sheet.Content = SheetContent;
Sheet.Backdrop = SheetBackdrop;
Sheet.Description = SheetDescription;
Sheet.Footer = SheetFooter;
Sheet.Header = SheetHeader;
Sheet.Overlay = SheetOverlay;
Sheet.Portal = SheetPortal;
Sheet.Popup = SheetPopup;
Sheet.Title = SheetTitle;
Sheet.Trigger = SheetTrigger;
Sheet.Viewport = SheetViewport;

export {
  Sheet,
  SheetBackdrop,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
  SheetViewport,
};

export type { SheetBackdropProps } from "./sheet-backdrop";
export type { SheetCloseProps } from "./sheet-close";
export type { SheetContentProps } from "./sheet-content";
export type { SheetDescriptionProps } from "./sheet-description";
export type { SheetFooterProps } from "./sheet-footer";
export type { SheetHeaderProps } from "./sheet-header";
export type { SheetOverlayProps } from "./sheet-overlay";
export type { SheetPopupProps } from "./sheet-popup";
export type { SheetPortalProps } from "./sheet-portal";
export type { SheetTitleProps } from "./sheet-title";
export type { SheetTriggerProps } from "./sheet-trigger";
export type { SheetViewportProps } from "./sheet-viewport";
