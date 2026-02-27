/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps } from "react";

import { useMemo, useState } from "react";
import { cn, tv } from "tailwind-variants";

import type {
  TimeAmPmLabels,
  TimeDisablePredicate,
  TimeFormat,
  TimePresetsData,
} from "./time-picker-types";

import { AmPmControlsList } from "./am-pm-controls-list";
import { TimeControlsList } from "./time-controls-list";
import { TimeGrid } from "./time-grid";
import { TimeInput } from "./time-input";
import { TimePresets } from "./time-presets";
import {
  DEFAULT_TIME_AM_PM_LABELS,
  getTimeStringFromParts,
  parseFormattedTime,
} from "./time-utils";

const timePickerVariants = tv({
  base: "inline-flex w-full max-w-sm flex-col gap-2 rounded-lg border border-border bg-background p-2",
});

const timePickerControlsListGroupVariants = tv({
  base: "grid grid-cols-2 gap-1",
  variants: {
    format: {
      "12h": "grid-cols-3",
      "24h": "grid-cols-2",
    },
    withSeconds: {
      true: "grid-cols-3",
      false: "",
    },
  },
  defaultVariants: {
    format: "24h",
    withSeconds: false,
  },
});

export type TimePickerProps = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  defaultValue?: string;
  interval?: number;
  value?: string;
  format?: TimeFormat;
  withSeconds?: boolean;
  clearable?: boolean;
  allowDeselect?: boolean;
  withControlsList?: boolean;
  reverseTimeControlsList?: boolean;
  minTime?: string;
  maxTime?: string;
  disableTime?: TimeDisablePredicate;
  amPmLabels?: TimeAmPmLabels;
  presets?: TimePresetsData;
  hoursStep?: number;
  minutesStep?: number;
  secondsStep?: number;
  onChange?: (value: string) => void;
};

const TimePicker = ({
  allowDeselect = false,
  amPmLabels = DEFAULT_TIME_AM_PM_LABELS,
  className,
  clearable = false,
  defaultValue,
  disableTime,
  format = "24h",
  hoursStep = 1,
  interval = 30,
  maxTime,
  minTime,
  minutesStep = 1,
  onChange,
  presets,
  reverseTimeControlsList = false,
  secondsStep = 1,
  value,
  withControlsList = false,
  withSeconds = false,
  ...props
}: TimePickerProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? ""
  );
  const resolvedValue = value === undefined ? uncontrolledValue : value;

  const parsedValue = useMemo(
    () =>
      parseFormattedTime({
        amPmLabels,
        format,
        time: resolvedValue,
      }),
    [amPmLabels, format, resolvedValue]
  );

  const emitChange = (nextValue: string) => {
    if (value === undefined) {
      setUncontrolledValue(nextValue);
    }

    onChange?.(nextValue);
  };

  const updateFromControls = (
    partial: Partial<{
      hours: number | null;
      minutes: number | null;
      seconds: number | null;
      amPm: string | null;
    }>
  ) => {
    const nextValues = {
      amPm: format === "12h" ? (parsedValue.amPm ?? amPmLabels.am) : null,
      hours: parsedValue.hours ?? (format === "12h" ? 12 : 0),
      minutes: parsedValue.minutes ?? 0,
      seconds: parsedValue.seconds ?? 0,
      ...partial,
    };

    const nextTime = getTimeStringFromParts({
      ...nextValues,
      amPmLabels,
      format,
      withSeconds,
    });

    if (nextTime.valid) {
      emitChange(nextTime.value);
    }
  };

  return (
    <div
      className={cn(timePickerVariants(), className)}
      data-slot="time-picker"
      {...props}
    >
      <TimeInput
        amPmLabels={amPmLabels}
        clearable={clearable}
        format={format}
        hoursStep={hoursStep}
        max={maxTime}
        min={minTime}
        minutesStep={minutesStep}
        secondsStep={secondsStep}
        value={resolvedValue}
        withSeconds={withSeconds}
        onChange={emitChange}
      />

      {presets ? (
        <TimePresets
          amPmLabels={amPmLabels}
          format={format}
          presets={presets}
          value={resolvedValue}
          withSeconds={withSeconds}
          onChange={emitChange}
        />
      ) : null}

      {withControlsList ? (
        <div
          className={timePickerControlsListGroupVariants({
            format,
            withSeconds,
          })}
        >
          <TimeControlsList
            max={format === "12h" ? 12 : 23}
            min={format === "12h" ? 1 : 0}
            reversed={reverseTimeControlsList}
            step={hoursStep}
            value={parsedValue.hours}
            onSelect={(nextHours) => {
              updateFromControls({ hours: nextHours });
            }}
          />
          <TimeControlsList
            max={59}
            min={0}
            reversed={reverseTimeControlsList}
            step={minutesStep}
            value={parsedValue.minutes}
            onSelect={(nextMinutes) => {
              updateFromControls({ minutes: nextMinutes });
            }}
          />
          {withSeconds ? (
            <TimeControlsList
              max={59}
              min={0}
              reversed={reverseTimeControlsList}
              step={secondsStep}
              value={parsedValue.seconds}
              onSelect={(nextSeconds) => {
                updateFromControls({ seconds: nextSeconds });
              }}
            />
          ) : null}
          {format === "12h" ? (
            <AmPmControlsList
              labels={amPmLabels}
              value={parsedValue.amPm}
              onSelect={(nextAmPm) => {
                updateFromControls({ amPm: nextAmPm });
              }}
            />
          ) : null}
        </div>
      ) : (
        <TimeGrid
          allowDeselect={allowDeselect}
          amPmLabels={amPmLabels}
          disableTime={disableTime}
          format={format}
          interval={interval}
          maxTime={maxTime}
          minTime={minTime}
          value={resolvedValue === "" ? null : resolvedValue}
          withSeconds={withSeconds}
          onChange={(nextValue) => {
            emitChange(nextValue ?? "");
          }}
        />
      )}
    </div>
  );
};

export { TimePicker };
