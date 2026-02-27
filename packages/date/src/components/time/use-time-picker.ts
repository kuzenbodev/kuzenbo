import type { ClipboardEvent } from "react";

import { useEffect, useRef, useState } from "react";

import type {
  TimeAmPmLabels,
  TimeFormat,
  TimePasteSplit,
} from "./time-picker-types";

import {
  clampTime,
  DEFAULT_TIME_AM_PM_LABELS,
  getTimeStringFromParts,
  parseFormattedTime,
} from "./utils/time-utils";

interface UseTimePickerInput {
  value: string | undefined;
  defaultValue: string | undefined;
  format: TimeFormat;
  amPmLabels: TimeAmPmLabels | undefined;
  withSeconds: boolean;
  min: string | undefined;
  max: string | undefined;
  readOnly: boolean | undefined;
  disabled: boolean | undefined;
  clearable: boolean | undefined;
  pasteSplit: TimePasteSplit | undefined;
  onChange: ((value: string) => void) | undefined;
}

type TimeField = "hours" | "minutes" | "seconds" | "amPm";

interface ParsedTimeState {
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
  amPm: string | null;
}

const resolveLabels = (labels: TimeAmPmLabels | undefined): TimeAmPmLabels =>
  labels ?? DEFAULT_TIME_AM_PM_LABELS;

export const useTimePicker = ({
  amPmLabels,
  clearable,
  defaultValue,
  disabled,
  format,
  max,
  min,
  onChange,
  pasteSplit,
  readOnly,
  value,
  withSeconds,
}: UseTimePickerInput) => {
  const resolvedLabels = resolveLabels(amPmLabels);
  const parsedTime = parseFormattedTime({
    amPmLabels: resolvedLabels,
    format,
    time: value ?? defaultValue ?? "",
  });

  const initialTimeString = getTimeStringFromParts({
    ...parsedTime,
    amPmLabels: resolvedLabels,
    format,
    withSeconds,
  });

  const acceptChange = useRef(true);
  const wasInvalidBefore = useRef(!initialTimeString.valid);

  const [hours, setHours] = useState<number | null>(parsedTime.hours);
  const [minutes, setMinutes] = useState<number | null>(parsedTime.minutes);
  const [seconds, setSeconds] = useState<number | null>(parsedTime.seconds);
  const [amPm, setAmPm] = useState<string | null>(parsedTime.amPm);

  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);
  const amPmRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  const applyValues = (nextValues: ParsedTimeState) => {
    setHours(nextValues.hours);
    setMinutes(nextValues.minutes);
    setSeconds(nextValues.seconds);
    setAmPm(nextValues.amPm);
  };

  const focus = (field: TimeField) => {
    if (field === "hours") {
      hoursRef.current?.focus();
      return;
    }

    if (field === "minutes") {
      minutesRef.current?.focus();
      return;
    }

    if (field === "seconds") {
      secondsRef.current?.focus();
      return;
    }

    amPmRef.current?.focus();
  };

  const emitChange = (nextValues: ParsedTimeState) => {
    const timeString = getTimeStringFromParts({
      ...nextValues,
      amPmLabels: resolvedLabels,
      format,
      withSeconds,
    });

    if (timeString.valid) {
      acceptChange.current = false;
      wasInvalidBefore.current = false;
      onChange?.(timeString.value);
      return;
    }

    acceptChange.current = false;

    if (!wasInvalidBefore.current) {
      onChange?.("");
      wasInvalidBefore.current = true;
    }
  };

  const setField = (field: TimeField, fieldValue: number | string | null) => {
    const nextValues: ParsedTimeState = {
      amPm: field === "amPm" ? (fieldValue as string | null) : amPm,
      hours: field === "hours" ? (fieldValue as number | null) : hours,
      minutes: field === "minutes" ? (fieldValue as number | null) : minutes,
      seconds: field === "seconds" ? (fieldValue as number | null) : seconds,
    };

    applyValues(nextValues);
    emitChange(nextValues);
  };

  const setTimeString = (timeString: string) => {
    acceptChange.current = false;

    const parsed = parseFormattedTime({
      amPmLabels: resolvedLabels,
      format,
      time: timeString,
    });

    applyValues(parsed);

    const normalized = getTimeStringFromParts({
      ...parsed,
      amPmLabels: resolvedLabels,
      format,
      withSeconds,
    });

    wasInvalidBefore.current = !normalized.valid;
    onChange?.(normalized.valid ? normalized.value : "");
  };

  const onHoursChange = (nextValue: number | null) => {
    let adjustedValue = nextValue;

    if (format === "12h" && typeof nextValue === "number" && nextValue > 12) {
      adjustedValue = ((nextValue - 1) % 12) + 1;
    }

    setField("hours", adjustedValue);
    focus("hours");
  };

  const onMinutesChange = (nextValue: number | null) => {
    setField("minutes", nextValue);
    focus("minutes");
  };

  const onSecondsChange = (nextValue: number | null) => {
    setField("seconds", nextValue);
    focus("seconds");
  };

  const onAmPmChange = (nextValue: string | null) => {
    setField("amPm", nextValue);
    focus("amPm");
  };

  const clear = () => {
    const nextValues: ParsedTimeState = {
      amPm: null,
      hours: null,
      minutes: null,
      seconds: null,
    };

    acceptChange.current = false;
    applyValues(nextValues);
    onChange?.("");
    wasInvalidBefore.current = true;
    focus("hours");
  };

  const onPaste = (
    event: ClipboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (readOnly || disabled) {
      return;
    }

    event.preventDefault();

    const pastedValue = event.clipboardData.getData("text");
    const parsed = (pasteSplit ?? parseFormattedTime)({
      amPmLabels: resolvedLabels,
      format,
      time: pastedValue,
    });

    const timeString = getTimeStringFromParts({
      ...parsed,
      amPmLabels: resolvedLabels,
      format,
      withSeconds,
    });

    if (!timeString.valid) {
      return;
    }

    const clamped = clampTime(
      timeString.value,
      min ?? "00:00:00",
      max ?? "23:59:59"
    );

    setTimeString(clamped.timeString);
  };

  const isClearable =
    clearable &&
    !readOnly &&
    !disabled &&
    (hours !== null || minutes !== null || seconds !== null || amPm !== null);

  const hiddenInputValue = getTimeStringFromParts({
    amPm,
    amPmLabels: resolvedLabels,
    format,
    hours,
    minutes,
    seconds,
    withSeconds,
  }).value;

  useEffect(() => {
    if (value === undefined) {
      return;
    }

    if (value === "") {
      acceptChange.current = false;
      applyValues({ amPm: null, hours: null, minutes: null, seconds: null });
      wasInvalidBefore.current = true;
      acceptChange.current = true;
      return;
    }

    if (acceptChange.current && typeof value === "string") {
      const parsed = parseFormattedTime({
        amPmLabels: resolvedLabels,
        format,
        time: value,
      });

      applyValues(parsed);
    }

    acceptChange.current = true;
  }, [format, resolvedLabels.am, resolvedLabels.pm, value]);

  return {
    clear,
    focus,
    hiddenInputValue,
    isClearable,
    onPaste,
    refs: {
      amPm: amPmRef,
      hours: hoursRef,
      minutes: minutesRef,
      seconds: secondsRef,
    },
    setAmPm: onAmPmChange,
    setHours: onHoursChange,
    setMinutes: onMinutesChange,
    setSeconds: onSecondsChange,
    setTimeString,
    values: {
      amPm,
      hours,
      minutes,
      seconds,
    },
  };
};
