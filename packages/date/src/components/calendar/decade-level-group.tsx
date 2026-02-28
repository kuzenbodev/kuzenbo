import type { ComponentProps } from "react";
import { useRef } from "react";
import { cn, tv } from "tailwind-variants";

import { handleControlKeyDown } from "../../utils";
import { useDatesContext } from "../use-dates-context";
import { DecadeLevel } from "./decade-level";

const decadeLevelGroupVariants = tv({
  base: "grid gap-3",
});

export type DecadeLevelGroupProps = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  __onControlClick?: ComponentProps<typeof DecadeLevel>["__onControlClick"];
  __onControlMouseEnter?: ComponentProps<
    typeof DecadeLevel
  >["__onControlMouseEnter"];
  __preventFocus?: boolean;
  decadeLabelFormat?: ComponentProps<typeof DecadeLevel>["decadeLabelFormat"];
  nextDisabled?: boolean;
  nextLabel?: string;
  previousDisabled?: boolean;
  previousLabel?: string;
  getYearControlProps?: ComponentProps<
    typeof DecadeLevel
  >["getYearControlProps"];
  yearLabelFormat?: ComponentProps<typeof DecadeLevel>["yearLabelFormat"];
  numberOfColumns?: number;
  maxDate?: Date;
  minDate?: Date;
  value?: Date | null;
  year: Date;
  onNext?: () => void;
  onPrevious?: () => void;
  onChange?: (value: Date) => void;
};

const DecadeLevelGroup = ({
  className,
  __onControlClick,
  __onControlMouseEnter,
  __preventFocus,
  decadeLabelFormat,
  maxDate,
  minDate,
  nextDisabled,
  nextLabel,
  getYearControlProps,
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
}: DecadeLevelGroupProps) => {
  const { adapter, direction } = useDatesContext();
  const activeYear = adapter.getYear(year);
  const decadeStartYear = activeYear - (activeYear % 10);
  const controlsRef = useRef<HTMLButtonElement[][][]>([]);

  return (
    <div
      className={cn(decadeLevelGroupVariants(), className)}
      data-slot="decade-level-group"
      style={{
        gridTemplateColumns: `repeat(${numberOfColumns}, minmax(0, 1fr))`,
      }}
      {...props}
    >
      {Array.from({ length: numberOfColumns }, (_, columnIndex) => {
        const offsetDecade = decadeStartYear + columnIndex * 10;

        return (
          <DecadeLevel
            __getControlRef={(rowIndex, cellIndex, node) => {
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
            __onControlClick={__onControlClick}
            __onControlKeyDown={(event, payload) => {
              handleControlKeyDown({
                cellIndex: payload.cellIndex,
                controlsRef,
                direction,
                event,
                levelIndex: columnIndex,
                rowIndex: payload.rowIndex,
              });
            }}
            __onControlMouseEnter={__onControlMouseEnter}
            __preventFocus={__preventFocus}
            decadeLabelFormat={decadeLabelFormat}
            key={offsetDecade}
            maxDate={maxDate}
            minDate={minDate}
            nextDisabled={nextDisabled}
            nextLabel={nextLabel}
            previousDisabled={previousDisabled}
            previousLabel={previousLabel}
            getYearControlProps={getYearControlProps}
            value={value}
            year={adapter.setDate(
              adapter.setMonth(adapter.setYear(year, offsetDecade), 0),
              1
            )}
            yearLabelFormat={yearLabelFormat}
            withNext={columnIndex === numberOfColumns - 1}
            withPrevious={columnIndex === 0}
            onNext={onNext}
            onPrevious={onPrevious}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
};

export { DecadeLevelGroup };
