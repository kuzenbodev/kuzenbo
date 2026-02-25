import type { HeatmapWeekStartsOn, HeatmapWeekdayLabel } from "./types";

import { addDaysUTC } from "./date-helpers";

const createHeatmapWeekdayLabels = (
  weekStartsOn: HeatmapWeekStartsOn,
  locale = "en-US"
): readonly HeatmapWeekdayLabel[] => {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    timeZone: "UTC",
  });
  const sundayAnchor = new Date(Date.UTC(2024, 0, 7));

  const labels = [];

  for (let index = 0; index < 7; index += 1) {
    const dayOfWeek = (weekStartsOn + index) % 7;
    const weekdayDate = addDaysUTC(sundayAnchor, dayOfWeek);

    labels.push({
      dayOfWeek,
      key: String(dayOfWeek),
      label: formatter.format(weekdayDate),
    });
  }

  return labels;
};

export { createHeatmapWeekdayLabels };
