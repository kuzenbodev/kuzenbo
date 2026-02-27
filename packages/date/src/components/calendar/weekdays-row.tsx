import type { ComponentProps } from "react";

import { cn, tv } from "tailwind-variants";

import { useDatesContext } from "../use-dates-context";

const weekdaysRowVariants = tv({
  base: "grid grid-cols-7 gap-1",
});

const weekdayLabelVariants = tv({
  base: "inline-flex h-8 items-center justify-center text-center text-xs font-medium text-muted-foreground",
});

export type WeekdaysRowProps = ComponentProps<"div"> & {
  firstDayOfWeek?: number;
  format?: "long" | "narrow" | "short";
  locale?: string;
  weekendDays?: number[];
  getWeekdayAriaLabel?: (value: { index: number; weekday: number }) => string;
};

const WeekdaysRow = ({
  className,
  firstDayOfWeek,
  format = "short",
  getWeekdayAriaLabel,
  locale,
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
  const weekdays = labels.map((label, offset) => ({
    ariaLabel: ariaLabels[offset] ?? label,
    index: offset,
    label,
    weekday: (resolvedFirstDayOfWeek + offset) % 7,
  }));

  return (
    <div
      className={cn(weekdaysRowVariants(), className)}
      data-slot="weekdays-row"
      {...props}
    >
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
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export { WeekdaysRow };
