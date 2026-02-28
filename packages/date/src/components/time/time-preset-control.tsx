import { tv } from "tailwind-variants";

import { DateControlButton } from "../internal/date-control-button";
import type { TimeAmPmLabels, TimeFormat } from "./time-picker-types";
import { TimeValue } from "./time-value";

const timePresetControlVariants = tv({
  base: "border-border bg-background text-foreground hover:bg-muted h-auto w-full items-center justify-center rounded-sm border px-2 py-1 text-xs",
  variants: {
    active: {
      true: "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
      false: "",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export interface TimePresetControlProps {
  value: string;
  active: boolean;
  format: TimeFormat;
  amPmLabels: TimeAmPmLabels;
  withSeconds: boolean;
  onChange: (value: string) => void;
}

const TimePresetControl = ({
  active,
  amPmLabels,
  format,
  onChange,
  value,
  withSeconds,
}: TimePresetControlProps) => (
  <DateControlButton
    className={timePresetControlVariants({ active })}
    size="xs"
    type="button"
    variant="outline"
    onClick={() => {
      onChange(value);
    }}
  >
    <TimeValue
      amPmLabels={amPmLabels}
      format={format}
      value={value}
      withSeconds={withSeconds}
    />
  </DateControlButton>
);

export { TimePresetControl };
