/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps } from "react";

import { useMemo, useState } from "react";

import type { DatePickerType, DatePickerValue } from "../types";

import { normalizePickerValue } from "../calendar/utils/calendar-selection";
import { resolvePickerType } from "../picker-mode";
import { DatePicker } from "../pickers/date-picker";
import { useDatesContext } from "../use-dates-context";
import { HiddenDatesInput } from "./hidden-dates-input";
import { PickerInputBase } from "./picker-input-base";
import { formatPickerValue } from "./utils/picker-input-utils";

export type DatePickerInputProps = Omit<
  ComponentProps<typeof PickerInputBase>,
  "onValueChange" | "value" | "defaultValue"
> & {
  allowDeselect?: boolean;
  allowSingleDateInRange?: boolean;
  ariaLabels?: ComponentProps<typeof DatePicker>["ariaLabels"];
  defaultValue?: DatePickerValue;
  firstDayOfWeek?: ComponentProps<typeof DatePicker>["firstDayOfWeek"];
  getDayAriaLabel?: ComponentProps<typeof DatePicker>["getDayAriaLabel"];
  hideOutsideDates?: ComponentProps<typeof DatePicker>["hideOutsideDates"];
  hideWeekdays?: ComponentProps<typeof DatePicker>["hideWeekdays"];
  monthLabelFormat?: ComponentProps<typeof DatePicker>["monthLabelFormat"];
  nextLabel?: ComponentProps<typeof DatePicker>["nextLabel"];
  pickerType?: DatePickerType;
  previousLabel?: ComponentProps<typeof DatePicker>["previousLabel"];
  selectionMode?: "multiple" | "range" | "single";
  value?: DatePickerValue;
  weekdayFormat?: ComponentProps<typeof DatePicker>["weekdayFormat"];
  weekendDays?: ComponentProps<typeof DatePicker>["weekendDays"];
  onChange?: (value: DatePickerValue) => void;
};

const DatePickerInput = ({
  allowDeselect,
  allowSingleDateInRange,
  ariaLabels,
  defaultValue,
  firstDayOfWeek,
  getDayAriaLabel,
  hideOutsideDates,
  hideWeekdays,
  monthLabelFormat,
  name,
  nextLabel,
  pickerType = "default",
  previousLabel,
  selectionMode,
  value,
  weekdayFormat,
  weekendDays,
  onChange,
  ...props
}: DatePickerInputProps) => {
  const { adapter, locale, timeZone } = useDatesContext();
  const resolvedType = resolvePickerType(
    selectionMode ?? pickerType
  ) as DatePickerType;
  const [opened, setOpened] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState<DatePickerValue>(
    normalizePickerValue(defaultValue, resolvedType)
  );
  const resolvedValue = normalizePickerValue(
    value === undefined ? uncontrolledValue : value,
    resolvedType
  );

  const inputValue = useMemo(
    () =>
      formatPickerValue(adapter, resolvedValue, resolvedType, locale, timeZone),
    [adapter, resolvedValue, resolvedType, locale, timeZone]
  );

  return (
    <>
      <PickerInputBase
        {...props}
        name={undefined}
        opened={opened}
        readOnly
        value={inputValue}
        dropdown={
          <DatePicker
            allowDeselect={allowDeselect}
            allowSingleDateInRange={allowSingleDateInRange}
            ariaLabels={ariaLabels}
            firstDayOfWeek={firstDayOfWeek}
            getDayAriaLabel={getDayAriaLabel}
            hideOutsideDates={hideOutsideDates}
            hideWeekdays={hideWeekdays}
            monthLabelFormat={monthLabelFormat}
            nextLabel={nextLabel}
            previousLabel={previousLabel}
            selectionMode={selectionMode}
            type={resolvedType}
            value={resolvedValue}
            weekdayFormat={weekdayFormat}
            weekendDays={weekendDays}
            onChange={(nextValue) => {
              if (value === undefined) {
                setUncontrolledValue(nextValue);
              }

              onChange?.(nextValue);

              if (resolvedType === "default") {
                setOpened(false);
                return;
              }

              if (resolvedType === "range") {
                const [startDate, endDate] = nextValue as [
                  Date | null,
                  Date | null,
                ];

                if (startDate && endDate) {
                  setOpened(false);
                }
              }
            }}
          />
        }
        onOpenedChange={setOpened}
      />
      {name ? (
        <HiddenDatesInput
          name={name}
          pickerType={resolvedType}
          value={resolvedValue}
        />
      ) : null}
    </>
  );
};

export { DatePickerInput };
