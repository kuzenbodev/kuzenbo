import type { DateAdapter } from "../../adapter";

import { formatAdapterTime } from "./time-utils";

interface GetMinTimeInput {
  adapter: DateAdapter;
  minDate: Date | undefined;
  value: Date | null;
}

export const getMinTime = ({
  adapter,
  minDate,
  value,
}: GetMinTimeInput): string | undefined => {
  if (!minDate || !value || !adapter.isSameDay(value, minDate)) {
    return undefined;
  }

  return formatAdapterTime(adapter, minDate, true);
};

interface GetMaxTimeInput {
  adapter: DateAdapter;
  maxDate: Date | undefined;
  value: Date | null;
}

export const getMaxTime = ({
  adapter,
  maxDate,
  value,
}: GetMaxTimeInput): string | undefined => {
  if (!maxDate || !value || !adapter.isSameDay(value, maxDate)) {
    return undefined;
  }

  return formatAdapterTime(adapter, maxDate, true);
};
