import type { YAxisProps } from "recharts";

import type { CompleteChartSeries } from "../../complete-types";

import { resolveCompleteSeriesName } from "../series/resolve-complete-series-name";
import { normalizeAxisId } from "./normalize-axis-id";

const resolveSeriesKeyForAxisId = (
  series: readonly Pick<CompleteChartSeries, "key" | "name" | "yAxisId">[],
  axisId: YAxisProps["yAxisId"] | null
) => {
  const normalizedAxisId = normalizeAxisId(axisId);
  const matchingSeries = series.find(
    (seriesItem) => normalizeAxisId(seriesItem.yAxisId) === normalizedAxisId
  );

  if (matchingSeries) {
    return resolveCompleteSeriesName(matchingSeries);
  }

  const [firstSeries] = series;

  if (!firstSeries) {
    return;
  }

  return resolveCompleteSeriesName(firstSeries);
};

export { resolveSeriesKeyForAxisId };
