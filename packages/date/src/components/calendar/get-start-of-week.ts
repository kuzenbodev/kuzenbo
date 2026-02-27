import type { DateAdapter } from "../../adapter";

export const getStartOfWeek = (
  date: Date,
  firstDayOfWeek: number,
  adapter: DateAdapter
): Date => {
  const normalizedFirstDay = ((firstDayOfWeek % 7) + 7) % 7;
  let cursor = adapter.startOfDay(date);

  while (adapter.getWeekday(cursor) !== normalizedFirstDay) {
    cursor = adapter.addDays(cursor, -1);
  }

  return cursor;
};
