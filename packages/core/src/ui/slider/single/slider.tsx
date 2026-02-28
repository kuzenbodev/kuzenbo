"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { toFloatingValue } from "../math/slider-math-utils";
import { SliderControl } from "../primitives/slider-control";
import type { SliderControlProps } from "../primitives/slider-control";
import { SliderIndicator } from "../primitives/slider-indicator";
import type { SliderIndicatorProps } from "../primitives/slider-indicator";
import { SliderMark } from "../primitives/slider-mark";
import type { SliderMarkProps } from "../primitives/slider-mark";
import { SliderMarks } from "../primitives/slider-marks";
import type { SliderMarksProps } from "../primitives/slider-marks";
import { SliderThumb } from "../primitives/slider-thumb";
import type { SliderThumbProps } from "../primitives/slider-thumb";
import { SliderThumbLabel } from "../primitives/slider-thumb-label";
import type { SliderThumbLabelProps } from "../primitives/slider-thumb-label";
import { SliderTrack } from "../primitives/slider-track";
import type { SliderTrackProps } from "../primitives/slider-track";
import { SliderValue as SliderValuePrimitive } from "../primitives/slider-value";
import type { SliderValueProps } from "../primitives/slider-value";
import { resolveSliderBounds } from "../shared/slider-bounds";
import { resolveSliderLabel } from "../shared/slider-label";
import {
  mergeSliderRootStyle,
  resolveSliderRootClassName,
} from "../shared/slider-root-presentation";
import type { SliderRadius, SliderSize } from "../shared/slider-style-tokens";
import type { SliderLabelTransitionProps } from "../shared/slider-transition";
import type {
  SliderLabel,
  SliderMark as SliderMarkType,
  SliderValue,
} from "../shared/slider-types";
import { useSingleSliderState } from "./use-single-slider-state";

type SliderRootProps = Omit<
  SliderPrimitive.Root.Props<number>,
  | "defaultValue"
  | "max"
  | "min"
  | "name"
  | "onChange"
  | "onValueChange"
  | "onValueCommitted"
  | "minStepsBetweenValues"
  | "thumbCollisionBehavior"
  | "thumbAlignment"
  | "value"
>;

export interface SliderProps extends SliderRootProps {
  color?: string;
  defaultValue?: number;
  domain?: [number, number];
  hiddenInputProps?: Omit<
    ComponentPropsWithoutRef<"input">,
    "name" | "type" | "value"
  >;
  inverted?: boolean;
  label?: SliderLabel;
  labelAlwaysOn?: boolean;
  labelTransitionProps?: SliderLabelTransitionProps;
  marks?: readonly SliderMarkType[];
  max?: number;
  min?: number;
  name?: string;
  onChange?: ((value: SliderValue) => void) | undefined;
  onChangeEnd?: ((value: SliderValue) => void) | undefined;
  precision?: number;
  radius?: SliderRadius;
  restrictToMarks?: boolean;
  scale?: ((value: number) => number) | undefined;
  size?: SliderSize;
  showLabelOnHover?: boolean;
  step?: number;
  thumbChildren?: ReactNode;
  thumbLabel?: string;
  thumbLabelOffset?: number | string;
  thumbLabelOffsetVertical?: number | string;
  thumbProps?: Omit<SliderThumbProps, "aria-label" | "children" | "index">;
  thumbSize?: number | string;
  trackSize?: number | string;
  markSize?: number | string;
  value?: number;
}

type SliderComponent = ((props: SliderProps) => ReactNode) & {
  Control: typeof SliderControl;
  Indicator: typeof SliderIndicator;
  Mark: typeof SliderMark;
  Marks: typeof SliderMarks;
  Thumb: typeof SliderThumb;
  ThumbLabel: typeof SliderThumbLabel;
  Track: typeof SliderTrack;
  Value: typeof SliderValuePrimitive;
};

const Slider = (({
  className,
  children,
  color,
  defaultValue,
  domain,
  hiddenInputProps,
  inverted = false,
  label = (value) => value,
  labelAlwaysOn = false,
  labelTransitionProps,
  marks,
  max = 100,
  min = 0,
  name,
  onChange,
  onChangeEnd,
  precision: precisionProp,
  radius,
  restrictToMarks = false,
  scale = (value) => value,
  size,
  showLabelOnHover = true,
  step = 1,
  style,
  thumbChildren,
  thumbLabel,
  thumbLabelOffset,
  thumbLabelOffsetVertical,
  thumbProps,
  thumbSize,
  trackSize,
  markSize,
  value,
  ...props
}: SliderProps) => {
  const resolvedBounds = resolveSliderBounds({
    domain,
    max,
    min,
    precision: precisionProp,
    step,
  });

  const {
    domainMax,
    domainMin,
    max: normalizedMax,
    min: normalizedMin,
    precision,
  } = resolvedBounds;

  const { handleValueChange, handleValueCommitted, sliderValue } =
    useSingleSliderState({
      defaultValue,
      domainMax,
      domainMin,
      marks,
      max: normalizedMax,
      min: normalizedMin,
      onChange,
      onChangeEnd,
      precision,
      restrictToMarks,
      value,
    });

  const displayedValue = toFloatingValue(scale(sliderValue), precision);
  const resolvedLabel = resolveSliderLabel(label, displayedValue);
  const defaultThumbProps = thumbProps ?? {};

  return (
    <SliderPrimitive.Root
      {...props}
      className={resolveSliderRootClassName(className, inverted)}
      data-slot="slider"
      max={domainMax}
      min={domainMin}
      onValueChange={handleValueChange}
      onValueCommitted={handleValueCommitted}
      step={step}
      style={mergeSliderRootStyle(
        {
          color,
          markSize,
          radius,
          size,
          thumbLabelOffset,
          thumbLabelOffsetVertical,
          thumbSize,
          trackSize,
        },
        style
      )}
      thumbAlignment="center"
      value={sliderValue}
    >
      {children ?? (
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
            <SliderMarks
              disabled={props.disabled}
              inverted={inverted}
              marks={marks}
              max={domainMax}
              min={domainMin}
              orientation={props.orientation}
              values={[sliderValue]}
            />
          </SliderTrack>
          <SliderThumb {...defaultThumbProps} aria-label={thumbLabel}>
            {thumbChildren}
            <SliderThumbLabel
              label={resolvedLabel}
              labelAlwaysOn={labelAlwaysOn}
              orientation={props.orientation}
              showLabelOnHover={showLabelOnHover}
              transitionProps={labelTransitionProps}
            />
          </SliderThumb>
        </SliderControl>
      )}
      {name ? (
        <input
          {...hiddenInputProps}
          name={name}
          type="hidden"
          value={String(displayedValue)}
        />
      ) : null}
    </SliderPrimitive.Root>
  );
}) as SliderComponent;

Slider.Control = SliderControl;
Slider.Indicator = SliderIndicator;
Slider.Mark = SliderMark;
Slider.Marks = SliderMarks;
Slider.Thumb = SliderThumb;
Slider.ThumbLabel = SliderThumbLabel;
Slider.Track = SliderTrack;
Slider.Value = SliderValuePrimitive;

export type { SliderControlProps };
export type { SliderIndicatorProps };
export type { SliderMarkProps };
export type { SliderMarksProps };
export type { SliderThumbProps };
export type { SliderThumbLabelProps };
export type { SliderTrackProps };
export type { SliderValueProps };
export type { SliderMarkType as SliderMarkDefinition };

export {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderMark,
  SliderMarks,
  SliderThumb,
  SliderThumbLabel,
  SliderTrack,
  SliderValuePrimitive as SliderValue,
};
