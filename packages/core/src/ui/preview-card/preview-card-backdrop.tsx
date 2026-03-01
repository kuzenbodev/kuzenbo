"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { cn } from "tailwind-variants";

export type PreviewCardBackdropProps = PreviewCardPrimitive.Backdrop.Props;

const PreviewCardBackdrop = ({
  className,
  ...props
}: PreviewCardBackdropProps) => (
  <PreviewCardPrimitive.Backdrop
    className={cn(
      "z-overlay data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0 fixed inset-0 isolate bg-[rgb(0_0_0_/_var(--kb-overlay-scrim-opacity,0.1))] duration-100 supports-backdrop-filter:backdrop-blur-[var(--kb-overlay-scrim-blur,4px)]",
      className
    )}
    data-slot="preview-card-backdrop"
    {...props}
  />
);

export { PreviewCardBackdrop };
