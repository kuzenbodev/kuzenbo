import type { ComponentProps, ComponentType, ReactNode } from "react";
import type {
  CartesianGridProps,
  LegendProps,
  ScatterChart as RechartsScatterChart,
  ScatterProps,
  TooltipProps,
  XAxisProps,
  YAxisProps,
} from "recharts";

import type { ChartRootProps } from "../../primitives/chart";
import type {
  ChartReferenceLine,
  CompleteChartDatum,
} from "../shared/complete-types";

export type ScatterChartDatum = CompleteChartDatum;

type WidenPrimitive<TValue> = TValue extends string
  ? string
  : TValue extends number
    ? number
    : TValue extends boolean
      ? boolean
      : TValue;

type ScatterChartSeriesDatum<
  TData extends ScatterChartDatum = ScatterChartDatum,
> = {
  [K in keyof TData]: WidenPrimitive<TData[K]>;
};

export interface ScatterChartSeries<
  TData extends ScatterChartDatum = ScatterChartDatum,
> {
  name: string;
  label?: ReactNode;
  color?: string;
  theme?: { light: string; dark: string };
  icon?: ComponentType;
  yAxisId?: string;
  strokeDasharray?: string | number;
  data: readonly ScatterChartSeriesDatum<TData>[];
}

type RechartsScatterChartProps = Omit<
  ComponentProps<typeof RechartsScatterChart>,
  "children" | "ref"
>;

export interface ScatterChartProps<
  TData extends ScatterChartDatum = ScatterChartDatum,
> {
  series: readonly ScatterChartSeries<TData>[];
  xKey: keyof TData & string;
  yKey: keyof TData & string;
  withLegend?: boolean;
  withTooltip?: boolean;
  withXAxis?: boolean;
  withYAxis?: boolean;
  withPointLabels?: boolean;
  pointLabelDataKey?: keyof TData & string;
  valueFormatter?: (value: number, seriesKey: string, datum: TData) => string;
  pointLabelFormatter?: (
    value: number,
    seriesName: string,
    datum: TData
  ) => string;
  xValueFormatter?: (value: number, datum: TData) => string;
  yValueFormatter?: (value: number, datum: TData) => string;
  xUnit?: string;
  yUnit?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  gridAxis?: "x" | "y" | "xy" | "none";
  tickLine?: "x" | "y" | "xy" | "none";
  strokeDasharray?: string | number;
  fillOpacity?: number;
  enableLegendHighlight?: boolean;
  xAxisProps?: Omit<XAxisProps, "ref" | "dataKey">;
  yAxisProps?: Omit<YAxisProps, "ref" | "dataKey">;
  gridProps?: Omit<CartesianGridProps, "ref">;
  legendProps?: Omit<LegendProps, "ref" | "content">;
  tooltipProps?: Omit<TooltipProps<number, string>, "ref" | "content">;
  referenceLines?: readonly ChartReferenceLine[];
  chartRootProps?: Omit<ChartRootProps, "config" | "children">;
  responsiveContainerProps?: ChartRootProps["responsiveContainerProps"];
  scatterProps?:
    | Partial<Omit<ScatterProps, "data" | "name" | "ref">>
    | ((
        series: ScatterChartSeries<TData>
      ) => Partial<Omit<ScatterProps, "data" | "name" | "ref">>);
  scatterChartProps?: RechartsScatterChartProps;
  /** @deprecated Use `scatterChartProps`. */
  chartProps?: RechartsScatterChartProps;
}

export type { RechartsScatterChartProps };
