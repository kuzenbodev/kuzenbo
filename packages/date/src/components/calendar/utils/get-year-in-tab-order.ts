import type { DateAdapter } from "../../../adapter";
import { isYearDisabled } from "./is-year-disabled";

interface YearControlProps {
  disabled?: boolean;
  selected?: boolean;
}

interface GetYearInTabOrderInput {
  adapter: DateAdapter;
  getYearControlProps?: (year: Date) => YearControlProps | undefined;
  maxDate?: Date;
  minDate?: Date;
  years: Date[][];
}

export const getYearInTabOrder = ({
  adapter,
  getYearControlProps,
  maxDate,
  minDate,
  years,
}: GetYearInTabOrderInput): Date | undefined => {
  const enabledYears = years.flat().filter((year) => {
    if (isYearDisabled({ adapter, maxDate, minDate, year })) {
      return false;
    }

    return !getYearControlProps?.(year)?.disabled;
  });

  const selectedYear = enabledYears.find(
    (year) => getYearControlProps?.(year)?.selected
  );
  if (selectedYear) {
    return selectedYear;
  }

  const currentYear = enabledYears.find((year) =>
    adapter.isSameYear(year, adapter.now())
  );
  if (currentYear) {
    return currentYear;
  }

  return enabledYears[0];
};
