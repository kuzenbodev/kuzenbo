import type { DateAdapter } from "../../adapter";

export const getEndOfWeek = (
  date: Date,
  firstDayOfWeek: number,
  adapter: DateAdapter
): Date => {
  const normalizedFirstDay = ((firstDayOfWeek % 7) + 7) % 7;
  const lastDayOfWeek = normalizedFirstDay === 0 ? 6 : normalizedFirstDay - 1;
  let cursor = adapter.startOfDay(date);

  while (adapter.getWeekday(cursor) !== lastDayOfWeek) {
    cursor = adapter.addDays(cursor, 1);
  }

  return cursor;
};
