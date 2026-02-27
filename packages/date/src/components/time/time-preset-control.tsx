import { tv } from "tailwind-variants";

import type { TimeAmPmLabels, TimeFormat } from "./time-picker-types";

import { TimeValue } from "./time-value";

const timePresetControlVariants = tv({
  base: "flex w-full cursor-clickable items-center justify-center rounded-sm border border-border bg-background px-2 py-1 text-xs text-foreground transition-colors hover:bg-muted",
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
  <button
    className={timePresetControlVariants({ active })}
    type="button"
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
  </button>
);

export { TimePresetControl };
