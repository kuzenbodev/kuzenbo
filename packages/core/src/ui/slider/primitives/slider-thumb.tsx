"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { mergeBaseUIClassName } from "../../../utils/merge-base-ui-class-name";

export type SliderThumbProps = SliderPrimitive.Thumb.Props;

const SliderThumb = ({ className, ...props }: SliderThumbProps) => (
  <SliderPrimitive.Thumb
    className={mergeBaseUIClassName<SliderPrimitive.Thumb.State>(
      "group/thumb relative block h-[var(--slider-thumb-size,1.25rem)] w-[var(--slider-thumb-size,1.25rem)] shrink-0 cursor-pointer rounded-[var(--slider-radius,var(--radius-sm))] border border-border bg-background shadow-sm ring-ring/50 select-none hover:ring-[3px] has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-hidden active:ring-[3px] disabled:pointer-events-none disabled:opacity-50 group-data-[invalid]/slider:border-danger group-data-[invalid]/slider:ring-danger/20 dark:group-data-[invalid]/slider:ring-danger/40 transition-[color,box-shadow,border-color,background-color] duration-150 ease-out group-data-[dragging]/slider:duration-0 motion-reduce:transition-none",
      className
    )}
    {...props}
    data-slot="slider-thumb"
  />
);

export { SliderThumb };
