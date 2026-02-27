import type { DatePickerValue } from "./date-picker-value";
import type { DatePickerType } from "./date-selection-mode";
import type { DateStringValue } from "./general-types";

export interface PickerBaseProps<Type extends DatePickerType = "default"> {
  allowDeselect?: Type extends "default" ? boolean : never;
  allowSingleDateInRange?: Type extends "range" ? boolean : never;
  defaultValue?: DatePickerValue<Type>;
  onChange?: (value: DatePickerValue<Type, DateStringValue>) => void;
  type?: DatePickerType | Type;
  value?: DatePickerValue<Type>;
}
