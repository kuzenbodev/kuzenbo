import type { ComponentProps } from "react";

import { tv } from "tailwind-variants";

import type { TimeAmPmLabels, TimeFormat } from "./time-picker-types";

import { TimeValue } from "./time-value";

const timeGridControlVariants = tv({
  base: "flex w-full cursor-clickable items-center justify-between rounded-md px-2 py-1 text-left text-xs text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50",
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
  <button
    className={timeGridControlVariants({ active })}
    type="button"
    {...props}
  >
    <TimeValue
      amPmLabels={amPmLabels}
      format={format}
      value={time}
      withSeconds={withSeconds}
    />
    {active ? <span>Selected</span> : null}
  </button>
);

export { TimeGridControl };
