"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { cn } from "tailwind-variants";

export type PreviewCardPopupProps = PreviewCardPrimitive.Popup.Props;

const PreviewCardPopup = ({ className, ...props }: PreviewCardPopupProps) => (
  <PreviewCardPrimitive.Popup
    className={cn(
      "z-overlay bg-popover text-popover-foreground ring-foreground/10 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-64 origin-(--transform-origin) rounded-lg p-4 text-sm shadow-md ring-1 outline-hidden duration-100",
      className
    )}
    data-slot="preview-card-popup"
    {...props}
  />
);

export { PreviewCardPopup };
