import type {
  ComponentProps,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";
import { cn, tv } from "tailwind-variants";

import type { DatePickerValue, SelectionMode } from "../types";
import { useDatesContext } from "../use-dates-context";
import { CalendarHeader } from "./calendar-header";
import { Month } from "./month";

const monthLevelVariants = tv({
  base: "inline-flex flex-col gap-2",
});

export type MonthLevelProps = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  __getDayRef?: (
    rowIndex: number,
    cellIndex: number,
    node: HTMLButtonElement | null
  ) => void;
  __onDayClick?: (event: MouseEvent<HTMLButtonElement>, date: Date) => void;
  __onDayKeyDown?: (
    event: KeyboardEvent<HTMLButtonElement>,
    payload: { cellIndex: number; rowIndex: number; date: string }
  ) => void;
  __onDayMouseEnter?: (
    event: MouseEvent<HTMLButtonElement>,
    date: Date
  ) => void;
  __preventFocus?: boolean;
  firstDayOfWeek?: number;
  getDayAriaLabel?: (date: Date) => string;
  getDayProps?: ComponentProps<typeof Month>["getDayProps"];
  hasNextLevel?: boolean;
  hideOutsideDates?: boolean;
  hideWeekdays?: boolean;
  levelControlAriaLabel?: string;
  monthLabelFormat?: Intl.DateTimeFormatOptions | ((date: Date) => ReactNode);
  nextDisabled?: boolean;
  nextLabel?: string;
  previousDisabled?: boolean;
  previousLabel?: string;
  weekdayFormat?: "long" | "narrow" | "short";
  weekendDays?: number[];
  withNext?: boolean;
  withPrevious?: boolean;
  month: Date;
  onLevelClick?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  selectionMode?: SelectionMode;
  value?: DatePickerValue;
  minDate?: Date;
  maxDate?: Date;
  excludeDate?: (date: Date) => boolean;
  onChange?: (value: DatePickerValue) => void;
};

const MonthLevel = (allProps: MonthLevelProps) => {
  const {
    className,
    __getDayRef,
    __onDayClick,
    __onDayKeyDown,
    __onDayMouseEnter,
    __preventFocus,
    firstDayOfWeek,
    getDayAriaLabel,
    getDayProps,
    hasNextLevel = true,
    hideOutsideDates,
    hideWeekdays,
    levelControlAriaLabel,
    monthLabelFormat,
    nextDisabled,
    nextLabel,
    onLevelClick,
    onNext,
    onPrevious,
    previousDisabled,
    previousLabel,
    weekdayFormat,
    weekendDays,
    withNext = true,
    withPrevious = true,
    month,
    selectionMode = "single",
    value,
    minDate,
    maxDate,
    excludeDate,
    onChange,
    ...props
  } = allProps;
  const { adapter } = useDatesContext();
  const computedNextDisabled =
    nextDisabled ??
    (maxDate
      ? !adapter.isBefore(
          adapter.endOfMonth(month),
          adapter.startOfDay(maxDate)
        )
      : false);
  const computedPreviousDisabled =
    previousDisabled ??
    (minDate
      ? !adapter.isAfter(
          adapter.startOfMonth(month),
          adapter.startOfDay(minDate)
        )
      : false);
  return (
    <div
      className={cn(monthLevelVariants(), className)}
      data-slot="month-level"
      {...props}
    >
      <CalendarHeader
        hasNextLevel={hasNextLevel}
        level="month"
        levelControlAriaLabel={levelControlAriaLabel}
        monthLabelFormat={monthLabelFormat}
        nextDisabled={computedNextDisabled}
        nextLabel={nextLabel}
        previousDisabled={computedPreviousDisabled}
        previousLabel={previousLabel}
        viewDate={month}
        withNext={withNext}
        withPrevious={withPrevious}
        onLevelClick={onLevelClick}
        onNext={onNext}
        onPrevious={onPrevious}
      />
      <Month
        __getDayRef={__getDayRef}
        __onDayClick={__onDayClick}
        __onDayKeyDown={__onDayKeyDown}
        __onDayMouseEnter={__onDayMouseEnter}
        __preventFocus={__preventFocus}
        excludeDate={excludeDate}
        firstDayOfWeek={firstDayOfWeek}
        getDayAriaLabel={getDayAriaLabel}
        getDayProps={getDayProps}
        hideOutsideDates={hideOutsideDates}
        hideWeekdays={hideWeekdays}
        maxDate={maxDate}
        minDate={minDate}
        month={month}
        selectionMode={selectionMode}
        value={value}
        weekdayFormat={weekdayFormat}
        weekendDays={weekendDays}
        onChange={onChange}
      />
    </div>
  );
};

export { MonthLevel };
