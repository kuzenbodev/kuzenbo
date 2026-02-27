import type { DateAdapter } from "../../adapter";

import { isMonthDisabled } from "./is-month-disabled";

interface MonthControlProps {
  disabled?: boolean;
  selected?: boolean;
}

interface GetMonthInTabOrderInput {
  adapter: DateAdapter;
  getMonthControlProps?: (month: Date) => MonthControlProps | undefined;
  maxDate?: Date;
  minDate?: Date;
  months: Date[][];
}

export const getMonthInTabOrder = ({
  adapter,
  getMonthControlProps,
  maxDate,
  minDate,
  months,
}: GetMonthInTabOrderInput): Date | undefined => {
  const enabledMonths = months.flat().filter((month) => {
    if (isMonthDisabled({ adapter, maxDate, minDate, month })) {
      return false;
    }

    return !getMonthControlProps?.(month)?.disabled;
  });

  const selectedMonth = enabledMonths.find(
    (month) => getMonthControlProps?.(month)?.selected
  );
  if (selectedMonth) {
    return selectedMonth;
  }

  const currentMonth = enabledMonths.find((month) =>
    adapter.isSameMonth(month, adapter.now())
  );
  if (currentMonth) {
    return currentMonth;
  }

  return enabledMonths[0];
};
