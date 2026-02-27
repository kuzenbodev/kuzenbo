import type { DateAdapter } from "../../../adapter";

export const isAfterMinDate = (
  date: Date,
  minDate: Date | undefined,
  adapter: DateAdapter
): boolean => {
  if (!minDate) {
    return true;
  }

  return !adapter.isBefore(date, adapter.startOfDay(minDate));
};
