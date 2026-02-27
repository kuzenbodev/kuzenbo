import type { ComponentProps } from "react";

import { cn, tv } from "tailwind-variants";

import type { TimeAmPmLabels, TimeFormat } from "./time-picker-types";

import { getFormattedTime } from "./utils/get-formatted-time";

const timeValueVariants = tv({
  base: "inline-flex items-center rounded-md border border-border bg-card px-2 py-1 font-mono text-xs text-foreground",
});

export type TimeValueProps = ComponentProps<"span"> & {
  value?: string | Date;
  format?: TimeFormat;
  amPmLabels?: TimeAmPmLabels;
  withSeconds?: boolean;
};

const TimeValue = ({
  amPmLabels,
  className,
  format = "24h",
  value,
  withSeconds = false,
  ...props
}: TimeValueProps) => (
  <span
    className={cn(timeValueVariants(), className)}
    data-slot="time-value"
    {...props}
  >
    {getFormattedTime({
      amPmLabels,
      format,
      value: value ?? "",
      withSeconds,
    })}
  </span>
);

export { TimeValue };
