/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps, KeyboardEvent, MouseEvent } from "react";

import { cn, tv } from "tailwind-variants";

import { PickerControl, type PickerControlProps } from "../picker-control";
import { useDatesContext } from "../use-dates-context";
import { getYearInTabOrder } from "./utils/get-year-in-tab-order";
import { getYearsData } from "./utils/get-years-data";
import { isYearDisabled } from "./utils/is-year-disabled";

const yearsListVariants = tv({
  base: "grid grid-cols-3 gap-2",
});

const yearButtonVariants = tv({
  base: "w-full border border-border px-2 text-sm font-medium",
});

export type YearsListProps = Omit<
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
  getYearControlProps?: (date: Date) => Partial<PickerControlProps>;
  maxDate?: Date;
  minDate?: Date;
  year: Date;
  yearLabelFormat?: "numeric" | "2-digit";
  value?: Date | null;
  onChange?: (value: Date) => void;
};

const YearsList = ({
  className,
  __getControlRef,
  __onControlClick,
  __onControlKeyDown,
  __onControlMouseEnter,
  __preventFocus = false,
  getYearControlProps,
  maxDate,
  minDate,
  year,
  yearLabelFormat = "numeric",
  value,
  onChange,
  ...props
}: YearsListProps) => {
  const { adapter } = useDatesContext();
  const years = getYearsData(year, adapter);
  const getFallbackControlProps = (
    yearDate: Date
  ): Partial<PickerControlProps> => ({
    selected: adapter.isSameYear(yearDate, value ?? null),
  });
  const getMergedControlProps = (
    yearDate: Date
  ): Partial<PickerControlProps> => ({
    ...getFallbackControlProps(yearDate),
    ...getYearControlProps?.(yearDate),
  });
  const yearInTabOrder = getYearInTabOrder({
    adapter,
    getYearControlProps: getMergedControlProps,
    maxDate,
    minDate,
    years,
  });

  return (
    <div
      className={cn(yearsListVariants(), className)}
      data-slot="years-list"
      {...props}
    >
      {years.map((yearsRow, rowIndex) =>
        yearsRow.map((yearDate, cellIndex) => {
          const controlProps = getMergedControlProps(yearDate);
          const disabled =
            controlProps.disabled ??
            isYearDisabled({
              adapter,
              maxDate,
              minDate,
              year: yearDate,
            });
          const isInTabOrder =
            !__preventFocus &&
            yearInTabOrder !== undefined &&
            adapter.isSameYear(yearDate, yearInTabOrder);

          return (
            <PickerControl
              {...controlProps}
              aria-label={
                controlProps["aria-label"] ?? `${adapter.getYear(yearDate)}`
              }
              aria-pressed={controlProps.selected}
              className={cn(yearButtonVariants(), controlProps.className)}
              date={adapter.toISODate(yearDate)}
              disabled={disabled}
              key={`${rowIndex}-${cellIndex}-${adapter.getYear(yearDate)}`}
              ref={(node) => {
                __getControlRef?.(rowIndex, cellIndex, node);
              }}
              tabIndex={disabled ? -1 : isInTabOrder ? 0 : -1}
              onClick={(event) => {
                controlProps.onClick?.(event);
                __onControlClick?.(event, yearDate);
                onChange?.(yearDate);
              }}
              onKeyDown={(event) => {
                controlProps.onKeyDown?.(event);
                __onControlKeyDown?.(event, {
                  cellIndex,
                  date: adapter.toISODate(yearDate),
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
                __onControlMouseEnter?.(event, yearDate);
              }}
            >
              {controlProps.children ??
                adapter.format(yearDate, {
                  year: yearLabelFormat,
                })}
            </PickerControl>
          );
        })
      )}
    </div>
  );
};

export { YearsList };
