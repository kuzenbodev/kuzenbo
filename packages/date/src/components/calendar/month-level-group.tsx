import type { ComponentProps } from "react";

import { useRef } from "react";
import { cn, tv } from "tailwind-variants";

import type { DatePickerType, DatePickerValue } from "../types";

import { handleControlKeyDown } from "../../utils";
import { useDatesContext } from "../use-dates-context";
import { MonthLevel } from "./month-level";

const monthLevelGroupVariants = tv({
  base: "grid gap-3",
});

export type MonthLevelGroupProps = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  __onDayClick?: ComponentProps<typeof MonthLevel>["__onDayClick"];
  __onDayMouseEnter?: ComponentProps<typeof MonthLevel>["__onDayMouseEnter"];
  __preventFocus?: boolean;
  firstDayOfWeek?: number;
  getDayAriaLabel?: ComponentProps<typeof MonthLevel>["getDayAriaLabel"];
  getDayProps?: ComponentProps<typeof MonthLevel>["getDayProps"];
  hasNextLevel?: boolean;
  hideOutsideDates?: boolean;
  hideWeekdays?: boolean;
  levelControlAriaLabel?: string | ((month: Date) => string);
  monthLabelFormat?: ComponentProps<typeof MonthLevel>["monthLabelFormat"];
  nextDisabled?: boolean;
  nextLabel?: string;
  previousDisabled?: boolean;
  previousLabel?: string;
  weekdayFormat?: ComponentProps<typeof MonthLevel>["weekdayFormat"];
  weekendDays?: number[];
  month: Date;
  type?: DatePickerType;
  value?: DatePickerValue;
  numberOfColumns?: number;
  minDate?: Date;
  maxDate?: Date;
  excludeDate?: (date: Date) => boolean;
  onLevelClick?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onChange?: (value: DatePickerValue) => void;
};

const MonthLevelGroup = ({
  className,
  __onDayClick,
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
  month,
  type = "default",
  value,
  numberOfColumns = 1,
  minDate,
  maxDate,
  excludeDate,
  onChange,
  ...props
}: MonthLevelGroupProps) => {
  const { adapter, direction } = useDatesContext();
  const controlsRef = useRef<HTMLButtonElement[][][]>([]);

  return (
    <div
      className={cn(monthLevelGroupVariants(), className)}
      data-slot="month-level-group"
      style={{
        gridTemplateColumns: `repeat(${numberOfColumns}, minmax(0, 1fr))`,
      }}
      {...props}
    >
      {Array.from({ length: numberOfColumns }, (_, columnIndex) => {
        const monthDate = adapter.addMonths(month, columnIndex);

        return (
          <MonthLevel
            __getDayRef={(rowIndex, cellIndex, node) => {
              if (!Array.isArray(controlsRef.current[columnIndex])) {
                controlsRef.current[columnIndex] = [];
              }

              if (!Array.isArray(controlsRef.current[columnIndex][rowIndex])) {
                controlsRef.current[columnIndex][rowIndex] = [];
              }

              if (node) {
                controlsRef.current[columnIndex][rowIndex][cellIndex] = node;
              }
            }}
            __onDayClick={__onDayClick}
            __onDayKeyDown={(event, payload) => {
              handleControlKeyDown({
                cellIndex: payload.cellIndex,
                controlsRef,
                direction,
                event,
                levelIndex: columnIndex,
                rowIndex: payload.rowIndex,
              });
            }}
            __onDayMouseEnter={__onDayMouseEnter}
            __preventFocus={__preventFocus}
            excludeDate={excludeDate}
            firstDayOfWeek={firstDayOfWeek}
            getDayAriaLabel={getDayAriaLabel}
            getDayProps={getDayProps}
            hasNextLevel={hasNextLevel}
            hideOutsideDates={hideOutsideDates}
            hideWeekdays={hideWeekdays}
            key={adapter.toISODate(monthDate)}
            levelControlAriaLabel={
              typeof levelControlAriaLabel === "function"
                ? levelControlAriaLabel(monthDate)
                : levelControlAriaLabel
            }
            maxDate={maxDate}
            minDate={minDate}
            month={monthDate}
            monthLabelFormat={monthLabelFormat}
            nextDisabled={nextDisabled}
            nextLabel={nextLabel}
            previousDisabled={previousDisabled}
            previousLabel={previousLabel}
            type={type}
            value={value}
            weekdayFormat={weekdayFormat}
            weekendDays={weekendDays}
            withNext={columnIndex === numberOfColumns - 1}
            withPrevious={columnIndex === 0}
            onLevelClick={onLevelClick}
            onNext={onNext}
            onPrevious={onPrevious}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
};

export { MonthLevelGroup };
