import { createContext, useContext } from "react";

import type { ChartSeriesColorRegistry } from "../color/chart-color-resolver";
import type { ChartConfig } from "../types/chart-types";

interface ChartContextProps {
  chartId: string;
  config: ChartConfig;
  getSeriesColor: (seriesKey: string) => string | undefined;
  getSeriesColorVar: (seriesKey: string) => string;
  resolveColorExpression: (
    color: string | undefined,
    fallbackSeriesKey?: string
  ) => string | undefined;
  seriesRegistry: ChartSeriesColorRegistry;
}

const ChartContext = createContext<ChartContextProps | null>(null);

const useChartConfig = () => {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error(
      "useChartConfig must be used within a <Chart.Provider /> or <Chart.Root />"
    );
  }

  return context;
};

const useChart = useChartConfig;

const useSeriesColor = (seriesKey: string) =>
  useChartConfig().getSeriesColor(seriesKey);

const useSeriesColorVar = (seriesKey: string) =>
  useChartConfig().getSeriesColorVar(seriesKey);

export {
  ChartContext,
  useChart,
  useChartConfig,
  useSeriesColor,
  useSeriesColorVar,
};
export type { ChartContextProps };
