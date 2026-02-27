import type { DateAdapter } from "../../adapter";
import type {
  TimeAmPmLabels,
  TimeFormat,
  TimePasteSplitInput,
  TimePasteSplitReturn,
} from "./time-picker-types";
import type { TimeParts } from "./time-types";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const normalizePart = (value: string) => {
  if (!/^\d+$/.test(value.trim())) {
    return Number.NaN;
  }

  return Number(value);
};

const toTwoDigits = (value: number) => value.toString().padStart(2, "0");

const defaultTimeString = (withSeconds: boolean) =>
  withSeconds ? "00:00:00" : "00:00";

export const DEFAULT_TIME_AM_PM_LABELS: TimeAmPmLabels = {
  am: "AM",
  pm: "PM",
};

export const padTime = (value: number): string =>
  value < 10 ? `0${value}` : `${value}`;

export const defaultTimeParts: TimeParts = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export const parseTimeValue = (
  value: string | undefined,
  withSeconds: boolean
): TimeParts => {
  if (!value) {
    return defaultTimeParts;
  }

  const [hoursToken, minutesToken, secondsToken] = value.split(":");
  const parsedHours = clamp(normalizePart(hoursToken ?? ""), 0, 23);
  const parsedMinutes = clamp(normalizePart(minutesToken ?? ""), 0, 59);
  const parsedSeconds = clamp(normalizePart(secondsToken ?? ""), 0, 59);

  return {
    hours: Number.isFinite(parsedHours) ? parsedHours : 0,
    minutes: Number.isFinite(parsedMinutes) ? parsedMinutes : 0,
    seconds: withSeconds && Number.isFinite(parsedSeconds) ? parsedSeconds : 0,
  };
};

