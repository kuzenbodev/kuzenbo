import type { ComponentProps, KeyboardEvent } from "react";
import { useMemo, useRef } from "react";
import { cn, tv } from "tailwind-variants";

import { handleControlKeyDown } from "../../utils";
import { useDatesContext } from "../use-dates-context";
import { YearLevel } from "./year-level";

const yearLevelGroupVariants = tv({
  base: "grid gap-3",
});

export type YearLevelGroupProps = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  __onControlClick?: ComponentProps<typeof YearLevel>["__onControlClick"];
  __onControlMouseEnter?: ComponentProps<
    typeof YearLevel
  >["__onControlMouseEnter"];
  __preventFocus?: boolean;
  getMonthControlProps?: ComponentProps<
    typeof YearLevel
  >["getMonthControlProps"];
  hasNextLevel?: boolean;
  levelControlAriaLabel?: string | ((year: Date) => string);
  monthLabelFormat?: ComponentProps<typeof YearLevel>["monthLabelFormat"];
  nextDisabled?: boolean;
  nextLabel?: string;
  previousDisabled?: boolean;
  previousLabel?: string;
  yearLabelFormat?: ComponentProps<typeof YearLevel>["yearLabelFormat"];
  numberOfColumns?: number;
  maxDate?: Date;
  minDate?: Date;
  value?: Date | null;
  year: Date;
  onLevelClick?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onChange?: (value: Date) => void;
};

const YearLevelGroup = ({
  className,
  __onControlClick,
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
  yearLabelFormat,
  numberOfColumns = 1,
  value,
  year,
  onChange,
  ...props
}: YearLevelGroupProps) => {
  const { adapter, direction } = useDatesContext();
  const controlsRef = useRef<HTMLButtonElement[][][]>([]);
  const controlRefHandlers = useMemo(
    () =>
      Array.from(
        { length: numberOfColumns },
        (_, columnIndex) =>
          (
            rowIndex: number,
            cellIndex: number,
            node: HTMLButtonElement | null
          ) => {
            if (!Array.isArray(controlsRef.current[columnIndex])) {
              controlsRef.current[columnIndex] = [];
            }

            if (!Array.isArray(controlsRef.current[columnIndex][rowIndex])) {
              controlsRef.current[columnIndex][rowIndex] = [];
            }

            if (node) {
              controlsRef.current[columnIndex][rowIndex][cellIndex] = node;
            }
          }
      ),
    [numberOfColumns]
  );
  const controlKeyDownHandlers = useMemo(
    () =>
      Array.from(
        { length: numberOfColumns },
        (_, columnIndex) =>
          (
            event: KeyboardEvent<HTMLButtonElement>,
            payload: { rowIndex: number; cellIndex: number }
          ) => {
            handleControlKeyDown({
              cellIndex: payload.cellIndex,
              controlsRef,
              direction,
              event,
              levelIndex: columnIndex,
              rowIndex: payload.rowIndex,
            });
          }
      ),
    [direction, numberOfColumns]
  );

  return (
    <div
      className={cn(yearLevelGroupVariants(), className)}
      data-slot="year-level-group"
      style={{
        gridTemplateColumns: `repeat(${numberOfColumns}, minmax(0, 1fr))`,
      }}
      {...props}
    >
      {Array.from({ length: numberOfColumns }, (_, columnIndex) => {
        const currentYearDate = adapter.addYears(year, columnIndex);

        return (
          <YearLevel
            __getControlRef={controlRefHandlers[columnIndex]}
            __onControlClick={__onControlClick}
            __onControlKeyDown={controlKeyDownHandlers[columnIndex]}
            __onControlMouseEnter={__onControlMouseEnter}
            __preventFocus={__preventFocus}
            getMonthControlProps={getMonthControlProps}
            hasNextLevel={hasNextLevel}
            key={adapter.getYear(currentYearDate)}
            levelControlAriaLabel={
              typeof levelControlAriaLabel === "function"
                ? levelControlAriaLabel(currentYearDate)
                : levelControlAriaLabel
            }
            maxDate={maxDate}
            minDate={minDate}
            monthLabelFormat={monthLabelFormat}
            nextDisabled={nextDisabled}
            nextLabel={nextLabel}
            previousDisabled={previousDisabled}
            previousLabel={previousLabel}
            value={value}
            year={currentYearDate}
            yearLabelFormat={yearLabelFormat}
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

export { YearLevelGroup };
