/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps } from "react";

import { useMemo, useState } from "react";
import { cn, tv } from "tailwind-variants";

import type {
  TimeAmPmLabels,
  TimeDisablePredicate,
  TimeFormat,
} from "./time-picker-types";

import { isTimeAfter, isTimeBefore } from "./compare-time";
import { TimeGridControl } from "./time-grid-control";
import {
  DEFAULT_TIME_AM_PM_LABELS,
  getTimeRangeFromInterval,
  isSameTime,
} from "./time-utils";

const timeGridVariants = tv({
  base: "max-h-48 overflow-auto rounded-md border border-border bg-card p-1",
});

export type TimeGridProps = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  data?: string[];
  defaultValue?: string | null;
  interval?: number;
  value?: string | null;
  format?: TimeFormat;
  withSeconds?: boolean;
  amPmLabels?: TimeAmPmLabels;
  allowDeselect?: boolean;
  minTime?: string;
  maxTime?: string;
  disableTime?: TimeDisablePredicate;
  disabled?: boolean;
  onChange?: (value: string | null) => void;
};

const TimeGrid = ({
  allowDeselect = false,
  amPmLabels = DEFAULT_TIME_AM_PM_LABELS,
  className,
  data,
  defaultValue = null,
  disableTime,
  disabled,
  format = "24h",
  interval = 30,
  maxTime,
  minTime,
  onChange,
  value,
  withSeconds = false,
  ...props
}: TimeGridProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | null>(
    defaultValue
  );
  const resolvedValue = value === undefined ? uncontrolledValue : value;

  const options = useMemo(
    () => data ?? getTimeRangeFromInterval({ interval, withSeconds }),
    [data, interval, withSeconds]
  );

  return (
    <div
      className={cn(timeGridVariants(), className)}
      data-slot="time-grid"
      {...props}
    >
      {options.map((option) => {
        const selected = isSameTime({
          compare: resolvedValue ?? "",
          time: option,
          withSeconds,
        });

        const optionDisabled =
          disabled ||
          (!!minTime && isTimeBefore(option, minTime)) ||
          (!!maxTime && isTimeAfter(option, maxTime)) ||
          (Array.isArray(disableTime)
            ? disableTime.some((disabledTime) =>
                isSameTime({
                  compare: disabledTime,
                  time: option,
                  withSeconds,
                })
              )
            : !!disableTime?.(option));

        return (
          <TimeGridControl
            active={selected}
            amPmLabels={amPmLabels}
            data-disabled={optionDisabled || undefined}
            disabled={optionDisabled}
            format={format}
            key={option}
            time={option}
            withSeconds={withSeconds}
            onClick={() => {
              const nextValue = allowDeselect && selected ? null : option;

              if (value === undefined) {
                setUncontrolledValue(nextValue);
              }

              if (nextValue !== resolvedValue) {
                onChange?.(nextValue);
              }
            }}
          />
        );
      })}
    </div>
  );
};

export { TimeGrid };
