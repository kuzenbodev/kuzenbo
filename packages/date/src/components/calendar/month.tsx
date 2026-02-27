/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps, KeyboardEvent, MouseEvent } from "react";

import { cn, tv } from "tailwind-variants";

import type { ControlKeydownPayload } from "../../types";
import type { DatePickerType, DatePickerValue } from "../types";

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
  base: "grid grid-cols-7 gap-1",
});

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
  type?: DatePickerType;
  value?: DatePickerValue;
  weekdayFormat?: "long" | "narrow" | "short";
  weekendDays?: number[];
  onChange?: (value: DatePickerValue) => void;
};

const Month = ({
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
  type = "default",
  value,
  minDate,
  maxDate,
  excludeDate,
  weekdayFormat = "short",
  weekendDays,
  hideWeekdays = false,
  onChange,
  ...props
}: MonthProps) => {
  const {
    adapter,
    firstDayOfWeek: contextFirstDayOfWeek,
    weekendDays: contextWeekendDays,
  } = useDatesContext();
  const resolvedFirstDayOfWeek = firstDayOfWeek ?? contextFirstDayOfWeek;
  const resolvedWeekendDays = weekendDays ?? contextWeekendDays;
  const normalizedValue = normalizePickerValue(value, type);
  const days = adapter.getMonthDays(month, resolvedFirstDayOfWeek);
  const today = adapter.now();
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
      selected: isSelectedDate(adapter, date, normalizedValue, type),
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
      data-slot="month"
      {...props}
    >
      {hideWeekdays ? null : (
        <WeekdaysRow
          firstDayOfWeek={resolvedFirstDayOfWeek}
          format={weekdayFormat}
        />
      )}
      {weeks.map((week, weekIndex) => (
        <div className={weekVariants()} data-week={weekIndex} key={weekIndex}>
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
              isSelectedDate(adapter, day, normalizedValue, type);
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
              <Day
                {...dayProps}
                aria-pressed={selected}
                ariaLabel={getDayAriaLabel?.(day)}
                date={day}
                disabled={dayProps.disabled ?? disabled}
                firstInRange={dayProps.firstInRange}
                hidden={hidden}
                inRange={dayProps.inRange}
                key={adapter.toISODate(day)}
                lastInRange={dayProps.lastInRange}
                outside={outside}
                selected={selected}
                tabIndex={isInTabOrder ? 0 : -1}
                today={adapter.isSameDay(today, day)}
                weekend={resolvedWeekendDays.includes(adapter.getWeekday(day))}
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
                      type
                    )
                  );
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export { Month };
