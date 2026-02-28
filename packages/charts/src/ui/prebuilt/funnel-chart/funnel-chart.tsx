"use client";

import type { ComponentProps } from "react";
import { useCallback } from "react";
import {
  Cell,
  Funnel,
  FunnelChart as RechartsFunnelChart,
  LabelList,
} from "recharts";
import type { LegendProps, TooltipProps } from "recharts";

import type { ChartRootProps } from "../../primitives/chart";
import { CompleteRadialShell } from "../shared/complete-radial-shell";
import type {
  CompleteChartDatum,
  CompleteChartSeries,
} from "../shared/complete-types";
import { getRadialSegmentColor } from "../shared/utils/radial/get-radial-segment-color";
import type { CompleteTooltipSourceMode } from "../shared/utils/radial/resolve-tooltip-source-shared";
import { useFunnelChartRuntime } from "./hooks/use-funnel-chart-runtime";

type FunnelChartRootProps = Omit<
  ComponentProps<typeof RechartsFunnelChart>,
  "children" | "data" | "ref"
>;

type FunnelSeriesProps = Partial<
  Omit<
    ComponentProps<typeof Funnel>,
    "children" | "dataKey" | "nameKey" | "ref"
  >
>;

type FunnelLabelPosition = "inside" | "left" | "right" | "none";

interface FunnelChartProps<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  chartProps?: FunnelChartRootProps;
  chartRootProps?: Omit<ChartRootProps, "children" | "config">;
  data: readonly TData[];
  dataKey: keyof TData & string;
  enableLegendHighlight?: boolean;
  fillOpacity?: number;
  funnelChartProps?: FunnelChartRootProps;
  funnelProps?: FunnelSeriesProps;
  labelPosition?: FunnelLabelPosition;
  legendProps?: Omit<LegendProps, "content" | "ref">;
  nameKey?: keyof TData & string;
  responsiveContainerProps?: ChartRootProps["responsiveContainerProps"];
  series?: readonly CompleteChartSeries[];
  tooltipProps?: Omit<TooltipProps<number, string>, "content" | "ref">;
  tooltipSource?: CompleteTooltipSourceMode;
  unit?: string;
  valueFormatter?: (value: number, seriesKey: string, datum: TData) => string;
  withLabels?: boolean;
  withLegend?: boolean;
  withTooltip?: boolean;
}

const DIMMED_FUNNEL_FILL_OPACITY = 0.2;

const resolveFunnelCellKey = (
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

const FunnelChart = <TData extends CompleteChartDatum = CompleteChartDatum>({
  chartProps,
  chartRootProps,
  data,
  dataKey,
  enableLegendHighlight = true,
  fillOpacity = 1,
  funnelChartProps,
  funnelProps,
  labelPosition = "right",
  legendProps,
  nameKey,
  responsiveContainerProps,
  series,
  tooltipProps,
  tooltipSource = "segment",
  unit,
  valueFormatter,
  withLabels = false,
  withLegend = false,
  withTooltip = true,
}: FunnelChartProps<TData>) => {
  const {
    fallbackDatum,
    labelFormatter,
    resolvedNameKey,
    resolvedSeries,
    resolvedTooltipProps,
    resolveFunnelChartProps,
    resolveSegmentKey,
  } = useFunnelChartRuntime({
    chartProps: funnelChartProps ?? chartProps,
    data,
    dataKey,
    nameKey,
    series,
    tooltipProps,
    tooltipSource,
    valueFormatter,
  });
  const formatFunnelLabel = useCallback(
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
          <RechartsFunnelChart
            accessibilityLayer
            {...resolveFunnelChartProps(usesAutoSizeContainer)}
          >
            {tooltipNode}
            {legendNode}
            <Funnel
              data={[...data]}
              dataKey={dataKey}
              nameKey={resolvedNameKey}
              {...funnelProps}
            >
              {withLabels && labelPosition !== "none" ? (
                <LabelList
                  dataKey={dataKey}
                  formatter={formatFunnelLabel}
                  position={
                    labelPosition as ComponentProps<
                      typeof LabelList
                    >["position"]
                  }
                />
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
                const cellKey = resolveFunnelCellKey(
                  segmentKey,
                  datum[dataKey],
                  seenCellCountByKey
                );

                return (
                  <Cell
                    fill={fillColor}
                    fillOpacity={
                      isDimmed ? DIMMED_FUNNEL_FILL_OPACITY : fillOpacity
                    }
                    key={cellKey}
                  />
                );
              })}
            </Funnel>
          </RechartsFunnelChart>
        );
      }}
    </CompleteRadialShell>
  );
};

export type { CompleteChartSeries, FunnelChartProps, FunnelLabelPosition };
export { FunnelChart };
