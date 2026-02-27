/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps } from "react";

import { cn, tv } from "tailwind-variants";

import { Calendar } from "./calendar/calendar";

const miniCalendarVariants = tv({
  base: "inline-flex w-full max-w-[18rem]",
});

export type MiniCalendarProps = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  defaultMonth?: Date;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
};

const MiniCalendar = ({
  className,
  defaultMonth,
  value,
  onChange,
  ...props
}: MiniCalendarProps) => (
  <div
    className={cn(miniCalendarVariants(), className)}
    data-slot="mini-calendar"
    {...props}
  >
    <Calendar
      defaultMonth={defaultMonth}
      type="default"
      value={value ?? null}
      onChange={(nextValue) => {
        onChange?.((nextValue as Date | null) ?? null);
      }}
    />
  </div>
);

export { MiniCalendar };
