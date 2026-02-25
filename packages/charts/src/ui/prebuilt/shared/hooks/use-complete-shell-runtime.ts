import { useMemo } from "react";

import type {
  CompleteCartesianChartBaseProps,
  CompleteChartDatum,
} from "../complete-types";

import {
  createSeriesColorRegistry,
  getSeriesColorVarReference,
} from "../../../primitives/color/chart-color-resolver";
import {
  createCompleteChartConfig,
  createTooltipValueFormatter,
} from "../complete-helpers";

type UseCompleteShellRuntimeArgs<
  TData extends CompleteChartDatum = CompleteChartDatum,
> = Pick<
  CompleteCartesianChartBaseProps<TData>,
  "chartRootProps" | "responsiveContainerProps" | "series" | "valueFormatter"
>;

interface UseCompleteShellRuntimeResult {
  chartConfig: ReturnType<typeof createCompleteChartConfig>;
  getSeriesColorVar: (seriesKey: string) => string;
  rootAutoSize: "container" | "none";
  tooltipValueFormatter: ReturnType<typeof createTooltipValueFormatter>;
  usesAutoSizeContainer: boolean;
}

const useCompleteShellRuntime = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
  chartRootProps,
  responsiveContainerProps,
  series,
  valueFormatter,
}: UseCompleteShellRuntimeArgs<TData>): UseCompleteShellRuntimeResult => {
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

export { useCompleteShellRuntime, type UseCompleteShellRuntimeResult };
