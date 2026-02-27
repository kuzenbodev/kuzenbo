import type { DateAdapter } from "../../adapter";

export const isBeforeMaxDate = (
  date: Date,
  maxDate: Date | undefined,
  adapter: DateAdapter
): boolean => {
  if (!maxDate) {
    return true;
  }

  return !adapter.isAfter(date, adapter.startOfDay(maxDate));
};
