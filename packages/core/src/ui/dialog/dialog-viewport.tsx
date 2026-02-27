"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "tailwind-variants";

export type DialogViewportProps = DialogPrimitive.Viewport.Props;

const DialogViewport = ({ className, ...props }: DialogViewportProps) => (
  <DialogPrimitive.Viewport
    className={cn(
      "fixed inset-0 z-overlay flex items-center justify-center p-4",
      className
    )}
    data-slot="dialog-viewport"
    {...props}
  />
);

export { DialogViewport };
