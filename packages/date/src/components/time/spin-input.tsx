import type { ComponentProps, KeyboardEvent } from "react";

import { forwardRef } from "react";
import { cn, tv } from "tailwind-variants";

import { padTime } from "./utils/time-utils";

const spinInputVariants = tv({
  base: "h-6 w-10 rounded-sm border border-input bg-background px-1 text-center text-xs text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-[2px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
});

const getMaxDigit = (max: number): number => Number(max.toFixed(0)[0]);

const clampValue = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export type SpinInputProps = Omit<
  ComponentProps<"input">,
  "onChange" | "value"
> & {
  value: number | null;
  min: number;
  max: number;
  step: number;
  allowTemporaryZero?: boolean;
  onNextInput?: () => void;
  onPreviousInput?: () => void;
  onChange?: (value: number | null) => void;
};

const SpinInput = forwardRef<HTMLInputElement, SpinInputProps>(
  (
    {
      allowTemporaryZero = false,
      className,
      max,
      min,
      onBlur,
      onChange,
      onClick,
      onFocus,
      onKeyDown,
      onMouseDown,
      onNextInput,
      onPreviousInput,
      placeholder = "--",
      readOnly,
      step,
      value,
      ...props
    },
    ref
  ) => {
    const maxDigit = getMaxDigit(max);
    const arrowsMax = max + 1 - step;

    const handleChange = (rawValue: string) => {
      if (readOnly) {
        return;
      }

      const clearValue = rawValue.replaceAll(/\D/g, "");

      if (clearValue === "") {
        onChange?.(null);
        return;
      }

      const parsedValue = Number.parseInt(clearValue, 10);
      const clampedValue =
        allowTemporaryZero && parsedValue === 0 && min > 0
          ? 0
          : clampValue(parsedValue, min, max);

      onChange?.(clampedValue);

      if (clampedValue > maxDigit || rawValue.startsWith("00")) {
        onNextInput?.();
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);

      if (event.defaultPrevented || readOnly) {
        return;
      }

      if ((event.key === "0" || event.key === "Num0") && value === 0) {
        event.preventDefault();
        onNextInput?.();
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        onChange?.(min);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        onChange?.(max);
        return;
      }

      if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();

        if (value !== null) {
          onChange?.(null);
        } else {
          onPreviousInput?.();
        }

        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNextInput?.();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPreviousInput?.();
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        onChange?.(
          value === null ? min : clampValue(value + step, min, arrowsMax)
        );
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        onChange?.(
          value === null ? arrowsMax : clampValue(value - step, min, arrowsMax)
        );
      }
    };

    return (
      <input
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value === null ? 0 : value}
        className={cn(spinInputVariants(), className)}
        data-empty={value === null ? true : undefined}
        inputMode="numeric"
        placeholder={placeholder}
        ref={ref}
        role="spinbutton"
        type="text"
        value={value === null ? "" : padTime(value)}
        onBlur={onBlur}
        onChange={(event) => {
          handleChange(event.currentTarget.value);
        }}
        onClick={(event) => {
          event.stopPropagation();
          event.currentTarget.select();
          onClick?.(event);
        }}
        onFocus={(event) => {
          event.currentTarget.select();
          onFocus?.(event);
        }}
        onKeyDown={handleKeyDown}
        onMouseDown={(event) => {
          event.stopPropagation();
          onMouseDown?.(event);
        }}
        {...props}
      />
    );
  }
);

SpinInput.displayName = "SpinInput";

export { SpinInput };
