/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps } from "react";

import { cn, tv } from "tailwind-variants";

import type {
  DatePickerType,
  DatePickerValue,
  DateSelectionModeInput,
} from "../types";

import { useDatesState } from "../../hooks";
import { Calendar } from "../calendar/calendar";
import { resolvePickerType } from "../picker-mode";
import { useDatesContext } from "../use-dates-context";
import { fromComparablePickerValue } from "./picker-value-conversion";

const monthPickerVariants = tv({
  base: "inline-flex",
});

export type MonthPickerProps = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  allowDeselect?: boolean;
  allowSingleDateInRange?: boolean;
  ariaLabels?: ComponentProps<typeof Calendar>["ariaLabels"];
  defaultMonth?: Date;
  defaultValue?: DatePickerValue;
  maxDate?: Date;
  minDate?: Date;
  monthLabelFormat?: ComponentProps<typeof Calendar>["monthLabelFormat"];
  nextLabel?: ComponentProps<typeof Calendar>["nextLabel"];
  numberOfColumns?: number;
  previousLabel?: ComponentProps<typeof Calendar>["previousLabel"];
  selectionMode?: "multiple" | "range" | "single";
  type?: DatePickerType;
  value?: DatePickerValue;
  yearLabelFormat?: ComponentProps<typeof Calendar>["yearLabelFormat"];
  onChange?: (value: DatePickerValue) => void;
};

const MonthPicker = ({
  allowDeselect,
  allowSingleDateInRange,
  ariaLabels,
  className,
  defaultMonth,
  defaultValue,
  maxDate,
  minDate,
  monthLabelFormat,
  nextLabel,
  numberOfColumns = 1,
  previousLabel,
  selectionMode,
  type = "default",
  value,
  yearLabelFormat,
  onChange,
  ...props
}: MonthPickerProps) => {
  const { adapter } = useDatesContext();
  const resolvedType = resolvePickerType(
    selectionMode ?? type
  ) as DatePickerType;
  const {
    _value,
    getControlProps,
    onDateChange,
    onHoveredDateChange,
    onRootMouseLeave,
  } = useDatesState<DateSelectionModeInput>({
    adapter,
    allowDeselect,
    allowSingleDateInRange,
    defaultValue,
    level: "month",
    onChange: (nextValue) => {
      onChange?.(fromComparablePickerValue(adapter, nextValue, resolvedType));
    },
    selectionMode,
    type: resolvedType,
    value,
  });

  const resolvedValue = fromComparablePickerValue(
    adapter,
    _value,
    resolvedType
  );

  return (
    <div
      className={cn(monthPickerVariants(), className)}
      data-slot="month-picker"
      {...props}
    >
      <Calendar
        ariaLabels={ariaLabels}
        defaultLevel="year"
        defaultMonth={defaultMonth}
        maxDate={maxDate}
        minDate={minDate}
        minLevel="year"
        monthLabelFormat={monthLabelFormat}
        nextLabel={nextLabel}
        numberOfColumns={numberOfColumns}
        previousLabel={previousLabel}
        selectionMode={selectionMode}
        type={resolvedType}
        value={resolvedValue}
        yearLabelFormat={yearLabelFormat}
        getMonthControlProps={getControlProps}
        onChange={undefined}
        onMonthMouseEnter={(_event, date) => {
          onHoveredDateChange?.(date);
        }}
        onMonthSelect={(date) => {
          onDateChange(date);
        }}
        onMouseLeave={onRootMouseLeave}
      />
    </div>
  );
};

export { MonthPicker };
