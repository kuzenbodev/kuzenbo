"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { cn } from "tailwind-variants";

export type PreviewCardTriggerProps = PreviewCardPrimitive.Trigger.Props;

const PreviewCardTrigger = ({
  className,
  ...props
}: PreviewCardTriggerProps) => (
  <PreviewCardPrimitive.Trigger
    className={cn("cursor-clickable", className)}
    data-slot="preview-card-trigger"
    {...props}
  />
);

export { PreviewCardTrigger };
