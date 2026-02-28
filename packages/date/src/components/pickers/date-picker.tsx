import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";

import { useDatesState } from "../../hooks";
import { Calendar } from "../calendar/calendar";
import type { DatePickerValue, SelectionMode } from "../types";
import { useDatesContext } from "../use-dates-context";
import { fromComparablePickerValue } from "./utils/picker-value-conversion";

const datePickerVariants = tv({
  base: "inline-flex",
});

export type DatePickerProps = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  allowDeselect?: boolean;
  allowSingleDateInRange?: boolean;
  ariaLabels?: ComponentProps<typeof Calendar>["ariaLabels"];
  defaultValue?: DatePickerValue;
  firstDayOfWeek?: ComponentProps<typeof Calendar>["firstDayOfWeek"];
  getDayProps?: ComponentProps<typeof Calendar>["getDayProps"];
  getDayAriaLabel?: ComponentProps<typeof Calendar>["getDayAriaLabel"];
  hideOutsideDates?: ComponentProps<typeof Calendar>["hideOutsideDates"];
  hideWeekdays?: ComponentProps<typeof Calendar>["hideWeekdays"];
  monthLabelFormat?: ComponentProps<typeof Calendar>["monthLabelFormat"];
  nextLabel?: ComponentProps<typeof Calendar>["nextLabel"];
  previousLabel?: ComponentProps<typeof Calendar>["previousLabel"];
  value?: DatePickerValue;
  selectionMode?: SelectionMode;
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  excludeDate?: (date: Date) => boolean;
  numberOfColumns?: number;
  weekdayFormat?: ComponentProps<typeof Calendar>["weekdayFormat"];
  weekendDays?: ComponentProps<typeof Calendar>["weekendDays"];
  onChange?: (value: DatePickerValue) => void;
};

const DatePicker = (allProps: DatePickerProps) => {
  const {
    allowDeselect,
    allowSingleDateInRange,
    ariaLabels,
    className,
    defaultValue,
    firstDayOfWeek,
    getDayAriaLabel,
    getDayProps,
    hideOutsideDates,
    hideWeekdays,
    monthLabelFormat,
    nextLabel,
    previousLabel,
    value,
    selectionMode = "single",
    defaultMonth,
    minDate,
    maxDate,
    excludeDate,
    numberOfColumns,
    weekdayFormat,
    weekendDays,
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
    level: "day",
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
      className={cn(datePickerVariants(), className)}
      data-slot="date-picker"
      {...props}
    >
      <Calendar
        ariaLabels={ariaLabels}
        defaultMonth={defaultMonth}
        excludeDate={excludeDate}
        firstDayOfWeek={firstDayOfWeek}
        getDayAriaLabel={getDayAriaLabel}
        getDayProps={(date) => ({
          ...getControlProps(date),
          ...getDayProps?.(date),
        })}
        hideOutsideDates={hideOutsideDates}
        hideWeekdays={hideWeekdays}
        maxDate={maxDate}
        minDate={minDate}
        monthLabelFormat={monthLabelFormat}
        nextLabel={nextLabel}
        numberOfColumns={numberOfColumns}
        previousLabel={previousLabel}
        selectionMode={selectionMode}
        value={resolvedValue}
        weekdayFormat={weekdayFormat}
        weekendDays={weekendDays}
        onChange={undefined}
        onDayClick={(_event, date) => {
          onDateChange(date);
        }}
        onMonthMouseEnter={(_event, date) => {
          onHoveredDateChange?.(date);
        }}
        onMouseLeave={onRootMouseLeave}
      />
    </div>
  );
};

export { DatePicker };
