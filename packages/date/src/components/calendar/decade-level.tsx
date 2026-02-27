import type {
  ComponentProps,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";

import { cn, tv } from "tailwind-variants";

import { useDatesContext } from "../use-dates-context";
import { CalendarHeader } from "./calendar-header";
import { compareByLevel } from "./utils/date-level-comparison";
import { getDecadeRange } from "./utils/get-decade-range";
import { YearsList } from "./years-list";

const decadeLevelVariants = tv({
  base: "inline-flex flex-col gap-2",
});

export type DecadeLevelProps = Omit<
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
  decadeLabelFormat?: (startOfDecade: Date, endOfDecade: Date) => ReactNode;
  maxDate?: Date;
  minDate?: Date;
  nextDisabled?: boolean;
  nextLabel?: string;
  previousDisabled?: boolean;
  previousLabel?: string;
  getYearControlProps?: ComponentProps<typeof YearsList>["getYearControlProps"];
  withNext?: boolean;
  withPrevious?: boolean;
  year: Date;
  yearLabelFormat?: ComponentProps<typeof YearsList>["yearLabelFormat"];
  value?: Date | null;
  onNext?: () => void;
  onPrevious?: () => void;
  onChange?: (value: Date) => void;
};

const DecadeLevel = ({
  className,
  __getControlRef,
  __onControlClick,
  __onControlKeyDown,
  __onControlMouseEnter,
  __preventFocus,
  decadeLabelFormat,
  maxDate,
  minDate,
  nextDisabled,
  nextLabel,
  previousDisabled,
  previousLabel,
  getYearControlProps,
  withNext = true,
  withPrevious = true,
  year,
  yearLabelFormat,
  value,
  onNext,
  onPrevious,
  onChange,
  ...props
}: DecadeLevelProps) => {
  const { adapter } = useDatesContext();
  const [startOfDecade, endOfDecade] = getDecadeRange(year, adapter);
  const computedNextDisabled =
    nextDisabled ??
    (maxDate
      ? compareByLevel(adapter, endOfDecade, maxDate, "year") >= 0
      : false);
  const computedPreviousDisabled =
    previousDisabled ??
    (minDate
      ? compareByLevel(adapter, startOfDecade, minDate, "year") <= 0
      : false);

  return (
    <div
      className={cn(decadeLevelVariants(), className)}
      data-slot="decade-level"
      {...props}
    >
      <CalendarHeader
        decadeLabelFormat={decadeLabelFormat}
        hasNextLevel={false}
        level="decade"
        nextDisabled={computedNextDisabled}
        nextLabel={nextLabel}
        previousDisabled={computedPreviousDisabled}
        previousLabel={previousLabel}
        viewDate={year}
        withNext={withNext}
        withPrevious={withPrevious}
        onNext={onNext}
        onPrevious={onPrevious}
      />
      <YearsList
        __getControlRef={__getControlRef}
        __onControlClick={__onControlClick}
        __onControlKeyDown={__onControlKeyDown}
        __onControlMouseEnter={__onControlMouseEnter}
        __preventFocus={__preventFocus}
        maxDate={maxDate}
        minDate={minDate}
        getYearControlProps={getYearControlProps}
        value={value}
        year={startOfDecade}
        yearLabelFormat={yearLabelFormat}
        onChange={onChange}
      />
    </div>
  );
};

export { DecadeLevel };
