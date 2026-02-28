"use client";

import type { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { normalizeSingleSliderValue } from "../math/normalize-single-slider-value";
import type { SliderMark, SliderValue } from "../shared/slider-types";

interface UseSingleSliderStateOptions {
  defaultValue?: number;
  domainMax: number;
  domainMin: number;
  marks?: readonly SliderMark[];
  max: number;
  min: number;
  onChange?: ((value: SliderValue) => void) | undefined;
  onChangeEnd?: ((value: SliderValue) => void) | undefined;
  precision: number;
  restrictToMarks: boolean;
  value?: number;
}

export const useSingleSliderState = ({
  defaultValue,
  domainMax,
  domainMin,
  marks,
  max,
  min,
  onChange,
  onChangeEnd,
  precision,
  restrictToMarks,
  value,
}: UseSingleSliderStateOptions) => {
  const initialValue = useMemo(
    () =>
      normalizeSingleSliderValue({
        current: min,
        domainMax,
        domainMin,
        marks,
        max,
        min,
        precision,
        raw: defaultValue ?? min,
        restrictToMarks,
      }),
    [
      defaultValue,
      domainMax,
      domainMin,
      marks,
      max,
      min,
      precision,
      restrictToMarks,
    ]
  );

  const [uncontrolledValue, setUncontrolledValue] = useState(initialValue);

  const controlledValue = useMemo(() => {
    if (value === undefined) {
      return;
    }

    return normalizeSingleSliderValue({
      current: uncontrolledValue,
      domainMax,
      domainMin,
      marks,
      max,
      min,
      precision,
      raw: value,
      restrictToMarks,
    });
  }, [
    domainMax,
    domainMin,
    marks,
    max,
    min,
    precision,
    restrictToMarks,
    uncontrolledValue,
    value,
  ]);

  const sliderValue = controlledValue ?? uncontrolledValue;
  const valueRef = useRef(sliderValue);

  useEffect(() => {
    valueRef.current = sliderValue;
  }, [sliderValue]);

  useEffect(() => {
    if (value !== undefined) {
      return;
    }

    setUncontrolledValue((previous: number) =>
      normalizeSingleSliderValue({
        current: previous,
        domainMax,
        domainMin,
        marks,
        max,
        min,
        precision,
        raw: previous,
        restrictToMarks,
      })
    );
  }, [
    domainMax,
    domainMin,
    marks,
    max,
    min,
    precision,
    restrictToMarks,
    value,
  ]);

  const handleValueChange = useCallback(
    (
      nextValue: number | number[],
      eventDetails: SliderPrimitive.Root.ChangeEventDetails
    ) => {
      const rawValue = Array.isArray(nextValue)
        ? (nextValue[0] ?? valueRef.current)
        : nextValue;

      const normalizedValue = normalizeSingleSliderValue({
        current: valueRef.current,
        domainMax,
        domainMin,
        marks,
        max,
        min,
        precision,
        raw: rawValue,
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
      min,
      onChange,
      precision,
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
    sliderValue,
  };
};
