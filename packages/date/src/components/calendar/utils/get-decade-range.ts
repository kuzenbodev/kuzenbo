import type { DateAdapter } from "../../../adapter";

import { getYearsData } from "./get-years-data";

export const getDecadeRange = (
  decade: Date,
  adapter: DateAdapter
): readonly [Date, Date] => {
  const years = getYearsData(decade, adapter);
  const start =
    years[0]?.[0] ?? adapter.setDate(adapter.setMonth(decade, 0), 1);
  const end = years[3]?.[0] ?? start;

  return [start, end] as const;
};
