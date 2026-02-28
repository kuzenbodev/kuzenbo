import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ActionIcon } from "@kuzenbo/core/ui/action-icon";
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import type { ComponentProps } from "react";
import { useEffect, useMemo, useState } from "react";

import { DatePicker } from "../pickers/date-picker";
import { useDatesContext } from "../use-dates-context";
import { HiddenDatesInput } from "./hidden-dates-input";
import { PickerInputBase } from "./picker-input-base";
import { dateStringParser } from "./utils/date-string-parser";
import { isDateValid } from "./utils/is-date-valid";

export type DateInputProps = Omit<
  ComponentProps<typeof PickerInputBase>,
  "defaultValue" | "onValueChange" | "value"
> & {
  allowDeselect?: boolean;
  ariaLabels?: ComponentProps<typeof DatePicker>["ariaLabels"];
  clearable?: boolean;
  defaultMonth?: ComponentProps<typeof DatePicker>["defaultMonth"];
  defaultValue?: Date | null;
  excludeDate?: ComponentProps<typeof DatePicker>["excludeDate"];
  firstDayOfWeek?: ComponentProps<typeof DatePicker>["firstDayOfWeek"];
  getDayAriaLabel?: ComponentProps<typeof DatePicker>["getDayAriaLabel"];
  hideOutsideDates?: ComponentProps<typeof DatePicker>["hideOutsideDates"];
  hideWeekdays?: ComponentProps<typeof DatePicker>["hideWeekdays"];
  maxDate?: Date | null;
  minDate?: Date | null;
  monthLabelFormat?: ComponentProps<typeof DatePicker>["monthLabelFormat"];
  nextLabel?: ComponentProps<typeof DatePicker>["nextLabel"];
  previousLabel?: ComponentProps<typeof DatePicker>["previousLabel"];
  value?: Date | null;
  weekdayFormat?: ComponentProps<typeof DatePicker>["weekdayFormat"];
  weekendDays?: ComponentProps<typeof DatePicker>["weekendDays"];
  onChange?: (value: Date | null) => void;
};

const DateInput = ({
  allowDeselect,
  ariaLabels,
  clearable = false,
  defaultMonth,
  defaultValue,
  excludeDate,
  firstDayOfWeek,
  form,
  getDayAriaLabel,
  hideOutsideDates,
  hideWeekdays,
  maxDate,
  minDate,
  monthLabelFormat,
  name,
  nextLabel,
  opened,
  previousLabel,
  readOnly,
  disabled,
  value,
  onBlur,
  onClick,
  onChange,
  onFocus,
  onKeyDown,
  onOpenedChange,
  weekdayFormat,
  weekendDays,
  ...props
}: DateInputProps) => {
  const { adapter } = useDatesContext();
  const [uncontrolledDate, setUncontrolledDate] = useState<Date | null>(
    defaultValue ?? null
  );
  const [uncontrolledOpened, setUncontrolledOpened] = useState(false);

  const resolvedDate = value === undefined ? uncontrolledDate : value;
  const resolvedOpened = opened === undefined ? uncontrolledOpened : opened;
  const disabledOpenState = Boolean(readOnly || disabled);
  const formattedDate = useMemo(
    () => (resolvedDate ? (adapter.toISODate(resolvedDate) ?? "") : ""),
    [adapter, resolvedDate]
  );
  const [textValue, setTextValue] = useState(formattedDate);

  useEffect(() => {
    setTextValue(formattedDate);
  }, [formattedDate]);

  const setResolvedOpened = (nextOpened: boolean) => {
    const normalizedOpened = disabledOpenState ? false : nextOpened;

    if (opened === undefined) {
      setUncontrolledOpened(normalizedOpened);
    }

    onOpenedChange?.(normalizedOpened);
  };

  const setResolvedDate = (nextDate: Date | null) => {
    if (value === undefined) {
      setUncontrolledDate(nextDate);
    }

    onChange?.(nextDate);
  };

  const commitInputValue = (nextTextValue: string) => {
    const trimmedValue = nextTextValue.trim();

    if (!trimmedValue) {
      setResolvedDate(null);
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

    setTextValue(normalizedValue ?? trimmedValue);
    setResolvedDate(parsedDate);
  };

  return (
    <>
      <div className="relative w-full">
        <PickerInputBase
          {...props}
          disabled={disabled}
          form={form}
          dropdown={
            <DatePicker
              allowDeselect={allowDeselect}
              ariaLabels={ariaLabels}
              defaultMonth={defaultMonth}
              excludeDate={excludeDate}
              firstDayOfWeek={firstDayOfWeek}
              getDayAriaLabel={getDayAriaLabel}
              hideOutsideDates={hideOutsideDates}
              hideWeekdays={hideWeekdays}
              maxDate={maxDate ?? undefined}
              minDate={minDate ?? undefined}
              monthLabelFormat={monthLabelFormat}
              nextLabel={nextLabel}
              previousLabel={previousLabel}
              value={resolvedDate}
              weekdayFormat={weekdayFormat}
              weekendDays={weekendDays}
              onChange={(nextValue) => {
                setResolvedDate((nextValue as Date | null) ?? null);
                setResolvedOpened(false);
              }}
            />
          }
          name={undefined}
          opened={resolvedOpened}
          readOnly={readOnly}
          value={textValue}
          onBlur={(event) => {
            commitInputValue(event.currentTarget.value);
            onBlur?.(event);
          }}
          onClick={(event) => {
            setResolvedOpened(true);
            onClick?.(event);
          }}
          onFocus={(event) => {
            setResolvedOpened(true);
            onFocus?.(event);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              commitInputValue(event.currentTarget.value);
            }

            onKeyDown?.(event);
          }}
          onOpenedChange={setResolvedOpened}
          onValueChange={setTextValue}
        />
        {clearable && resolvedDate && !disabled && !readOnly ? (
          <ActionIcon
            aria-label="Clear date"
            className="text-muted-foreground hover:bg-muted hover:text-foreground absolute top-1/2 right-8 z-10 h-7 w-7 -translate-y-1/2 rounded-md border border-transparent p-0"
            data-slot="date-input-clear-button"
            size="xs"
            type="button"
            variant="ghost"
            onClick={(event) => {
              event.stopPropagation();
              setTextValue("");
              setResolvedDate(null);
              setResolvedOpened(false);
            }}
            onMouseDown={(event) => {
              event.preventDefault();
            }}
          >
            <HugeiconsIcon
              aria-hidden="true"
              className="size-3"
              icon={Cancel01Icon}
              strokeWidth={2}
            />
          </ActionIcon>
        ) : null}
      </div>
      {name ? (
        <HiddenDatesInput
          form={form}
          name={name}
          selectionMode="single"
          value={resolvedDate}
        />
      ) : null}
    </>
  );
};

export { DateInput };
