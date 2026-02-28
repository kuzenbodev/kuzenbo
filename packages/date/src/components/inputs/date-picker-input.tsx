/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps } from "react";
import { useMemo } from "react";

import { useDatesInput } from "../../hooks";
import type { DateFormatter } from "../../utils";
import { normalizePickerValue } from "../calendar/utils/calendar-selection";
import { DatePicker } from "../pickers/date-picker";
import { fromComparablePickerValue } from "../pickers/utils/picker-value-conversion";
import type { DatePickerValue, SelectionMode } from "../types";
import { useDatesContext } from "../use-dates-context";
import { HiddenDatesInput } from "./hidden-dates-input";
import { PickerInputBase } from "./picker-input-base";

export type DatePickerInputProps = Omit<
  ComponentProps<typeof PickerInputBase>,
  "onValueChange" | "value" | "defaultValue"
> & {
  allowDeselect?: boolean;
  allowSingleDateInRange?: boolean;
  ariaLabels?: ComponentProps<typeof DatePicker>["ariaLabels"];
  closeOnChange?: boolean;
  defaultValue?: DatePickerValue;
  firstDayOfWeek?: ComponentProps<typeof DatePicker>["firstDayOfWeek"];
  getDayAriaLabel?: ComponentProps<typeof DatePicker>["getDayAriaLabel"];
  hideOutsideDates?: ComponentProps<typeof DatePicker>["hideOutsideDates"];
  hideWeekdays?: ComponentProps<typeof DatePicker>["hideWeekdays"];
  labelSeparator?: string;
  monthLabelFormat?: ComponentProps<typeof DatePicker>["monthLabelFormat"];
  nextLabel?: ComponentProps<typeof DatePicker>["nextLabel"];
  previousLabel?: ComponentProps<typeof DatePicker>["previousLabel"];
  selectionMode?: SelectionMode;
  sortDates?: boolean;
  value?: DatePickerValue;
  valueFormat?: string;
  valueFormatter?: DateFormatter;
  weekdayFormat?: ComponentProps<typeof DatePicker>["weekdayFormat"];
  weekendDays?: ComponentProps<typeof DatePicker>["weekendDays"];
  onChange?: (value: DatePickerValue) => void;
};

const DatePickerInput = (allProps: DatePickerInputProps) => {
  const {
    allowDeselect,
    allowSingleDateInRange,
    ariaLabels,
    closeOnChange = true,
    defaultValue,
    firstDayOfWeek,
    form,
    getDayAriaLabel,
    hideOutsideDates,
    hideWeekdays,
    labelSeparator,
    monthLabelFormat,
    name,
    nextLabel,
    previousLabel,
    selectionMode = "single",
    sortDates,
    value,
    valueFormat = "PP",
    valueFormatter,
    weekdayFormat,
    weekendDays,
    onChange,
    ...props
  } = allProps;
  const { adapter, locale } = useDatesContext();
  const normalizedDefaultValue = useMemo(
    () =>
      defaultValue === undefined
        ? undefined
        : normalizePickerValue(defaultValue, selectionMode),
    [defaultValue, selectionMode]
  );
  const normalizedValue = useMemo(
    () =>
      value === undefined
        ? undefined
        : normalizePickerValue(value, selectionMode),
    [selectionMode, value]
  );

  const { _value, dropdownHandlers, dropdownOpened, formattedValue, setValue } =
    useDatesInput<SelectionMode>({
      adapter,
      closeOnChange,
      defaultValue: normalizedDefaultValue,
      format: valueFormat,
      labelSeparator,
      locale,
      onChange: (nextValue) => {
        onChange?.(
          fromComparablePickerValue(adapter, nextValue, selectionMode)
        );
      },
      selectionMode,
      sortDates,
      value: normalizedValue,
      valueFormatter,
    });

  const resolvedValue = useMemo(
    () =>
      fromComparablePickerValue(
        adapter,
        _value,
        selectionMode
      ) as DatePickerValue,
    [_value, adapter, selectionMode]
  );

  return (
    <>
      <PickerInputBase
        {...props}
        form={form}
        name={undefined}
        opened={dropdownOpened}
        readOnly
        value={formattedValue}
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
            value={resolvedValue}
            weekdayFormat={weekdayFormat}
            weekendDays={weekendDays}
            onChange={(nextValue) => {
              setValue(nextValue);
            }}
          />
        }
        onOpenedChange={(nextOpened) => {
          if (nextOpened) {
            dropdownHandlers.open();
            return;
          }

          dropdownHandlers.close();
        }}
      />
      {name ? (
        <HiddenDatesInput
          form={form}
          name={name}
          selectionMode={selectionMode}
          value={resolvedValue}
        />
      ) : null}
    </>
  );
};

export { DatePickerInput };
