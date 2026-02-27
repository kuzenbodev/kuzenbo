import type { ComponentProps } from "react";

import type { DatePickerType, DatePickerValue } from "../types";

import { resolvePickerType } from "../picker-mode";
import { useDatesContext } from "../use-dates-context";
import { serializePickerValue } from "./picker-input-utils";

export type HiddenDatesInputProps = Omit<
  ComponentProps<"input">,
  "type" | "value"
> & {
  pickerType?: DatePickerType;
  selectionMode?: "multiple" | "range" | "single";
  value: DatePickerValue;
};

const HiddenDatesInput = ({
  pickerType = "default",
  selectionMode,
  value,
  ...props
}: HiddenDatesInputProps) => {
  const { adapter } = useDatesContext();
  const resolvedType = resolvePickerType(
    selectionMode ?? pickerType
  ) as DatePickerType;

  return (
    <input
      type="hidden"
      value={serializePickerValue(adapter, value, resolvedType)}
      {...props}
    />
  );
};

export { HiddenDatesInput };
