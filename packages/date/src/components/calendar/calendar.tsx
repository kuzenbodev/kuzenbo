/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps, MouseEvent } from "react";

import { useMemo, useState } from "react";
import { cn, tv } from "tailwind-variants";

import type { CalendarLevel, DatePickerType, DatePickerValue } from "../types";

import { resolvePickerType } from "../picker-mode";
import { useDatesContext } from "../use-dates-context";
import {
  getPrimaryDateFromValue,
  normalizePickerValue,
} from "./calendar-selection";
import { clampLevel } from "./clamp-level";
import { DecadeLevelGroup } from "./decade-level-group";
import { MonthLevelGroup } from "./month-level-group";
import { YearLevelGroup } from "./year-level-group";

const calendarVariants = tv({
  base: "inline-flex w-full max-w-sm flex-col gap-3 rounded-lg border border-border bg-background p-3",
});

export interface CalendarAriaLabels {
  monthLevelControl?: string;
  nextDecade?: string;
  nextMonth?: string;
  nextYear?: string;
  previousDecade?: string;
  previousMonth?: string;
  previousYear?: string;
  yearLevelControl?: string;
}

export type CalendarProps = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  __updateDateOnMonthSelect?: boolean;
  __updateDateOnYearSelect?: boolean;
  ariaLabels?: CalendarAriaLabels;
  columnsToScroll?: number;
  date?: Date;
  decadeLabelFormat?: ComponentProps<
    typeof DecadeLevelGroup
  >["decadeLabelFormat"];
  defaultDate?: Date;
  defaultLevel?: CalendarLevel;
  defaultMonth?: Date;
  excludeDate?: (date: Date) => boolean;
  firstDayOfWeek?: number;
  getDayAriaLabel?: ComponentProps<typeof MonthLevelGroup>["getDayAriaLabel"];
  getDayProps?: ComponentProps<typeof MonthLevelGroup>["getDayProps"];
  getMonthControlProps?: ComponentProps<
    typeof YearLevelGroup
  >["getMonthControlProps"];
  getYearControlProps?: ComponentProps<
    typeof DecadeLevelGroup
  >["getYearControlProps"];
  hideOutsideDates?: boolean;
  hideWeekdays?: boolean;
  level?: CalendarLevel;
  maxDate?: Date;
  maxLevel?: CalendarLevel;
  minDate?: Date;
  minLevel?: CalendarLevel;
  month?: Date;
  monthLabelFormat?: ComponentProps<typeof MonthLevelGroup>["monthLabelFormat"];
  nextLabel?: string;
  numberOfColumns?: number;
  onChange?: (value: DatePickerValue) => void;
  onDateChange?: (date: Date) => void;
  onDayClick?: (event: MouseEvent<HTMLButtonElement>, date: Date) => void;
  onLevelChange?: (level: CalendarLevel) => void;
  onMonthChange?: (month: Date) => void;
  onMonthMouseEnter?: (
    event: MouseEvent<HTMLButtonElement>,
    date: Date
  ) => void;
  onMonthSelect?: (date: Date) => void;
  onYearMouseEnter?: (event: MouseEvent<HTMLButtonElement>, date: Date) => void;
  onYearSelect?: (date: Date) => void;
  previousLabel?: string;
  selectionMode?: "multiple" | "range" | "single";
  type?: DatePickerType;
  value?: DatePickerValue;
  weekdayFormat?: ComponentProps<typeof MonthLevelGroup>["weekdayFormat"];
  weekendDays?: number[];
  yearLabelFormat?: ComponentProps<typeof YearLevelGroup>["yearLabelFormat"];
};

const getInitialViewDate = ({
  adapter,
  date,
  defaultDate,
  defaultMonth,
  month,
  selectedDate,
}: {
  adapter: ReturnType<typeof useDatesContext>["adapter"];
  date?: Date;
  defaultDate?: Date;
  defaultMonth?: Date;
  month?: Date;
  selectedDate: Date | null;
}): Date =>
  month ?? date ?? defaultMonth ?? defaultDate ?? selectedDate ?? adapter.now();

