"use client";

import type { ReactNode } from "react";
import type { LegendProps, TooltipProps } from "recharts";

import { Chart } from "../../primitives/chart";
import type { CompleteChartDatum, CompleteChartSeries } from "./complete-types";
import { useCompleteLegendHighlightState } from "./hooks/use-complete-legend-highlight-state";
import { useCompleteRadialShellRuntime } from "./hooks/use-complete-radial-shell-runtime";
import { createSeriesHighlightScopeKey } from "./utils/series/create-series-highlight-scope-key";

interface CompleteRadialShellRenderArgs {
  getSeriesColorVar: (seriesKey: string) => string;
  highlightedSeriesName: string | null;
  isAnySeriesHighlighted: boolean;
  isSeriesHighlighted: (seriesName: string) => boolean;
  legendNode: ReactNode;
  tooltipNode: ReactNode;
  usesAutoSizeContainer: boolean;
}

interface CompleteRadialShellProps<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  chartRootProps?: Omit<
    Parameters<typeof Chart.Root>[0],
    "children" | "config"
  >;
  children: (args: CompleteRadialShellRenderArgs) => ReactNode;
  enableLegendHighlight?: boolean;
  legendProps?: Omit<LegendProps, "content" | "ref">;
  responsiveContainerProps?: Parameters<
    typeof Chart.Root
  >[0]["responsiveContainerProps"];
  series: readonly CompleteChartSeries[];
  tooltipProps?: Omit<TooltipProps<number, string>, "content" | "ref">;
  unit?: string;
  valueFormatter?: (value: number, seriesKey: string, datum: TData) => string;
  withLegend?: boolean;
  withTooltip?: boolean;
}

const CompleteRadialShell = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
  chartRootProps,
  children,
  enableLegendHighlight = true,
  legendProps,
  responsiveContainerProps,
  series,
  tooltipProps,
  unit,
  valueFormatter,
  withLegend = false,
  withTooltip = true,
}: CompleteRadialShellProps<TData>) => {
  const highlightScopeKey = createSeriesHighlightScopeKey(series);
  const {
    chartConfig,
    getSeriesColorVar,
    rootAutoSize,
    tooltipValueFormatter,
    usesAutoSizeContainer,
  } = useCompleteRadialShellRuntime({
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
        getSeriesColorVar,
        highlightedSeriesName,
        isAnySeriesHighlighted,
        isSeriesHighlighted,
        legendNode,
        tooltipNode,
        usesAutoSizeContainer,
      })}
    </Chart.Root>
  );
};

export type { CompleteRadialShellProps, CompleteRadialShellRenderArgs };
export { CompleteRadialShell };
