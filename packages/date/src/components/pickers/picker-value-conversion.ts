import type { DateAdapter } from "../../adapter";
import type { DatePickerType, DatePickerValue } from "../types";

const parseDateString = (
  adapter: DateAdapter,
  value: string | Date | null | undefined
): Date | null => {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  return adapter.parseISODate(value) ?? null;
};

export const fromComparablePickerValue = (
  adapter: DateAdapter,
  value: unknown,
  type: DatePickerType
): DatePickerValue => {
  if (type === "default") {
    return parseDateString(adapter, value as string | null);
  }

  if (type === "multiple") {
    const nextValues = (Array.isArray(value) ? value : []) as string[];

    return nextValues
      .map((item) => parseDateString(adapter, item))
      .filter((item): item is Date => item instanceof Date);
  }

  const range = (Array.isArray(value) ? value : [null, null]) as [
    string | null,
    string | null,
  ];

  return [
    parseDateString(adapter, range[0]),
    parseDateString(adapter, range[1]),
  ];
};
