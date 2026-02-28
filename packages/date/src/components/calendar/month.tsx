/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps, KeyboardEvent, MouseEvent } from "react";

import { createContext, useContext } from "react";
import { cn, tv } from "tailwind-variants";

import type { ControlKeydownPayload } from "../../types";
import type { DatePickerValue, SelectionMode } from "../types";

import { useDatesContext } from "../use-dates-context";
import { Day } from "./day";
import {
  getNextPickerValue,
  isDateDisabled,
  isSelectedDate,
  normalizePickerValue,
} from "./utils/calendar-selection";
import { getDateInTabOrder } from "./utils/get-date-in-tab-order";
import { WeekdaysRow } from "./weekdays-row";

const monthVariants = tv({
  base: "inline-flex flex-col gap-2",
});

const weekVariants = tv({
  base: "grid gap-1",
  variants: {
    withWeekNumbers: {
      true: "grid-cols-[auto_repeat(7,minmax(0,1fr))]",
      false: "grid-cols-7",
    },
  },
  defaultVariants: {
    withWeekNumbers: false,
  },
});

const dayCellVariants = tv({
  base: "inline-flex items-center justify-center",
});

const weekNumberVariants = tv({
  base: "inline-flex h-9 min-w-8 items-center justify-center rounded-md text-xs font-medium text-muted-foreground",
});

const getWeekOfYearLabel = (locale: string): string => {
  try {
    return (
      new Intl.DisplayNames(locale, { type: "dateTimeField" }).of(
        "weekOfYear"
      ) ?? "#"
    );
  } catch {
    return "#";
  }
};

const formatLocalizedWeekNumber = (
  weekNumber: number | null,
  locale: string
): string => {
  if (weekNumber === null) {
    return "";
  }

  return new Intl.NumberFormat(locale).format(weekNumber);
};

interface MonthDisplayContextValue {
  withWeekNumbers: boolean;
}

const MONTH_DISPLAY_CONTEXT_VALUES = {
  noWeekNumbers: { withWeekNumbers: false },
  withWeekNumbers: { withWeekNumbers: true },
} as const satisfies Record<string, MonthDisplayContextValue>;

const MonthDisplayContext = createContext<MonthDisplayContextValue>(
  MONTH_DISPLAY_CONTEXT_VALUES.noWeekNumbers
);

export type MonthProps = Omit<
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
    payload: ControlKeydownPayload
  ) => void;
  __onDayMouseEnter?: (
    event: MouseEvent<HTMLButtonElement>,
    date: Date
  ) => void;
  __preventFocus?: boolean;
  excludeDate?: (date: Date) => boolean;
  firstDayOfWeek?: number;
  getDayAriaLabel?: (date: Date) => string;
  getDayProps?: (date: Date) => Partial<ComponentProps<typeof Day>>;
  hideOutsideDates?: boolean;
  hideWeekdays?: boolean;
  maxDate?: Date;
  minDate?: Date;
  month: Date;
  selectionMode?: SelectionMode;
  value?: DatePickerValue;
  weekdayFormat?: "long" | "narrow" | "short";
  withWeekNumbers?: boolean;
  weekendDays?: number[];
  onChange?: (value: DatePickerValue) => void;
};

