import { Button } from "@kuzenbo/core/ui/button";
import { tv } from "tailwind-variants";

import type { TimeAmPmLabels } from "./time-picker-types";

const amPmControlsListVariants = tv({
  base: "border-border bg-card rounded-md border p-1",
});

const amPmControlVariants = tv({
  base: "text-foreground hover:bg-muted h-auto w-full items-center justify-center rounded-sm px-2 py-1 text-xs",
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
        <Button
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
        </Button>
      ))}
    </div>
  </div>
);

export { AmPmControlsList };
