"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "tailwind-variants";

import {
  defaultSliderLabelTransitionProps,
  type SliderLabelTransitionProps,
} from "../shared/slider-transition";

export interface SliderThumbLabelProps extends Omit<
  ComponentPropsWithoutRef<"span">,
  "children"
> {
  label: ReactNode;
  labelAlwaysOn?: boolean;
  orientation?: "horizontal" | "vertical";
  showLabelOnHover?: boolean;
  transitionProps?: SliderLabelTransitionProps;
}

const toMilliseconds = (value: number) => `${value}ms`;

const SliderThumbLabel = ({
  className,
  label,
  labelAlwaysOn,
  orientation = "horizontal",
  showLabelOnHover,
  style,
  transitionProps,
  ...props
}: SliderThumbLabelProps) => {
  if (label === null || label === undefined) {
    return null;
  }

  const transitionDelay =
    transitionProps?.delay ?? defaultSliderLabelTransitionProps.delay;
  const transitionDuration =
    transitionProps?.duration ?? defaultSliderLabelTransitionProps.duration;
  const transitionTimingFunction =
    transitionProps?.timingFunction ??
    defaultSliderLabelTransitionProps.timingFunction;

  return (
    <span
      {...props}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-30 whitespace-nowrap rounded-sm bg-foreground px-1.5 py-0.5 text-xs text-background shadow-sm transition-opacity group-data-[dragging]/slider:duration-0 motion-reduce:transition-none",
        orientation === "horizontal"
          ? "-top-[var(--slider-thumb-label-offset,2rem)] left-1/2 -translate-x-1/2"
          : "left-[var(--slider-thumb-label-offset-vertical,2rem)] top-1/2 -translate-y-1/2",
        labelAlwaysOn
          ? "opacity-100"
          : "opacity-0 group-data-[dragging]/slider:opacity-100 group-has-[:focus]/thumb:opacity-100",
        showLabelOnHover ? "group-hover/slider:opacity-100" : undefined,
        className
      )}
      data-slot="slider-thumb-label"
      style={{
        ...style,
        transitionDelay: toMilliseconds(transitionDelay),
        transitionDuration: toMilliseconds(transitionDuration),
        transitionTimingFunction,
      }}
    >
      {label}
    </span>
  );
};

export { SliderThumbLabel };
