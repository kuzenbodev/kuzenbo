import {
  addDaysUTC,
  addMonthsUTC,
  compareUTCDate,
  endOfMonthUTC,
  endOfWeekUTC,
  formatIsoDateUTC,
  formatMonthLabelUTC,
  getHeatmapRangeBounds,
  isDateWithinRangeUTC,
  startOfMonthUTC,
  startOfWeekUTC,
  toMonthKeyUTC,
} from "./date-helpers";
import type {
  GenerateHeatmapSectionsOptions,
  HeatmapMonthLabel,
  HeatmapSection,
  HeatmapWeek,
} from "./types";

interface BuildWeeksArgs {
  rangeEndDate: Date;
  rangeStartDate: Date;
  weekStartsOn: NonNullable<GenerateHeatmapSectionsOptions["weekStartsOn"]>;
}

const buildWeeks = ({
  rangeEndDate,
  rangeStartDate,
  weekStartsOn,
}: BuildWeeksArgs): readonly HeatmapWeek[] => {
  const weeks: HeatmapWeek[] = [];
  const gridStartDate = startOfWeekUTC(rangeStartDate, weekStartsOn);
  const gridEndDate = endOfWeekUTC(rangeEndDate, weekStartsOn);

  for (
    let weekStartDate = gridStartDate;
    compareUTCDate(weekStartDate, gridEndDate) <= 0;
    weekStartDate = addDaysUTC(weekStartDate, 7)
  ) {
    const cells = [];

    for (let dayOffset = 0; dayOffset < 7; dayOffset += 1) {
      const currentDate = addDaysUTC(weekStartDate, dayOffset);
      const isInRange = isDateWithinRangeUTC(
        currentDate,
        rangeStartDate,
        rangeEndDate
      );

      cells.push({
        date: currentDate,
        dayOfMonth: currentDate.getUTCDate(),
        dayOfWeek: currentDate.getUTCDay(),
        isoDate: formatIsoDateUTC(currentDate),
        isInRange,
        isOutsideDate: !isInRange,
        monthKey: toMonthKeyUTC(currentDate),
      });
    }

    weeks.push({
      cells,
      key: `${formatIsoDateUTC(weekStartDate)}-${formatIsoDateUTC(
        addDaysUTC(weekStartDate, 6)
      )}`,
      startIsoDate: formatIsoDateUTC(weekStartDate),
    });
  }

  return weeks;
};

const createMonthLabels = (
  weeks: readonly HeatmapWeek[],
  locale: string
): readonly HeatmapMonthLabel[] => {
  if (weeks.length === 0) {
    return [];
  }

  const labels: HeatmapMonthLabel[] = [];
  let activeMonthKey: string | null = null;

  for (const [weekIndex, week] of weeks.entries()) {
    const firstInRangeCell = week.cells.find((cell) => cell.isInRange);

    if (!firstInRangeCell) {
      continue;
    }

    if (weekIndex === 0 && firstInRangeCell.monthKey !== activeMonthKey) {
      labels.push({
        key: `${firstInRangeCell.monthKey}-${weekIndex}`,
        label: formatMonthLabelUTC(firstInRangeCell.date, locale),
        weekIndex,
      });
      activeMonthKey = firstInRangeCell.monthKey;
    }

    const monthStartCell = week.cells.find(
      (cell) => cell.isInRange && cell.dayOfMonth === 1
    );

    if (!monthStartCell || monthStartCell.monthKey === activeMonthKey) {
      continue;
    }

    labels.push({
      key: `${monthStartCell.monthKey}-${weekIndex}`,
      label: formatMonthLabelUTC(monthStartCell.date, locale),
      weekIndex,
    });
    activeMonthKey = monthStartCell.monthKey;
  }

  return labels;
};

interface BuildSectionArgs {
  key: string;
  locale: string;
  rangeEndDate: Date;
  rangeStartDate: Date;
  weekStartsOn: NonNullable<GenerateHeatmapSectionsOptions["weekStartsOn"]>;
}

const buildSection = ({
  key,
  locale,
  rangeEndDate,
  rangeStartDate,
  weekStartsOn,
}: BuildSectionArgs): HeatmapSection => {
  const weeks = buildWeeks({
    rangeEndDate,
    rangeStartDate,
    weekStartsOn,
  });

  return {
    key,
    monthKey: toMonthKeyUTC(rangeStartDate),
    monthLabel: formatMonthLabelUTC(rangeStartDate, locale),
    monthLabels: createMonthLabels(weeks, locale),
    weeks,
  };
};

const generateHeatmapSections = ({
  endDate,
  locale = "en-US",
  splitMonths = false,
  startDate,
  weekStartsOn = 0,
}: GenerateHeatmapSectionsOptions): readonly HeatmapSection[] => {
  const [rangeStartDate, rangeEndDate] = getHeatmapRangeBounds(
    startDate,
    endDate
  );

  if (!splitMonths) {
    return [
      buildSection({
        key: `${formatIsoDateUTC(rangeStartDate)}-${formatIsoDateUTC(
          rangeEndDate
        )}`,
        locale,
        rangeEndDate,
        rangeStartDate,
        weekStartsOn,
      }),
    ];
  }

  const sections: HeatmapSection[] = [];

  for (
    let monthCursor = startOfMonthUTC(rangeStartDate);
    compareUTCDate(monthCursor, rangeEndDate) <= 0;
    monthCursor = addMonthsUTC(monthCursor, 1)
  ) {
    const monthStartDate =
      compareUTCDate(monthCursor, rangeStartDate) < 0
        ? rangeStartDate
        : monthCursor;
    const monthEndDate = endOfMonthUTC(monthCursor);
    const boundedMonthEndDate =
      compareUTCDate(monthEndDate, rangeEndDate) > 0
        ? rangeEndDate
        : monthEndDate;

    sections.push(
      buildSection({
        key: toMonthKeyUTC(monthCursor),
        locale,
        rangeEndDate: boundedMonthEndDate,
        rangeStartDate: monthStartDate,
        weekStartsOn,
      })
    );
  }

  return sections;
};

export { generateHeatmapSections };
