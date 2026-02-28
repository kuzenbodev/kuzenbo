import type { CompleteChartSeries } from "../../complete-types";
import { resolveCompleteSeriesName } from "./resolve-complete-series-name";

const normalizeSeriesScopeName = (seriesName: string): string =>
  seriesName.trim().toLowerCase();

const createSeriesHighlightScopeKey = (
  series: readonly CompleteChartSeries[]
): string => {
  const normalizedSeriesNames = series.map((seriesItem, index) =>
    normalizeSeriesScopeName(
      resolveCompleteSeriesName(seriesItem, `series-${index + 1}`)
    )
  );

  return JSON.stringify(normalizedSeriesNames);
};

export { createSeriesHighlightScopeKey };
