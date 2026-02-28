"use client";

import type { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { SliderMark } from "../slider/shared/slider-types";
import { normalizeRangeSliderValue } from "./math/normalize-range-slider-value";
import type { RangeSliderValue } from "./range-slider-types";

interface UseRangeSliderStateOptions {
  defaultValue?: RangeSliderValue;
  domainMax: number;
  domainMin: number;
  marks?: readonly SliderMark[];
  max: number;
  maxRange: number;
  min: number;
  minRange: number;
  onChange?: ((value: RangeSliderValue) => void) | undefined;
  onChangeEnd?: ((value: RangeSliderValue) => void) | undefined;
  precision: number;
  pushOnOverlap: boolean;
  restrictToMarks: boolean;
  value?: RangeSliderValue;
}

export const useRangeSliderState = ({
  defaultValue,
  domainMax,
  domainMin,
  marks,
  max,
  maxRange,
  min,
  minRange,
  onChange,
  onChangeEnd,
  precision,
  pushOnOverlap,
  restrictToMarks,
  value,
}: UseRangeSliderStateOptions) => {
  const initialValue = useMemo(
    () =>
      normalizeRangeSliderValue({
        current: [min, max],
        domainMax,
        domainMin,
        marks,
        max,
        maxRange,
        min,
        minRange,
        precision,
        pushOnOverlap,
        raw: defaultValue ?? [min, max],
        restrictToMarks,
      }),
    [
      defaultValue,
      domainMax,
      domainMin,
      marks,
      max,
      maxRange,
      min,
      minRange,
      precision,
      pushOnOverlap,
      restrictToMarks,
    ]
  );

  const [uncontrolledValue, setUncontrolledValue] =
    useState<RangeSliderValue>(initialValue);

  const controlledValue = useMemo(() => {
    if (value === undefined) {
      return;
    }

    return normalizeRangeSliderValue({
      current: uncontrolledValue,
      domainMax,
      domainMin,
      marks,
      max,
      maxRange,
      min,
      minRange,
      precision,
      pushOnOverlap,
      raw: value,
      restrictToMarks,
    });
  }, [
    domainMax,
    domainMin,
    marks,
    max,
    maxRange,
    min,
    minRange,
    precision,
    pushOnOverlap,
    restrictToMarks,
    uncontrolledValue,
    value,
  ]);

  const rangeValue = controlledValue ?? uncontrolledValue;
  const valueRef = useRef<RangeSliderValue>(rangeValue);

  useEffect(() => {
    valueRef.current = rangeValue;
  }, [rangeValue]);

  useEffect(() => {
    if (value !== undefined) {
      return;
    }

    setUncontrolledValue((previous) =>
      normalizeRangeSliderValue({
        current: previous,
        domainMax,
        domainMin,
        marks,
        max,
        maxRange,
        min,
        minRange,
        precision,
        pushOnOverlap,
        raw: previous,
        restrictToMarks,
      })
    );
  }, [
    domainMax,
    domainMin,
    marks,
    max,
    maxRange,
    min,
    minRange,
    precision,
    pushOnOverlap,
    restrictToMarks,
    value,
  ]);

  const handleValueChange = useCallback(
    (
      nextValue: number | number[],
      eventDetails: SliderPrimitive.Root.ChangeEventDetails
    ) => {
      const rawValues = Array.isArray(nextValue)
        ? [
            nextValue[0] ?? valueRef.current[0],
            nextValue[1] ?? valueRef.current[1],
          ]
        : [nextValue, valueRef.current[1]];

      const normalizedValue = normalizeRangeSliderValue({
        activeThumbIndex: eventDetails.activeThumbIndex,
        current: valueRef.current,
        domainMax,
        domainMin,
        marks,
        max,
        maxRange,
        min,
        minRange,
        precision,
        pushOnOverlap,
        raw: rawValues,
        reason: eventDetails.reason,
        restrictToMarks,
      });

      valueRef.current = normalizedValue;

      if (value === undefined) {
        setUncontrolledValue(normalizedValue);
      }

      onChange?.(normalizedValue);
    },
    [
      domainMax,
      domainMin,
      marks,
      max,
      maxRange,
      min,
      minRange,
      onChange,
      precision,
      pushOnOverlap,
      restrictToMarks,
      value,
    ]
  );

  const handleValueCommitted = useCallback(() => {
    onChangeEnd?.(valueRef.current);
  }, [onChangeEnd]);

  return {
    handleValueChange,
    handleValueCommitted,
    rangeValue,
  };
};
