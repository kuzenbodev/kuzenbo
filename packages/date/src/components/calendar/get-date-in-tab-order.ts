import type { DateAdapter } from "../../adapter";

import { isAfterMinDate } from "./is-after-min-date";
import { isBeforeMaxDate } from "./is-before-max-date";

interface DayControlProps {
  disabled?: boolean;
  selected?: boolean;
}

interface GetDateInTabOrderInput {
  adapter: DateAdapter;
  dates: Date[][];
  excludeDate?: (date: Date) => boolean;
  getDayProps?: (date: Date) => DayControlProps | undefined;
  hideOutsideDates?: boolean;
  maxDate?: Date;
  minDate?: Date;
  month: Date;
}

export const getDateInTabOrder = ({
  adapter,
  dates,
  excludeDate,
  getDayProps,
  hideOutsideDates,
  maxDate,
  minDate,
  month,
}: GetDateInTabOrderInput): Date | undefined => {
  const enabledDates = dates
    .flat()
    .filter(
      (date) =>
        isBeforeMaxDate(date, maxDate, adapter) &&
        isAfterMinDate(date, minDate, adapter) &&
        !excludeDate?.(date) &&
        !getDayProps?.(date)?.disabled &&
        (!hideOutsideDates || adapter.isSameMonth(date, month))
    );

  const selectedDate = enabledDates.find(
    (date) => getDayProps?.(date)?.selected
  );
  if (selectedDate) {
    return selectedDate;
  }

  const currentDate = enabledDates.find((date) =>
    adapter.isSameDay(date, adapter.now())
  );
  if (currentDate) {
    return currentDate;
  }

  return enabledDates[0];
};
