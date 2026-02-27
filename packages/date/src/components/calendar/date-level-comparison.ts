import type { DateAdapter } from "../../adapter";

type ComparableLevel = "day" | "month" | "year";

export const compareByLevel = (
  adapter: DateAdapter,
  left: Date,
  right: Date,
  level: ComparableLevel
): number => {
  const leftYear = adapter.getYear(left);
  const rightYear = adapter.getYear(right);
  if (leftYear !== rightYear) {
    return leftYear > rightYear ? 1 : -1;
  }

  if (level === "year") {
    return 0;
  }

  const leftMonth = adapter.getMonth(left);
  const rightMonth = adapter.getMonth(right);
  if (leftMonth !== rightMonth) {
    return leftMonth > rightMonth ? 1 : -1;
  }

  if (level === "month") {
    return 0;
  }

  const leftDate = adapter.getDate(left);
  const rightDate = adapter.getDate(right);

  if (leftDate === rightDate) {
    return 0;
  }

  return leftDate > rightDate ? 1 : -1;
};

export const isSameByLevel = (
  adapter: DateAdapter,
  left: Date | null | undefined,
  right: Date | null | undefined,
  level: ComparableLevel
): boolean => {
  if (!left || !right) {
    return false;
  }

  return compareByLevel(adapter, left, right, level) === 0;
};
