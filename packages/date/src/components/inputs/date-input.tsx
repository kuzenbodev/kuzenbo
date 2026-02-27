/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps } from "react";

import { useEffect, useMemo, useState } from "react";

import { useDatesContext } from "../use-dates-context";
import { dateStringParser } from "./date-string-parser";
import { isDateValid } from "./is-date-valid";
import { PickerInputBase } from "./picker-input-base";

export type DateInputProps = Omit<
  ComponentProps<typeof PickerInputBase>,
  "value" | "onValueChange"
> & {
  defaultValue?: Date | null;
  maxDate?: Date | null;
  minDate?: Date | null;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
};

const DateInput = ({
  defaultValue,
  maxDate,
  minDate,
  value,
  onBlur,
  onChange,
  onKeyDown,
  ...props
}: DateInputProps) => {
  const { adapter } = useDatesContext();
  const [uncontrolledDate, setUncontrolledDate] = useState<Date | null>(
    defaultValue ?? null
  );

  const resolvedDate = value ?? uncontrolledDate;
  const formattedDate = useMemo(
    () => (resolvedDate ? (adapter.toISODate(resolvedDate) ?? "") : ""),
    [adapter, resolvedDate]
  );
  const [textValue, setTextValue] = useState(formattedDate);

  useEffect(() => {
    setTextValue(formattedDate);
  }, [formattedDate]);

  const commitInputValue = (nextTextValue: string) => {
    const trimmedValue = nextTextValue.trim();

    if (!trimmedValue) {
      if (value === undefined) {
        setUncontrolledDate(null);
      }

      onChange?.(null);
      return;
    }

    const normalizedValue = dateStringParser(adapter, trimmedValue);
    const parsedDate = normalizedValue
      ? adapter.parseISODate(normalizedValue)
      : null;

    if (
      !parsedDate ||
      !isDateValid({
        adapter,
        date: parsedDate,
        maxDate,
        minDate,
      })
    ) {
      setTextValue(formattedDate);
      return;
    }

    if (value === undefined) {
      setUncontrolledDate(parsedDate);
    }

    onChange?.(parsedDate);
  };

  return (
    <PickerInputBase
      {...props}
      value={textValue}
      onBlur={(event) => {
        commitInputValue(event.currentTarget.value);
        onBlur?.(event);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          commitInputValue(event.currentTarget.value);
        }

        onKeyDown?.(event);
      }}
      onValueChange={setTextValue}
    />
  );
};

export { DateInput };
