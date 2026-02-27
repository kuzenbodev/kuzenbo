import type {
  DateSelectionMode,
  DateSelectionModeInput,
  ResolveDateSelectionMode,
} from "./date-selection-mode";
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
  Mode extends DateSelectionModeInput = "single",
  ValueType = DateValue,
> = DateSelectionValue<ResolveDateSelectionMode<Mode>, ValueType>;
