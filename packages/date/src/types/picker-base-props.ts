import type { DatePickerValue } from "./date-picker-value";
import type { DateSelectionMode } from "./date-selection-mode";
import type { DateStringValue } from "./general-types";

export interface PickerBaseProps<Mode extends DateSelectionMode = "single"> {
  allowDeselect?: Mode extends "single" ? boolean : never;
  allowSingleDateInRange?: Mode extends "range" ? boolean : never;
  defaultValue?: DatePickerValue<Mode>;
  onChange?: (value: DatePickerValue<Mode, DateStringValue>) => void;
  selectionMode?: Mode;
  value?: DatePickerValue<Mode>;
}
