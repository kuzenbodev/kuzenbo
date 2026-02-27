import type { DateAdapter } from "../../adapter";

interface IsDateValidInput {
  adapter: DateAdapter;
  date: Date | null;
  maxDate?: Date | null;
  minDate?: Date | null;
}

export const isDateValid = ({
  adapter,
  date,
  maxDate,
  minDate,
}: IsDateValidInput): boolean => {
  if (!date || Number.isNaN(date.getTime())) {
    return false;
  }

  if (maxDate && adapter.isAfter(date, maxDate)) {
    return false;
  }

  if (minDate && adapter.isBefore(date, minDate)) {
    return false;
  }

  return true;
};
