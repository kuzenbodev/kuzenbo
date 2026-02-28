import type { DateAdapter, DateInput } from "../adapter";
import { DEFAULT_DATE_ADAPTER } from "../adapter";
import type { DateStringValue } from "../types";

export const getDefaultClampedDate = (
  input: {
    maxDate?: DateInput;
    minDate?: DateInput;
  },
  options?: {
    adapter?: DateAdapter;
  }
): DateStringValue => {
  const adapter = options?.adapter ?? DEFAULT_DATE_ADAPTER;

  return adapter.getDefaultClampedDate(input);
};
