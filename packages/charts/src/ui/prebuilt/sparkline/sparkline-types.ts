import type { ComponentProps, ReactNode } from "react";
import type {
  AreaChart as RechartsAreaChart,
  AreaProps,
  TooltipProps,
} from "recharts";

import type { ChartRootProps } from "../../primitives/chart";
import type {
  CompleteChartCurveType,
  CompleteChartDatum,
} from "../shared/complete-types";
import type { SparklineGradientStop } from "./utils/default-sparkline-gradient-stops";
import type { SparklineTrendDirection } from "./utils/resolve-sparkline-trend-direction";

interface SparklineTrendColors {
  down: string;
  flat: string;
  up: string;
}

interface SparklineProps<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  areaProps?: Partial<Omit<AreaProps, "dataKey" | "name" | "ref">>;
  chartProps?: Omit<
    ComponentProps<typeof RechartsAreaChart>,
    "children" | "data" | "ref"
  >;
  chartRootProps?: Omit<ChartRootProps, "children" | "config">;
  color?: string;
  connectNulls?: boolean;
  curveType?: CompleteChartCurveType;
  data: readonly TData[];
  dataKey: keyof TData & string;
  enableTrendColors?: boolean;
  fillOpacity?: number;
  gradientStops?: readonly SparklineGradientStop[];
  label?: ReactNode;
  responsiveContainerProps?: ChartRootProps["responsiveContainerProps"];
  sparklineChartProps?: Omit<
    ComponentProps<typeof RechartsAreaChart>,
    "children" | "data" | "ref"
  >;
  strokeWidth?: number;
  theme?: { dark: string; light: string };
  tooltipProps?: Omit<TooltipProps<number, string>, "content" | "ref">;
  trendColors?: Partial<SparklineTrendColors>;
  valueFormatter?: (value: number, seriesKey: string, datum: TData) => string;
  valueKey: keyof TData & string;
  withGradient?: boolean;
  withTooltip?: boolean;
}

interface SparklineRuntimeSeries {
  color?: string;
  label?: ReactNode;
  name: string;
  theme?: { dark: string; light: string };
}

interface UseSparklineRuntimeResult {
  chartSeries: SparklineRuntimeSeries;
  gradientId: string;
  resolvedGradientStops: readonly SparklineGradientStop[];
  resolveSparklineChartProps: (
    usesAutoSizeContainer: boolean
  ) => Omit<ComponentProps<typeof RechartsAreaChart>, "children" | "data">;
  trendDirection: SparklineTrendDirection;
}

export type {
  SparklineProps,
  SparklineRuntimeSeries,
  SparklineTrendColors,
  UseSparklineRuntimeResult,
};
