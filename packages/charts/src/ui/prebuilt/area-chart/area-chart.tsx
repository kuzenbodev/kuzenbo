"use client";

import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

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
import type { CompleteChartDatum } from "../shared/complete-types";
import { createLabelListContentRenderer } from "../shared/utils/label/create-label-list-content-renderer";
import type { AreaChartProps } from "./area-chart-types";
import { useAreaChartRuntime } from "./hooks/use-area-chart-runtime";
import { createPointLabelFormatter } from "./utils/create-point-label-formatter";
import { resolveAreaDotProps } from "./utils/resolve-area-dot-props";
import { toSafeGradientIdSegment } from "./utils/to-safe-gradient-id-segment";

const DIMMED_AREA_OPACITY = 0.45;

const AreaChart = <TData extends CompleteChartDatum = CompleteChartDatum>({
  areaChartProps,
  chartProps,
  areaProps,
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
  withDots = false,
  withGradient = false,
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
}: AreaChartProps<TData>) => {
  const {
    effectiveValueFormatter,
    fallbackDatum,
    gradientIdPrefix,
    resolvedGradientStops,
    resolvedLeftYAxisTickFormatter,
    resolvedRightYAxisTickFormatter,
    resolveAreaChartProps,
    shouldUseStack,
  } = useAreaChartRuntime({
    areaChartProps,
    chartProps,
    data,
    gradientStops,
    rightYAxisProps,
    series,
    type,
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
        const resolvedAreaChartProps = resolveAreaChartProps(
          usesAutoSizeContainer
        );

        return (
          <RechartsAreaChart
            accessibilityLayer
            data={[...data]}
            {...resolvedAreaChartProps}
          >
            {withGradient ? (
              <defs>
                {series.map((seriesItem, index) => {
                  const seriesName = resolveCompleteSeriesName(
                    seriesItem,
                    `series-${index + 1}`
                  );
                  const areaGradientId = `${gradientIdPrefix}-${toSafeGradientIdSegment(
                    seriesName
                  )}`;
                  const seriesColor = getSeriesColorVar(seriesName);

                  return (
                    <linearGradient
                      id={areaGradientId}
                      key={areaGradientId}
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      {resolvedGradientStops.map((stop) => (
                        <stop
                          key={`${areaGradientId}-${stop.offset}-${stop.opacity}`}
                          offset={`${stop.offset}%`}
                          stopColor={seriesColor}
                          stopOpacity={stop.opacity}
                        />
                      ))}
                    </linearGradient>
                  );
                })}
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
                tickFormatter={resolvedLeftYAxisTickFormatter}
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
              const resolvedAreaProps =
                typeof areaProps === "function"
                  ? areaProps(seriesItem)
                  : areaProps;
              const resolvedAreaIsAnimationActive =
                resolvedAreaProps?.isAnimationActive ?? false;
              const seriesName = resolveCompleteSeriesName(
                seriesItem,
                `series-${index + 1}`
              );
              const areaColor = getSeriesColorVar(seriesName);
              const areaGradientId = `${gradientIdPrefix}-${toSafeGradientIdSegment(
                seriesName
              )}`;
              const isDimmed =
                enableLegendHighlight &&
                isAnySeriesHighlighted &&
                !isSeriesHighlighted(seriesName);
              const pointLabelValueFormatter = createPointLabelFormatter(
                effectiveValueFormatter,
                seriesName
              );
              const pointLabelContentRenderer = createLabelListContentRenderer({
                datumByIndex: data,
                fallbackDatum,
                resolveLabelValue: pointLabelValueFormatter,
              });
              const resolvedDotProps = resolveAreaDotProps({
                dotProps,
                isDimmed,
                withDots,
              });
              const resolvedActiveDotProps = resolveAreaDotProps({
                dotProps: activeDotProps,
                isDimmed,
                withDots,
              });

              return (
                <Area
                  activeDot={resolvedActiveDotProps}
                  connectNulls={connectNulls}
                  dataKey={seriesName}
                  dot={resolvedDotProps}
                  fill={withGradient ? `url(#${areaGradientId})` : areaColor}
                  fillOpacity={isDimmed ? DIMMED_AREA_OPACITY : fillOpacity}
                  key={seriesName}
                  name={seriesName}
                  stackId={shouldUseStack ? "stack" : seriesItem.stackId}
                  stroke={areaColor}
                  strokeDasharray={seriesItem.strokeDasharray}
                  strokeOpacity={isDimmed ? DIMMED_AREA_OPACITY : fillOpacity}
                  strokeWidth={strokeWidth}
                  type={seriesItem.curveType ?? curveType}
                  yAxisId={seriesItem.yAxisId}
                  isAnimationActive={resolvedAreaIsAnimationActive}
                  label={
                    withPointLabels
                      ? {
                          fill: "var(--color-foreground)",
                          fontSize: 12,
                          fontWeight: 600,
                          content: pointLabelContentRenderer,
                          position: "top",
                        }
                      : false
                  }
                  {...resolvedAreaProps}
                />
              );
            })}
          </RechartsAreaChart>
        );
      }}
    </CompleteCartesianShell>
  );
};

export { AreaChart };

export type { AreaChartProps } from "./area-chart-types";
