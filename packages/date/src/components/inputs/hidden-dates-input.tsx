import type { ComponentProps } from "react";

import type { DatePickerValue, SelectionMode } from "../types";
import { useDatesContext } from "../use-dates-context";
import { serializePickerValue } from "./utils/picker-input-utils";

export type HiddenDatesInputProps = Omit<
  ComponentProps<"input">,
  "type" | "value"
> & {
  selectionMode?: SelectionMode;
  value: DatePickerValue;
};

const HiddenDatesInput = (allProps: HiddenDatesInputProps) => {
  const { selectionMode = "single", value, ...props } = allProps;
  const { adapter } = useDatesContext();

  return (
    <input
      type="hidden"
      value={serializePickerValue(adapter, value, selectionMode)}
      {...props}
    />
  );
};

export { HiddenDatesInput };
