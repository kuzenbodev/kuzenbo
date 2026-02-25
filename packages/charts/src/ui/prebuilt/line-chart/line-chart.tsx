"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart as RechartsLineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import type {
  CompleteChartDatum,
  LineChartProps,
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
import { useLineChartRuntime } from "./hooks/use-line-chart-runtime";
import { createPointLabelFormatter } from "./utils/create-point-label-formatter";
import { resolveLineDotProps } from "./utils/resolve-line-dot-props";

const DIMMED_LINE_OPACITY = 0.45;

const LineChart = <TData extends CompleteChartDatum = CompleteChartDatum>({
  chartProps,
  chartRootProps,
  connectNulls = true,
  curveType = "monotone",
  data,
  dataKey,
  dotProps,
  activeDotProps,
  enableLegendHighlight = true,
  fillOpacity = 1,
  gradientStops,
  gridAxis = "x",
  gridProps,
  legendProps,
  lineProps,
  lineChartProps,
  referenceLines,
  responsiveContainerProps,
  rightYAxisLabel,
  rightYAxisProps,
  series,
  strokeDasharray = "5 5",
  strokeWidth = 2,
  tickLine = "y",
  tooltipProps,
  type = "default",
  unit,
  valueFormatter,
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
}: LineChartProps<TData>) => {
  const {
    fallbackDatum,
    gradientId,
    leftYAxisTickFormatter,
    resolvedGradientStops,
    resolveLineChartProps,
    rightYAxisTickFormatter,
  } = useLineChartRuntime({
    chartProps,
    data,
    gradientStops,
    lineChartProps,
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
        const resolvedLineChartProps = resolveLineChartProps(
          usesAutoSizeContainer
        );

        return (
          <RechartsLineChart
            accessibilityLayer
            data={[...data]}
            {...resolvedLineChartProps}
          >
            {type === "gradient" ? (
              <defs>
                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                  {resolvedGradientStops.map((stop) => (
                    <stop
                      key={`${gradientId}-${stop.offset}-${stop.color}`}
                      offset={`${stop.offset}%`}
                      stopColor={stop.color}
                    />
                  ))}
                </linearGradient>
              </defs>
            ) : null}
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
              const resolvedLineProps =
                typeof lineProps === "function"
                  ? lineProps(seriesItem)
                  : lineProps;
              const seriesName = resolveCompleteSeriesName(
                seriesItem,
                `series-${index + 1}`
              );
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
              const resolvedDotProps = resolveLineDotProps({
                dotProps,
                isDimmed,
                withDots,
              });
              const resolvedActiveDotProps = resolveLineDotProps({
                dotProps: activeDotProps,
                isDimmed,
                withDots,
              });

              return (
                <Line
                  activeDot={resolvedActiveDotProps}
                  connectNulls={connectNulls}
                  dataKey={seriesName}
                  dot={resolvedDotProps}
                  fill={getSeriesColorVar(seriesName)}
                  fillOpacity={isDimmed ? DIMMED_LINE_OPACITY : fillOpacity}
                  key={seriesName}
                  name={seriesName}
                  stroke={
                    type === "gradient"
                      ? `url(#${gradientId})`
                      : getSeriesColorVar(seriesName)
                  }
                  strokeDasharray={seriesItem.strokeDasharray}
                  strokeOpacity={isDimmed ? DIMMED_LINE_OPACITY : fillOpacity}
                  strokeWidth={strokeWidth}
                  type={seriesItem.curveType ?? curveType}
                  yAxisId={seriesItem.yAxisId}
                  {...resolvedLineProps}
                >
                  {withPointLabels ? (
                    <LabelList
                      content={pointLabelContentRenderer}
                      dataKey={seriesName}
                      fill="var(--color-foreground)"
                      fontSize={12}
                      fontWeight={600}
                      position="top"
                    />
                  ) : null}
                </Line>
              );
            })}
          </RechartsLineChart>
        );
      }}
    </CompleteCartesianShell>
  );
};

export { LineChart };

export type { LineChartProps } from "../shared/complete-types";
