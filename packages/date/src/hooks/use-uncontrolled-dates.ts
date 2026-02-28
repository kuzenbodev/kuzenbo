"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  DEFAULT_DATE_ADAPTER,
  type DateAdapter,
  type DateInput,
} from "../adapter";
import type { DatePickerValue, DateSelectionMode } from "../types";
import {
  resolveDateSelectionMode,
  toDateString,
  toDateTimeString,
} from "../utils";

const getEmptyValue = (selectionMode: DateSelectionMode) => {
  if (selectionMode === "range") {
    return [null, null] as const;
  }

  if (selectionMode === "multiple") {
    return [] as const;
  }

  return null;
};

const convertSingleValue = (
  value: DateInput,
  withTime: boolean,
  adapter: DateAdapter
): string | null => {
  const converter = withTime ? toDateTimeString : toDateString;
  const converted = converter(value, { adapter });

  if (converted === "") {
    return null;
  }

  return converted ?? null;
};

export const convertDatesValue = <Mode extends DateSelectionMode>(
  value: DatePickerValue<Mode> | undefined,
  selectionMode: DateSelectionMode,
  withTime: boolean,
  adapter: DateAdapter
): DatePickerValue<Mode, string> | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (selectionMode === "single") {
    return convertSingleValue(
      value as DateInput,
      withTime,
      adapter
    ) as DatePickerValue<Mode, string>;
  }

  if (selectionMode === "multiple") {
    const values = (Array.isArray(value) ? value : []) as DateInput[];

    return values
      .map((item) => convertSingleValue(item as DateInput, withTime, adapter))
      .filter(
        (item): item is string => typeof item === "string" && item.length > 0
      ) as DatePickerValue<Mode, string>;
  }

  const range = (Array.isArray(value) ? value : [null, null]) as [
    DateInput,
    DateInput,
  ];

  return [
    convertSingleValue(range[0], withTime, adapter),
    convertSingleValue(range[1], withTime, adapter),
  ] as DatePickerValue<Mode, string>;
};

interface UseUncontrolledDatesInput<Mode extends DateSelectionMode = "single"> {
  adapter?: DateAdapter;
  defaultValue?: DatePickerValue<Mode>;
  onChange?: ((value: DatePickerValue<Mode, string>) => void) | undefined;
  selectionMode?: DateSelectionMode;
  value?: DatePickerValue<Mode>;
  withTime?: boolean;
}

export const useUncontrolledDates = <
  Mode extends DateSelectionMode = "single",
>({
  adapter,
  defaultValue,
  onChange,
  selectionMode,
  value,
  withTime = false,
}: UseUncontrolledDatesInput<Mode>) => {
  const resolvedSelectionMode = resolveDateSelectionMode(selectionMode);
  const resolvedAdapter = adapter ?? DEFAULT_DATE_ADAPTER;

  const storedSelectionModeRef = useRef<DateSelectionMode>(
    resolvedSelectionMode
  );

  const [uncontrolledValue, setUncontrolledValue] = useState<
    DatePickerValue<Mode, string>
  >(() => {
    const convertedDefaultValue = convertDatesValue(
      defaultValue,
      resolvedSelectionMode,
      withTime,
      resolvedAdapter
    );

    return (convertedDefaultValue ??
      getEmptyValue(resolvedSelectionMode)) as DatePickerValue<Mode, string>;
  });

  const isControlled = value !== undefined;

  const controlledValue = useMemo(
    () =>
      convertDatesValue(
        value,
        resolvedSelectionMode,
        withTime,
        resolvedAdapter
      ),
    [value, resolvedSelectionMode, withTime, resolvedAdapter]
  );

  useEffect(() => {
    if (isControlled) {
      return;
    }

    if (storedSelectionModeRef.current !== resolvedSelectionMode) {
      storedSelectionModeRef.current = resolvedSelectionMode;

      const convertedDefaultValue = convertDatesValue(
        defaultValue,
        resolvedSelectionMode,
        withTime,
        resolvedAdapter
      );

      setUncontrolledValue(
        (convertedDefaultValue ??
          getEmptyValue(resolvedSelectionMode)) as DatePickerValue<Mode, string>
      );
    }
  }, [
    defaultValue,
    isControlled,
    resolvedAdapter,
    resolvedSelectionMode,
    withTime,
  ]);

  const setValue = useCallback(
    (nextValue: DatePickerValue<Mode>) => {
      const convertedNextValue = convertDatesValue(
        nextValue,
        resolvedSelectionMode,
        withTime,
        resolvedAdapter
      );

      const fallbackValue = getEmptyValue(
        resolvedSelectionMode
      ) as DatePickerValue<Mode, string>;
      const nextResolvedValue = (convertedNextValue ??
        fallbackValue) as DatePickerValue<Mode, string>;

      if (!isControlled) {
        setUncontrolledValue(nextResolvedValue);
      }

      onChange?.(nextResolvedValue);
    },
    [isControlled, onChange, resolvedAdapter, resolvedSelectionMode, withTime]
  );

  const finalValue = (
    isControlled
      ? (controlledValue ?? getEmptyValue(resolvedSelectionMode))
      : uncontrolledValue
  ) as DatePickerValue<Mode, string>;

  return [finalValue, setValue, isControlled] as const;
};
