import type { ComponentProps, ComponentType, ReactNode } from "react";
import type {
  AreaProps,
  BarProps,
  BarChart as RechartsBarChart,
  CartesianGridProps,
  ComposedChart as RechartsComposedChart,
  LabelListProps,
  LegendProps,
  LineChart as RechartsLineChart,
  LineProps,
  TooltipProps,
  XAxisProps,
  YAxisProps,
} from "recharts";

import type { ChartRootProps } from "../../primitives/chart";

export type CompleteChartDatum = Record<
  string,
  string | number | boolean | null | undefined
>;

type CompleteChartSeriesIdentifier =
  | {
      name: string;
      key?: string;
    }
  | {
      name?: string;
      key: string;
    };

export type CompleteChartSeries = CompleteChartSeriesIdentifier & {
  label?: ReactNode;
  color?: string;
  theme?: { light: string; dark: string };
  icon?: ComponentType;
  yAxisId?: string;
  strokeDasharray?: string | number;
  stackId?: string;
  curveType?: CompleteChartCurveType;
};

export type CompleteCompositeSeries = CompleteChartSeries & {
  type: "line" | "bar" | "area";
};

export type LineChartType = "default" | "gradient";

export interface LineChartGradientStop {
  offset: number;
  color: string;
}

export type BarChartType = "default" | "stacked" | "percent" | "waterfall";

export type CompleteChartCurveType =
  | "bump"
  | "linear"
  | "natural"
  | "monotone"
  | "step"
  | "stepBefore"
  | "stepAfter";

export interface ChartReferenceLine {
  y?: number | string;
  x?: number | string;
  label?: ReactNode;
  color?: string;
  strokeDasharray?: string | number;
}

export interface CompleteCartesianChartBaseProps<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  data: readonly TData[];
  dataKey: keyof TData & string;
  series: readonly CompleteChartSeries[];
  withLegend?: boolean;
  withTooltip?: boolean;
  withXAxis?: boolean;
  withYAxis?: boolean;
  withRightYAxis?: boolean;
  valueFormatter?: (value: number, seriesKey: string, datum: TData) => string;
  unit?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  rightYAxisLabel?: string;
  gridAxis?: "x" | "y" | "xy" | "none";
  tickLine?: "x" | "y" | "xy" | "none";
  strokeDasharray?: string | number;
  xAxisProps?: Omit<XAxisProps, "ref" | "dataKey">;
  yAxisProps?: Omit<YAxisProps, "ref">;
  rightYAxisProps?: Omit<YAxisProps, "ref" | "orientation">;
  gridProps?: Omit<CartesianGridProps, "ref">;
  legendProps?: Omit<LegendProps, "ref" | "content">;
  tooltipProps?: Omit<TooltipProps<number, string>, "ref" | "content">;
  referenceLines?: readonly ChartReferenceLine[];
  chartRootProps?: Omit<ChartRootProps, "config" | "children">;
  responsiveContainerProps?: ChartRootProps["responsiveContainerProps"];
}

export type LineChartProps<
  TData extends CompleteChartDatum = CompleteChartDatum,
> = CompleteCartesianChartBaseProps<TData> & {
  type?: LineChartType;
  gradientStops?: readonly LineChartGradientStop[];
  curveType?: CompleteChartCurveType;
  fillOpacity?: number;
  withDots?: boolean;
  withPointLabels?: boolean;
  dotProps?: Record<string, unknown>;
  activeDotProps?: Record<string, unknown>;
  strokeWidth?: number;
  connectNulls?: boolean;
  enableLegendHighlight?: boolean;
  lineProps?:
    | Partial<Omit<LineProps, "ref" | "dataKey">>
    | ((
        series: CompleteChartSeries
      ) => Partial<Omit<LineProps, "ref" | "dataKey">>);
  lineChartProps?: Omit<
    ComponentProps<typeof RechartsLineChart>,
    "children" | "data" | "ref"
  >;
  chartProps?: Omit<
    ComponentProps<typeof RechartsLineChart>,
    "children" | "data" | "ref"
  >;
};

