"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

import { AlertDialogAction } from "./alert-dialog-action";
import { AlertDialogBackdrop } from "./alert-dialog-backdrop";
import { AlertDialogCancel } from "./alert-dialog-cancel";
import { AlertDialogClose } from "./alert-dialog-close";
import { AlertDialogContent } from "./alert-dialog-content";
import { AlertDialogDescription } from "./alert-dialog-description";
import { AlertDialogFooter } from "./alert-dialog-footer";
import { AlertDialogHeader } from "./alert-dialog-header";
import { AlertDialogMedia } from "./alert-dialog-media";
import { AlertDialogOverlay } from "./alert-dialog-overlay";
import { AlertDialogPopup } from "./alert-dialog-popup";
import { AlertDialogPortal } from "./alert-dialog-portal";
import { AlertDialogTitle } from "./alert-dialog-title";
import { AlertDialogTrigger } from "./alert-dialog-trigger";
import { AlertDialogViewport } from "./alert-dialog-viewport";
export type AlertDialogProps = AlertDialogPrimitive.Root.Props;

const AlertDialog = ({ ...props }: AlertDialogProps) => (
  <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
);

AlertDialog.Action = AlertDialogAction;
AlertDialog.Backdrop = AlertDialogBackdrop;
AlertDialog.Cancel = AlertDialogCancel;
AlertDialog.Close = AlertDialogClose;
AlertDialog.Content = AlertDialogContent;
AlertDialog.Description = AlertDialogDescription;
AlertDialog.Footer = AlertDialogFooter;
AlertDialog.Header = AlertDialogHeader;
AlertDialog.Media = AlertDialogMedia;
AlertDialog.Overlay = AlertDialogOverlay;
AlertDialog.Portal = AlertDialogPortal;
AlertDialog.Popup = AlertDialogPopup;
AlertDialog.Title = AlertDialogTitle;
AlertDialog.Trigger = AlertDialogTrigger;
AlertDialog.Viewport = AlertDialogViewport;

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBackdrop,
  AlertDialogCancel,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogViewport,
};

export type { AlertDialogActionProps } from "./alert-dialog-action";
export type { AlertDialogBackdropProps } from "./alert-dialog-backdrop";
export type { AlertDialogCancelProps } from "./alert-dialog-cancel";
export type { AlertDialogCloseProps } from "./alert-dialog-close";
export type { AlertDialogContentProps } from "./alert-dialog-content";
export type { AlertDialogDescriptionProps } from "./alert-dialog-description";
export type { AlertDialogFooterProps } from "./alert-dialog-footer";
export type { AlertDialogHeaderProps } from "./alert-dialog-header";
export type { AlertDialogMediaProps } from "./alert-dialog-media";
export type { AlertDialogOverlayProps } from "./alert-dialog-overlay";
export type { AlertDialogPopupProps } from "./alert-dialog-popup";
export type { AlertDialogPortalProps } from "./alert-dialog-portal";
export type { AlertDialogTitleProps } from "./alert-dialog-title";
export type { AlertDialogTriggerProps } from "./alert-dialog-trigger";
export type { AlertDialogViewportProps } from "./alert-dialog-viewport";
