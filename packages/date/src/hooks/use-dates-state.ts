"use client";

import type { MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import type { DateAdapter, DateInput } from "../adapter";
import { useDatesContext } from "../context";
import type {
  DatePickerValue,
  DateSelectionMode,
  DateStringValue,
} from "../types";
import { resolveDateSelectionMode, toDateString } from "../utils";
import { useUncontrolledDates } from "./use-uncontrolled-dates";

interface UseDatesStateInput<Mode extends DateSelectionMode = "single"> {
  adapter?: DateAdapter;
  allowDeselect?: boolean;
  allowSingleDateInRange?: boolean;
  defaultValue?: DatePickerValue<Mode>;
  level?: "day" | "decade" | "month" | "year";
  onChange?: ((value: DatePickerValue<Mode, string>) => void) | undefined;
  onMouseLeave?: ((event: MouseEvent<HTMLDivElement>) => void) | undefined;
  selectionMode?: Mode;
  value?: DatePickerValue<Mode>;
}

const toComparableDateString = (
  value: DateInput,
  adapter: DateAdapter
): DateStringValue | null => {
  const converted = toDateString(value, { adapter });

  if (converted === "") {
    return null;
  }

  return converted ?? null;
};

const toRangeValue = (
  value: DatePickerValue<DateSelectionMode, string>
): [DateStringValue | null, DateStringValue | null] => {
  if (!Array.isArray(value)) {
    return [null, null];
  }

  return [
    (value[0] as DateStringValue | null) ?? null,
    (value[1] as DateStringValue | null) ?? null,
  ];
};

const toMultipleValue = (
  value: DatePickerValue<DateSelectionMode, string>
): DateStringValue[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  const normalized: DateStringValue[] = [];

  for (const entry of value as (DateStringValue | null)[]) {
    if (typeof entry === "string") {
      normalized.push(entry);
    }
  }

  return normalized;
};

export const useDatesState = <Mode extends DateSelectionMode = "single">({
  adapter,
  allowDeselect,
  allowSingleDateInRange,
  defaultValue,
  level = "day",
  onChange,
  onMouseLeave,
  selectionMode,
  value,
}: UseDatesStateInput<Mode>) => {
  const datesContext = useDatesContext();
  const resolvedSelectionMode = resolveDateSelectionMode(selectionMode);
  const resolvedAdapter = adapter ?? datesContext.adapter;

  const [_value, setValue] = useUncontrolledDates<Mode>({
    adapter: resolvedAdapter,
    defaultValue,
    onChange,
    selectionMode,
    value,
  });

  const currentRangeValue = useMemo(
    () => toRangeValue(_value as DatePickerValue<DateSelectionMode, string>),
    [_value]
  );

  const [pickedDate, setPickedDate] = useState<DateStringValue | null>(
    resolvedSelectionMode === "range" &&
      currentRangeValue[0] &&
      !currentRangeValue[1]
      ? currentRangeValue[0]
      : null
  );
  const [hoveredDate, setHoveredDate] = useState<DateStringValue | null>(null);

  const onDateChange = (dateInput: DateInput) => {
    const date = toComparableDateString(dateInput, resolvedAdapter);
    if (!date) {
      return;
    }

    if (resolvedSelectionMode === "range") {
      if (pickedDate && !currentRangeValue[1]) {
        if (
          resolvedAdapter.isSame(date, pickedDate, level) &&
          !allowSingleDateInRange
        ) {
          setPickedDate(null);
          setHoveredDate(null);
          setValue([null, null] as DatePickerValue<Mode>);
          return;
        }

        const rangeResult: [DateStringValue, DateStringValue] =
          resolvedAdapter.compare(date, pickedDate, level) >= 0
            ? [pickedDate, date]
            : [date, pickedDate];

        setValue(rangeResult as DatePickerValue<Mode>);
        setPickedDate(null);
        setHoveredDate(null);
        return;
      }

      if (
        currentRangeValue[0] &&
        !currentRangeValue[1] &&
        resolvedAdapter.isSame(date, currentRangeValue[0], level) &&
        !allowSingleDateInRange
      ) {
        setPickedDate(null);
        setHoveredDate(null);
        setValue([null, null] as DatePickerValue<Mode>);
        return;
      }

      setValue([date, null] as DatePickerValue<Mode>);
      setPickedDate(date);
      setHoveredDate(null);
      return;
    }

    if (resolvedSelectionMode === "multiple") {
      const selectedValues = toMultipleValue(
        _value as DatePickerValue<DateSelectionMode, string>
      );

      if (
        selectedValues.some((selection) =>
          resolvedAdapter.isSame(selection, date, level)
        )
      ) {
        setValue(
          selectedValues.filter(
            (selection) => !resolvedAdapter.isSame(selection, date, level)
          ) as DatePickerValue<Mode>
        );
      } else {
        setValue([...selectedValues, date] as DatePickerValue<Mode>);
      }

      return;
    }

    const selectedDate = (_value as DateStringValue | null) ?? null;
    if (
      selectedDate &&
      allowDeselect &&
      resolvedAdapter.isSame(date, selectedDate, level)
    ) {
      setValue(null as DatePickerValue<Mode>);
      return;
    }

    setValue(date as DatePickerValue<Mode>);
  };

  const isDateInRange = (date: DateStringValue): boolean => {
    if (pickedDate && hoveredDate) {
      return resolvedAdapter.isInRange(date, [hoveredDate, pickedDate], level);
    }

    if (currentRangeValue[0] && currentRangeValue[1]) {
      return resolvedAdapter.isInRange(
        date,
        [currentRangeValue[0], currentRangeValue[1]],
        level
      );
    }

    return false;
  };

  const isFirstInRange = (date: DateStringValue): boolean => {
    if (!currentRangeValue[0]) {
      return false;
    }

    if (currentRangeValue[1]) {
      return resolvedAdapter.isSame(date, currentRangeValue[0], level);
    }

    if (!hoveredDate) {
      return resolvedAdapter.isSame(date, currentRangeValue[0], level);
    }

    const hoveredComparison = resolvedAdapter.compare(
      hoveredDate,
      currentRangeValue[0],
      level
    );

    if (hoveredComparison < 0) {
      return resolvedAdapter.isSame(date, hoveredDate, level);
    }

    return resolvedAdapter.isSame(date, currentRangeValue[0], level);
  };

  const isLastInRange = (date: DateStringValue): boolean => {
    if (currentRangeValue[1]) {
      return resolvedAdapter.isSame(date, currentRangeValue[1], level);
    }

    if (!currentRangeValue[0] || !hoveredDate) {
      return false;
    }

    const hoveredComparison = resolvedAdapter.compare(
      hoveredDate,
      currentRangeValue[0],
      level
    );

    if (hoveredComparison > 0) {
      return resolvedAdapter.isSame(date, hoveredDate, level);
    }

    return resolvedAdapter.isSame(date, currentRangeValue[0], level);
  };

  const onRootMouseLeave =
    resolvedSelectionMode === "range"
      ? (event: MouseEvent<HTMLDivElement>) => {
          onMouseLeave?.(event);
          setHoveredDate(null);
        }
      : onMouseLeave;

  const onHoveredDateChange =
    resolvedSelectionMode === "range" && pickedDate
      ? (dateInput: DateInput) => {
          const date = toComparableDateString(dateInput, resolvedAdapter);
          setHoveredDate(date);
        }
      : undefined;

  useEffect(() => {
    if (resolvedSelectionMode !== "range") {
      return;
    }

    if (currentRangeValue[0] && !currentRangeValue[1]) {
      setPickedDate(currentRangeValue[0]);
      return;
    }

    const isNeitherSelected = !currentRangeValue[0] && !currentRangeValue[1];
    const isBothSelected = Boolean(
      currentRangeValue[0] && currentRangeValue[1]
    );

    if (isNeitherSelected || isBothSelected) {
      setPickedDate(null);
      setHoveredDate(null);
    }
  }, [currentRangeValue, resolvedSelectionMode]);

  const getControlProps = (dateInput: DateInput) => {
    const date = toComparableDateString(dateInput, resolvedAdapter);

    if (!date) {
      return {
        selected: false,
      };
    }

    if (resolvedSelectionMode === "range") {
      return {
        "data-autofocus":
          currentRangeValue[0] &&
          resolvedAdapter.isSame(currentRangeValue[0], date, level)
            ? true
            : undefined,
        firstInRange: isFirstInRange(date),
        inRange: isDateInRange(date),
        lastInRange: isLastInRange(date),
        selected: currentRangeValue.some(
          (selection) =>
            Boolean(selection) && resolvedAdapter.isSame(selection, date, level)
        ),
      };
    }

    if (resolvedSelectionMode === "multiple") {
      const selectedValues = toMultipleValue(
        _value as DatePickerValue<DateSelectionMode, string>
      );

      return {
        "data-autofocus":
          selectedValues[0] &&
          resolvedAdapter.isSame(selectedValues[0], date, level)
            ? true
            : undefined,
        selected: selectedValues.some((selection) =>
          resolvedAdapter.isSame(selection, date, level)
        ),
      };
    }

    const selectedDate = (_value as DateStringValue | null) ?? null;
    const isSelected =
      Boolean(selectedDate) &&
      resolvedAdapter.isSame(selectedDate, date, level);

    return {
      "data-autofocus": isSelected || undefined,
      selected: isSelected,
    };
  };

  return {
    _value,
    getControlProps,
    onDateChange,
    onHoveredDateChange,
    onRootMouseLeave,
    setValue,
    value: _value,
  };
};
