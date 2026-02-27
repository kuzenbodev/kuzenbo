import type { DateAdapter, DateInput } from "../adapter";
import type { DateTimeStringValue } from "../types";

import { DEFAULT_DATE_ADAPTER } from "../adapter";

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
