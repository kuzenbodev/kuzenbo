"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { mergeBaseUIClassName } from "../../../utils/merge-base-ui-class-name";

export type SliderControlProps = SliderPrimitive.Control.Props;

const SliderControl = ({ className, ...props }: SliderControlProps) => (
  <SliderPrimitive.Control
    className={mergeBaseUIClassName<SliderPrimitive.Root.State>(
      "group/control relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:flex-col",
      className
    )}
    data-slot="slider-control"
    {...props}
  />
);

export { SliderControl };
