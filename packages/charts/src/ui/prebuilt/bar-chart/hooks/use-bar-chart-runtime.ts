import type {
  BarChartProps,
  CompleteChartDatum,
} from "../../shared/complete-types";

import {
  calculateWaterfallData,
  createYAxisTickFormatter,
  formatPercentValue,
  resolveDefaultBarRadius,
} from "../../shared/complete-helpers";
import { createPercentAxisTickFormatter } from "../utils/create-percent-axis-tick-formatter";

const percentValueFormatter = (
  value: number,
  _seriesKey: string,
  _datum: CompleteChartDatum
) => formatPercentValue(value);
const percentAxisTickFormatter = createPercentAxisTickFormatter();

type UseBarChartRuntimeArgs<
  TData extends CompleteChartDatum = CompleteChartDatum,
> = Pick<
  BarChartProps<TData>,
  | "barChartProps"
  | "chartProps"
  | "cursorFill"
  | "data"
  | "dataKey"
  | "maxBarSize"
  | "maxBarWidth"
  | "radius"
  | "rightYAxisProps"
  | "series"
  | "tooltipProps"
  | "type"
  | "unit"
  | "valueFormatter"
  | "xAxisProps"
  | "yAxisProps"
>;

const useBarChartRuntime = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
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
  type = "default",
  unit,
  valueFormatter,
  xAxisProps,
  yAxisProps,
}: UseBarChartRuntimeArgs<TData>) => {
  const resolvedBarChartPropsInput = barChartProps ?? chartProps;
  const isVerticalLayout = resolvedBarChartPropsInput?.layout === "vertical";
  const isVerticalCategoryYAxis =
    isVerticalLayout && (yAxisProps?.type ?? "category") === "category";
  const shouldUseStack = type === "stacked" || type === "percent";
  const shouldUsePercent = type === "percent";
  const shouldUseWaterfall = type === "waterfall";
  const resolvedMaxBarWidth = maxBarWidth ?? maxBarSize;
  const resolvedRadius = resolveDefaultBarRadius(
    series,
    radius,
    shouldUseStack || shouldUseWaterfall
  );
  const effectiveValueFormatter =
    valueFormatter ?? (shouldUsePercent ? percentValueFormatter : undefined);
  const leftYAxisTickFormatter = createYAxisTickFormatter({
    axisId: yAxisProps?.yAxisId,
    data,
    series,
    unit,
    valueFormatter: effectiveValueFormatter,
  });
  const rightYAxisTickFormatter = createYAxisTickFormatter({
    axisId: rightYAxisProps?.yAxisId,
    data,
    series,
    unit,
    valueFormatter: effectiveValueFormatter,
  });
  let xAxisTickFormatter = xAxisProps?.tickFormatter;

  if (shouldUsePercent && isVerticalLayout) {
    xAxisTickFormatter = percentAxisTickFormatter;
  }

  let yAxisTickFormatter = yAxisProps?.tickFormatter;

  if (yAxisTickFormatter === undefined) {
    if (shouldUsePercent && !isVerticalCategoryYAxis) {
      yAxisTickFormatter = percentAxisTickFormatter;
    } else if (!isVerticalCategoryYAxis) {
      yAxisTickFormatter = leftYAxisTickFormatter;
    }
  }

  let resolvedRightYAxisTickFormatter = rightYAxisProps?.tickFormatter;

  if (resolvedRightYAxisTickFormatter === undefined && shouldUsePercent) {
    resolvedRightYAxisTickFormatter = percentAxisTickFormatter;
  }

  if (resolvedRightYAxisTickFormatter === undefined) {
    resolvedRightYAxisTickFormatter = rightYAxisTickFormatter;
  }

  const mergedChartProps = {
    ...resolvedBarChartPropsInput,
    stackOffset: shouldUsePercent
      ? "expand"
      : resolvedBarChartPropsInput?.stackOffset,
    style: {
      height: "100%",
      width: "100%",
      ...resolvedBarChartPropsInput?.style,
    },
  };
  const resolvedTooltipProps =
    cursorFill && tooltipProps?.cursor === undefined
      ? {
          ...tooltipProps,
          cursor: { fill: cursorFill },
        }
      : tooltipProps;
  const transformedData = shouldUseWaterfall
    ? calculateWaterfallData({
        data,
        dataKey,
        series,
      })
    : [...data];
  const fallbackDatum = (data[0] ?? {}) as TData;

  return {
    effectiveValueFormatter,
    fallbackDatum,
    isVerticalLayout,
    resolvedMaxBarWidth,
    resolvedRadius,
    resolvedRightYAxisTickFormatter,
    resolvedTooltipProps,
    resolveBarChartProps: (usesAutoSizeContainer: boolean) => ({
      ...mergedChartProps,
      responsive:
        resolvedBarChartPropsInput?.responsive ?? !usesAutoSizeContainer,
    }),
    shouldUseStack,
    transformedData,
    xAxisTickFormatter,
    yAxisTickFormatter,
  };
};

export { useBarChartRuntime };
