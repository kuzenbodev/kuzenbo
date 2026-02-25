"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "tailwind-variants";

export type DialogPopupProps = DialogPrimitive.Popup.Props;

const DialogPopup = ({ className, ...props }: DialogPopupProps) => (
  <DialogPrimitive.Popup
    className={cn(
      "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-6 rounded-xl bg-background p-6 text-sm ring-1 ring-foreground/10 duration-100 outline-none data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 sm:max-w-md",
      className
    )}
    data-slot="dialog-popup"
    {...props}
  />
);

export { DialogPopup };
