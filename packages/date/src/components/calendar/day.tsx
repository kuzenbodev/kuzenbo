/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";

import { useDatesContext } from "../use-dates-context";

const dayVariants = tv({
  base: "cursor-clickable focus-visible:border-ring focus-visible:ring-ring/50 relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-sm font-medium transition-colors outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-40",
  variants: {
    firstInRange: {
      true: "bg-primary/15 !rounded-md",
      false: "",
    },
    inRange: {
      true: "bg-primary/15 rounded-none",
      false: "",
    },
    lastInRange: {
      true: "bg-primary/15 !rounded-md",
      false: "",
    },
    selected: {
      true: "bg-primary text-primary-foreground hover:bg-primary/90",
      false: "text-foreground hover:bg-muted",
    },
    outside: {
      true: "text-muted-foreground/70",
      false: "",
    },
    today: {
      true: "border-border bg-card",
      false: "",
    },
  },
  defaultVariants: {
    selected: false,
    outside: false,
    today: false,
  },
  compoundVariants: [
    {
      selected: true,
      today: true,
      class: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
  ],
});

export type DayProps = Omit<
  ComponentProps<"button">,
  "children" | "onClick" | "onSelect"
> & {
  ariaLabel?: string;
  date: Date;
  disabled?: boolean;
  firstInRange?: boolean;
  hidden?: boolean;
  inRange?: boolean;
  lastInRange?: boolean;
  outside?: boolean;
  selected?: boolean;
  today?: boolean;
  weekend?: boolean;
  onClick?: ComponentProps<"button">["onClick"];
  onSelect?: (date: Date) => void;
};

const Day = ({
  ariaLabel,
  className,
  date,
  disabled = false,
  firstInRange = false,
  hidden = false,
  inRange = false,
  lastInRange = false,
  outside = false,
  selected = false,
  today = false,
  weekend = false,
  onClick,
  onKeyDown,
  onMouseDown,
  onMouseEnter,
  onSelect,
  tabIndex,
  ...props
}: DayProps) => {
  const { adapter, locale, timeZone } = useDatesContext();

  return (
    <button
      aria-label={
        ariaLabel ??
        adapter.format(
          date,
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          },
          { locale, timeZone }
        )
      }
      className={cn(
        dayVariants({
          firstInRange,
          inRange,
          lastInRange,
          outside,
          selected,
          today,
        }),
        className
      )}
      data-hidden={hidden || undefined}
      data-outside={outside}
      data-selected={selected}
      data-today={today}
      data-weekend={weekend || undefined}
      disabled={disabled}
      tabIndex={hidden ? -1 : tabIndex}
      type="button"
      onClick={(event) => {
        onClick?.(event);
        onSelect?.(date);
      }}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      {...props}
    >
      {adapter.getDate(date)}
    </button>
  );
};

export { Day };
