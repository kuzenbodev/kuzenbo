"use client";

import type { ComponentProps } from "react";
import { useCallback } from "react";
import {
  Cell,
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
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
import { useRadialBarChartRuntime } from "./hooks/use-radial-bar-chart-runtime";

type RadialBarChartRootProps = Omit<
  ComponentProps<typeof RechartsRadialBarChart>,
  "children" | "data" | "ref"
>;

type RadialBarSeriesProps = Partial<
  Omit<
    ComponentProps<typeof RadialBar>,
    "children" | "data" | "dataKey" | "nameKey" | "ref"
  >
>;

type RadialBarLabelPosition =
  | "inside"
  | "outside"
  | "insideStart"
  | "insideEnd"
  | "end"
  | "none";

interface RadialBarChartProps<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  background?: ComponentProps<typeof RadialBar>["background"];
  chartProps?: RadialBarChartRootProps;
  chartRootProps?: Omit<ChartRootProps, "children" | "config">;
  data: readonly TData[];
  dataKey: keyof TData & string;
  endAngle?: number;
  enableLegendHighlight?: boolean;
  fillOpacity?: number;
  labelMode?: RadialLabelMode;
  labelPosition?: RadialBarLabelPosition;
  legendProps?: Omit<LegendProps, "content" | "ref">;
  nameKey?: keyof TData & string;
  radialBarChartProps?: RadialBarChartRootProps;
  radialBarProps?: RadialBarSeriesProps;
  responsiveContainerProps?: ChartRootProps["responsiveContainerProps"];
  series?: readonly CompleteChartSeries[];
  startAngle?: number;
  tooltipProps?: Omit<TooltipProps<number, string>, "content" | "ref">;
  tooltipSource?: CompleteTooltipSourceMode;
  unit?: string;
  valueFormatter?: (value: number, seriesKey: string, datum: TData) => string;
  withBackground?: boolean;
  withLabels?: boolean;
  withLegend?: boolean;
  withTooltip?: boolean;
}

const DIMMED_RADIAL_BAR_FILL_OPACITY = 0.2;

const resolveRadialBarCellKey = (
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

const RadialBarChart = <TData extends CompleteChartDatum = CompleteChartDatum>({
  background,
  chartProps,
  chartRootProps,
  data,
  dataKey,
  endAngle,
  enableLegendHighlight = true,
  fillOpacity = 1,
  labelMode = "value",
  labelPosition = "inside",
  legendProps,
  nameKey,
  radialBarChartProps,
  radialBarProps,
  responsiveContainerProps,
  series,
  startAngle,
  tooltipProps,
  tooltipSource = "segment",
  unit,
  valueFormatter,
  withBackground = false,
  withLabels = false,
  withLegend = false,
  withTooltip = true,
}: RadialBarChartProps<TData>) => {
  const {
    fallbackDatum,
    labelFormatter,
    resolvedAngles,
    resolvedSeries,
    resolvedTooltipProps,
    resolveRadialBarChartProps,
    resolveSegmentKey,
  } = useRadialBarChartRuntime({
    chartProps: radialBarChartProps ?? chartProps,
    data,
    dataKey,
    endAngle,
    labelMode,
    nameKey,
    series,
    startAngle,
    tooltipProps,
    tooltipSource,
    valueFormatter,
  });
  const formatRadialBarLabel = useCallback(
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
          <RechartsRadialBarChart
            accessibilityLayer
            data={[...data]}
            endAngle={resolvedAngles.endAngle}
            startAngle={resolvedAngles.startAngle}
            {...resolveRadialBarChartProps(usesAutoSizeContainer)}
          >
            {tooltipNode}
            {legendNode}
            <RadialBar
              background={background ?? (withBackground ? true : undefined)}
              dataKey={dataKey}
              label={
                withLabels && labelPosition !== "none"
                  ? ({
                      formatter: formatRadialBarLabel,
                      position: labelPosition,
                    } as ComponentProps<typeof RadialBar>["label"])
                  : false
              }
              {...radialBarProps}
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
                const cellKey = resolveRadialBarCellKey(
                  segmentKey,
                  datum[dataKey],
                  seenCellCountByKey
                );

                return (
                  <Cell
                    fill={fillColor}
                    fillOpacity={
                      isDimmed ? DIMMED_RADIAL_BAR_FILL_OPACITY : fillOpacity
                    }
                    key={cellKey}
                  />
                );
              })}
            </RadialBar>
          </RechartsRadialBarChart>
        );
      }}
    </CompleteRadialShell>
  );
};

export type {
  RadialBarChartProps,
  RadialBarLabelPosition,
  RadialBarSeriesProps,
};
export { RadialBarChart };
