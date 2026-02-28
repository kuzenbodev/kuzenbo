"use client";

import type { ComponentProps } from "react";
import { useCallback } from "react";
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  type LegendProps,
  type TooltipProps,
} from "recharts";

import type { ChartRootProps } from "../../primitives/chart";
import { CompleteRadialShell } from "../shared/complete-radial-shell";
import type {
  CompleteChartDatum,
  CompleteChartSeries,
} from "../shared/complete-types";
import type { RadialLabelMode } from "../shared/utils/radial/create-radial-label-formatter";
import { getRadialSegmentColor } from "../shared/utils/radial/get-radial-segment-color";
import type { CompleteTooltipSourceMode } from "../shared/utils/radial/resolve-tooltip-source-shared";
import { usePieChartRuntime } from "./hooks/use-pie-chart-runtime";

type PieChartRootProps = Omit<
  ComponentProps<typeof RechartsPieChart>,
  "children" | "data" | "ref"
>;

type PieSeriesProps = Partial<
  Omit<ComponentProps<typeof Pie>, "children" | "data" | "dataKey" | "ref">
>;

interface PieChartProps<TData extends CompleteChartDatum = CompleteChartDatum> {
  chartProps?: PieChartRootProps;
  chartRootProps?: Omit<ChartRootProps, "children" | "config">;
  data: readonly TData[];
  dataKey: keyof TData & string;
  endAngle?: number;
  enableLegendHighlight?: boolean;
  fillOpacity?: number;
  labelMode?: RadialLabelMode;
  labelPosition?: "inside" | "outside" | "none";
  legendProps?: Omit<LegendProps, "content" | "ref">;
  nameKey?: keyof TData & string;
  paddingAngle?: ComponentProps<typeof Pie>["paddingAngle"];
  pieChartProps?: PieChartRootProps;
  pieProps?: PieSeriesProps;
  responsiveContainerProps?: ChartRootProps["responsiveContainerProps"];
  size?: ComponentProps<typeof Pie>["outerRadius"];
  series?: readonly CompleteChartSeries[];
  startAngle?: number;
  strokeColor?: ComponentProps<typeof Pie>["stroke"];
  strokeWidth?: ComponentProps<typeof Pie>["strokeWidth"];
  tooltipProps?: Omit<TooltipProps<number, string>, "content" | "ref">;
  tooltipSource?: CompleteTooltipSourceMode;
  unit?: string;
  valueFormatter?: (value: number, seriesKey: string, datum: TData) => string;
  withLabelLine?: boolean;
  withLabels?: boolean;
  withLegend?: boolean;
  withTooltip?: boolean;
}

const DIMMED_PIE_FILL_OPACITY = 0.2;

const resolvePieCellKey = (
  segmentKey: string,
  datumValue: unknown,
  seenByBaseKey: Map<string, number>
) => {
  const baseKey = `${segmentKey}-${String(datumValue)}`;
  const occurrence = seenByBaseKey.get(baseKey) ?? 0;
  seenByBaseKey.set(baseKey, occurrence + 1);

  if (occurrence === 0) {
    return baseKey;
  }

  return `${baseKey}-${occurrence}`;
};

const PieChart = <TData extends CompleteChartDatum = CompleteChartDatum>({
  chartProps,
  chartRootProps,
  data,
  dataKey,
  endAngle,
  enableLegendHighlight = true,
  fillOpacity = 1,
  labelMode = "value",
  labelPosition = "outside",
  legendProps,
  nameKey,
  paddingAngle,
  pieChartProps,
  pieProps,
  responsiveContainerProps,
  size,
  series,
  startAngle,
  strokeColor,
  strokeWidth,
  tooltipProps,
  tooltipSource = "segment",
  unit,
  valueFormatter,
  withLabelLine = true,
  withLabels = false,
  withLegend = false,
  withTooltip = true,
}: PieChartProps<TData>) => {
  const {
    fallbackDatum,
    labelFormatter,
    resolvedRadii,
    resolvedAngles,
    resolvedNameKey,
    resolvedSeries,
    resolvedTooltipProps,
    resolvePieChartProps,
    resolveSegmentKey,
  } = usePieChartRuntime({
    chartProps: pieChartProps ?? chartProps,
    data,
    dataKey,
    endAngle,
    labelMode,
    nameKey,
    size,
    series,
    startAngle,
    tooltipProps,
    tooltipSource,
    valueFormatter,
  });
  const formatPieLabel = useCallback(
    (...args: unknown[]) => {
      const [valueCandidate] = args;
      const payloadCandidate = args.find(
        (argument) =>
          argument &&
          typeof argument === "object" &&
          "payload" in (argument as Record<string, unknown>)
      ) as { payload?: TData } | undefined;
      const resolvedValue =
        valueCandidate &&
        typeof valueCandidate === "object" &&
        "value" in (valueCandidate as Record<string, unknown>)
          ? (valueCandidate as { value?: unknown }).value
          : valueCandidate;
      const resolvedDatum = payloadCandidate?.payload ?? fallbackDatum;

      return labelFormatter(resolvedValue, resolvedDatum);
    },
    [fallbackDatum, labelFormatter]
  );

  return (
    <CompleteRadialShell
      chartRootProps={chartRootProps}
      enableLegendHighlight={enableLegendHighlight}
      legendProps={legendProps}
      responsiveContainerProps={responsiveContainerProps}
      series={resolvedSeries}
      tooltipProps={resolvedTooltipProps}
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
      }) => {
        const seenCellCountByKey = new Map<string, number>();

        return (
          <RechartsPieChart
            accessibilityLayer
            {...resolvePieChartProps(usesAutoSizeContainer)}
          >
            {tooltipNode}
            {legendNode}
            <Pie
              data={[...data]}
              dataKey={dataKey}
              endAngle={resolvedAngles.endAngle}
              innerRadius={resolvedRadii.innerRadius}
              label={
                withLabels && labelPosition !== "none"
                  ? {
                      formatter: formatPieLabel,
                      position: labelPosition,
                    }
                  : false
              }
              labelLine={
                withLabels && labelPosition === "outside"
                  ? withLabelLine
                  : false
              }
              nameKey={resolvedNameKey}
              outerRadius={resolvedRadii.outerRadius}
              paddingAngle={paddingAngle}
              startAngle={resolvedAngles.startAngle}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              {...pieProps}
            >
              {data.map((datum, index) => {
                const segmentKey = resolveSegmentKey(datum, index);
                const isDimmed =
                  enableLegendHighlight &&
                  isAnySeriesHighlighted &&
                  !isSeriesHighlighted(segmentKey);
                const fallbackColor = getRadialSegmentColor(datum, index);
                const fillColor = resolvedSeries.some((seriesItem) => {
                  const seriesName =
                    seriesItem.name ?? seriesItem.key ?? `series-${index + 1}`;

                  return seriesName === segmentKey;
                })
                  ? getSeriesColorVar(segmentKey)
                  : fallbackColor;
                const cellKey = resolvePieCellKey(
                  segmentKey,
                  datum[dataKey],
                  seenCellCountByKey
                );

                return (
                  <Cell
                    fill={fillColor}
                    fillOpacity={
                      isDimmed ? DIMMED_PIE_FILL_OPACITY : fillOpacity
                    }
                    key={cellKey}
                  />
                );
              })}
            </Pie>
          </RechartsPieChart>
        );
      }}
    </CompleteRadialShell>
  );
};

export type { PieChartProps };
export { PieChart };
