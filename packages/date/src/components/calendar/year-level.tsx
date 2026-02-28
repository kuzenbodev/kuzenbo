import type {
  ComponentProps,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";
import { cn, tv } from "tailwind-variants";

import { useDatesContext } from "../use-dates-context";
import { CalendarHeader } from "./calendar-header";
import { MonthsList } from "./months-list";
import { compareByLevel } from "./utils/date-level-comparison";

const yearLevelVariants = tv({
  base: "inline-flex flex-col gap-2",
});

export type YearLevelProps = Omit<
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
  getMonthControlProps?: ComponentProps<
    typeof MonthsList
  >["getMonthControlProps"];
  hasNextLevel?: boolean;
  levelControlAriaLabel?: string;
  maxDate?: Date;
  minDate?: Date;
  monthLabelFormat?: ComponentProps<typeof MonthsList>["monthLabelFormat"];
  nextDisabled?: boolean;
  nextLabel?: string;
  previousDisabled?: boolean;
  previousLabel?: string;
  withNext?: boolean;
  withPrevious?: boolean;
  yearLabelFormat?: Intl.DateTimeFormatOptions | ((date: Date) => ReactNode);
  value?: Date | null;
  year: Date;
  onLevelClick?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onChange?: (value: Date) => void;
};

const YearLevel = ({
  className,
  __getControlRef,
  __onControlClick,
  __onControlKeyDown,
  __onControlMouseEnter,
  __preventFocus,
  getMonthControlProps,
  hasNextLevel = true,
  levelControlAriaLabel,
  maxDate,
  minDate,
  monthLabelFormat,
  nextDisabled,
  nextLabel,
  onLevelClick,
  onNext,
  onPrevious,
  previousDisabled,
  previousLabel,
  withNext = true,
  withPrevious = true,
  yearLabelFormat,
  value,
  year,
  onChange,
  ...props
}: YearLevelProps) => {
  const { adapter } = useDatesContext();
  const computedNextDisabled =
    nextDisabled ??
    (maxDate ? compareByLevel(adapter, year, maxDate, "year") >= 0 : false);
  const computedPreviousDisabled =
    previousDisabled ??
    (minDate ? compareByLevel(adapter, year, minDate, "year") <= 0 : false);

  return (
    <div
      className={cn(yearLevelVariants(), className)}
      data-slot="year-level"
      {...props}
    >
      <CalendarHeader
        hasNextLevel={hasNextLevel}
        level="year"
        levelControlAriaLabel={levelControlAriaLabel}
        nextDisabled={computedNextDisabled}
        nextLabel={nextLabel}
        previousDisabled={computedPreviousDisabled}
        previousLabel={previousLabel}
        viewDate={year}
        withNext={withNext}
        withPrevious={withPrevious}
        yearLabelFormat={yearLabelFormat}
        onLevelClick={onLevelClick}
        onNext={onNext}
        onPrevious={onPrevious}
      />
      <MonthsList
        __getControlRef={__getControlRef}
        __onControlClick={__onControlClick}
        __onControlKeyDown={__onControlKeyDown}
        __onControlMouseEnter={__onControlMouseEnter}
        __preventFocus={__preventFocus}
        getMonthControlProps={getMonthControlProps}
        maxDate={maxDate}
        minDate={minDate}
        monthLabelFormat={monthLabelFormat}
        value={value}
        year={year}
        onChange={onChange}
      />
    </div>
  );
};

export { YearLevel };
