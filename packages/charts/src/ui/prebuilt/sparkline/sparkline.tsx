"use client";

import { Area, AreaChart, XAxis, YAxis } from "recharts";

import type { CompleteChartDatum } from "../shared/complete-types";
import type { SparklineProps } from "./sparkline-types";

import { CompleteCartesianShell } from "../shared/complete-cartesian-shell";
import { resolveCompleteSeriesName } from "../shared/complete-helpers";
import { useSparklineRuntime } from "./hooks/use-sparkline-runtime";

const Sparkline = <TData extends CompleteChartDatum = CompleteChartDatum>({
  areaProps,
  chartProps,
  chartRootProps,
  color,
  connectNulls = true,
  curveType = "monotone",
  data,
  dataKey,
  enableTrendColors = true,
  fillOpacity = 0.2,
  gradientStops,
  label,
  responsiveContainerProps,
  sparklineChartProps,
  strokeWidth = 2,
  theme,
  tooltipProps,
  trendColors,
  valueFormatter,
  valueKey,
  withGradient = true,
  withTooltip = true,
}: SparklineProps<TData>) => {
  const {
    chartSeries,
    gradientId,
    resolvedGradientStops,
    resolveSparklineChartProps,
    trendDirection,
  } = useSparklineRuntime({
    chartProps,
    color,
    data,
    enableTrendColors,
    gradientStops,
    label,
    sparklineChartProps,
    theme,
    trendColors,
    valueKey,
  });

  return (
    <CompleteCartesianShell
      chartRootProps={chartRootProps}
      enableLegendHighlight={false}
      responsiveContainerProps={responsiveContainerProps}
      series={[chartSeries]}
      tooltipProps={tooltipProps}
      valueFormatter={valueFormatter}
      withLegend={false}
      withTooltip={withTooltip}
    >
      {({ tooltipNode, getSeriesColorVar, usesAutoSizeContainer }) => {
        const resolvedChartProps = resolveSparklineChartProps(
          usesAutoSizeContainer
        );
        const seriesName = resolveCompleteSeriesName(chartSeries, valueKey);
        const seriesColor = getSeriesColorVar(seriesName);

        return (
          <AreaChart
            accessibilityLayer
            data={[...data]}
            {...resolvedChartProps}
          >
            {withGradient ? (
              <defs>
                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                  {resolvedGradientStops.map((stop) => (
                    <stop
                      key={`${gradientId}-${stop.offset}-${stop.color}`}
                      offset={`${stop.offset}%`}
                      stopColor={stop.color}
                      stopOpacity={stop.opacity}
                    />
                  ))}
                </linearGradient>
              </defs>
            ) : null}
            <XAxis dataKey={dataKey} hide />
            <YAxis hide />
            {tooltipNode}
            <Area
              activeDot={false}
              connectNulls={connectNulls}
              data-trend-direction={trendDirection}
              dataKey={valueKey}
              dot={false}
              fill={withGradient ? `url(#${gradientId})` : seriesColor}
              fillOpacity={withGradient ? 1 : fillOpacity}
              name={seriesName}
              stroke={seriesColor}
              strokeWidth={strokeWidth}
              type={curveType}
              {...areaProps}
            />
          </AreaChart>
        );
      }}
    </CompleteCartesianShell>
  );
};

export { Sparkline };
export type {
  SparklineProps,
  SparklineRuntimeSeries,
  SparklineTrendColors,
} from "./sparkline-types";
export type { SparklineGradientStop } from "./utils/default-sparkline-gradient-stops";
export type { SparklineTrendDirection } from "./utils/resolve-sparkline-trend-direction";
