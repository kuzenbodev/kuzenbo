"use client";

import type { ReactNode } from "react";

import type {
  CompleteCartesianChartBaseProps,
  CompleteChartDatum,
} from "./complete-types";

import { Chart } from "../../primitives/chart";
import { useCompleteLegendHighlightState } from "./hooks/use-complete-legend-highlight-state";
import { useCompleteShellRuntime } from "./hooks/use-complete-shell-runtime";
import { createSeriesHighlightScopeKey } from "./utils/series/create-series-highlight-scope-key";

interface CompleteCartesianShellRenderArgs {
  getSeriesColorVar: (seriesKey: string) => string;
  highlightedSeriesName: string | null;
  isAnySeriesHighlighted: boolean;
  isSeriesHighlighted: (seriesName: string) => boolean;
  tooltipNode: ReactNode;
  legendNode: ReactNode;
  usesAutoSizeContainer: boolean;
}

type CompleteCartesianShellProps<
  TData extends CompleteChartDatum = CompleteChartDatum,
> = Pick<
  CompleteCartesianChartBaseProps<TData>,
  | "chartRootProps"
  | "legendProps"
  | "responsiveContainerProps"
  | "series"
  | "tooltipProps"
  | "unit"
  | "valueFormatter"
  | "withLegend"
  | "withTooltip"
> & {
  enableLegendHighlight?: boolean;
  children: (args: CompleteCartesianShellRenderArgs) => ReactNode;
};

const CompleteCartesianShell = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
  chartRootProps,
  children,
  legendProps,
  responsiveContainerProps,
  series,
  tooltipProps,
  unit,
  valueFormatter,
  enableLegendHighlight = true,
  withLegend = false,
  withTooltip = true,
}: CompleteCartesianShellProps<TData>) => {
  const highlightScopeKey = createSeriesHighlightScopeKey(series);
  const {
    chartConfig,
    getSeriesColorVar,
    rootAutoSize,
    tooltipValueFormatter,
    usesAutoSizeContainer,
  } = useCompleteShellRuntime({
    chartRootProps,
    responsiveContainerProps,
    series,
    valueFormatter,
  });
  const {
    highlightedSeriesName,
    isAnySeriesHighlighted,
    isSeriesHighlighted,
    onHighlightChange,
  } = useCompleteLegendHighlightState({
    enableLegendHighlight,
    highlightScopeKey,
    withLegend,
  });

  const tooltipNode = withTooltip ? (
    <Chart.Tooltip
      content={
        <Chart.TooltipContent
          unit={unit}
          valueFormatter={tooltipValueFormatter}
        />
      }
      {...tooltipProps}
    />
  ) : null;

  const legendNode = withLegend ? (
    <Chart.Legend
      content={<Chart.LegendContent onHighlightChange={onHighlightChange} />}
      {...legendProps}
    />
  ) : null;

  return (
    <Chart.Root
      autoSize={rootAutoSize}
      config={chartConfig}
      responsiveContainerProps={
        rootAutoSize === "container" ? responsiveContainerProps : undefined
      }
      {...chartRootProps}
    >
      {children({
        legendNode,
        tooltipNode,
        getSeriesColorVar,
        highlightedSeriesName,
        isAnySeriesHighlighted,
        isSeriesHighlighted,
        usesAutoSizeContainer,
      })}
    </Chart.Root>
  );
};

export type { CompleteCartesianShellProps, CompleteCartesianShellRenderArgs };
export { CompleteCartesianShell };
