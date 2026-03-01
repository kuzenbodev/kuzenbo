"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "tailwind-variants";

export type DialogPopupProps = DialogPrimitive.Popup.Props;

const DialogPopup = ({ className, ...props }: DialogPopupProps) => (
  <DialogPrimitive.Popup
    className={cn(
      "z-overlay bg-background ring-foreground/10 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 fixed top-1/2 left-1/2 grid w-full max-w-[min(var(--kb-dialog-max-width,28rem),calc(100%-var(--kb-dialog-edge-gutter,1rem)*2))] -translate-x-1/2 -translate-y-1/2 gap-6 rounded-xl p-6 text-sm ring-1 duration-100 outline-none",
      className
    )}
    data-slot="dialog-popup"
    {...props}
  />
);

export { DialogPopup };
