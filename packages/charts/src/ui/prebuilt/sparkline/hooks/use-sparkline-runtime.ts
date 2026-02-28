import { useId } from "react";

import type { CompleteChartDatum } from "../../shared/complete-types";
import type {
  SparklineProps,
  SparklineTrendColors,
  UseSparklineRuntimeResult,
} from "../sparkline-types";
import { createDefaultSparklineGradientStops } from "../utils/default-sparkline-gradient-stops";
import { resolveSparklineTrendDirection } from "../utils/resolve-sparkline-trend-direction";

const DEFAULT_SERIES_COLOR = "var(--color-chart-1)";
const DEFAULT_TREND_COLORS: SparklineTrendColors = {
  down: "var(--color-danger-foreground)",
  flat: "var(--color-chart-3)",
  up: "var(--color-success-foreground)",
};

type UseSparklineRuntimeArgs<
  TData extends CompleteChartDatum = CompleteChartDatum,
> = Pick<
  SparklineProps<TData>,
  | "chartProps"
  | "color"
  | "data"
  | "enableTrendColors"
  | "gradientStops"
  | "label"
  | "sparklineChartProps"
  | "theme"
  | "trendColors"
  | "valueKey"
>;

const useSparklineRuntime = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
  chartProps,
  color,
  data,
  enableTrendColors = true,
  gradientStops,
  label,
  sparklineChartProps,
  theme,
  trendColors,
  valueKey,
}: UseSparklineRuntimeArgs<TData>): UseSparklineRuntimeResult => {
  const gradientId = useId().replaceAll(":", "-");
  const trendDirection = resolveSparklineTrendDirection({
    data,
    valueKey,
  });
  const resolvedTrendColor =
    trendColors?.[trendDirection] ?? DEFAULT_TREND_COLORS[trendDirection];
  const resolvedSeriesColor = enableTrendColors
    ? resolvedTrendColor
    : (color ?? DEFAULT_SERIES_COLOR);
  const resolvedChartPropsInput = sparklineChartProps ?? chartProps;
  const mergedChartProps = {
    ...resolvedChartPropsInput,
    style: {
      height: "100%",
      width: "100%",
      ...resolvedChartPropsInput?.style,
    },
  };
  const resolvedGradientStops =
    gradientStops && gradientStops.length > 0
      ? gradientStops
      : createDefaultSparklineGradientStops(resolvedSeriesColor);

  return {
    chartSeries: {
      ...(enableTrendColors || !theme
        ? { color: resolvedSeriesColor }
        : {
            theme,
          }),
      label,
      name: valueKey,
    },
    gradientId,
    resolvedGradientStops,
    resolveSparklineChartProps: (usesAutoSizeContainer: boolean) => ({
      ...mergedChartProps,
      responsive: resolvedChartPropsInput?.responsive ?? !usesAutoSizeContainer,
    }),
    trendDirection,
  };
};

export { useSparklineRuntime, DEFAULT_TREND_COLORS };
