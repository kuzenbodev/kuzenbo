/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps } from "react";

import { useMemo, useState } from "react";

import type { DatePickerType, DatePickerValue } from "../types";

import { normalizePickerValue } from "../calendar/utils/calendar-selection";
import { resolvePickerType } from "../picker-mode";
import { MonthPicker } from "../pickers/month-picker";
import { useDatesContext } from "../use-dates-context";
import { HiddenDatesInput } from "./hidden-dates-input";
import { PickerInputBase } from "./picker-input-base";

export type MonthPickerInputProps = Omit<
  ComponentProps<typeof PickerInputBase>,
  "onValueChange" | "value" | "defaultValue"
> & {
  allowDeselect?: boolean;
  allowSingleDateInRange?: boolean;
  ariaLabels?: ComponentProps<typeof MonthPicker>["ariaLabels"];
  defaultValue?: DatePickerValue;
  monthLabelFormat?: ComponentProps<typeof MonthPicker>["monthLabelFormat"];
  nextLabel?: ComponentProps<typeof MonthPicker>["nextLabel"];
  pickerType?: DatePickerType;
  previousLabel?: ComponentProps<typeof MonthPicker>["previousLabel"];
  selectionMode?: "multiple" | "range" | "single";
  value?: DatePickerValue;
  yearLabelFormat?: ComponentProps<typeof MonthPicker>["yearLabelFormat"];
  onChange?: (value: DatePickerValue) => void;
};

const MonthPickerInput = ({
  allowDeselect,
  allowSingleDateInRange,
  ariaLabels,
  defaultValue,
  monthLabelFormat,
  name,
  nextLabel,
  pickerType = "default",
  previousLabel,
  selectionMode,
  value,
  yearLabelFormat,
  onChange,
  ...props
}: MonthPickerInputProps) => {
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

  const inputValue = useMemo(() => {
    const formatMonth = (month: Date | null): string =>
      month
        ? adapter.format(
            month,
            { month: "long", year: "numeric" },
            { locale, timeZone }
          )
        : "";

    if (resolvedType === "default") {
      return formatMonth((resolvedValue as Date | null) ?? null);
    }

    if (resolvedType === "multiple") {
      return ((resolvedValue as Date[]) ?? []).map(formatMonth).join(", ");
    }

    const [startDate, endDate] = (resolvedValue as [
      Date | null,
      Date | null,
    ]) ?? [null, null];

    if (!startDate) {
      return "";
    }

    const startValue = formatMonth(startDate);
    const endValue = formatMonth(endDate);

    return endDate ? `${startValue} - ${endValue}` : `${startValue} -`;
  }, [adapter, locale, resolvedType, resolvedValue, timeZone]);

  return (
    <>
      <PickerInputBase
        {...props}
        name={undefined}
        opened={opened}
        readOnly
        value={inputValue}
        dropdown={
          <MonthPicker
            allowDeselect={allowDeselect}
            allowSingleDateInRange={allowSingleDateInRange}
            ariaLabels={ariaLabels}
            monthLabelFormat={monthLabelFormat}
            nextLabel={nextLabel}
            previousLabel={previousLabel}
            selectionMode={selectionMode}
            type={resolvedType}
            value={resolvedValue}
            yearLabelFormat={yearLabelFormat}
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

export { MonthPickerInput };
