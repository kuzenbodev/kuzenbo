"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "tailwind-variants";

export type DialogBackdropProps = DialogPrimitive.Backdrop.Props;

const DialogBackdrop = ({ className, ...props }: DialogBackdropProps) => (
  <DialogPrimitive.Backdrop
    className={cn(
      "fixed inset-0 isolate z-overlay bg-black/10 duration-100 data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0 supports-backdrop-filter:backdrop-blur-xs",
      className
    )}
    data-slot="dialog-backdrop"
    {...props}
  />
);

export { DialogBackdrop };
