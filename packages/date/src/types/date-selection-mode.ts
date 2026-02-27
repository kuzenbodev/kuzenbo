export type DateSelectionMode = "single" | "multiple" | "range";

/**
 * Backward-compatible legacy alias used in Mantine-like APIs.
 * Prefer `selectionMode="single"`.
 */
export type LegacyDatePickerType = "default";

export type DatePickerType = LegacyDatePickerType | "multiple" | "range";

export type DateSelectionModeInput = DateSelectionMode | DatePickerType;

export type ResolveDateSelectionMode<Mode extends DateSelectionModeInput> =
  Mode extends "default" ? "single" : Mode;
