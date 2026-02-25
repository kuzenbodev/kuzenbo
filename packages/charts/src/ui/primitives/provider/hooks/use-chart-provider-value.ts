"use client";

import { useCallback, useId, useMemo } from "react";

import type { ChartContextProps } from "../../context/use-chart";
import type { ChartConfig } from "../../types/chart-types";

import {
  createSeriesColorRegistry,
  getSeriesColor,
  getSeriesColorVarReference,
  resolveSeriesColorExpression,
} from "../../color/chart-color-resolver";

interface UseChartProviderValueOptions {
  config: ChartConfig;
  id?: string;
}

const useChartProviderValue = ({
  config,
  id,
}: UseChartProviderValueOptions): ChartContextProps => {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replaceAll(":", "")}`;

  const seriesRegistry = useMemo(
    () => createSeriesColorRegistry(config),
    [config]
  );

  const getSeriesColorValue = useCallback(
    (seriesKey: string) => getSeriesColor(seriesKey, seriesRegistry, chartId),
    [chartId, seriesRegistry]
  );

  const getSeriesColorVar = useCallback(
    (seriesKey: string) =>
      getSeriesColorVarReference(seriesKey, seriesRegistry),
    [seriesRegistry]
  );

  const resolveColorExpression = useCallback(
    (color: string | undefined, fallbackSeriesKey?: string) =>
      resolveSeriesColorExpression({
        value: color,
        fallbackSeriesKey,
        registry: seriesRegistry,
        chartId,
      }),
    [chartId, seriesRegistry]
  );

  return useMemo(
    () => ({
      chartId,
      config,
      getSeriesColor: getSeriesColorValue,
      getSeriesColorVar,
      resolveColorExpression,
      seriesRegistry,
    }),
    [
      chartId,
      config,
      getSeriesColorValue,
      getSeriesColorVar,
      resolveColorExpression,
      seriesRegistry,
    ]
  );
};

export type { UseChartProviderValueOptions };
export { useChartProviderValue };
