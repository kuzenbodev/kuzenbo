"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { DialogBackdrop } from "./dialog-backdrop";
import { DialogClose } from "./dialog-close";
import { DialogContent } from "./dialog-content";
import { DialogDescription } from "./dialog-description";
import { DialogFooter } from "./dialog-footer";
import { DialogHeader } from "./dialog-header";
import { DialogOverlay } from "./dialog-overlay";
import { DialogPopup } from "./dialog-popup";
import { DialogPortal } from "./dialog-portal";
import { DialogTitle } from "./dialog-title";
import { DialogTrigger } from "./dialog-trigger";
import { DialogViewport } from "./dialog-viewport";

export interface DialogProps extends DialogPrimitive.Root.Props {
  onOpenChange?: (open: boolean) => void;
}

const Dialog = ({ ...props }: DialogProps) => (
  <DialogPrimitive.Root data-slot="dialog" {...props} />
);

Dialog.Close = DialogClose;
Dialog.Content = DialogContent;
Dialog.Backdrop = DialogBackdrop;
Dialog.Description = DialogDescription;
Dialog.Footer = DialogFooter;
Dialog.Header = DialogHeader;
Dialog.Overlay = DialogOverlay;
Dialog.Portal = DialogPortal;
Dialog.Popup = DialogPopup;
Dialog.Title = DialogTitle;
Dialog.Trigger = DialogTrigger;
Dialog.Viewport = DialogViewport;

export type { DialogBackdropProps } from "./dialog-backdrop";
export type { DialogCloseProps } from "./dialog-close";
export type { DialogContentProps } from "./dialog-content";
export type { DialogDescriptionProps } from "./dialog-description";
export type { DialogFooterProps } from "./dialog-footer";
export type { DialogHeaderProps } from "./dialog-header";
export type { DialogOverlayProps } from "./dialog-overlay";
export type { DialogPortalProps } from "./dialog-portal";
export type { DialogPopupProps } from "./dialog-popup";
export type { DialogTitleProps } from "./dialog-title";
export type { DialogTriggerProps } from "./dialog-trigger";
export type { DialogViewportProps } from "./dialog-viewport";

export {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
};
