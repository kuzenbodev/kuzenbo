"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  LabelList,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import type {
  BarChartProps,
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
import { useBarChartRuntime } from "./hooks/use-bar-chart-runtime";
import { buildBarCells } from "./utils/build-bar-cells";
import { createBarValueLabelFormatter } from "./utils/create-bar-value-label-formatter";

const DIMMED_BAR_FILL_OPACITY = 0.2;
const DIMMED_BAR_STROKE_OPACITY = 0.25;
const DEFAULT_WATERFALL_POSITIVE_BAR_COLOR = "var(--color-success-foreground)";
const DEFAULT_WATERFALL_NEGATIVE_BAR_COLOR = "var(--color-danger-foreground)";

const getDefaultWaterfallBarColor = (value: number): string =>
  value < 0
    ? DEFAULT_WATERFALL_NEGATIVE_BAR_COLOR
    : DEFAULT_WATERFALL_POSITIVE_BAR_COLOR;

const BarChart = <TData extends CompleteChartDatum = CompleteChartDatum>({
  barProps,
  barChartProps,
  chartProps,
  chartRootProps,
  cursorFill,
  data,
  dataKey,
  enableLegendHighlight = true,
  fillOpacity = 1,
  getBarColor,
  gridAxis = "x",
  gridProps,
  legendProps,
  maxBarSize,
  maxBarWidth,
  minBarSize,
  radius,
  referenceLines,
  responsiveContainerProps,
  rightYAxisLabel,
  rightYAxisProps,
  series,
  strokeDasharray = "5 5",
  tickLine = "y",
  tooltipProps,
  type = "default",
  unit,
  valueFormatter,
  valueLabelProps,
  withBarValueLabel = false,
  withLegend = false,
  withRightYAxis = false,
  withTooltip = true,
  withXAxis = true,
  withYAxis = true,
  xAxisLabel,
  xAxisProps,
  yAxisLabel,
  yAxisProps,
}: BarChartProps<TData>) => {
  const {
    effectiveValueFormatter,
    fallbackDatum,
    isVerticalLayout,
    resolvedMaxBarWidth,
    resolvedRadius,
    resolvedRightYAxisTickFormatter,
    resolvedTooltipProps,
    resolveBarChartProps,
    shouldUseStack,
    transformedData,
    xAxisTickFormatter,
    yAxisTickFormatter,
  } = useBarChartRuntime({
    barChartProps,
    chartProps,
    cursorFill,
    data,
    dataKey,
    maxBarSize,
    maxBarWidth,
    radius,
    rightYAxisProps,
    series,
    tooltipProps,
    type,
    unit,
    valueFormatter,
    xAxisProps,
    yAxisProps,
  });
  const resolvedGetBarColor =
    type === "waterfall"
      ? (getBarColor ?? getDefaultWaterfallBarColor)
      : getBarColor;

  return (
    <CompleteCartesianShell
      chartRootProps={chartRootProps}
      enableLegendHighlight={enableLegendHighlight}
      legendProps={legendProps}
      responsiveContainerProps={responsiveContainerProps}
      series={series}
      tooltipProps={resolvedTooltipProps}
      unit={unit}
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
        const resolvedBarChartProps = resolveBarChartProps(
          usesAutoSizeContainer
        );

        return (
          <RechartsBarChart
            accessibilityLayer
            data={transformedData}
            {...resolvedBarChartProps}
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
                dataKey={isVerticalLayout ? undefined : dataKey}
                tickFormatter={xAxisTickFormatter}
                tickLine={shouldRenderXAxisTickLine(tickLine)}
                {...(xAxisLabel ? { label: xAxisLabel } : {})}
                {...xAxisProps}
              />
            ) : null}
            {withYAxis ? (
              <YAxis
                dataKey={isVerticalLayout ? dataKey : undefined}
                tickFormatter={yAxisTickFormatter}
                tickLine={shouldRenderYAxisTickLine(tickLine)}
                {...(yAxisLabel ? { label: yAxisLabel } : {})}
                {...yAxisProps}
              />
            ) : null}
            {withRightYAxis ? (
              <YAxis
                orientation="right"
                tickFormatter={resolvedRightYAxisTickFormatter}
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
              const resolvedBarProps =
                typeof barProps === "function"
                  ? barProps(seriesItem)
                  : barProps;
              const resolvedValueLabelProps =
                typeof valueLabelProps === "function"
                  ? valueLabelProps(seriesItem)
                  : valueLabelProps;
              const seriesName = resolveCompleteSeriesName(
                seriesItem,
                `series-${index + 1}`
              );
              const barColor = getSeriesColorVar(seriesName);
              const isDimmed =
                enableLegendHighlight &&
                isAnySeriesHighlighted &&
                !isSeriesHighlighted(seriesName);
              const barValueLabelValueFormatter = createBarValueLabelFormatter(
                effectiveValueFormatter,
                seriesName
              );
              const barValueLabelContentRenderer =
                createLabelListContentRenderer({
                  datumByIndex: data,
                  fallbackDatum,
                  resolveLabelValue: barValueLabelValueFormatter,
                });
              const barCells = buildBarCells({
                barColor,
                data: transformedData,
                dataKey,
                getBarColor: resolvedGetBarColor,
                seriesItem,
                seriesName,
              });

              return (
                <Bar
                  dataKey={seriesName}
                  fill={barColor}
                  fillOpacity={isDimmed ? DIMMED_BAR_FILL_OPACITY : fillOpacity}
                  key={seriesName}
                  maxBarSize={resolvedMaxBarWidth}
                  minPointSize={minBarSize}
                  radius={resolvedRadius}
                  stackId={shouldUseStack ? "stack" : seriesItem.stackId}
                  stroke={barColor}
                  strokeOpacity={isDimmed ? DIMMED_BAR_STROKE_OPACITY : 0}
                  yAxisId={seriesItem.yAxisId}
                  {...resolvedBarProps}
                >
                  {barCells}
                  {withBarValueLabel ? (
                    <LabelList
                      dataKey={seriesName}
                      fill="var(--color-foreground)"
                      fontSize={12}
                      content={barValueLabelContentRenderer}
                      fontWeight={600}
                      position={isVerticalLayout ? "right" : "top"}
                      {...resolvedValueLabelProps}
                    />
                  ) : null}
                </Bar>
              );
            })}
          </RechartsBarChart>
        );
      }}
    </CompleteCartesianShell>
  );
};

export { BarChart };

export type {
  BarChartProps,
  CompleteChartSeries,
} from "../shared/complete-types";
