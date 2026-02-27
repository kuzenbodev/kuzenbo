/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps, ReactNode } from "react";

import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn, tv } from "tailwind-variants";

import type { CalendarLevel } from "../types";

import { DateControlButton } from "../internal/date-control-button";
import { useDatesContext } from "../use-dates-context";
import { getDecadeRange } from "./get-decade-range";

const calendarHeaderVariants = tv({
  base: "flex items-center justify-between gap-2",
});

const calendarHeaderButtonVariants = tv({
  base: "inline-flex h-8 w-8 cursor-clickable items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
});

const calendarHeaderLabelVariants = tv({
  base: "inline-flex min-w-0 cursor-clickable items-center justify-center rounded-md px-2 py-1 text-sm font-medium text-foreground transition-colors outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
});

export type CalendarHeaderProps = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  decadeLabelFormat?: (startOfDecade: Date, endOfDecade: Date) => ReactNode;
  hasNextLevel?: boolean;
  levelControlAriaLabel?: string;
  monthLabelFormat?: Intl.DateTimeFormatOptions | ((date: Date) => ReactNode);
  nextDisabled?: boolean;
  nextLabel?: string;
  previousDisabled?: boolean;
  previousLabel?: string;
  yearLabelFormat?: Intl.DateTimeFormatOptions | ((date: Date) => ReactNode);
  onLevelClick?: () => void;
  level: CalendarLevel;
  viewDate: Date;
  withNext?: boolean;
  withPrevious?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  onLevelChange?: (level: CalendarLevel) => void;
  onViewDateChange?: (value: Date) => void;
};

const CalendarHeader = ({
  className,
  decadeLabelFormat,
  hasNextLevel = true,
  level,
  levelControlAriaLabel,
  monthLabelFormat,
  nextDisabled = false,
  nextLabel,
  onLevelClick,
  onNext,
  onPrevious,
  previousDisabled = false,
  previousLabel,
  viewDate,
  withNext = true,
  withPrevious = true,
  yearLabelFormat,
  onLevelChange,
  onViewDateChange,
  ...props
}: CalendarHeaderProps) => {
  const { adapter, direction, locale, timeZone } = useDatesContext();

  const [startOfDecade, endOfDecade] = getDecadeRange(viewDate, adapter);
  const monthLabel =
    typeof monthLabelFormat === "function"
      ? monthLabelFormat(viewDate)
      : monthLabelFormat
        ? adapter.format(viewDate, monthLabelFormat, { locale, timeZone })
        : adapter.formatMonthLabel(viewDate, { locale, timeZone });
  const yearLabel =
    typeof yearLabelFormat === "function"
      ? yearLabelFormat(viewDate)
      : yearLabelFormat
        ? adapter.format(viewDate, yearLabelFormat, { locale, timeZone })
        : adapter.formatYearLabel(viewDate, { locale, timeZone });

  const decadeLabel =
    decadeLabelFormat?.(startOfDecade, endOfDecade) ??
    `${adapter.format(startOfDecade, { year: "numeric" }, { locale, timeZone })} - ${adapter.format(
      endOfDecade,
      { year: "numeric" },
      { locale, timeZone }
    )}`;

  const headerLabel =
    level === "month" ? monthLabel : level === "year" ? yearLabel : decadeLabel;

  const handlePrevious = () => {
    onPrevious?.();
    if (onPrevious) {
      return;
    }

    if (level === "month") {
      onViewDateChange?.(adapter.addMonths(viewDate, -1));
      return;
    }

    if (level === "year") {
      onViewDateChange?.(adapter.addYears(viewDate, -1));
      return;
    }

    onViewDateChange?.(adapter.addYears(viewDate, -10));
  };

  const handleNext = () => {
    onNext?.();
    if (onNext) {
      return;
    }

    if (level === "month") {
      onViewDateChange?.(adapter.addMonths(viewDate, 1));
      return;
    }

    if (level === "year") {
      onViewDateChange?.(adapter.addYears(viewDate, 1));
      return;
    }

    onViewDateChange?.(adapter.addYears(viewDate, 10));
  };

  const handleLevelClick = () => {
    onLevelClick?.();
    if (onLevelClick) {
      return;
    }

    if (level === "month") {
      onLevelChange?.("year");
      return;
    }

    if (level === "year") {
      onLevelChange?.("decade");
    }
  };

  return (
    <div
      className={cn(calendarHeaderVariants(), className)}
      data-slot="calendar-header"
      {...props}
    >
      {withPrevious ? (
        <DateControlButton
          aria-label={previousLabel ?? "Previous"}
          className={calendarHeaderButtonVariants()}
          data-direction="previous"
          disabled={previousDisabled}
          size="icon-sm"
          type="button"
          variant="outline"
          onClick={handlePrevious}
        >
          <HugeiconsIcon
            aria-hidden="true"
            data-arrow={direction === "rtl" ? "right" : "left"}
            className="size-4"
            icon={direction === "rtl" ? ArrowRight01Icon : ArrowLeft01Icon}
            strokeWidth={2}
          />
        </DateControlButton>
      ) : null}
      <DateControlButton
        aria-label={levelControlAriaLabel}
        className={calendarHeaderLabelVariants()}
        data-static={!hasNextLevel || undefined}
        disabled={!hasNextLevel}
        size="sm"
        type="button"
        variant="ghost"
        onClick={handleLevelClick}
      >
        {headerLabel}
      </DateControlButton>
      {withNext ? (
        <DateControlButton
          aria-label={nextLabel ?? "Next"}
          className={calendarHeaderButtonVariants()}
          data-direction="next"
          disabled={nextDisabled}
          size="icon-sm"
          type="button"
          variant="outline"
          onClick={handleNext}
        >
          <HugeiconsIcon
            aria-hidden="true"
            data-arrow={direction === "rtl" ? "left" : "right"}
            className="size-4"
            icon={direction === "rtl" ? ArrowLeft01Icon : ArrowRight01Icon}
            strokeWidth={2}
          />
        </DateControlButton>
      ) : null}
    </div>
  );
};

export { CalendarHeader };
