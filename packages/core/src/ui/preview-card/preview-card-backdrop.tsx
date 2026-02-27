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
      "fixed inset-0 isolate z-overlay bg-black/10 duration-100 data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0 supports-backdrop-filter:backdrop-blur-xs",
      className
    )}
    data-slot="preview-card-backdrop"
    {...props}
  />
);

export { PreviewCardBackdrop };
