"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "tailwind-variants";

export type DialogBackdropProps = DialogPrimitive.Backdrop.Props;

const DialogBackdrop = ({ className, ...props }: DialogBackdropProps) => (
  <DialogPrimitive.Backdrop
    className={cn(
      "z-overlay data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0 fixed inset-0 isolate bg-[rgb(0_0_0_/_var(--kb-overlay-scrim-opacity,0.1))] duration-100 supports-backdrop-filter:backdrop-blur-[var(--kb-overlay-scrim-blur,4px)]",
      className
    )}
    data-slot="dialog-backdrop"
    {...props}
  />
);

export { DialogBackdrop };
