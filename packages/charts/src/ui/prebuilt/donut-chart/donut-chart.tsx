"use client";

import type { ComponentProps, ReactNode } from "react";

import { useCallback } from "react";
import {
  Cell,
  Label,
  Pie,
  PieChart as RechartsPieChart,
  type LegendProps,
  type TooltipProps,
} from "recharts";

import type { ChartRootProps } from "../../primitives/chart";
import type {
  CompleteChartDatum,
  CompleteChartSeries,
} from "../shared/complete-types";
import type { RadialLabelMode } from "../shared/utils/radial/create-radial-label-formatter";
import type { CompleteTooltipSourceMode } from "../shared/utils/radial/resolve-tooltip-source-shared";

import { CompleteRadialShell } from "../shared/complete-radial-shell";
import { getRadialSegmentColor } from "../shared/utils/radial/get-radial-segment-color";
import { useDonutChartRuntime } from "./hooks/use-donut-chart-runtime";

type DonutPieChartProps = Omit<
  ComponentProps<typeof RechartsPieChart>,
  "children" | "data" | "ref"
>;

type DonutPieProps = Partial<
  Omit<ComponentProps<typeof Pie>, "children" | "data" | "dataKey" | "ref">
>;

interface DonutCenterLabelContext {
  total: number;
}

interface DonutChartProps<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  chartProps?: DonutPieChartProps;
  chartRootProps?: Omit<ChartRootProps, "children" | "config">;
  data: readonly TData[];
  dataKey: keyof TData & string;
  endAngle?: number;
  enableLegendHighlight?: boolean;
  fillOpacity?: number;
  isSemicircle?: boolean;
  labelMode?: RadialLabelMode;
  legendProps?: Omit<LegendProps, "content" | "ref">;
  nameKey?: keyof TData & string;
  paddingAngle?: ComponentProps<typeof Pie>["paddingAngle"];
  pieChartProps?: DonutPieChartProps;
  pieProps?: DonutPieProps;
  responsiveContainerProps?: ChartRootProps["responsiveContainerProps"];
  size?: ComponentProps<typeof Pie>["outerRadius"];
  series?: readonly CompleteChartSeries[];
  startAngle?: number;
  strokeColor?: ComponentProps<typeof Pie>["stroke"];
  strokeWidth?: ComponentProps<typeof Pie>["strokeWidth"];
  thickness?: number;
  tooltipProps?: Omit<TooltipProps<number, string>, "content" | "ref">;
  tooltipSource?: CompleteTooltipSourceMode;
  unit?: string;
  valueFormatter?: (value: number, seriesKey: string, datum: TData) => string;
  withLabelLine?: boolean;
  withLabels?: boolean;
  labelPosition?: "inside" | "outside";
  withLegend?: boolean;
  withTooltip?: boolean;
  centerLabel?: ReactNode | ((context: DonutCenterLabelContext) => ReactNode);
}

const DIMMED_DONUT_FILL_OPACITY = 0.2;

const resolveDonutCellKey = (
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

const toCoordinate = (value: unknown) => {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return 0;
};

const DonutChart = <TData extends CompleteChartDatum = CompleteChartDatum>({
  centerLabel,
  chartProps,
  chartRootProps,
  data,
  dataKey,
  endAngle,
  enableLegendHighlight = true,
  fillOpacity = 1,
  isSemicircle = false,
  labelMode = "percent",
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
  thickness,
  tooltipProps,
  tooltipSource = "segment",
  unit,
  valueFormatter,
  withLabelLine = true,
  withLabels = false,
  withLegend = false,
  withTooltip = true,
}: DonutChartProps<TData>) => {
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
    totalValue,
  } = useDonutChartRuntime({
    chartProps: pieChartProps ?? chartProps,
    data,
    dataKey,
    fallbackNameKey: "name" as keyof TData & string,
    isSemicircle,
    labelMode,
    nameKey,
    series,
    startAngle,
    size,
    thickness,
    endAngle,
    tooltipProps,
    tooltipSource,
    valueFormatter,
  });

  const centerLabelNode =
    typeof centerLabel === "function"
      ? centerLabel({ total: totalValue })
      : centerLabel;
  const formatDonutLabel = useCallback(
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
  const renderCenterLabel = useCallback(
    ({ viewBox }: { viewBox?: unknown }) => {
      if (!viewBox || typeof viewBox !== "object") {
        return null;
      }

      const cx = toCoordinate((viewBox as { cx?: unknown }).cx);
      const cy = toCoordinate((viewBox as { cy?: unknown }).cy);

      return (
        <text
          dominantBaseline="middle"
          fill="var(--color-foreground)"
          textAnchor="middle"
          x={cx}
          y={cy}
        >
          {centerLabelNode}
        </text>
      );
    },
    [centerLabelNode]
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
                withLabels
                  ? {
                      formatter: formatDonutLabel,
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
              {centerLabelNode ? (
                <Label content={renderCenterLabel} position="center" />
              ) : null}
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
                const cellKey = resolveDonutCellKey(
                  segmentKey,
                  datum[dataKey],
                  seenCellCountByKey
                );

                return (
                  <Cell
                    fill={fillColor}
                    fillOpacity={
                      isDimmed ? DIMMED_DONUT_FILL_OPACITY : fillOpacity
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

export type { DonutChartProps, DonutCenterLabelContext };
export { DonutChart };
