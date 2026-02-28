/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";

import { useDatesState } from "../../hooks";
import { Calendar } from "../calendar/calendar";
import type { DatePickerValue, SelectionMode } from "../types";
import { useDatesContext } from "../use-dates-context";
import { fromComparablePickerValue } from "./utils/picker-value-conversion";

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
  selectionMode?: SelectionMode;
  value?: DatePickerValue;
  yearLabelFormat?: ComponentProps<typeof Calendar>["yearLabelFormat"];
  onChange?: (value: DatePickerValue) => void;
};

const MonthPicker = (allProps: MonthPickerProps) => {
  const {
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
    selectionMode = "single",
    value,
    yearLabelFormat,
    onChange,
    ...props
  } = allProps;
  const { adapter } = useDatesContext();
  const {
    _value,
    getControlProps,
    onDateChange,
    onHoveredDateChange,
    onRootMouseLeave,
  } = useDatesState<SelectionMode>({
    adapter,
    allowDeselect,
    allowSingleDateInRange,
    defaultValue,
    level: "month",
    onChange: (nextValue) => {
      onChange?.(fromComparablePickerValue(adapter, nextValue, selectionMode));
    },
    selectionMode,
    value,
  });

  const resolvedValue = fromComparablePickerValue(
    adapter,
    _value,
    selectionMode
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
