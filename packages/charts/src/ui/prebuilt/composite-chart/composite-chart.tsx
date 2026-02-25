"use client";

import {
  CartesianGrid,
  ComposedChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import type {
  CompositeChartProps,
  CompleteChartDatum,
} from "../shared/complete-types";

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
import { useCompositeChartRuntime } from "./hooks/use-composite-chart-runtime";
import { renderAreaSeries } from "./renderers/render-area-series";
import { renderBarSeries } from "./renderers/render-bar-series";
import { renderLineSeries } from "./renderers/render-line-series";
import { createPointLabelFormatter } from "./utils/create-point-label-formatter";

const CompositeChart = <TData extends CompleteChartDatum = CompleteChartDatum>({
  areaProps,
  barProps,
  chartProps,
  chartRootProps,
  composedChartProps,
  connectNulls = true,
  curveType = "monotone",
  data,
  dataKey,
  dotProps,
  activeDotProps,
  enableLegendHighlight = true,
  fillOpacity = 1,
  gridAxis = "x",
  gridProps,
  legendProps,
  lineProps,
  maxBarSize,
  maxBarWidth,
  minBarSize,
  referenceLines,
  responsiveContainerProps,
  rightYAxisLabel,
  rightYAxisProps,
  series,
  strokeDasharray = "5 5",
  strokeWidth = 2,
  tickLine = "y",
  tooltipProps,
  unit,
  valueFormatter,
  withBarValueLabel = false,
  withDots = true,
  withLegend = false,
  withPointLabels = false,
  withRightYAxis = false,
  withTooltip = true,
  withXAxis = true,
  withYAxis = true,
  xAxisLabel,
  xAxisProps,
  yAxisLabel,
  yAxisProps,
}: CompositeChartProps<TData>) => {
  const {
    fallbackDatum,
    leftYAxisTickFormatter,
    resolvedBarRadius,
    resolvedMaxBarWidth,
    resolveComposedChartProps,
    rightYAxisTickFormatter,
  } = useCompositeChartRuntime({
    chartProps,
    composedChartProps,
    data,
    maxBarSize,
    maxBarWidth,
    rightYAxisProps,
    series,
    unit,
    valueFormatter,
    yAxisProps,
  });

  return (
    <CompleteCartesianShell
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
      }) => {
        const resolvedComposedChartProps = resolveComposedChartProps(
          usesAutoSizeContainer
        );

        return (
          <ComposedChart
            accessibilityLayer
            data={[...data]}
            {...resolvedComposedChartProps}
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
                dataKey={dataKey}
                tickLine={shouldRenderXAxisTickLine(tickLine)}
                {...(xAxisLabel ? { label: xAxisLabel } : {})}
                {...xAxisProps}
              />
            ) : null}
            {withYAxis ? (
              <YAxis
                tickFormatter={leftYAxisTickFormatter}
                tickLine={shouldRenderYAxisTickLine(tickLine)}
                {...(yAxisLabel ? { label: yAxisLabel } : {})}
                {...yAxisProps}
              />
            ) : null}
            {withRightYAxis ? (
              <YAxis
                orientation="right"
                tickFormatter={rightYAxisTickFormatter}
                tickLine={shouldRenderYAxisTickLine(tickLine)}
                {...(rightYAxisLabel ? { label: rightYAxisLabel } : {})}
                {...rightYAxisProps}
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
              const seriesName = resolveCompleteSeriesName(
                seriesItem,
                `series-${index + 1}`
              );
              const seriesColor = getSeriesColorVar(seriesName);
              const isDimmed =
                enableLegendHighlight &&
                isAnySeriesHighlighted &&
                !isSeriesHighlighted(seriesName);
              const pointLabelValueFormatter = createPointLabelFormatter(
                valueFormatter,
                seriesName
              );
              const pointLabelContentRenderer = createLabelListContentRenderer({
                datumByIndex: data,
                fallbackDatum,
                resolveLabelValue: pointLabelValueFormatter,
              });

              if (seriesItem.type === "line") {
                return renderLineSeries({
                  activeDotProps,
                  connectNulls,
                  curveType,
                  dotProps,
                  fillOpacity,
                  isDimmed,
                  lineProps,
                  pointLabelContentRenderer,
                  seriesColor,
                  seriesItem,
                  seriesName,
                  strokeWidth,
                  withBarValueLabel,
                  withDots,
                  withPointLabels,
                });
              }

              if (seriesItem.type === "area") {
                return renderAreaSeries({
                  activeDotProps,
                  areaProps,
                  connectNulls,
                  curveType,
                  dotProps,
                  fillOpacity,
                  isDimmed,
                  pointLabelContentRenderer,
                  seriesColor,
                  seriesItem,
                  seriesName,
                  strokeWidth,
                  withDots,
                  withPointLabels,
                });
              }

              return renderBarSeries({
                barProps,
                fillOpacity,
                isDimmed,
                maxBarWidth: resolvedMaxBarWidth,
                minBarSize,
                pointLabelContentRenderer,
                resolvedBarRadius,
                seriesColor,
                seriesItem,
                seriesName,
                withBarValueLabel,
              });
            })}
          </ComposedChart>
        );
      }}
    </CompleteCartesianShell>
  );
};

export { CompositeChart };

export type { CompositeChartProps } from "../shared/complete-types";
