/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps, FocusEvent } from "react";

import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { cn, tv } from "tailwind-variants";

import type {
  TimeAmPmLabels,
  TimeFormat,
  TimePasteSplit,
} from "./time-picker-types";

import { DateControlButton } from "../internal/date-control-button";
import { AmPmInput } from "./am-pm-input";
import { SpinInput } from "./spin-input";
import { useTimePicker } from "./use-time-picker";
import {
  clampTime,
  DEFAULT_TIME_AM_PM_LABELS,
  getTimeStringFromParts,
} from "./utils/time-utils";

const timeInputVariants = tv({
  base: "inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1",
});

const timeInputFieldsGroupVariants = tv({
  base: "inline-flex items-center gap-1",
});

const timeInputDividerVariants = tv({
  base: "text-xs text-muted-foreground",
});

const timeInputClearButtonVariants = tv({
  base: "h-5 w-5 rounded-sm p-0 text-xs text-muted-foreground hover:bg-muted hover:text-foreground",
});

export type TimeInputProps = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  defaultValue?: string;
  name?: string;
  value?: string;
  format?: TimeFormat;
  min?: string;
  max?: string;
  withSeconds?: boolean;
  hoursStep?: number;
  minutesStep?: number;
  secondsStep?: number;
  clearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  amPmLabels?: TimeAmPmLabels;
  pasteSplit?: TimePasteSplit;
  hoursInputLabel?: string;
  minutesInputLabel?: string;
  secondsInputLabel?: string;
  amPmInputLabel?: string;
  onChange?: (value: string) => void;
};

const TimeInput = ({
  amPmInputLabel = "AM/PM",
  amPmLabels,
  className,
  clearable = false,
  defaultValue,
  disabled,
  format = "24h",
  hoursInputLabel = "Hours",
  hoursStep = 1,
  max,
  min,
  minutesInputLabel = "Minutes",
  minutesStep = 1,
  name,
  onBlur,
  onChange,
  pasteSplit,
  readOnly,
  secondsInputLabel = "Seconds",
  secondsStep = 1,
  value,
  withSeconds = false,
  ...props
}: TimeInputProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? ""
  );
  const resolvedValue = value === undefined ? uncontrolledValue : value;

  const controller = useTimePicker({
    amPmLabels,
    clearable,
    defaultValue,
    disabled,
    format,
    max,
    min,
    onChange: (nextValue) => {
      if (value === undefined) {
        setUncontrolledValue(nextValue);
      }

      onChange?.(nextValue);
    },
    pasteSplit,
    readOnly,
    value: resolvedValue,
    withSeconds,
  });

  const handleRootBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      const computedValue = controller.values;
      const timeString = getTimeStringFromParts({
        ...computedValue,
        amPmLabels: amPmLabels ?? DEFAULT_TIME_AM_PM_LABELS,
        format,
        withSeconds,
      });

      if (timeString.valid && (min || max)) {
        const clamped = clampTime(timeString.value, min, max);

        if (clamped.timeString !== timeString.value) {
          controller.setTimeString(clamped.timeString);
        }
      }
    }

    onBlur?.(event);
  };

  return (
    <div
      className={cn(timeInputVariants(), className)}
      data-slot="time-input"
      onBlur={handleRootBlur}
      {...props}
    >
      <div className={timeInputFieldsGroupVariants()}>
        <SpinInput
          allowTemporaryZero={format === "12h"}
          aria-label={hoursInputLabel}
          disabled={disabled}
          max={format === "12h" ? 12 : 23}
          min={format === "12h" ? 1 : 0}
          readOnly={readOnly}
          ref={controller.refs.hours}
          step={hoursStep}
          value={controller.values.hours}
          onBlur={(event) => {
            const numericValue = event.currentTarget.value
              ? Number.parseInt(event.currentTarget.value, 10)
              : null;

            if (format === "12h" && numericValue === 0) {
              controller.setHours(12);
            }
          }}
          onChange={controller.setHours}
          onNextInput={() => {
            controller.focus("minutes");
          }}
          onPaste={controller.onPaste}
        />

        <span className={timeInputDividerVariants()}>:</span>

        <SpinInput
          aria-label={minutesInputLabel}
          disabled={disabled}
          max={59}
          min={0}
          readOnly={readOnly}
          ref={controller.refs.minutes}
          step={minutesStep}
          tabIndex={-1}
          value={controller.values.minutes}
          onChange={controller.setMinutes}
          onNextInput={() => {
            if (withSeconds) {
              controller.focus("seconds");
              return;
            }

            if (format === "12h") {
              controller.focus("amPm");
            }
          }}
          onPaste={controller.onPaste}
          onPreviousInput={() => {
            controller.focus("hours");
          }}
        />

        {withSeconds ? (
          <>
            <span className={timeInputDividerVariants()}>:</span>

            <SpinInput
              aria-label={secondsInputLabel}
              disabled={disabled}
              max={59}
              min={0}
              readOnly={readOnly}
              ref={controller.refs.seconds}
              step={secondsStep}
              tabIndex={-1}
              value={controller.values.seconds}
              onChange={controller.setSeconds}
              onNextInput={() => {
                if (format === "12h") {
                  controller.focus("amPm");
                }
              }}
              onPaste={controller.onPaste}
              onPreviousInput={() => {
                controller.focus("minutes");
              }}
            />
          </>
        ) : null}

        {format === "12h" ? (
          <AmPmInput
            aria-label={amPmInputLabel}
            disabled={disabled}
            labels={amPmLabels ?? DEFAULT_TIME_AM_PM_LABELS}
            readOnly={readOnly}
            ref={controller.refs.amPm}
            tabIndex={-1}
            value={controller.values.amPm}
            onChange={controller.setAmPm}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
              }
            }}
            onPaste={controller.onPaste}
            onPreviousInput={() => {
              if (withSeconds) {
                controller.focus("seconds");
                return;
              }

              controller.focus("minutes");
            }}
          />
        ) : null}
      </div>

      {clearable && controller.isClearable ? (
        <DateControlButton
          aria-label="Clear time"
          className={timeInputClearButtonVariants()}
          size="icon-xs"
          type="button"
          variant="ghost"
          onClick={() => {
            controller.clear();
          }}
        >
          <HugeiconsIcon
            aria-hidden="true"
            className="size-3"
            icon={Cancel01Icon}
            strokeWidth={2}
          />
        </DateControlButton>
      ) : null}

      {name ? (
        <input name={name} type="hidden" value={controller.hiddenInputValue} />
      ) : null}
    </div>
  );
};

export { TimeInput };
