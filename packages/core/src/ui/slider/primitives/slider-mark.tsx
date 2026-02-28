"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "tailwind-variants";

export interface SliderMarkProps {
  disabled?: boolean;
  filled?: boolean;
  label?: ReactNode;
  orientation?: "horizontal" | "vertical";
  position: number;
}

const SliderMark = ({
  disabled,
  filled,
  label,
  orientation = "horizontal",
  position,
}: SliderMarkProps) => {
  const isHorizontal = orientation === "horizontal";

  const wrapperStyle = isHorizontal
    ? ({ insetInlineStart: `${position}%` } satisfies CSSProperties)
    : ({ bottom: `${position}%` } satisfies CSSProperties);

  return (
    <div
      className={cn(
        "z-elevated pointer-events-none absolute",
        isHorizontal
          ? "top-1/2 -translate-x-1/2 -translate-y-1/2"
          : "left-1/2 -translate-x-1/2 translate-y-1/2"
      )}
      data-filled={filled ? "true" : "false"}
      data-slot="slider-mark"
      style={wrapperStyle}
    >
      <span
        aria-hidden="true"
        className={cn(
          "block h-[var(--slider-mark-size,0.5rem)] w-[var(--slider-mark-size,0.5rem)] rounded-full border transition-[border-color,background-color] duration-150 ease-out group-data-[dragging]/slider:duration-0 motion-reduce:transition-none",
          filled
            ? "border-[var(--slider-color,var(--color-primary))] bg-[var(--slider-color,var(--color-primary))]"
            : "border-border bg-background",
          disabled && "border-muted bg-muted"
        )}
        data-slot="slider-mark-dot"
      />
      {label ? (
        <span
          className={cn(
            "text-muted-foreground pointer-events-none absolute text-xs whitespace-nowrap",
            isHorizontal
              ? "top-[calc(var(--slider-mark-size,0.5rem)+0.5rem)] left-1/2 -translate-x-1/2"
              : "top-1/2 left-[calc(var(--slider-mark-size,0.5rem)+0.5rem)] -translate-y-1/2"
          )}
          data-slot="slider-mark-label"
        >
          {label}
        </span>
      ) : null}
    </div>
  );
};

export { SliderMark };
