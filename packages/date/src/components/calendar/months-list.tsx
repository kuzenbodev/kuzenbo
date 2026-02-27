/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps, KeyboardEvent, MouseEvent } from "react";

import { cn, tv } from "tailwind-variants";

import { PickerControl, type PickerControlProps } from "../picker-control";
import { useDatesContext } from "../use-dates-context";
import { getMonthInTabOrder } from "./get-month-in-tab-order";
import { getMonthsData } from "./get-months-data";
import { isMonthDisabled } from "./is-month-disabled";

const monthsListVariants = tv({
  base: "grid grid-cols-3 gap-2",
});

const monthButtonVariants = tv({
  base: "w-full rounded-md border border-border bg-background px-2 text-sm font-medium",
});

export type MonthsListProps = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  __getControlRef?: (
    rowIndex: number,
    cellIndex: number,
    node: HTMLButtonElement | null
  ) => void;
  __onControlClick?: (event: MouseEvent<HTMLButtonElement>, date: Date) => void;
  __onControlKeyDown?: (
    event: KeyboardEvent<HTMLButtonElement>,
    payload: { cellIndex: number; rowIndex: number; date: string }
  ) => void;
  __onControlMouseEnter?: (
    event: MouseEvent<HTMLButtonElement>,
    date: Date
  ) => void;
  __preventFocus?: boolean;
  getMonthControlProps?: (date: Date) => Partial<PickerControlProps>;
  locale?: string;
  maxDate?: Date;
  minDate?: Date;
  monthLabelFormat?: "long" | "narrow" | "numeric" | "short";
  year: Date;
  value?: Date | null;
  onChange?: (value: Date) => void;
};

const MonthsList = ({
  className,
  __getControlRef,
  __onControlClick,
  __onControlKeyDown,
  __onControlMouseEnter,
  __preventFocus = false,
  getMonthControlProps,
  locale,
  maxDate,
  minDate,
  monthLabelFormat = "short",
  value,
  year,
  onChange,
  ...props
}: MonthsListProps) => {
  const { adapter, locale: contextLocale, timeZone } = useDatesContext();
  const resolvedLocale = locale ?? contextLocale;
  const months = getMonthsData(year, adapter);
  const getFallbackControlProps = (
    monthDate: Date
  ): Partial<PickerControlProps> => ({
    selected: adapter.isSameMonth(monthDate, value ?? null),
  });
  const getMergedControlProps = (
    monthDate: Date
  ): Partial<PickerControlProps> => ({
    ...getFallbackControlProps(monthDate),
    ...getMonthControlProps?.(monthDate),
  });
  const monthInTabOrder = getMonthInTabOrder({
    adapter,
    getMonthControlProps: getMergedControlProps,
    maxDate,
    minDate,
    months,
  });

  return (
    <div
      className={cn(monthsListVariants(), className)}
      data-slot="months-list"
      {...props}
    >
      {months.map((monthsRow, rowIndex) =>
        monthsRow.map((monthDate, cellIndex) => {
          const controlProps = getMergedControlProps(monthDate);
          const disabled =
            controlProps.disabled ??
            isMonthDisabled({
              adapter,
              maxDate,
              minDate,
              month: monthDate,
            });
          const isInTabOrder =
            !__preventFocus &&
            monthInTabOrder !== undefined &&
            adapter.isSameMonth(monthDate, monthInTabOrder);

          return (
            <PickerControl
              {...controlProps}
              aria-label={
                controlProps["aria-label"] ??
                adapter.format(
                  monthDate,
                  { month: "long", year: "numeric" },
                  {
                    locale: resolvedLocale,
                    timeZone,
                  }
                )
              }
              aria-pressed={controlProps.selected}
              className={cn(monthButtonVariants(), controlProps.className)}
              date={adapter.toISODate(monthDate)}
              disabled={disabled}
              key={`${rowIndex}-${cellIndex}-${adapter.toISODate(monthDate)}`}
              ref={(node) => {
                __getControlRef?.(rowIndex, cellIndex, node);
              }}
              tabIndex={disabled ? -1 : isInTabOrder ? 0 : -1}
              onClick={(event) => {
                controlProps.onClick?.(event);
                __onControlClick?.(event, monthDate);
                onChange?.(monthDate);
              }}
              onKeyDown={(event) => {
                controlProps.onKeyDown?.(event);
                __onControlKeyDown?.(event, {
                  cellIndex,
                  date: adapter.toISODate(monthDate),
                  rowIndex,
                });
              }}
              onMouseDown={(event) => {
                controlProps.onMouseDown?.(event);
                if (__preventFocus) {
                  event.preventDefault();
                }
              }}
              onMouseEnter={(event) => {
                controlProps.onMouseEnter?.(event);
                __onControlMouseEnter?.(event, monthDate);
              }}
            >
              {controlProps.children ??
                adapter.format(
                  monthDate,
                  { month: monthLabelFormat },
                  { locale: resolvedLocale, timeZone }
                )}
            </PickerControl>
          );
        })
      )}
    </div>
  );
};

export { MonthsList };
