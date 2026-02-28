"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { toFloatingValue } from "../slider/math/slider-math-utils";
import { SliderControl } from "../slider/primitives/slider-control";
import { SliderIndicator } from "../slider/primitives/slider-indicator";
import { SliderMark } from "../slider/primitives/slider-mark";
import { SliderMarks } from "../slider/primitives/slider-marks";
import {
  SliderThumb,
  type SliderThumbProps,
} from "../slider/primitives/slider-thumb";
import { SliderThumbLabel } from "../slider/primitives/slider-thumb-label";
import { SliderTrack } from "../slider/primitives/slider-track";
import { SliderValue as SliderValuePrimitive } from "../slider/primitives/slider-value";
import { resolveSliderBounds } from "../slider/shared/slider-bounds";
import { resolveSliderLabel } from "../slider/shared/slider-label";
import {
  mergeSliderRootStyle,
  resolveSliderRootClassName,
} from "../slider/shared/slider-root-presentation";
import type {
  SliderRadius,
  SliderSize,
} from "../slider/shared/slider-style-tokens";
import type { SliderLabelTransitionProps } from "../slider/shared/slider-transition";
import type {
  SliderLabel,
  SliderMark as SliderMarkType,
} from "../slider/shared/slider-types";
import {
  getMinStepsBetweenValues,
  getThumbChildrenByIndex,
} from "./range-slider-helpers";
import type { RangeSliderValue } from "./range-slider-types";
import { useRangeSliderState } from "./use-range-slider-state";

type RangeSliderRootProps = Omit<
  SliderPrimitive.Root.Props<number[]>,
  | "defaultValue"
  | "max"
  | "min"
  | "minStepsBetweenValues"
  | "name"
  | "onChange"
  | "onValueChange"
  | "onValueCommitted"
  | "thumbAlignment"
  | "thumbCollisionBehavior"
  | "value"
>;

export interface RangeSliderProps extends RangeSliderRootProps {
  color?: string;
  defaultValue?: RangeSliderValue;
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
  maxRange?: number;
  min?: number;
  minRange?: number;
  name?: string;
  onChange?: ((value: RangeSliderValue) => void) | undefined;
  onChangeEnd?: ((value: RangeSliderValue) => void) | undefined;
  precision?: number;
  pushOnOverlap?: boolean;
  radius?: SliderRadius;
  restrictToMarks?: boolean;
  scale?: ((value: number) => number) | undefined;
  size?: SliderSize;
  showLabelOnHover?: boolean;
  step?: number;
  thumbChildren?: ReactNode | [ReactNode, ReactNode];
  thumbFromLabel?: string;
  thumbLabelOffset?: number | string;
  thumbLabelOffsetVertical?: number | string;
  thumbProps?:
    | ((
        index: 0 | 1
      ) => Omit<SliderThumbProps, "aria-label" | "children" | "index">)
    | undefined;
  thumbSize?: number | string;
  thumbToLabel?: string;
  trackSize?: number | string;
  markSize?: number | string;
  value?: RangeSliderValue;
}

type RangeSliderComponent = ((props: RangeSliderProps) => ReactNode) & {
  Control: typeof SliderControl;
  Indicator: typeof SliderIndicator;
  Mark: typeof SliderMark;
  Marks: typeof SliderMarks;
  Thumb: typeof SliderThumb;
  ThumbLabel: typeof SliderThumbLabel;
  Track: typeof SliderTrack;
  Value: typeof SliderValuePrimitive;
};

const RangeSlider = (({
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
  maxRange = Number.POSITIVE_INFINITY,
  min = 0,
  minRange = 10,
  name,
  onChange,
  onChangeEnd,
  precision: precisionProp,
  pushOnOverlap = true,
  radius,
  restrictToMarks = false,
  scale = (value) => value,
  size,
  showLabelOnHover = true,
  step = 1,
  style,
  thumbChildren,
  thumbFromLabel,
  thumbLabelOffset,
  thumbLabelOffsetVertical,
  thumbProps,
  thumbSize,
  thumbToLabel,
  trackSize,
  markSize,
  value,
  ...props
}: RangeSliderProps) => {
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

  const { handleValueChange, handleValueCommitted, rangeValue } =
    useRangeSliderState({
      defaultValue,
      domainMax,
      domainMin,
      marks,
      max: normalizedMax,
      maxRange,
      min: normalizedMin,
      minRange,
      onChange,
      onChangeEnd,
      precision,
      pushOnOverlap,
      restrictToMarks,
      value,
    });

  const firstThumbProps = thumbProps?.(0) ?? {};
  const secondThumbProps = thumbProps?.(1) ?? {};

  const minStepsBetweenValues = getMinStepsBetweenValues({
    minRange,
    restrictToMarks,
    step,
  });

  const displayedFromValue = toFloatingValue(scale(rangeValue[0]), precision);
  const displayedToValue = toFloatingValue(scale(rangeValue[1]), precision);

  return (
    <SliderPrimitive.Root
      {...props}
      className={resolveSliderRootClassName(className, inverted)}
      data-slot="slider"
      max={domainMax}
      min={domainMin}
      minStepsBetweenValues={minStepsBetweenValues}
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
      thumbCollisionBehavior={pushOnOverlap ? "push" : "none"}
      value={rangeValue}
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
              values={rangeValue}
            />
          </SliderTrack>
          <SliderThumb
            {...firstThumbProps}
            aria-label={thumbFromLabel}
            index={0}
          >
            {getThumbChildrenByIndex(thumbChildren, 0)}
            <SliderThumbLabel
              label={resolveSliderLabel(label, displayedFromValue)}
              labelAlwaysOn={labelAlwaysOn}
              orientation={props.orientation}
              showLabelOnHover={showLabelOnHover}
              transitionProps={labelTransitionProps}
            />
          </SliderThumb>
          <SliderThumb
            {...secondThumbProps}
            aria-label={thumbToLabel}
            index={1}
          >
            {getThumbChildrenByIndex(thumbChildren, 1)}
            <SliderThumbLabel
              label={resolveSliderLabel(label, displayedToValue)}
              labelAlwaysOn={labelAlwaysOn}
              orientation={props.orientation}
              showLabelOnHover={showLabelOnHover}
              transitionProps={labelTransitionProps}
            />
          </SliderThumb>
        </SliderControl>
      )}
      {name ? (
        <>
          <input
            {...hiddenInputProps}
            name={`${name}_from`}
            type="hidden"
            value={String(displayedFromValue)}
          />
          <input
            {...hiddenInputProps}
            name={`${name}_to`}
            type="hidden"
            value={String(displayedToValue)}
          />
        </>
      ) : null}
    </SliderPrimitive.Root>
  );
}) as RangeSliderComponent;

RangeSlider.Control = SliderControl;
RangeSlider.Indicator = SliderIndicator;
RangeSlider.Mark = SliderMark;
RangeSlider.Marks = SliderMarks;
RangeSlider.Thumb = SliderThumb;
RangeSlider.ThumbLabel = SliderThumbLabel;
RangeSlider.Track = SliderTrack;
RangeSlider.Value = SliderValuePrimitive;

export { RangeSlider };
