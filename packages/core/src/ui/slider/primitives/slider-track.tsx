"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { mergeBaseUIClassName } from "../../../utils/merge-base-ui-class-name";

export type SliderTrackProps = SliderPrimitive.Track.Props;

const SliderTrack = ({ className, ...props }: SliderTrackProps) => (
  <SliderPrimitive.Track
    className={mergeBaseUIClassName<SliderPrimitive.Root.State>(
      "relative overflow-visible rounded-[var(--slider-radius,var(--radius-sm))] bg-[var(--slider-track-color,var(--color-muted))] select-none group-data-[invalid]/slider:bg-danger/15 data-[orientation=horizontal]:h-[var(--slider-size,var(--slider-track-size,0.5rem))] data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-[var(--slider-size,var(--slider-track-size,0.5rem))] transition-[background-color] duration-150 ease-out group-data-[dragging]/slider:duration-0 motion-reduce:transition-none",
      className
    )}
    {...props}
    data-slot="slider-track"
  />
);

export { SliderTrack };