const Month = (allProps: MonthProps) => {
  const {
    className,
    __getDayRef,
    __onDayClick,
    __onDayKeyDown,
    __onDayMouseEnter,
    __preventFocus = false,
    firstDayOfWeek,
    getDayAriaLabel,
    getDayProps,
    hideOutsideDates = false,
    month,
    selectionMode = "single",
    value,
    minDate,
    maxDate,
    withWeekNumbers,
    excludeDate,
    weekdayFormat = "short",
    weekendDays,
    hideWeekdays = false,
    onChange,
    ...props
  } = allProps;
  const monthDisplayContext = useContext(MonthDisplayContext);
  const {
    adapter,
    firstDayOfWeek: contextFirstDayOfWeek,
    locale,
    timeZone,
    weekendDays: contextWeekendDays,
  } = useDatesContext();
  const resolvedFirstDayOfWeek = firstDayOfWeek ?? contextFirstDayOfWeek;
  const resolvedWeekendDays = weekendDays ?? contextWeekendDays;
  const resolvedWithWeekNumbers =
    withWeekNumbers ?? monthDisplayContext.withWeekNumbers;
  const normalizedValue = normalizePickerValue(value, selectionMode);
  const days = adapter.getMonthDays(month, resolvedFirstDayOfWeek);
  const today = adapter.now();
  const weekOfYearLabel = getWeekOfYearLabel(locale);
  const weeks = Array.from({ length: days.length / 7 }, (_, weekIndex) =>
    days.slice(weekIndex * 7, weekIndex * 7 + 7)
  );

  const getFallbackDayProps = (
    date: Date
  ): Partial<ComponentProps<typeof Day>> => {
    if (value === undefined && !onChange) {
      return {};
    }

    return {
      selected: isSelectedDate(adapter, date, normalizedValue, selectionMode),
    };
  };

  const getMergedDayProps = (
    date: Date
  ): Partial<ComponentProps<typeof Day>> => ({
    ...getFallbackDayProps(date),
    ...getDayProps?.(date),
  });

  const dateInTabOrder = getDateInTabOrder({
    adapter,
    dates: weeks,
    excludeDate,
    getDayProps: getMergedDayProps,
    hideOutsideDates,
    maxDate,
    minDate,
    month,
  });

  return (
    <div
      className={cn(monthVariants(), className)}
      aria-colcount={resolvedWithWeekNumbers ? 8 : 7}
      aria-label={adapter.formatMonthLabel(month, { locale, timeZone })}
      aria-readonly="true"
      aria-rowcount={hideWeekdays ? weeks.length : weeks.length + 1}
      data-slot="month"
      role="grid"
      {...props}
    >
      {hideWeekdays ? null : (
        <WeekdaysRow
          firstDayOfWeek={resolvedFirstDayOfWeek}
          format={weekdayFormat}
          withWeekNumbers={resolvedWithWeekNumbers}
        />
      )}
      {weeks.map((week, weekIndex) => {
        const weekStartDate = week[0] ?? month;
        const weekNumber = adapter.getWeekNumber(weekStartDate);
        const localizedWeekNumber = formatLocalizedWeekNumber(
          weekNumber,
          locale
        );
        const weekNumberAriaLabel =
          `${weekOfYearLabel} ${localizedWeekNumber}`.trim();

        return (
          <div
            className={weekVariants({
              withWeekNumbers: resolvedWithWeekNumbers,
            })}
            data-week={weekIndex}
            key={weekIndex}
            role="row"
          >
            {resolvedWithWeekNumbers ? (
              <div
                aria-label={weekNumberAriaLabel}
                className={weekNumberVariants()}
                data-slot="week-number"
                role="rowheader"
              >
                {weekNumber ?? ""}
              </div>
            ) : null}
            {week.map((day, cellIndex) => {
              const dayProps = getMergedDayProps(day);
              const disabled = isDateDisabled(
                adapter,
                day,
                minDate,
                maxDate,
                excludeDate
              );
              const outside = !adapter.isSameMonth(day, month);
              const selected =
                dayProps.selected ??
                isSelectedDate(adapter, day, normalizedValue, selectionMode);
              const hidden = dayProps.hidden || (hideOutsideDates && outside);
              const isInTabOrder =
                !__preventFocus &&
                !hidden &&
                dateInTabOrder !== undefined &&
                adapter.isSameDay(dateInTabOrder, day);
              const payload: ControlKeydownPayload = {
                cellIndex,
                date: adapter.toISODate(day),
                rowIndex: weekIndex,
              };

              return (
                <div
                  className={dayCellVariants()}
                  key={adapter.toISODate(day)}
                  role="gridcell"
                >
                  <Day
                    {...dayProps}
                    aria-pressed={selected}
                    ariaLabel={getDayAriaLabel?.(day)}
                    date={day}
                    disabled={dayProps.disabled ?? disabled}
                    firstInRange={dayProps.firstInRange}
                    hidden={hidden}
                    inRange={dayProps.inRange}
                    lastInRange={dayProps.lastInRange}
                    outside={outside}
                    selected={selected}
                    tabIndex={isInTabOrder ? 0 : -1}
                    today={adapter.isSameDay(today, day)}
                    weekend={resolvedWeekendDays.includes(
                      adapter.getWeekday(day)
                    )}
                    onClick={(event) => {
                      dayProps.onClick?.(event);
                      __onDayClick?.(event, day);
                    }}
                    onKeyDown={(event) => {
                      dayProps.onKeyDown?.(event);
                      __onDayKeyDown?.(event, payload);
                    }}
                    onMouseDown={(event) => {
                      dayProps.onMouseDown?.(event);
                      if (__preventFocus) {
                        event.preventDefault();
                      }
                    }}
                    onMouseEnter={(event) => {
                      dayProps.onMouseEnter?.(event);
                      __onDayMouseEnter?.(event, day);
                    }}
                    ref={(node) => {
                      __getDayRef?.(weekIndex, cellIndex, node);
                    }}
                    onSelect={(selectedDate) => {
                      if (!onChange) {
                        return;
                      }

                      onChange(
                        getNextPickerValue(
                          adapter,
                          selectedDate,
                          normalizedValue,
                          selectionMode
                        )
                      );
                    }}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export { Month, MonthDisplayContext, MONTH_DISPLAY_CONTEXT_VALUES };
