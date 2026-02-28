import type { ComponentProps, KeyboardEvent, Ref } from "react";
import { forwardRef } from "react";
import { cn, tv } from "tailwind-variants";

import type { TimeAmPmLabels } from "./time-picker-types";

const amPmInputVariants = tv({
  base: "border-input bg-background text-foreground focus-visible:border-ring focus-visible:ring-ring/50 h-6 min-w-12 rounded-sm border px-1 text-center text-xs transition-colors outline-none focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50",
});

const normalizeTypedAmPm = (
  nextValue: string,
  labels: TimeAmPmLabels,
  current: string | null
): string | null => {
  const upperValue = nextValue.trim().toUpperCase();

  if (upperValue === "") {
    return null;
  }

  if (
    upperValue === labels.am.toUpperCase() ||
    upperValue.startsWith(labels.am[0]?.toUpperCase() ?? "")
  ) {
    return labels.am;
  }

  if (
    upperValue === labels.pm.toUpperCase() ||
    upperValue.startsWith(labels.pm[0]?.toUpperCase() ?? "")
  ) {
    return labels.pm;
  }

  return current;
};

export type AmPmInputProps = Omit<
  ComponentProps<"input">,
  "onChange" | "value"
> & {
  labels: TimeAmPmLabels;
  value: string | null;
  inputType?: "select" | "input";
  onPreviousInput?: () => void;
  onChange?: (value: string | null) => void;
};

const AmPmInput = forwardRef<
  HTMLInputElement | HTMLSelectElement,
  AmPmInputProps
>(
  (
    {
      className,
      inputType = "input",
      labels,
      onChange,
      onKeyDown,
      onMouseDown,
      onPreviousInput,
      readOnly,
      value,
      ...props
    },
    ref
  ) => {
    const handleKeyDown = (
      event: KeyboardEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      (
        onKeyDown as
          | ((
              event: KeyboardEvent<HTMLInputElement | HTMLSelectElement>
            ) => void)
          | undefined
      )?.(event);

      if (event.defaultPrevented || readOnly) {
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        onChange?.(labels.am);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        onChange?.(labels.pm);
        return;
      }

      if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();

        if (value === null) {
          onPreviousInput?.();
        } else {
          onChange?.(null);
        }

        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPreviousInput?.();
        return;
      }

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        onChange?.(value === labels.am ? labels.pm : labels.am);
        return;
      }

      if (event.code === "KeyA") {
        event.preventDefault();
        onChange?.(labels.am);
        return;
      }

      if (event.code === "KeyP") {
        event.preventDefault();
        onChange?.(labels.pm);
      }
    };

    if (inputType === "select") {
      return (
        <select
          className={cn(amPmInputVariants(), className)}
          data-am-pm
          ref={ref as Ref<HTMLSelectElement>}
          value={value ?? ""}
          onChange={(event) => {
            if (!readOnly) {
              onChange?.(event.currentTarget.value || null);
            }
          }}
          onClick={(event) => {
            event.stopPropagation();
          }}
          onKeyDown={handleKeyDown}
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
          {...(props as Omit<ComponentProps<"select">, "onChange" | "value">)}
        >
          <option value="">--</option>
          <option value={labels.am}>{labels.am}</option>
          <option value={labels.pm}>{labels.pm}</option>
        </select>
      );
    }

    const displayValue = value ?? "";

    return (
      <input
        className={cn(amPmInputVariants(), className)}
        data-am-pm
        inputMode="text"
        placeholder="--"
        ref={ref as Ref<HTMLInputElement>}
        size={displayValue.length > 0 ? displayValue.length + 1 : 3}
        type="text"
        value={displayValue}
        onChange={(event) => {
          if (readOnly) {
            return;
          }

          onChange?.(
            normalizeTypedAmPm(event.currentTarget.value, labels, displayValue)
          );
        }}
        onClick={(event) => {
          event.stopPropagation();
          event.currentTarget.select();
        }}
        onFocus={(event) => {
          event.currentTarget.select();
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

AmPmInput.displayName = "AmPmInput";

export { AmPmInput };
