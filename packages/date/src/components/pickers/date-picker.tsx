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
  selectionMode?: "multiple" | "range" | "single";
  type?: DatePickerType;
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  excludeDate?: (date: Date) => boolean;
  numberOfColumns?: number;
  weekdayFormat?: ComponentProps<typeof Calendar>["weekdayFormat"];
  weekendDays?: ComponentProps<typeof Calendar>["weekendDays"];
  onChange?: (value: DatePickerValue) => void;
};

const DatePicker = ({
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
  selectionMode,
  type = "default",
  defaultMonth,
  minDate,
  maxDate,
  excludeDate,
  numberOfColumns,
  weekdayFormat,
  weekendDays,
  onChange,
  ...props
}: DatePickerProps) => {
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
    level: "day",
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
        type={resolvedType}
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
