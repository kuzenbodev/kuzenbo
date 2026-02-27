import type { DateAdapter, DateInput } from "../adapter";
import type { DateTimeStringValue } from "../types";

import { DEFAULT_DATE_ADAPTER } from "../adapter";

export const assignTime = (
  dateValue: DateInput,
  timeString: string,
  options?: {
    adapter?: DateAdapter;
  }
): DateTimeStringValue | null => {
  const adapter = options?.adapter ?? DEFAULT_DATE_ADAPTER;

  return adapter.assignTime(dateValue, timeString);
};
