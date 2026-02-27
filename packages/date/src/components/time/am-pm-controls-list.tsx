import { tv } from "tailwind-variants";

import type { TimeAmPmLabels } from "./time-picker-types";

const amPmControlsListVariants = tv({
  base: "rounded-md border border-border bg-card p-1",
});

const amPmControlVariants = tv({
  base: "flex w-full cursor-clickable items-center justify-center rounded-sm px-2 py-1 text-xs text-foreground transition-colors hover:bg-muted",
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
        <button
          className={amPmControlVariants({ active: value === control })}
          key={control}
          type="button"
          onClick={() => {
            onSelect(control);
          }}
        >
          {control}
        </button>
      ))}
    </div>
  </div>
);

export { AmPmControlsList };
