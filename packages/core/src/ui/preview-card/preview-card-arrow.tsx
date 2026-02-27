"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { cn } from "tailwind-variants";

export type PreviewCardArrowProps = PreviewCardPrimitive.Arrow.Props;

const PreviewCardArrow = ({ className, ...props }: PreviewCardArrowProps) => (
  <PreviewCardPrimitive.Arrow
    className={cn(
      "z-overlay size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-popover fill-popover data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5",
      className
    )}
    data-slot="preview-card-arrow"
    {...props}
  />
);

export { PreviewCardArrow };
