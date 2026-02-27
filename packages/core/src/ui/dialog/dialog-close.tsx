"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "tailwind-variants";

export type DialogCloseProps = DialogPrimitive.Close.Props;

const DialogClose = ({ className, ...props }: DialogCloseProps) => (
  <DialogPrimitive.Close
    className={cn("cursor-clickable", className)}
    data-slot="dialog-close"
    {...props}
  />
);

export { DialogClose };
