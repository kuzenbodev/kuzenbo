"use client";

import type { ComponentProps } from "react";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  type LegendProps,
  type TooltipProps,
} from "recharts";

import type { ChartRootProps } from "../../primitives/chart";
import type {
  CompleteChartDatum,
  CompleteChartSeries,
} from "../shared/complete-types";

import { resolveCompleteSeriesName } from "../shared/complete-helpers";
import { CompleteRadialShell } from "../shared/complete-radial-shell";
import { useRadarChartRuntime } from "./hooks/use-radar-chart-runtime";

type RadarChartRootProps = Omit<
  ComponentProps<typeof RechartsRadarChart>,
  "children" | "data" | "ref"
>;

type RadarSeriesProps =
  | Partial<Omit<ComponentProps<typeof Radar>, "dataKey" | "ref">>
  | ((
      series: CompleteChartSeries
    ) => Partial<Omit<ComponentProps<typeof Radar>, "dataKey" | "ref">>);

interface RadarChartProps<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  activeDotProps?: unknown;
  chartProps?: RadarChartRootProps;
  chartRootProps?: Omit<ChartRootProps, "children" | "config">;
  data: readonly TData[];
  dataKey: keyof TData & string;
  dotProps?: unknown;
  enableLegendHighlight?: boolean;
  fillOpacity?: number;
  legendProps?: Omit<LegendProps, "content" | "ref">;
  polarAngleAxisProps?: Omit<
    ComponentProps<typeof PolarAngleAxis>,
    "dataKey" | "ref"
  >;
  polarGridProps?: Omit<ComponentProps<typeof PolarGrid>, "ref">;
  polarRadiusAxisProps?: Omit<ComponentProps<typeof PolarRadiusAxis>, "ref">;
  radarChartProps?: RadarChartRootProps;
  radarProps?: RadarSeriesProps;
  responsiveContainerProps?: ChartRootProps["responsiveContainerProps"];
  series: readonly CompleteChartSeries[];
  strokeWidth?: number;
  tooltipProps?: Omit<TooltipProps<number, string>, "content" | "ref">;
  unit?: string;
  valueFormatter?: (value: number, seriesKey: string, datum: TData) => string;
  withDots?: boolean;
  withLegend?: boolean;
  withPolarAngleAxis?: boolean;
  withPolarGrid?: boolean;
  withPolarRadiusAxis?: boolean;
  withTooltip?: boolean;
}

const DIMMED_RADAR_FILL_OPACITY = 0.12;
const DIMMED_RADAR_STROKE_OPACITY = 0.25;

const resolveRadarDotProps = ({
  dotProps,
  isDimmed,
  withDots,
}: {
  dotProps: unknown;
  isDimmed: boolean;
  withDots: boolean;
}) => {
  if (withDots && dotProps && typeof dotProps === "object") {
    return {
      ...(dotProps as Record<string, unknown>),
      fillOpacity: isDimmed ? 0 : 1,
      strokeOpacity: isDimmed ? 0 : 1,
    };
  }

  return withDots;
};

const RadarChart = <TData extends CompleteChartDatum = CompleteChartDatum>({
  activeDotProps,
  chartProps,
  chartRootProps,
  data,
  dataKey,
  dotProps,
  enableLegendHighlight = true,
  fillOpacity = 0.35,
  legendProps,
  polarAngleAxisProps,
  polarGridProps,
  polarRadiusAxisProps,
  radarChartProps,
  radarProps,
  responsiveContainerProps,
  series,
  strokeWidth = 2,
  tooltipProps,
  unit,
  valueFormatter,
  withDots = false,
  withLegend = false,
  withPolarAngleAxis = true,
  withPolarGrid = true,
  withPolarRadiusAxis = true,
  withTooltip = true,
}: RadarChartProps<TData>) => {
  const { radiusAxisTickFormatter, resolveRadarChartProps } =
    useRadarChartRuntime({
      chartProps: radarChartProps ?? chartProps,
      data,
      series,
      unit,
      valueFormatter,
    });

  return (
    <CompleteRadialShell
      chartRootProps={chartRootProps}
      enableLegendHighlight={enableLegendHighlight}
      legendProps={legendProps}
      responsiveContainerProps={responsiveContainerProps}
      series={series}
      tooltipProps={tooltipProps}
      unit={unit}
      valueFormatter={valueFormatter}
      withLegend={withLegend}
      withTooltip={withTooltip}
    >
      {({
        isAnySeriesHighlighted,
        isSeriesHighlighted,
        legendNode,
        tooltipNode,
        getSeriesColorVar,
        usesAutoSizeContainer,
      }) => (
        <RechartsRadarChart
          accessibilityLayer
          data={[...data]}
          {...resolveRadarChartProps(usesAutoSizeContainer)}
        >
          {withPolarGrid ? <PolarGrid {...polarGridProps} /> : null}
          {withPolarAngleAxis ? (
            <PolarAngleAxis dataKey={dataKey} {...polarAngleAxisProps} />
          ) : null}
          {withPolarRadiusAxis ? (
            <PolarRadiusAxis
              tickFormatter={radiusAxisTickFormatter}
              {...polarRadiusAxisProps}
            />
          ) : null}
          {tooltipNode}
          {legendNode}
          {series.map((seriesItem, index) => {
            const seriesName = resolveCompleteSeriesName(
              seriesItem,
              `series-${index + 1}`
            );
            const isDimmed =
              enableLegendHighlight &&
              isAnySeriesHighlighted &&
              !isSeriesHighlighted(seriesName);
            const resolvedRadarProps =
              typeof radarProps === "function"
                ? radarProps(seriesItem)
                : radarProps;
            const resolvedDotProps = resolveRadarDotProps({
              dotProps,
              isDimmed,
              withDots,
            });
            const resolvedActiveDotProps = resolveRadarDotProps({
              dotProps: activeDotProps,
              isDimmed,
              withDots,
            });
            const seriesColor = getSeriesColorVar(seriesName);

            return (
              <Radar
                activeDot={resolvedActiveDotProps}
                dataKey={seriesName}
                dot={resolvedDotProps}
                fill={seriesColor}
                fillOpacity={isDimmed ? DIMMED_RADAR_FILL_OPACITY : fillOpacity}
                key={seriesName}
                name={seriesName}
                stroke={seriesColor}
                strokeDasharray={seriesItem.strokeDasharray}
                strokeOpacity={
                  isDimmed ? DIMMED_RADAR_STROKE_OPACITY : fillOpacity
                }
                strokeWidth={strokeWidth}
                {...resolvedRadarProps}
              />
            );
          })}
        </RechartsRadarChart>
      )}
    </CompleteRadialShell>
  );
};

export type { RadarChartProps, RadarSeriesProps };
export { RadarChart };
