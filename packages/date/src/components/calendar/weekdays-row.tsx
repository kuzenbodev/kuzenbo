import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";

import { useDatesContext } from "../use-dates-context";

const weekdaysRowVariants = tv({
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

const weekdayLabelVariants = tv({
  base: "text-muted-foreground inline-flex h-8 items-center justify-center text-center text-xs font-medium",
});

const weekNumberHeadingVariants = tv({
  base: "text-muted-foreground inline-flex h-8 min-w-8 items-center justify-center text-center text-xs font-medium",
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

export type WeekdaysRowProps = ComponentProps<"div"> & {
  firstDayOfWeek?: number;
  format?: "long" | "narrow" | "short";
  locale?: string;
  withWeekNumbers?: boolean;
  weekendDays?: number[];
  getWeekdayAriaLabel?: (value: { index: number; weekday: number }) => string;
};

const WeekdaysRow = ({
  className,
  firstDayOfWeek,
  format = "short",
  getWeekdayAriaLabel,
  locale,
  withWeekNumbers = false,
  weekendDays,
  ...props
}: WeekdaysRowProps) => {
  const {
    adapter,
    firstDayOfWeek: contextFirstDayOfWeek,
    locale: contextLocale,
    timeZone,
    weekendDays: contextWeekendDays,
  } = useDatesContext();
  const resolvedFirstDayOfWeek = firstDayOfWeek ?? contextFirstDayOfWeek;
  const resolvedLocale = locale ?? contextLocale;
  const resolvedWeekendDays = weekendDays ?? contextWeekendDays;
  const labels = adapter.getWeekdayLabels(resolvedFirstDayOfWeek, format, {
    locale: resolvedLocale,
    timeZone,
  });
  const ariaLabels = adapter.getWeekdayLabels(resolvedFirstDayOfWeek, "long", {
    locale: resolvedLocale,
    timeZone,
  });
  const weekOfYearLabel = getWeekOfYearLabel(resolvedLocale);
  const weekdays = labels.map((label, offset) => ({
    ariaLabel: ariaLabels[offset] ?? label,
    index: offset,
    label,
    weekday: (resolvedFirstDayOfWeek + offset) % 7,
  }));

  return (
    <div
      className={cn(weekdaysRowVariants({ withWeekNumbers }), className)}
      data-slot="weekdays-row"
      role="row"
      {...props}
    >
      {withWeekNumbers ? (
        <div
          aria-label={weekOfYearLabel}
          className={weekNumberHeadingVariants()}
          data-slot="week-number-heading"
          role="columnheader"
        >
          #
        </div>
      ) : null}
      {weekdays.map(({ ariaLabel, index, label, weekday }) => (
        <div
          aria-label={
            getWeekdayAriaLabel?.({ index, weekday }) ??
            (typeof ariaLabel === "string" ? ariaLabel : undefined)
          }
          className={weekdayLabelVariants()}
          data-weekend={resolvedWeekendDays.includes(weekday) || undefined}
          data-weekday={weekday}
          key={`${weekday}-${label}`}
          role="columnheader"
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export { WeekdaysRow };
