"use client";

import type { ComponentProps } from "react";

import { useComponentSize } from "@kuzenbo/core/provider";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { cn, tv } from "tailwind-variants";

import {
  calendarButtonVariants,
  type CalendarButtonVariant,
} from "./calendar-button-variants";
import { CalendarChevron } from "./calendar-chevron";
import { CalendarDayButton } from "./calendar-day-button";
import { CalendarRoot } from "./calendar-root";
import {
  DEFAULT_UI_SIZE,
  type UISize,
  useKuzenboComponentDefaults,
} from "./calendar-size";
import { CalendarWeekNumber } from "./calendar-week-number";
export type CalendarProps = ComponentProps<typeof DayPicker> & {
  buttonVariant?: CalendarButtonVariant;
  size?: UISize;
};

const calendarRootVariants = tv({
  base: [
    "group/calendar bg-background [--cell-radius:var(--radius-md)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
    String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
    String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
  ],
  variants: {
    size: {
      xs: "p-2 [--cell-size:--spacing(6)]",
      sm: "p-2.5 [--cell-size:--spacing(7)]",
      md: "p-3 [--cell-size:--spacing(8)]",
      lg: "p-3.5 [--cell-size:--spacing(9)]",
      xl: "p-4 [--cell-size:--spacing(10)]",
    },
  },
  defaultVariants: {
    size: DEFAULT_UI_SIZE,
  },
});