export type BarChartProps<
  TData extends CompleteChartDatum = CompleteChartDatum,
> = CompleteCartesianChartBaseProps<TData> & {
  type?: BarChartType;
  fillOpacity?: number;
  cursorFill?: string;
  enableLegendHighlight?: boolean;
  withBarValueLabel?: boolean;
  valueLabelProps?:
    | Partial<Omit<LabelListProps, "ref">>
    | ((series: CompleteChartSeries) => Partial<Omit<LabelListProps, "ref">>);
  getBarColor?: (value: number, series: CompleteChartSeries) => string;
  barProps?:
    | Partial<Omit<BarProps, "ref" | "dataKey">>
    | ((
        series: CompleteChartSeries
      ) => Partial<Omit<BarProps, "ref" | "dataKey">>);
  radius?: BarProps["radius"];
  minBarSize?: number;
  maxBarWidth?: number;
  maxBarSize?: number;
  barChartProps?: Omit<
    ComponentProps<typeof RechartsBarChart>,
    "children" | "data" | "ref"
  >;
  chartProps?: Omit<
    ComponentProps<typeof RechartsBarChart>,
    "children" | "data" | "ref"
  >;
};

export type CompositeChartProps<
  TData extends CompleteChartDatum = CompleteChartDatum,
> = Omit<CompleteCartesianChartBaseProps<TData>, "series"> & {
  series: readonly CompleteCompositeSeries[];
  curveType?: CompleteChartCurveType;
  fillOpacity?: number;
  withDots?: boolean;
  dotProps?: Record<string, unknown>;
  activeDotProps?: Record<string, unknown>;
  strokeWidth?: number;
  connectNulls?: boolean;
  withPointLabels?: boolean;
  withBarValueLabel?: boolean;
  enableLegendHighlight?: boolean;
  minBarSize?: number;
  maxBarWidth?: number;
  maxBarSize?: number;
  lineProps?:
    | Partial<Omit<LineProps, "ref" | "dataKey">>
    | ((
        series: CompleteCompositeSeries
      ) => Partial<Omit<LineProps, "ref" | "dataKey">>);
  barProps?:
    | Partial<Omit<BarProps, "ref" | "dataKey">>
    | ((
        series: CompleteCompositeSeries
      ) => Partial<Omit<BarProps, "ref" | "dataKey">>);
  areaProps?:
    | Partial<Omit<AreaProps, "ref" | "dataKey">>
    | ((
        series: CompleteCompositeSeries
      ) => Partial<Omit<AreaProps, "ref" | "dataKey">>);
  composedChartProps?: Omit<
    ComponentProps<typeof RechartsComposedChart>,
    "children" | "data" | "ref"
  >;
  chartProps?: Omit<
    ComponentProps<typeof RechartsComposedChart>,
    "children" | "data" | "ref"
  >;
};

export type {
  AreaChartGradientStop,
  AreaChartProps,
  AreaChartType,
} from "../area-chart/area-chart-types";
export type {
  BubbleChartDatum,
  BubbleChartProps,
  BubbleChartSeries,
} from "../bubble-chart/bubble-chart-types";
export type {
  DonutCenterLabelContext,
  DonutChartProps,
} from "../donut-chart/donut-chart";
export type {
  FunnelChartProps,
  FunnelLabelPosition,
} from "../funnel-chart/funnel-chart";
export type { HeatmapCellRuntime, HeatmapProps } from "../heatmap/heatmap";
export type { PieChartProps } from "../pie-chart/pie-chart";
export type {
  RadarChartProps,
  RadarSeriesProps,
} from "../radar-chart/radar-chart";
export type {
  RadialBarChartProps,
  RadialBarLabelPosition,
  RadialBarSeriesProps,
} from "../radial-bar-chart/radial-bar-chart";
export type {
  ScatterChartDatum,
  ScatterChartProps,
  ScatterChartSeries,
} from "../scatter-chart/scatter-chart-types";
export type {
  SparklineGradientStop,
  SparklineProps,
  SparklineRuntimeSeries,
  SparklineTrendColors,
  SparklineTrendDirection,
} from "../sparkline/sparkline";
