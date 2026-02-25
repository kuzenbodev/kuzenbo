"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

export type DialogCloseProps = DialogPrimitive.Close.Props;

const DialogClose = ({ ...props }: DialogCloseProps) => (
  <DialogPrimitive.Close data-slot="dialog-close" {...props} />
);

export { DialogClose };
