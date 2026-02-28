import type { DateSelectionMode } from "./date-selection-mode";
import type { DateStringValue } from "./general-types";

export type DateValue = DateStringValue | Date | null;

export type DatesRangeValue<ValueType = DateValue> = [
  ValueType | null,
  ValueType | null,
];

export type DateSelectionValue<
  Mode extends DateSelectionMode = "single",
  ValueType = DateValue,
> = Mode extends "range"
  ? DatesRangeValue<ValueType>
  : Mode extends "multiple"
    ? ValueType[]
    : ValueType | null;

export type DatePickerValue<
  Mode extends DateSelectionMode = "single",
  ValueType = DateValue,
> = DateSelectionValue<Mode, ValueType>;

export type PublicDatePickerValue<
  Mode extends DateSelectionMode = "single",
  ValueType = DateValue,
> = DateSelectionValue<Mode, ValueType>;
