import type { DateAdapter } from "../../adapter";

export const dateStringParser = (
  adapter: DateAdapter,
  dateString: string | null
): string | null => {
  if (dateString === null) {
    return null;
  }

  const parsed = adapter.parseISODate(dateString);
  if (!parsed) {
    return null;
  }

  return adapter.toISODate(parsed);
};
