"use client";

import { useCallback, useMemo, useState } from "react";

import type { DateAdapter } from "../adapter";
import { useDatesContext } from "../context";
import type { DatePickerValue, DateSelectionMode } from "../types";
import type { DateFormatter } from "../utils";
import { getFormattedDate, resolveDateSelectionMode } from "../utils";
import { useUncontrolledDates } from "./use-uncontrolled-dates";

interface UseDatesInputInput<Mode extends DateSelectionMode = "single"> {
  adapter?: DateAdapter;
  closeOnChange?: boolean;
  defaultValue?: DatePickerValue<Mode>;
  format?: string;
  labelSeparator?: string;
  locale?: string;
  onChange?: ((value: DatePickerValue<Mode, string>) => void) | undefined;
  selectionMode?: Mode;
  sortDates?: boolean;
  value?: DatePickerValue<Mode>;
  valueFormatter?: DateFormatter;
  withTime?: boolean;
}

interface DisclosureHandlers {
  close: () => void;
  open: () => void;
  toggle: () => void;
}

export const useDatesInput = <Mode extends DateSelectionMode = "single">({
  adapter,
  closeOnChange,
  defaultValue,
  format = "yyyy-MM-dd",
  labelSeparator,
  locale,
  onChange,
  selectionMode,
  sortDates,
  value,
  valueFormatter,
  withTime = false,
}: UseDatesInputInput<Mode>) => {
  const context = useDatesContext();
  const resolvedSelectionMode = resolveDateSelectionMode(selectionMode);

  const resolvedAdapter =
    adapter ??
    context.getAdapter({
      locale: context.getLocale(locale),
      timeZone: context.getTimeZone(),
    });

  const [dropdownOpened, setDropdownOpened] = useState(false);

  const dropdownHandlers = useMemo<DisclosureHandlers>(
    () => ({
      close: () => {
        setDropdownOpened(false);
      },
      open: () => {
        setDropdownOpened(true);
      },
      toggle: () => {
        setDropdownOpened((opened) => !opened);
      },
    }),
    []
  );

  const [_value, _setValue] = useUncontrolledDates<Mode>({
    adapter: resolvedAdapter,
    defaultValue,
    onChange,
    selectionMode,
    value,
    withTime,
  });

  const formattedValue = useMemo(
    () =>
      getFormattedDate({
        adapter: resolvedAdapter,
        date: _value,
        format,
        formatter: valueFormatter,
        labelSeparator: context.getLabelSeparator(labelSeparator),
        locale: context.getLocale(locale),
        selectionMode: resolvedSelectionMode,
      }),
    [
      _value,
      context,
      format,
      labelSeparator,
      locale,
      resolvedAdapter,
      resolvedSelectionMode,
      valueFormatter,
    ]
  );

  const setValue = useCallback(
    (nextValue: DatePickerValue<Mode>) => {
      if (closeOnChange) {
        if (resolvedSelectionMode === "single") {
          dropdownHandlers.close();
        }

        if (
          resolvedSelectionMode === "range" &&
          Array.isArray(nextValue) &&
          nextValue[0] &&
          nextValue[1]
        ) {
          dropdownHandlers.close();
        }
      }

      if (
        sortDates &&
        resolvedSelectionMode === "multiple" &&
        Array.isArray(nextValue)
      ) {
        const sortedValue = [...nextValue];
        for (let index = 1; index < sortedValue.length; index += 1) {
          const currentValue = sortedValue[index];
          if (currentValue === undefined) {
            continue;
          }

          let sortedIndex = index - 1;

          while (sortedIndex >= 0) {
            const comparedValue = sortedValue[sortedIndex];
            if (
              comparedValue === undefined ||
              resolvedAdapter.compare(comparedValue, currentValue, "day") <= 0
            ) {
              break;
            }

            sortedValue[sortedIndex + 1] = comparedValue;
            sortedIndex -= 1;
          }

          sortedValue[sortedIndex + 1] = currentValue;
        }

        _setValue(sortedValue as DatePickerValue<Mode>);
        return;
      }

      _setValue(nextValue);
    },
    [
      closeOnChange,
      dropdownHandlers,
      resolvedAdapter,
      resolvedSelectionMode,
      sortDates,
      _setValue,
    ]
  );

  const onClear = useCallback(() => {
    if (resolvedSelectionMode === "range") {
      setValue([null, null] as DatePickerValue<Mode>);
      return;
    }

    if (resolvedSelectionMode === "multiple") {
      setValue([] as unknown as DatePickerValue<Mode>);
      return;
    }

    setValue(null as DatePickerValue<Mode>);
  }, [resolvedSelectionMode, setValue]);

  let shouldClear = _value !== null;

  if (resolvedSelectionMode === "range") {
    shouldClear = Boolean(Array.isArray(_value) && _value[0]);
  } else if (resolvedSelectionMode === "multiple") {
    shouldClear = Array.isArray(_value) && _value.length > 0;
  }

  return {
    _value,
    dropdownHandlers,
    dropdownOpened,
    formattedValue,
    onClear,
    setValue,
    shouldClear,
  };
};
