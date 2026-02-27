import type { TimeAmPmLabels, TimeFormat } from "../time-picker-types";

import { DEFAULT_TIME_AM_PM_LABELS, formatTimeForDisplay } from "./time-utils";

export interface GetFormattedTimeInput {
  value: string | Date;
  format?: TimeFormat;
  amPmLabels?: TimeAmPmLabels;
  withSeconds: boolean;
}

export const getFormattedTime = ({
  amPmLabels = DEFAULT_TIME_AM_PM_LABELS,
  format = "24h",
  value,
  withSeconds,
}: GetFormattedTimeInput): string | null =>
  formatTimeForDisplay({
    amPmLabels,
    format,
    value,
    withSeconds,
  });
