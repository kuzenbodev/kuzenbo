import { tv } from "tailwind-variants";

import type { TimeAmPmLabels } from "./time-picker-types";

import { DateControlButton } from "../internal/date-control-button";

const amPmControlsListVariants = tv({
  base: "rounded-md border border-border bg-card p-1",
});

const amPmControlVariants = tv({
  base: "h-auto w-full items-center justify-center rounded-sm px-2 py-1 text-xs text-foreground hover:bg-muted",
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

export interface AmPmControlsListProps {
  labels: TimeAmPmLabels;
  value: string | null;
  onSelect: (value: string) => void;
}

const AmPmControlsList = ({
  labels,
  onSelect,
  value,
}: AmPmControlsListProps) => (
  <div className={amPmControlsListVariants()}>
    <div className="space-y-0.5">
      {[labels.am, labels.pm].map((control) => (
        <DateControlButton
          className={amPmControlVariants({ active: value === control })}
          key={control}
          size="xs"
          type="button"
          variant="ghost"
          onClick={() => {
            onSelect(control);
          }}
        >
          {control}
        </DateControlButton>
      ))}
    </div>
  </div>
);

export { AmPmControlsList };
