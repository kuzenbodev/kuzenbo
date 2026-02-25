"use client";

import { type ComponentProps, useEffect, useRef } from "react";
import {
  type DayButton,
  getDefaultClassNames,
  type Locale,
} from "react-day-picker";
import { cn, tv } from "tailwind-variants";

import {
  type CalendarButtonSize,
  calendarButtonVariants,
} from "./calendar-button-variants";
import {
  DEFAULT_UI_SIZE,
  useGlobalUISize,
  useKuzenboComponentDefaults,
} from "./calendar-size";
export type CalendarDayButtonProps = ComponentProps<typeof DayButton> & {
  locale?: Partial<Locale>;
  size?: CalendarButtonSize;
};

const calendarDayButtonVariants = tv({
  base: "relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-e-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-s-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70",
});

const CalendarDayButton = ({
  className,
  day,
  modifiers,
  locale,
  size: providedSize,
  ...props
}: CalendarDayButtonProps) => {
  const { size: componentDefaultSize } =
    useKuzenboComponentDefaults<CalendarDayButtonProps>("CalendarDayButton");
  const globalSize = useGlobalUISize();
  const size =
    providedSize ?? componentDefaultSize ?? globalSize ?? DEFAULT_UI_SIZE;

  const defaultClassNames = getDefaultClassNames();

  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus();
    }
  }, [modifiers.focused]);

  return (
    <button
      className={cn(
        calendarButtonVariants({ size, variant: "ghost" }),
        calendarDayButtonVariants(),
        defaultClassNames.day_button,
        className
      )}
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-size={size}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      data-range-start={modifiers.range_start}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      ref={ref}
      type="button"
      {...props}
    />
  );
};

export { CalendarDayButton };
