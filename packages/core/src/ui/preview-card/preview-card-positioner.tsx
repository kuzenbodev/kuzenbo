"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { cn } from "tailwind-variants";

export type PreviewCardPositionerProps = PreviewCardPrimitive.Positioner.Props;

const PreviewCardPositioner = ({
  className,
  ...props
}: PreviewCardPositionerProps) => (
  <PreviewCardPrimitive.Positioner
    className={cn("z-overlay isolate", className)}
    data-slot="preview-card-positioner"
    {...props}
  />
);

export { PreviewCardPositioner };
