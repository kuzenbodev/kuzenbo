import { useMemo } from "react";

import type { CompleteChartDatum } from "../../shared/complete-types";
import type {
  HeatmapCell,
  HeatmapDateLike,
  HeatmapTooltipLabelFormatter,
} from "../../shared/utils/heatmap";
import {
  createHeatmapTooltipLabel,
  createHeatmapWeekdayLabels,
  generateHeatmapSections,
  mapHeatmapValueToColor,
  normalizeHeatmapDate,
} from "../../shared/utils/heatmap";
import { toNumericValue } from "../../shared/utils/number/to-numeric-value";
import type { HeatmapProps, UseHeatmapRuntimeResult } from "../heatmap-types";

const DEFAULT_COLOR_DOMAIN: readonly [number, number] = [0, 1];
const DEFAULT_HEATMAP_COLOR_RANGE = [
  "var(--color-muted)",
  "var(--color-chart-5)",
  "var(--color-chart-4)",
  "var(--color-chart-2)",
  "var(--color-chart-1)",
] as const;

interface HeatmapValueEntry<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  datum: TData;
  value: number | null;
}

type UseHeatmapRuntimeArgs<
  TData extends CompleteChartDatum = CompleteChartDatum,
> = Pick<
  HeatmapProps<TData>,
  | "colorDomain"
  | "colorRange"
  | "data"
  | "dateKey"
  | "emptyCellColor"
  | "endDate"
  | "locale"
  | "splitMonths"
  | "startDate"
  | "tooltipLabelFormatter"
  | "valueFormatter"
  | "valueKey"
  | "weekStartsOn"
  | "withOutsideDates"
>;

const resolveRangeDate = (
  preferredDate: HeatmapDateLike | undefined,
  fallbackDate: Date
): Date => {
  if (preferredDate === undefined) {
    return fallbackDate;
  }

  return normalizeHeatmapDate(preferredDate);
};

const useHeatmapRuntime = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
  colorDomain,
  colorRange,
  data,
  dateKey,
  emptyCellColor = "var(--color-muted)",
  endDate,
  locale = "en-US",
  splitMonths = false,
  startDate,
  tooltipLabelFormatter,
  valueFormatter,
  valueKey,
  weekStartsOn = 0,
  withOutsideDates = true,
}: UseHeatmapRuntimeArgs<TData>): UseHeatmapRuntimeResult<TData> => {
  const { earliestDate, latestDate, valueByIsoDate } = useMemo(() => {
    const map = new Map<string, HeatmapValueEntry<TData>>();
    let earliest: Date | null = null;
    let latest: Date | null = null;

    for (const datum of data) {
      const rawDate = datum[dateKey];

      if (
        typeof rawDate !== "number" &&
        typeof rawDate !== "string" &&
        !(rawDate instanceof Date)
      ) {
        continue;
      }

      const normalizedDate = normalizeHeatmapDate(rawDate);
      const isoDate = normalizedDate.toISOString().slice(0, 10);
      const numericValue = toNumericValue(datum[valueKey]);

      map.set(isoDate, {
        datum,
        value: numericValue ?? null,
      });

      if (!earliest || normalizedDate.getTime() < earliest.getTime()) {
        earliest = normalizedDate;
      }

      if (!latest || normalizedDate.getTime() > latest.getTime()) {
        latest = normalizedDate;
      }
    }

    const today = normalizeHeatmapDate(new Date());

    return {
      earliestDate: earliest ?? today,
      latestDate: latest ?? today,
      valueByIsoDate: map,
    };
  }, [data, dateKey, valueKey]);

  const resolvedStartDate = resolveRangeDate(startDate, earliestDate);
  const resolvedEndDate = resolveRangeDate(endDate, latestDate);

  const sections = useMemo(
    () =>
      generateHeatmapSections({
        endDate: resolvedEndDate,
        locale,
        splitMonths,
        startDate: resolvedStartDate,
        weekStartsOn,
        withOutsideDates,
      }),
    [
      locale,
      resolvedEndDate,
      resolvedStartDate,
      splitMonths,
      weekStartsOn,
      withOutsideDates,
    ]
  );

  const weekdayLabels = useMemo(
    () => createHeatmapWeekdayLabels(weekStartsOn, locale),
    [locale, weekStartsOn]
  );

  const resolvedColorRange =
    colorRange && colorRange.length > 0
      ? colorRange
      : DEFAULT_HEATMAP_COLOR_RANGE;

  const numericValues = useMemo(() => {
    const values: number[] = [];

    for (const entry of valueByIsoDate.values()) {
      if (entry.value !== null) {
        values.push(entry.value);
      }
    }

    return values;
  }, [valueByIsoDate]);

  const resolvedColorDomain = useMemo((): readonly [number, number] => {
    if (colorDomain) {
      return colorDomain;
    }

    if (numericValues.length === 0) {
      return DEFAULT_COLOR_DOMAIN;
    }

    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    for (const value of numericValues) {
      if (value < min) {
        min = value;
      }

      if (value > max) {
        max = value;
      }
    }

    return [min, max] as const;
  }, [colorDomain, numericValues]);

  const tooltipLabelResolver = useMemo(
    () =>
      createHeatmapTooltipLabel(
        tooltipLabelFormatter as HeatmapTooltipLabelFormatter | undefined
      ),
    [tooltipLabelFormatter]
  );

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }),
    [locale]
  );

  const resolveCellRuntime = (cell: HeatmapCell) => {
    const entry = valueByIsoDate.get(cell.isoDate);
    const value = entry?.value ?? null;
    let formattedValue = "No data";

    if (value !== null) {
      formattedValue =
        valueFormatter && entry
          ? valueFormatter(value, entry.datum)
          : numberFormatter.format(value);
    }

    const mapped = mapHeatmapValueToColor({
      colorRange: resolvedColorRange,
      domain: resolvedColorDomain,
      value,
    });
    const usesOutsideDateFallback =
      cell.isOutsideDate && withOutsideDates === false;
    const color =
      value === null || usesOutsideDateFallback ? emptyCellColor : mapped.color;

    return {
      color,
      formattedValue,
      tooltipLabel: tooltipLabelResolver({
        date: cell.date,
        formattedValue,
        isOutsideDate: cell.isOutsideDate,
        isoDate: cell.isoDate,
        value,
      }),
      value,
      valueDatum: entry?.datum ?? null,
    };
  };

  return {
    colorDomain: resolvedColorDomain,
    resolveCellRuntime,
    sections,
    weekdayLabels,
    withOutsideDates,
  };
};

export { useHeatmapRuntime, DEFAULT_HEATMAP_COLOR_RANGE };