const calendarClassNames = tv({
  slots: {
    root: "w-fit",
    months: "relative flex flex-col gap-4 md:flex-row",
    month: "flex w-full flex-col gap-4",
    nav: "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
    month_caption:
      "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
    dropdowns:
      "flex h-(--cell-size) w-full items-center justify-center gap-1.5 font-medium group-data-[size=xs]/calendar:text-xs group-data-[size=sm]/calendar:text-xs group-data-[size=md]/calendar:text-sm group-data-[size=lg]/calendar:text-sm group-data-[size=xl]/calendar:text-base",
    dropdown_root: "cn-calendar-dropdown-root relative rounded-(--cell-radius)",
    dropdown: "absolute inset-0 bg-popover opacity-0",
    caption_label: "font-medium select-none",
    month_grid: "w-full border-collapse",
    table: "w-full border-collapse",
    weekdays: "flex",
    weekday:
      "flex-1 rounded-(--cell-radius) font-normal text-muted-foreground select-none group-data-[size=xs]/calendar:text-[0.7rem] group-data-[size=sm]/calendar:text-[0.75rem] group-data-[size=md]/calendar:text-[0.8rem] group-data-[size=lg]/calendar:text-sm group-data-[size=xl]/calendar:text-base",
    week: "mt-2 flex w-full",
    row: "mt-2 flex w-full",
    week_number_header: "w-(--cell-size) select-none",
    week_number:
      "text-muted-foreground select-none group-data-[size=xs]/calendar:text-[0.7rem] group-data-[size=sm]/calendar:text-[0.75rem] group-data-[size=md]/calendar:text-[0.8rem] group-data-[size=lg]/calendar:text-sm group-data-[size=xl]/calendar:text-base",
    day: "group/day relative flex size-(--cell-size) items-center justify-center p-0 text-center font-normal data-[focused=true]:z-elevated group-data-[size=xs]/calendar:text-xs group-data-[size=sm]/calendar:text-xs group-data-[size=md]/calendar:text-sm group-data-[size=lg]/calendar:text-sm group-data-[size=xl]/calendar:text-base [&:last-child[data-selected=true]_button]:rounded-e-(--cell-radius)",
    day_button:
      "relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none",
    range_start:
      "relative z-base rounded-s-(--cell-radius) bg-muted after:pointer-events-none after:absolute after:inset-y-0 after:end-0 after:z-base after:w-4 after:bg-muted",
    range_middle: "rounded-none",
    range_end:
      "relative z-base rounded-e-(--cell-radius) bg-muted after:pointer-events-none after:absolute after:inset-y-0 after:start-0 after:z-base after:w-4 after:bg-muted",
    today:
      "rounded-(--cell-radius) bg-muted text-foreground data-[selected=true]:rounded-none",
    outside: "text-muted-foreground aria-selected:text-muted-foreground",
    disabled: "text-muted-foreground opacity-50",
    hidden: "invisible",
  },
  variants: {
    hasWeekNumber: {
      true: {
        day: "[&:nth-child(2)[data-selected=true]_button]:rounded-s-(--cell-radius)",
      },
      false: {
        day: "[&:first-child[data-selected=true]_button]:rounded-s-(--cell-radius)",
      },
    },
    isLabelCaption: {
      true: {
        caption_label: "text-sm",
      },
      false: {
        caption_label:
          "cn-calendar-caption-label flex items-center gap-1 rounded-(--cell-radius) group-data-[size=xs]/calendar:text-xs group-data-[size=sm]/calendar:text-xs group-data-[size=md]/calendar:text-sm group-data-[size=lg]/calendar:text-sm group-data-[size=xl]/calendar:text-base [&>svg]:text-muted-foreground group-data-[size=xs]/calendar:[&>svg]:size-3 group-data-[size=sm]/calendar:[&>svg]:size-3.5 group-data-[size=md]/calendar:[&>svg]:size-3.5 group-data-[size=lg]/calendar:[&>svg]:size-4 group-data-[size=xl]/calendar:[&>svg]:size-5",
      },
    },
  },
});

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  size: providedSize,
  locale,
  formatters,
  components,
  ...props
}: CalendarProps) => {
  const { size: componentDefaultSize } =
    useKuzenboComponentDefaults<CalendarProps>("Calendar");
  const size = useComponentSize(providedSize, componentDefaultSize);

  const defaultClassNames = getDefaultClassNames();
  const calendarStyles = calendarClassNames({
    hasWeekNumber: Boolean(props.showWeekNumber),
    isLabelCaption: captionLayout === "label",
  });

  return (
    <DayPicker
      captionLayout={captionLayout}
      className={cn(calendarRootVariants({ size }), className)}
      data-size={size}
      locale={locale}
      classNames={{
        root: cn(
          calendarStyles.root(),
          defaultClassNames.root,
          classNames?.root
        ),
        months: cn(
          calendarStyles.months(),
          defaultClassNames.months,
          classNames?.months
        ),
        month: cn(
          calendarStyles.month(),
          defaultClassNames.month,
          classNames?.month
        ),
        nav: cn(calendarStyles.nav(), defaultClassNames.nav, classNames?.nav),
        button_previous: cn(
          calendarButtonVariants({ size, variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous,
          classNames?.button_previous
        ),
        button_next: cn(
          calendarButtonVariants({ size, variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_next,
          classNames?.button_next
        ),
        month_caption: cn(
          calendarStyles.month_caption(),
          defaultClassNames.month_caption,
          classNames?.month_caption
        ),
        dropdowns: cn(
          calendarStyles.dropdowns(),
          defaultClassNames.dropdowns,
          classNames?.dropdowns
        ),
        dropdown_root: cn(
          calendarStyles.dropdown_root(),
          defaultClassNames.dropdown_root,
          classNames?.dropdown_root
        ),
        dropdown: cn(
          calendarStyles.dropdown(),
          defaultClassNames.dropdown,
          classNames?.dropdown
        ),
        caption_label: cn(
          calendarStyles.caption_label(),
          defaultClassNames.caption_label,
          classNames?.caption_label
        ),
        month_grid: cn(
          calendarStyles.month_grid(),
          defaultClassNames.month_grid,
          classNames?.month_grid
        ),
        table: cn(calendarStyles.table(), classNames?.table),
        weeks: cn(defaultClassNames.weeks, classNames?.weeks),
        tbody: cn(defaultClassNames.weeks, classNames?.tbody),
        weekdays: cn(
          calendarStyles.weekdays(),
          defaultClassNames.weekdays,
          classNames?.weekdays
        ),
        weekday: cn(
          calendarStyles.weekday(),
          defaultClassNames.weekday,
          classNames?.weekday
        ),
        week: cn(
          calendarStyles.week(),
          defaultClassNames.week,
          classNames?.week
        ),
        row: cn(calendarStyles.row(), defaultClassNames.week, classNames?.row),
        week_number_header: cn(
          calendarStyles.week_number_header(),
          defaultClassNames.week_number_header,
          classNames?.week_number_header
        ),
        week_number: cn(
          calendarStyles.week_number(),
          defaultClassNames.week_number,
          classNames?.week_number
        ),
        day: cn(calendarStyles.day(), defaultClassNames.day, classNames?.day),
        day_button: cn(
          calendarStyles.day_button(),
          defaultClassNames.day_button,
          classNames?.day_button
        ),
        range_start: cn(
          calendarStyles.range_start(),
          defaultClassNames.range_start,
          classNames?.range_start
        ),
        range_middle: cn(
          calendarStyles.range_middle(),
          defaultClassNames.range_middle,
          classNames?.range_middle
        ),
        range_end: cn(
          calendarStyles.range_end(),
          defaultClassNames.range_end,
          classNames?.range_end
        ),
        today: cn(
          calendarStyles.today(),
          defaultClassNames.today,
          classNames?.today
        ),
        outside: cn(
          calendarStyles.outside(),
          defaultClassNames.outside,
          classNames?.outside
        ),
        disabled: cn(
          calendarStyles.disabled(),
          defaultClassNames.disabled,
          classNames?.disabled
        ),
        hidden: cn(
          calendarStyles.hidden(),
          defaultClassNames.hidden,
          classNames?.hidden
        ),
      }}
      components={{
        Root: CalendarRoot,
        Chevron: CalendarChevron,
        DayButton: ({ ...dayButtonProps }) => (
          <CalendarDayButton locale={locale} size={size} {...dayButtonProps} />
        ),
        WeekNumber: CalendarWeekNumber,
        ...components,
      }}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  );
};

Calendar.Chevron = CalendarChevron;
Calendar.DayButton = CalendarDayButton;
Calendar.Root = CalendarRoot;
Calendar.WeekNumber = CalendarWeekNumber;

export {
  Calendar,
  CalendarChevron,
  CalendarDayButton,
  CalendarRoot,
  CalendarWeekNumber,
};

export type { CalendarChevronProps } from "./calendar-chevron";
export type { CalendarDayButtonProps } from "./calendar-day-button";
export type { CalendarRootProps } from "./calendar-root";
export type { UISize as CalendarSize } from "./calendar-size";
export type { CalendarWeekNumberProps } from "./calendar-week-number";
