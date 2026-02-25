"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { mergeBaseUIClassName } from "../../../utils/merge-base-ui-class-name";

export type SliderValueProps = SliderPrimitive.Value.Props;

const SliderValue = ({ className, ...props }: SliderValueProps) => (
  <SliderPrimitive.Value
    className={mergeBaseUIClassName<SliderPrimitive.Root.State>(
      undefined,
      className
    )}
    data-slot="slider-value"
    {...props}
  />
);

export { SliderValue };
