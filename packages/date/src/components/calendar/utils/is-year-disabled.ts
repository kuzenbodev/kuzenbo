import type { DateAdapter } from "../../../adapter";
import { compareByLevel } from "./date-level-comparison";

interface IsYearDisabledInput {
  adapter: DateAdapter;
  maxDate?: Date;
  minDate?: Date;
  year: Date;
}

export const isYearDisabled = ({
  adapter,
  maxDate,
  minDate,
  year,
}: IsYearDisabledInput): boolean => {
  if (minDate && compareByLevel(adapter, year, minDate, "year") < 0) {
    return true;
  }

  if (maxDate && compareByLevel(adapter, year, maxDate, "year") > 0) {
    return true;
  }

  return false;
};
