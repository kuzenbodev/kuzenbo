/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps } from "react";
import { useMemo } from "react";

import { useDatesInput } from "../../hooks";
import type { DateFormatter } from "../../utils";
import { normalizePickerValue } from "../calendar/utils/calendar-selection";
import { fromComparablePickerValue } from "../pickers/utils/picker-value-conversion";
import { YearPicker } from "../pickers/year-picker";
import type { DatePickerValue, SelectionMode } from "../types";
import { useDatesContext } from "../use-dates-context";
import { HiddenDatesInput } from "./hidden-dates-input";
import { PickerInputBase } from "./picker-input-base";

export type YearPickerInputProps = Omit<
  ComponentProps<typeof PickerInputBase>,
  "onValueChange" | "value" | "defaultValue"
> & {
  allowDeselect?: boolean;
  allowSingleDateInRange?: boolean;
  ariaLabels?: ComponentProps<typeof YearPicker>["ariaLabels"];
  closeOnChange?: boolean;
  decadeLabelFormat?: ComponentProps<typeof YearPicker>["decadeLabelFormat"];
  defaultValue?: DatePickerValue;
  labelSeparator?: string;
  nextLabel?: ComponentProps<typeof YearPicker>["nextLabel"];
  previousLabel?: ComponentProps<typeof YearPicker>["previousLabel"];
  selectionMode?: SelectionMode;
  sortDates?: boolean;
  value?: DatePickerValue;
  valueFormat?: string;
  valueFormatter?: DateFormatter;
  yearLabelFormat?: ComponentProps<typeof YearPicker>["yearLabelFormat"];
  onChange?: (value: DatePickerValue) => void;
};

const YearPickerInput = (allProps: YearPickerInputProps) => {
  const {
    allowDeselect,
    allowSingleDateInRange,
    ariaLabels,
    closeOnChange = true,
    decadeLabelFormat,
    defaultValue,
    form,
    labelSeparator,
    name,
    nextLabel,
    previousLabel,
    selectionMode = "single",
    sortDates,
    value,
    valueFormat = "yyyy",
    valueFormatter,
    yearLabelFormat,
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
          <YearPicker
            allowDeselect={allowDeselect}
            allowSingleDateInRange={allowSingleDateInRange}
            ariaLabels={ariaLabels}
            decadeLabelFormat={decadeLabelFormat}
            nextLabel={nextLabel}
            previousLabel={previousLabel}
            selectionMode={selectionMode}
            value={resolvedValue}
            yearLabelFormat={yearLabelFormat}
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

export { YearPickerInput };
