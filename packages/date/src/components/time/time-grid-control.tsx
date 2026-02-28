import { Button } from "@kuzenbo/core/ui/button";
import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

import type { TimeAmPmLabels, TimeFormat } from "./time-picker-types";
import { TimeValue } from "./time-value";

const timeGridControlVariants = tv({
  base: "text-foreground h-auto w-full items-center justify-between rounded-md px-2 py-1 text-left text-xs disabled:cursor-not-allowed disabled:opacity-50",
  defaultVariants: {
    active: false,
  },
  variants: {
    active: {
      false: "",
      true: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
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
  <Button
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
  </Button>
);

export { TimeGridControl };
