/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps } from "react";

import { cn, tv } from "tailwind-variants";

import type { DatePickerValue, SelectionMode } from "../types";

import { useDatesState } from "../../hooks";
import { Calendar } from "../calendar/calendar";
import { useDatesContext } from "../use-dates-context";
import { fromComparablePickerValue } from "./utils/picker-value-conversion";

const yearPickerVariants = tv({
  base: "inline-flex",
});

export type YearPickerProps = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  allowDeselect?: boolean;
  allowSingleDateInRange?: boolean;
  ariaLabels?: ComponentProps<typeof Calendar>["ariaLabels"];
  decadeLabelFormat?: ComponentProps<typeof Calendar>["decadeLabelFormat"];
  defaultValue?: DatePickerValue;
  defaultYear?: Date;
  maxDate?: Date;
  minDate?: Date;
  nextLabel?: ComponentProps<typeof Calendar>["nextLabel"];
  numberOfColumns?: number;
  previousLabel?: ComponentProps<typeof Calendar>["previousLabel"];
  selectionMode?: SelectionMode;
  value?: DatePickerValue;
  yearLabelFormat?: ComponentProps<typeof Calendar>["yearLabelFormat"];
  onChange?: (value: DatePickerValue) => void;
};

const YearPicker = (allProps: YearPickerProps) => {
  const {
    allowDeselect,
    allowSingleDateInRange,
    ariaLabels,
    className,
    decadeLabelFormat,
    defaultValue,
    defaultYear,
    maxDate,
    minDate,
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
    level: "year",
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
      className={cn(yearPickerVariants(), className)}
      data-slot="year-picker"
      {...props}
    >
      <Calendar
        ariaLabels={ariaLabels}
        decadeLabelFormat={decadeLabelFormat}
        defaultDate={defaultYear}
        defaultLevel="decade"
        maxDate={maxDate}
        minDate={minDate}
        minLevel="decade"
        nextLabel={nextLabel}
        numberOfColumns={numberOfColumns}
        previousLabel={previousLabel}
        selectionMode={selectionMode}
        value={resolvedValue}
        yearLabelFormat={yearLabelFormat}
        getYearControlProps={getControlProps}
        onChange={undefined}
        onMouseLeave={onRootMouseLeave}
        onYearMouseEnter={(_event, date) => {
          onHoveredDateChange?.(date);
        }}
        onYearSelect={(date) => {
          onDateChange(date);
        }}
      />
    </div>
  );
};

export { YearPicker };
