"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { mergeBaseUIClassName } from "../../../utils/merge-base-ui-class-name";

export type SliderIndicatorProps = SliderPrimitive.Indicator.Props;

const SliderIndicator = ({ className, ...props }: SliderIndicatorProps) => (
  <SliderPrimitive.Indicator
    className={mergeBaseUIClassName<SliderPrimitive.Root.State>(
      "rounded-[var(--slider-radius,var(--radius-sm))] bg-[var(--slider-color,var(--color-primary))] select-none group-data-[invalid]/slider:bg-danger data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full transition-[background-color,inset-inline-start,inset-inline-end,inset-block-start,inset-block-end,width,height] duration-150 ease-out group-data-[dragging]/slider:duration-0 motion-reduce:transition-none",
      className
    )}
    {...props}
    data-slot="slider-range"
  />
);

export { SliderIndicator };
