import type { DateAdapter } from "../../../adapter";
import { compareByLevel } from "./date-level-comparison";

interface IsMonthDisabledInput {
  adapter: DateAdapter;
  maxDate?: Date;
  minDate?: Date;
  month: Date;
}

export const isMonthDisabled = ({
  adapter,
  maxDate,
  minDate,
  month,
}: IsMonthDisabledInput): boolean => {
  if (minDate && compareByLevel(adapter, month, minDate, "month") < 0) {
    return true;
  }

  if (maxDate && compareByLevel(adapter, month, maxDate, "month") > 0) {
    return true;
  }

  return false;
};
