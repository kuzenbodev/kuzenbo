import { Button } from "@kuzenbo/core/ui/button";
import { useEffect, useMemo, useRef } from "react";
import { cn, tv } from "tailwind-variants";

import { padTime } from "./utils/time-utils";

const timeControlsListVariants = tv({
  base: "border-border bg-card max-h-40 overflow-auto rounded-md border p-1",
});

const timeControlVariants = tv({
  base: "text-foreground hover:bg-muted h-auto w-full items-center justify-center rounded-sm px-1 py-1 text-xs",
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

const getValuesRange = (min: number, max: number, step: number): number[] => {
  const range: number[] = [];

  for (let currentValue = min; currentValue <= max; currentValue += step) {
    range.push(currentValue);
  }

  return range;
};

export interface TimeControlsListProps {
  min: number;
  max: number;
  step: number;
  value: number | null;
  reversed?: boolean;
  className?: string;
  onSelect: (value: number) => void;
}

const TimeControlsList = ({
  className,
  max,
  min,
  onSelect,
  reversed,
  step,
  value,
}: TimeControlsListProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);

  const values = useMemo(() => {
    const range = getValuesRange(min, max, step);

    return reversed ? [...range].toReversed() : range;
  }, [max, min, reversed, step]);

  useEffect(() => {
    if (value === null) {
      return;
    }

    const selectedNode = viewportRef.current?.querySelector<HTMLButtonElement>(
      `[data-value="${value}"]`
    );

    if (selectedNode) {
      selectedNode.scrollIntoView({ block: "nearest" });
    }
  }, [value]);

  return (
    <div
      className={cn(timeControlsListVariants(), className)}
      ref={viewportRef}
    >
      <div className="space-y-0.5">
        {values.map((controlValue) => (
          <Button
            className={timeControlVariants({ active: value === controlValue })}
            data-value={controlValue}
            key={controlValue}
            size="xs"
            type="button"
            variant="ghost"
            onClick={() => {
              onSelect(controlValue);
            }}
          >
            {padTime(controlValue)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export { TimeControlsList };
