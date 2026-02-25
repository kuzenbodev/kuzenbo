"use client";

import { DialogBackdrop, type DialogBackdropProps } from "./dialog-backdrop";

export type DialogOverlayProps = DialogBackdropProps;

const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => (
  <DialogBackdrop className={className} data-slot="dialog-overlay" {...props} />
);

export { DialogOverlay };
