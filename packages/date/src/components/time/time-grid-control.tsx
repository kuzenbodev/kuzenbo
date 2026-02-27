import type { ComponentProps } from "react";

import { tv } from "tailwind-variants";

import type { TimeAmPmLabels, TimeFormat } from "./time-picker-types";

import { DateControlButton } from "../internal/date-control-button";
import { TimeValue } from "./time-value";

const timeGridControlVariants = tv({
  base: "h-auto w-full items-center justify-between rounded-md px-2 py-1 text-left text-xs text-foreground disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    active: {
      true: "bg-primary text-primary-foreground hover:bg-primary/90",
      false: "",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export type TimeGridControlProps = ComponentProps<"button"> & {
  time: string;
  active: boolean;
  format: TimeFormat;
  amPmLabels: TimeAmPmLabels;
  withSeconds?: boolean;
};

const TimeGridControl = ({
  active,
  amPmLabels,
  format,
  time,
  withSeconds,
  ...props
}: TimeGridControlProps) => (
  <DateControlButton
    className={timeGridControlVariants({ active })}
    size="xs"
    type="button"
    variant="ghost"
    {...props}
  >
    <TimeValue
      amPmLabels={amPmLabels}
      format={format}
      value={time}
      withSeconds={withSeconds}
    />
    {active ? <span>Selected</span> : null}
  </DateControlButton>
);

export { TimeGridControl };
