/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps } from "react";
import { useEffect, useMemo, useState } from "react";
import { cn, tv } from "tailwind-variants";

import { useDatesContext as useCoreDatesContext } from "../context";
import { DatePickerInput } from "./inputs/date-picker-input";
import { TimeInput } from "./time/time-input";
import { getMaxTime, getMinTime } from "./time/utils/get-min-max-time";
import {
  clampTime,
  formatTimeValue,
  getTimeFromDateTimeString,
  parseTimeValue,
} from "./time/utils/time-utils";
import { useDatesContext } from "./use-dates-context";

const dateTimePickerVariants = tv({
  base: "inline-flex w-full flex-col gap-2",
});

export type DateTimePickerProps = Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  defaultValue?: Date | null;
  maxDate?: Date | null;
  minDate?: Date | null;
  name?: string;
  value?: Date | null;
  withSeconds?: boolean;
  onChange?: (value: Date | null) => void;
};

const DateTimePicker = ({
  className,
  defaultValue,
  maxDate,
  minDate,
  name,
  value,
  withSeconds = false,
  onChange,
  ...props
}: DateTimePickerProps) => {
  const { adapter } = useDatesContext();
  const coreDatesContext = useCoreDatesContext();
  const coreAdapter = coreDatesContext.adapter;

  const [uncontrolledValue, setUncontrolledValue] = useState<Date | null>(
    defaultValue ?? null
  );
  const resolvedValue = value === undefined ? uncontrolledValue : value;

  const serializedResolvedValue = useMemo(
    () =>
      resolvedValue ? (coreAdapter.toDateTimeString(resolvedValue) ?? "") : "",
    [coreAdapter, resolvedValue]
  );

  const resolvedDate = useMemo(
    () => (resolvedValue ? adapter.startOfDay(resolvedValue) : null),
    [adapter, resolvedValue]
  );

  const resolvedTime = useMemo(
    () => getTimeFromDateTimeString(serializedResolvedValue, withSeconds),
    [serializedResolvedValue, withSeconds]
  );

  const [draftDate, setDraftDate] = useState<Date | null>(resolvedDate);
  const [draftTime, setDraftTime] = useState<string>(resolvedTime);

  useEffect(() => {
    setDraftDate(resolvedDate);
    setDraftTime(resolvedTime);
  }, [resolvedDate, resolvedTime]);

  const draftMinTime = useMemo(
    () =>
      getMinTime({
        adapter,
        minDate: minDate ?? undefined,
        value: draftDate,
      }),
    [adapter, draftDate, minDate]
  );

  const draftMaxTime = useMemo(
    () =>
      getMaxTime({
        adapter,
        maxDate: maxDate ?? undefined,
        value: draftDate,
      }),
    [adapter, draftDate, maxDate]
  );

  const getBoundedTime = (nextDate: Date, nextTime: string) => {
    const parsedTime = parseTimeValue(nextTime, withSeconds);
    const normalizedTime = formatTimeValue(parsedTime, true);
    const minTime = getMinTime({
      adapter,
      minDate: minDate ?? undefined,
      value: nextDate,
    });
    const maxTime = getMaxTime({
      adapter,
      maxDate: maxDate ?? undefined,
      value: nextDate,
    });
    const clampedTime = clampTime(normalizedTime, minTime, maxTime);
    const clampedParts = parseTimeValue(clampedTime.timeString, true);

    return {
      normalizedTime: formatTimeValue(clampedParts, true),
      parsedTime: clampedParts,
      viewTime: formatTimeValue(clampedParts, withSeconds),
    };
  };

  const commitValue = (nextDate: Date | null, nextTime: string) => {
    if (!nextDate) {
      if (value === undefined) {
        setUncontrolledValue(null);
      }

      onChange?.(null);
      return;
    }

    const boundedTime = getBoundedTime(nextDate, nextTime);

    if (boundedTime.viewTime !== nextTime) {
      setDraftTime(boundedTime.viewTime);
    }

    const normalizedDate = coreAdapter.toDateString(nextDate);

    const assignedDateTime = normalizedDate
      ? coreAdapter.assignTime(normalizedDate, boundedTime.normalizedTime)
      : null;

    const parsedDateTime = assignedDateTime
      ? coreAdapter.parse(assignedDateTime)
      : null;

    const fallbackDateTime = adapter.setTime(
      nextDate,
      boundedTime.parsedTime.hours,
      boundedTime.parsedTime.minutes,
      boundedTime.parsedTime.seconds
    );

    const nextDateTime = parsedDateTime ?? fallbackDateTime;

    if (value === undefined) {
      setUncontrolledValue(nextDateTime);
    }

    onChange?.(nextDateTime);
  };

  return (
    <div
      className={cn(dateTimePickerVariants(), className)}
      data-slot="date-time-picker"
      {...props}
    >
      <DatePickerInput
        selectionMode="single"
        value={draftDate}
        onChange={(nextValue) => {
          const nextDate = (nextValue as Date | null) ?? null;
          setDraftDate(nextDate);
          commitValue(nextDate, draftTime);
        }}
      />
      <TimeInput
        name={name ? `${name}Time` : undefined}
        max={draftMaxTime}
        min={draftMinTime}
        value={draftTime}
        withSeconds={withSeconds}
        onChange={(nextTime) => {
          setDraftTime(nextTime);
          commitValue(draftDate, nextTime);
        }}
      />
      {name ? (
        <input name={name} type="hidden" value={serializedResolvedValue} />
      ) : null}
    </div>
  );
};

export { DateTimePicker };
