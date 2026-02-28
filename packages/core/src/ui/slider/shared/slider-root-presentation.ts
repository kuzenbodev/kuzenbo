import type { Slider as SliderPrimitive } from "@base-ui/react/slider";
import type { CSSProperties } from "react";

import {
  type BaseUIClassName,
  mergeBaseUIClassName,
} from "../../../utils/merge-base-ui-class-name";
import type { SliderRootStyleTokenOptions } from "./slider-style-tokens";
import { resolveSliderRootStyleTokens } from "./slider-style-tokens";

export const resolveSliderRootClassName = (
  className: BaseUIClassName<SliderPrimitive.Root.State>,
  inverted: boolean
) =>
  mergeBaseUIClassName<SliderPrimitive.Root.State>(
    "group/slider data-[orientation=horizontal]:w-full data-[orientation=horizontal]:px-[calc(var(--slider-thumb-size,1.25rem)/2)] data-[orientation=vertical]:h-full data-[orientation=vertical]:py-[calc(var(--slider-thumb-size,1.25rem)/2)]",
    typeof className === "function"
      ? (state) =>
          [
            inverted
              ? "[&_[data-slot=slider-track]]:bg-[var(--slider-color,var(--color-primary))] [&_[data-slot=slider-range]]:bg-[var(--slider-track-color,var(--color-muted))]"
              : undefined,
            className(state),
          ]
            .filter(Boolean)
            .join(" ")
      : [
          inverted
            ? "[&_[data-slot=slider-track]]:bg-[var(--slider-color,var(--color-primary))] [&_[data-slot=slider-range]]:bg-[var(--slider-track-color,var(--color-muted))]"
            : undefined,
          className,
        ]
          .filter(Boolean)
          .join(" ")
  );

type SliderRootStyle<TValue extends number | number[]> =
  SliderPrimitive.Root.Props<TValue>["style"];

export const mergeSliderRootStyle = <TValue extends number | number[]>(
  styleTokens: SliderRootStyleTokenOptions,
  style: SliderRootStyle<TValue>
): SliderRootStyle<TValue> => {
  const baseStyle = resolveSliderRootStyleTokens(styleTokens);

  if (typeof style === "function") {
    return (state) => {
      const resolvedStyle = style(state);
      return baseStyle ? { ...baseStyle, ...resolvedStyle } : resolvedStyle;
    };
  }

  if (!baseStyle) {
    return style;
  }

  return { ...baseStyle, ...(style as CSSProperties | undefined) };
};