const Calendar = ({
  __updateDateOnMonthSelect = true,
  __updateDateOnYearSelect = true,
  ariaLabels,
  className,
  columnsToScroll,
  date,
  decadeLabelFormat,
  defaultDate,
  defaultLevel = "month",
  defaultMonth,
  excludeDate,
  firstDayOfWeek,
  getDayAriaLabel,
  getDayProps,
  getMonthControlProps,
  getYearControlProps,
  hideOutsideDates,
  hideWeekdays,
  level,
  maxDate,
  maxLevel = "decade",
  minDate,
  minLevel = "month",
  month,
  monthLabelFormat,
  nextLabel,
  numberOfColumns = 1,
  onChange,
  onDateChange,
  onDayClick,
  onLevelChange,
  onMonthChange,
  onMonthMouseEnter,
  onMonthSelect,
  onYearMouseEnter,
  onYearSelect,
  previousLabel,
  selectionMode,
  type = "default",
  value,
  weekdayFormat,
  weekendDays,
  yearLabelFormat,
  ...props
}: CalendarProps) => {
  const { adapter } = useDatesContext();
  const resolvedType = resolvePickerType(
    selectionMode ?? type
  ) as DatePickerType;
  const normalizedValue = normalizePickerValue(value, resolvedType);
  const selectedDate = getPrimaryDateFromValue(normalizedValue, resolvedType);

  const [uncontrolledLevel, setUncontrolledLevel] = useState(() =>
    clampLevel(defaultLevel, minLevel, maxLevel)
  );
  const [uncontrolledViewDate, setUncontrolledViewDate] = useState(() =>
    getInitialViewDate({
      adapter,
      date,
      defaultDate,
      defaultMonth,
      month,
      selectedDate,
    })
  );

  const resolvedLevel = clampLevel(
    level ?? uncontrolledLevel,
    minLevel,
    maxLevel
  );
  const resolvedViewDate = month ?? date ?? uncontrolledViewDate;

  const setResolvedLevel = (nextLevel: CalendarLevel) => {
    const clampedLevel = clampLevel(nextLevel, minLevel, maxLevel);

    if (level === undefined) {
      setUncontrolledLevel(clampedLevel);
    }

    onLevelChange?.(clampedLevel);
  };

  const setResolvedViewDate = (nextViewDate: Date) => {
    if (month === undefined && date === undefined) {
      setUncontrolledViewDate(nextViewDate);
    }

    onMonthChange?.(nextViewDate);
    onDateChange?.(nextViewDate);
  };

  const scrollAmount = columnsToScroll ?? numberOfColumns;

  const handleNextMonth = () => {
    setResolvedViewDate(adapter.addMonths(resolvedViewDate, scrollAmount));
  };

  const handlePreviousMonth = () => {
    setResolvedViewDate(adapter.addMonths(resolvedViewDate, -scrollAmount));
  };

  const handleNextYear = () => {
    setResolvedViewDate(adapter.addYears(resolvedViewDate, scrollAmount));
  };

  const handlePreviousYear = () => {
    setResolvedViewDate(adapter.addYears(resolvedViewDate, -scrollAmount));
  };

  const handleNextDecade = () => {
    setResolvedViewDate(adapter.addYears(resolvedViewDate, scrollAmount * 10));
  };

  const handlePreviousDecade = () => {
    setResolvedViewDate(adapter.addYears(resolvedViewDate, -scrollAmount * 10));
  };

  const monthLevelGroup = useMemo(
    () => (
      <MonthLevelGroup
        excludeDate={excludeDate}
        firstDayOfWeek={firstDayOfWeek}
        getDayAriaLabel={getDayAriaLabel}
        getDayProps={getDayProps}
        hasNextLevel={maxLevel !== "month"}
        hideOutsideDates={hideOutsideDates}
        hideWeekdays={hideWeekdays}
        levelControlAriaLabel={ariaLabels?.monthLevelControl}
        maxDate={maxDate}
        minDate={minDate}
        month={resolvedViewDate}
        monthLabelFormat={monthLabelFormat}
        nextLabel={ariaLabels?.nextMonth ?? nextLabel}
        numberOfColumns={numberOfColumns}
        previousLabel={ariaLabels?.previousMonth ?? previousLabel}
        type={resolvedType}
        value={normalizedValue}
        weekdayFormat={weekdayFormat}
        weekendDays={weekendDays}
        __onDayClick={onDayClick}
        __onDayMouseEnter={onMonthMouseEnter}
        onLevelClick={() => {
          setResolvedLevel("year");
        }}
        onNext={handleNextMonth}
        onPrevious={handlePreviousMonth}
        onChange={onChange}
      />
    ),
    [
      ariaLabels?.monthLevelControl,
      ariaLabels?.nextMonth,
      ariaLabels?.previousMonth,
      excludeDate,
      firstDayOfWeek,
      getDayAriaLabel,
      getDayProps,
      hideOutsideDates,
      hideWeekdays,
      maxDate,
      maxLevel,
      minDate,
      monthLabelFormat,
      nextLabel,
      normalizedValue,
      numberOfColumns,
      onChange,
      onDayClick,
      onMonthMouseEnter,
      previousLabel,
      resolvedType,
      resolvedViewDate,
      weekdayFormat,
      weekendDays,
    ]
  );

  const yearLevelGroup = useMemo(
    () => (
      <YearLevelGroup
        hasNextLevel={maxLevel === "decade"}
        levelControlAriaLabel={ariaLabels?.yearLevelControl}
        maxDate={maxDate}
        minDate={minDate}
        monthLabelFormat="short"
        nextLabel={ariaLabels?.nextYear ?? nextLabel}
        numberOfColumns={numberOfColumns}
        previousLabel={ariaLabels?.previousYear ?? previousLabel}
        value={selectedDate}
        year={resolvedViewDate}
        yearLabelFormat={yearLabelFormat}
        getMonthControlProps={getMonthControlProps}
        __onControlMouseEnter={onMonthMouseEnter}
        onLevelClick={() => {
          setResolvedLevel("decade");
        }}
        onNext={handleNextYear}
        onPrevious={handlePreviousYear}
        onChange={(nextMonth) => {
          if (__updateDateOnMonthSelect) {
            setResolvedViewDate(nextMonth);
          }

          onMonthSelect?.(nextMonth);

          if (minLevel === "month") {
            setResolvedLevel("month");
          }
        }}
      />
    ),
    [
      __updateDateOnMonthSelect,
      ariaLabels?.nextYear,
      ariaLabels?.previousYear,
      ariaLabels?.yearLevelControl,
      getMonthControlProps,
      maxDate,
      maxLevel,
      minDate,
      minLevel,
      nextLabel,
      numberOfColumns,
      onMonthSelect,
      onMonthMouseEnter,
      previousLabel,
      resolvedViewDate,
      selectedDate,
      yearLabelFormat,
    ]
  );

  const decadeLevelGroup = useMemo(
    () => (
      <DecadeLevelGroup
        decadeLabelFormat={decadeLabelFormat}
        maxDate={maxDate}
        minDate={minDate}
        nextLabel={ariaLabels?.nextDecade ?? nextLabel}
        numberOfColumns={numberOfColumns}
        previousLabel={ariaLabels?.previousDecade ?? previousLabel}
        value={selectedDate}
        year={resolvedViewDate}
        yearLabelFormat="numeric"
        getYearControlProps={getYearControlProps}
        __onControlMouseEnter={onYearMouseEnter}
        onNext={handleNextDecade}
        onPrevious={handlePreviousDecade}
        onChange={(nextYear) => {
          if (__updateDateOnYearSelect) {
            setResolvedViewDate(nextYear);
          }

          onYearSelect?.(nextYear);

          if (minLevel !== "decade") {
            setResolvedLevel("year");
          }
        }}
      />
    ),
    [
      __updateDateOnYearSelect,
      ariaLabels?.nextDecade,
      ariaLabels?.previousDecade,
      decadeLabelFormat,
      getYearControlProps,
      maxDate,
      minDate,
      minLevel,
      nextLabel,
      numberOfColumns,
      onYearMouseEnter,
      onYearSelect,
      previousLabel,
      resolvedViewDate,
      selectedDate,
    ]
  );

  return (
    <div
      className={cn(calendarVariants(), className)}
      data-level={resolvedLevel}
      data-slot="calendar"
      {...props}
    >
      {resolvedLevel === "month" && monthLevelGroup}
      {resolvedLevel === "year" && yearLevelGroup}
      {resolvedLevel === "decade" && decadeLevelGroup}
    </div>
  );
};

export { Calendar };