const parseSplitPart = (value: string | undefined): number | null => {
  if (!value || value.trim() === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

export const splitTimeString = (
  timeString: string
): {
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
} => {
  if (timeString.trim() === "") {
    return { hours: null, minutes: null, seconds: null };
  }

  const [hoursToken, minutesToken, secondsToken] = timeString.split(":");

  return {
    hours: parseSplitPart(hoursToken),
    minutes: parseSplitPart(minutesToken),
    seconds: parseSplitPart(secondsToken),
  };
};

export const formatTimeValue = (
  parts: TimeParts,
  withSeconds: boolean
): string => {
  if (withSeconds) {
    return `${toTwoDigits(parts.hours)}:${toTwoDigits(parts.minutes)}:${toTwoDigits(
      parts.seconds
    )}`;
  }

  return `${toTwoDigits(parts.hours)}:${toTwoDigits(parts.minutes)}`;
};

export const normalizeTimeValue = (
  value: string | undefined,
  withSeconds: boolean
): string => formatTimeValue(parseTimeValue(value, true), withSeconds);

export const getTimeFromDateTimeString = (
  dateTimeValue: string | undefined,
  withSeconds: boolean
): string => {
  if (!dateTimeValue) {
    return defaultTimeString(withSeconds);
  }

  const timeToken =
    dateTimeValue.trim().split(/[ T]/)[1] ?? dateTimeValue.trim().split("T")[1];

  if (!timeToken) {
    return defaultTimeString(withSeconds);
  }

  return normalizeTimeValue(timeToken, withSeconds);
};

export const getAdapterTimeParts = (
  adapter: DateAdapter,
  value: Date
): TimeParts => ({
  hours: adapter.getHours(value),
  minutes: adapter.getMinutes(value),
  seconds: adapter.getSeconds(value),
});

export const formatAdapterTime = (
  adapter: DateAdapter,
  value: Date,
  withSeconds: boolean
): string => formatTimeValue(getAdapterTimeParts(adapter, value), withSeconds);

export const convertTimeTo12HourFormat = ({
  hours,
  minutes,
  seconds,
  amPmLabels,
}: {
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
  amPmLabels: TimeAmPmLabels;
}): TimePasteSplitReturn => {
  if (hours === null) {
    return { hours: null, minutes: null, seconds: null, amPm: null };
  }

  const amPm = hours >= 12 ? amPmLabels.pm : amPmLabels.am;
  const hours12 = hours % 12 === 0 ? 12 : hours % 12;

  return {
    hours: hours12,
    minutes: typeof minutes === "number" ? minutes : null,
    seconds: typeof seconds === "number" ? seconds : null,
    amPm,
  };
};

export const parseFormattedTime = ({
  amPmLabels,
  format,
  time,
}: TimePasteSplitInput): TimePasteSplitReturn => {
  if (time.trim() === "") {
    return { hours: null, minutes: null, seconds: null, amPm: null };
  }

  const parsed = splitTimeString(time);

  if (format === "12h") {
    return convertTimeTo12HourFormat({
      amPmLabels,
      hours: parsed.hours,
      minutes: parsed.minutes,
      seconds: parsed.seconds,
    });
  }

  return {
    ...parsed,
    amPm: null,
  };
};

export const getTimeStringFromParts = ({
  amPm,
  amPmLabels,
  format,
  hours,
  minutes,
  seconds,
  withSeconds,
}: {
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
  format: TimeFormat;
  withSeconds: boolean;
  amPm: string | null;
  amPmLabels: TimeAmPmLabels;
}): {
  valid: boolean;
  value: string;
} => {
  if (hours === null || minutes === null) {
    return { valid: false, value: "" };
  }

  if (withSeconds && seconds === null) {
    return { valid: false, value: "" };
  }

  if (format === "24h") {
    return {
      valid: true,
      value: `${padTime(clamp(hours, 0, 23))}:${padTime(clamp(minutes, 0, 59))}${withSeconds ? `:${padTime(clamp(seconds ?? 0, 0, 59))}` : ""}`,
    };
  }

  if (amPm === null) {
    return { valid: false, value: "" };
  }

  let resolvedHours = hours === 0 ? 12 : clamp(hours, 1, 12);

  if (amPm === amPmLabels.pm && resolvedHours !== 12) {
    resolvedHours += 12;
  } else if (amPm === amPmLabels.am && resolvedHours === 12) {
    resolvedHours = 0;
  }

  return {
    valid: true,
    value: `${padTime(resolvedHours)}:${padTime(clamp(minutes, 0, 59))}${withSeconds ? `:${padTime(clamp(seconds ?? 0, 0, 59))}` : ""}`,
  };
};

export const formatTimeForDisplay = ({
  amPmLabels,
  format,
  value,
  withSeconds,
}: {
  value: string | Date;
  format: TimeFormat;
  amPmLabels: TimeAmPmLabels;
  withSeconds: boolean;
}): string | null => {
  const parsed = splitTimeString(
    typeof value === "string"
      ? value
      : `${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`
  );

  if (parsed.hours === null || parsed.minutes === null) {
    return null;
  }

  const seconds = parsed.seconds ?? 0;

  if (format === "24h") {
    return `${padTime(clamp(parsed.hours, 0, 23))}:${padTime(
      clamp(parsed.minutes, 0, 59)
    )}${withSeconds ? `:${padTime(clamp(seconds, 0, 59))}` : ""}`;
  }

  const isPm = parsed.hours >= 12;
  const hours12 = parsed.hours % 12 === 0 ? 12 : parsed.hours % 12;

  return `${hours12}:${padTime(clamp(parsed.minutes, 0, 59))}${withSeconds ? `:${padTime(clamp(seconds, 0, 59))}` : ""} ${isPm ? amPmLabels.pm : amPmLabels.am}`;
};

export const getTimeString = (
  hours: number | null,
  minutes: number | null,
  seconds: number | null,
  withSeconds: boolean
): {
  valid: boolean;
  value: string;
} => {
  if (hours === null || minutes === null) {
    return { valid: false, value: "" };
  }

  if (withSeconds && seconds === null) {
    return { valid: false, value: "" };
  }

  return {
    valid: true,
    value: `${padTime(hours)}:${padTime(minutes)}${withSeconds ? `:${padTime(seconds ?? 0)}` : ""}`,
  };
};

export const getParsedTime = (
  time: string,
  withSeconds: boolean
): {
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
} => {
  if (time.trim() === "") {
    return { hours: null, minutes: null, seconds: null };
  }

  const parsed = splitTimeString(time);
  if (!withSeconds) {
    return {
      hours: parsed.hours,
      minutes: parsed.minutes,
      seconds: null,
    };
  }

  return parsed;
};

export const cycleTimePart = (
  value: number,
  step: number,
  min: number,
  max: number
): number => {
  const size = max - min + 1;
  const next = value + step;

  if (next > max) {
    const overflow = (next - min) % size;
    return min + overflow;
  }

  if (next < min) {
    const underflow = (min - next) % size;
    return underflow === 0 ? min : max - underflow + 1;
  }

  return next;
};

export const timeToSeconds = (timeValue: string): number => {
  const parsed = parseTimeValue(timeValue, true);

  return parsed.hours * 3600 + parsed.minutes * 60 + parsed.seconds;
};

export const secondsToTime = (
  valueInSeconds: number
): {
  hours: number;
  minutes: number;
  seconds: number;
  timeString: string;
} => {
  const hours = Math.floor(valueInSeconds / 3600);
  const minutes = Math.floor((valueInSeconds % 3600) / 60);
  const seconds = valueInSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
    timeString: `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`,
  };
};

export const clampTime = (
  time: string,
  min: string | undefined,
  max: string | undefined
) => {
  const seconds = timeToSeconds(time);
  const minSeconds = min ? timeToSeconds(min) : Number.NEGATIVE_INFINITY;
  const maxSeconds = max ? timeToSeconds(max) : Number.POSITIVE_INFINITY;

  return secondsToTime(Math.max(minSeconds, Math.min(seconds, maxSeconds)));
};

export const isSameTime = ({
  time,
  compare,
  withSeconds,
}: {
  time: string;
  compare: string;
  withSeconds: boolean;
}): boolean => {
  const left = splitTimeString(time);
  const right = splitTimeString(compare);

  if (withSeconds) {
    return (
      left.hours === right.hours &&
      left.minutes === right.minutes &&
      left.seconds === right.seconds
    );
  }

  return left.hours === right.hours && left.minutes === right.minutes;
};

export const getTimeRange = ({
  endTime,
  interval,
  startTime,
}: {
  endTime: string;
  interval: string;
  startTime: string;
}): string[] => {
  const range: string[] = [];
  const startSeconds = timeToSeconds(startTime);
  const endSeconds = timeToSeconds(endTime);
  const intervalSeconds = timeToSeconds(interval);

  if (intervalSeconds <= 0) {
    return range;
  }

  for (
    let currentSeconds = startSeconds;
    currentSeconds <= endSeconds;
    currentSeconds += intervalSeconds
  ) {
    range.push(secondsToTime(currentSeconds).timeString);
  }

  return range;
};

export const getTimeRangeFromInterval = ({
  interval,
  withSeconds,
}: {
  interval: number;
  withSeconds: boolean;
}): string[] => {
  if (!Number.isFinite(interval) || interval <= 0) {
    return [];
  }

  const range: string[] = [];

  for (let totalMinutes = 0; totalMinutes < 24 * 60; totalMinutes += interval) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    range.push(
      withSeconds
        ? `${padTime(hours)}:${padTime(minutes)}:00`
        : `${padTime(hours)}:${padTime(minutes)}`
    );
  }

  return range;
};

export const formatTimeForView = (
  value: string | undefined,
  withSeconds: boolean
): string => formatTimeValue(parseTimeValue(value, withSeconds), withSeconds);
