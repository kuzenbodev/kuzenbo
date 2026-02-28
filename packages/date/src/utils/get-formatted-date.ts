import type { DateAdapter, DateInput } from "../adapter";
import { DEFAULT_DATE_ADAPTER } from "../adapter";
import type { DatePickerValue, DateSelectionMode } from "../types";
import { normalizeDateSelectionMode } from "./normalize-selection-mode";

interface DateFormatterInput {
  adapter: DateAdapter;
  date: DatePickerValue<DateSelectionMode> | undefined;
  format: string;
  labelSeparator: string;
  locale: string;
  selectionMode: DateSelectionMode;
}

export type DateFormatter = (input: DateFormatterInput) => string;

export const defaultDateFormatter = ({
  adapter,
  date,
  format,
  labelSeparator,
  locale,
  selectionMode,
}: DateFormatterInput): string => {
  const localizedAdapter = adapter.withContext({ locale });

  const formatDate = (value: DateInput): string =>
    localizedAdapter.format(value, format);

  if (selectionMode === "single") {
    return date ? formatDate(date as DateInput) : "";
  }

  if (selectionMode === "multiple") {
    const values = (Array.isArray(date) ? date : []) as DateInput[];
    return values.map((value) => formatDate(value)).join(", ");
  }

  const range = (Array.isArray(date) ? date : [null, null]) as [
    DateInput,
    DateInput,
  ];

  if (range[0] && range[1]) {
    return `${formatDate(range[0])} ${labelSeparator} ${formatDate(range[1])}`;
  }

  if (range[0]) {
    return `${formatDate(range[0])} ${labelSeparator} `;
  }

  return "";
};

interface GetFormattedDateInput {
  adapter?: DateAdapter;
  date: DatePickerValue<DateSelectionMode> | undefined;
  format: string;
  formatter?: DateFormatter;
  labelSeparator: string;
  locale: string;
  selectionMode?: DateSelectionMode;
}

export const getFormattedDate = ({
  adapter = DEFAULT_DATE_ADAPTER,
  formatter,
  selectionMode,
  ...rest
}: GetFormattedDateInput): string => {
  const resolvedSelectionMode = normalizeDateSelectionMode(selectionMode);

  const formatterInput: DateFormatterInput = {
    adapter,
    selectionMode: resolvedSelectionMode,
    ...rest,
  };

  return (formatter ?? defaultDateFormatter)(formatterInput);
};
