import type { DateAdapter, DateInput } from "../adapter";
import { DEFAULT_DATE_ADAPTER } from "../adapter";
import type { DateTimeStringValue } from "../types";

export const clampDate = (
  minDate: DateInput,
  maxDate: DateInput,
  date: DateInput,
  options?: {
    adapter?: DateAdapter;
  }
): DateTimeStringValue | null => {
  const adapter = options?.adapter ?? DEFAULT_DATE_ADAPTER;

  return adapter.clamp(minDate, maxDate, date);
};
