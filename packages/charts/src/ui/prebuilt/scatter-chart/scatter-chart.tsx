"use client";

import {
  CartesianGrid,
  ReferenceLine,
  Scatter,
  ScatterChart as RechartsScatterChart,
  XAxis,
  YAxis,
} from "recharts";

import type {
  ScatterChartProps,
  ScatterChartDatum,
} from "./scatter-chart-types";

import { CompleteCartesianShell } from "../shared/complete-cartesian-shell";
import {
  getReferenceLineKey,
  resolveCompleteSeriesName,
  resolveReferenceLineLabel,
  shouldRenderGridX,
  shouldRenderGridY,
  shouldRenderXAxisTickLine,
  shouldRenderYAxisTickLine,
} from "../shared/complete-helpers";
import { createLabelListContentRenderer } from "../shared/utils/label/create-label-list-content-renderer";
import { useScatterChartRuntime } from "./hooks/use-scatter-chart-runtime";
import { createPointLabelFormatter } from "./utils/create-point-label-formatter";

const DIMMED_SCATTER_FILL_OPACITY = 0.2;
const DIMMED_SCATTER_STROKE_OPACITY = 0.25;

const ScatterChart = <TData extends ScatterChartDatum = ScatterChartDatum>({
  chartProps,
  chartRootProps,
  enableLegendHighlight = true,
  fillOpacity = 1,
  gridAxis = "xy",
  gridProps,
  legendProps,
  pointLabelDataKey,
  pointLabelFormatter,
  referenceLines,
  responsiveContainerProps,
  scatterChartProps,
  scatterProps,
  series,
  strokeDasharray = "5 5",
  tickLine = "y",
  tooltipProps,
  valueFormatter,
  withLegend = false,
  withPointLabels = false,
  withTooltip = true,
  withXAxis = true,
  withYAxis = true,
  xAxisLabel,
  xAxisProps,
  xKey,
  xUnit,
  xValueFormatter,
  yAxisLabel,
  yAxisProps,
  yKey,
  yUnit,
  yValueFormatter,
}: ScatterChartProps<TData>) => {
  const {
    effectiveValueFormatter,
    fallbackDatum,
    resolveScatterChartProps,
    xAxisTickFormatter,
    yAxisTickFormatter,
  } = useScatterChartRuntime({
    chartProps,
    scatterChartProps,
    series,
    valueFormatter,
    xAxisProps,
    xKey,
    xUnit,
    xValueFormatter,
    yAxisProps,
    yKey,
    yUnit,
    yValueFormatter,
  });

  return (
    <CompleteCartesianShell
      chartRootProps={chartRootProps}
      enableLegendHighlight={enableLegendHighlight}
      legendProps={legendProps}
      responsiveContainerProps={responsiveContainerProps}
      series={series}
      tooltipProps={tooltipProps}
      valueFormatter={effectiveValueFormatter}
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
        const resolvedScatterChartProps = resolveScatterChartProps(
          usesAutoSizeContainer
        );

        return (
          <RechartsScatterChart
            accessibilityLayer
            {...resolvedScatterChartProps}
          >
            {gridAxis === "none" ? null : (
              <CartesianGrid
                horizontal={shouldRenderGridY(gridAxis)}
                strokeDasharray={String(strokeDasharray)}
                vertical={shouldRenderGridX(gridAxis)}
                {...gridProps}
              />
            )}
            {withXAxis ? (
              <XAxis
                dataKey={xKey}
                tickFormatter={xAxisTickFormatter}
                tickLine={shouldRenderXAxisTickLine(tickLine)}
                type="number"
                {...(xAxisLabel ? { label: xAxisLabel } : {})}
                {...xAxisProps}
              />
            ) : null}
            {withYAxis ? (
              <YAxis
                dataKey={yKey}
                tickFormatter={yAxisTickFormatter}
                tickLine={shouldRenderYAxisTickLine(tickLine)}
                type="number"
                {...(yAxisLabel ? { label: yAxisLabel } : {})}
                {...yAxisProps}
              />
            ) : null}
            {referenceLines?.map((referenceLine) => (
              <ReferenceLine
                key={getReferenceLineKey(
                  referenceLine.x,
                  referenceLine.y,
                  referenceLine.label
                )}
                label={resolveReferenceLineLabel(referenceLine.label)}
                stroke={referenceLine.color}
                strokeDasharray={referenceLine.strokeDasharray}
                x={referenceLine.x}
                y={referenceLine.y}
              />
            ))}
            {tooltipNode}
            {legendNode}
            {series.map((seriesItem, index) => {
              const resolvedScatterProps =
                typeof scatterProps === "function"
                  ? scatterProps(seriesItem)
                  : scatterProps;
              const resolvedScatterIsAnimationActive =
                resolvedScatterProps?.isAnimationActive ?? false;
              const seriesName = resolveCompleteSeriesName(
                seriesItem,
                `series-${index + 1}`
              );
              const pointLabelValueKey = pointLabelDataKey ?? yKey;
              const pointLabelValueFormatter = createPointLabelFormatter({
                pointLabelFormatter,
                seriesName,
                valueFormatter: effectiveValueFormatter,
              });
              const pointLabelContentRenderer = createLabelListContentRenderer({
                datumByIndex: seriesItem.data as readonly TData[],
                fallbackDatum,
                resolveLabelValue: pointLabelValueFormatter,
              });
              const seriesColor = getSeriesColorVar(seriesName);
              const seriesLabel =
                typeof seriesItem.label === "string"
                  ? seriesItem.label
                  : undefined;
              const isHighlighted =
                isSeriesHighlighted(seriesName) ||
                (seriesLabel ? isSeriesHighlighted(seriesLabel) : false);
              const isDimmed =
                enableLegendHighlight &&
                isAnySeriesHighlighted &&
                !isHighlighted;
              const isHidden = isDimmed;

              return (
                <Scatter
                  data={[...seriesItem.data]}
                  fill={seriesColor}
                  fillOpacity={
                    isDimmed ? DIMMED_SCATTER_FILL_OPACITY : fillOpacity
                  }
                  key={seriesName}
                  name={seriesName}
                  opacity={isDimmed ? DIMMED_SCATTER_FILL_OPACITY : fillOpacity}
                  stroke={seriesColor}
                  strokeOpacity={
                    isDimmed ? DIMMED_SCATTER_STROKE_OPACITY : fillOpacity
                  }
                  hide={isHidden}
                  isAnimationActive={resolvedScatterIsAnimationActive}
                  label={
                    withPointLabels
                      ? {
                          dataKey: pointLabelValueKey,
                          fill: "var(--color-foreground)",
                          fontSize: 12,
                          fontWeight: 600,
                          content: pointLabelContentRenderer,
                          position: "top",
                        }
                      : false
                  }
                  {...resolvedScatterProps}
                />
              );
            })}
          </RechartsScatterChart>
        );
      }}
    </CompleteCartesianShell>
  );
};

export { ScatterChart };

export type { ScatterChartProps } from "./scatter-chart-types";
