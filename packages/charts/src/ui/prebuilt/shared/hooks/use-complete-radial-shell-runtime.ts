import { useMemo } from "react";

import type { ChartRootProps } from "../../../primitives/chart";
import {
  createSeriesColorRegistry,
  getSeriesColorVarReference,
} from "../../../primitives/color/chart-color-resolver";
import type {
  CompleteChartDatum,
  CompleteChartSeries,
} from "../complete-types";
import { createCompleteChartConfig } from "../utils/config/create-complete-chart-config";
import { createTooltipValueFormatter } from "../utils/tooltip/create-tooltip-value-formatter";

interface UseCompleteRadialShellRuntimeArgs<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  chartRootProps?: Omit<ChartRootProps, "children" | "config">;
  responsiveContainerProps?: ChartRootProps["responsiveContainerProps"];
  series: readonly CompleteChartSeries[];
  valueFormatter?: (value: number, seriesKey: string, datum: TData) => string;
}

interface UseCompleteRadialShellRuntimeResult {
  chartConfig: ReturnType<typeof createCompleteChartConfig>;
  getSeriesColorVar: (seriesKey: string) => string;
  rootAutoSize: "container" | "none";
  tooltipValueFormatter: ReturnType<typeof createTooltipValueFormatter>;
  usesAutoSizeContainer: boolean;
}

const useCompleteRadialShellRuntime = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
  chartRootProps,
  responsiveContainerProps,
  series,
  valueFormatter,
}: UseCompleteRadialShellRuntimeArgs<TData>): UseCompleteRadialShellRuntimeResult => {
  const chartConfig = createCompleteChartConfig(series);
  const colorRegistry = useMemo(
    () => createSeriesColorRegistry(chartConfig),
    [chartConfig]
  );
  const tooltipValueFormatter = createTooltipValueFormatter(valueFormatter);
  const rootAutoSize =
    chartRootProps?.autoSize ??
    (responsiveContainerProps ? "container" : "none");

  return {
    chartConfig,
    getSeriesColorVar: (seriesKey) =>
      getSeriesColorVarReference(seriesKey, colorRegistry),
    rootAutoSize,
    tooltipValueFormatter,
    usesAutoSizeContainer: rootAutoSize === "container",
  };
};

export {
  useCompleteRadialShellRuntime,
  type UseCompleteRadialShellRuntimeResult,
};
