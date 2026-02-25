import type { ComponentProps, ComponentType, ReactNode } from "react";
import type {
  CartesianGridProps,
  LegendProps,
  ScatterChart as RechartsScatterChart,
  ScatterProps,
  TooltipProps,
  XAxisProps,
  YAxisProps,
  ZAxisProps,
} from "recharts";

import type { ChartRootProps } from "../../primitives/chart";
import type {
  ChartReferenceLine,
  CompleteChartDatum,
} from "../shared/complete-types";

export type BubbleChartDatum = CompleteChartDatum;

type WidenPrimitive<TValue> = TValue extends string
  ? string
  : TValue extends number
    ? number
    : TValue extends boolean
      ? boolean
      : TValue;

type BubbleChartSeriesDatum<TData extends BubbleChartDatum = BubbleChartDatum> =
  {
    [K in keyof TData]: WidenPrimitive<TData[K]>;
  };

export interface BubbleChartSeries<
  TData extends BubbleChartDatum = BubbleChartDatum,
> {
  name: string;
  label?: ReactNode;
  color?: string;
  theme?: { light: string; dark: string };
  icon?: ComponentType;
  yAxisId?: string;
  strokeDasharray?: string | number;
  data: readonly BubbleChartSeriesDatum<TData>[];
}

type RechartsBubbleChartProps = Omit<
  ComponentProps<typeof RechartsScatterChart>,
  "children" | "ref"
>;

export interface BubbleChartProps<
  TData extends BubbleChartDatum = BubbleChartDatum,
> {
  series: readonly BubbleChartSeries<TData>[];
  xKey: keyof TData & string;
  yKey: keyof TData & string;
  zKey: keyof TData & string;
  bubbleRange?: readonly [number, number];
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
  zValueFormatter?: (value: number, datum: TData) => string;
  xUnit?: string;
  yUnit?: string;
  zUnit?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  gridAxis?: "x" | "y" | "xy" | "none";
  tickLine?: "x" | "y" | "xy" | "none";
  strokeDasharray?: string | number;
  fillOpacity?: number;
  enableLegendHighlight?: boolean;
  xAxisProps?: Omit<XAxisProps, "ref" | "dataKey">;
  yAxisProps?: Omit<YAxisProps, "ref" | "dataKey">;
  zAxisProps?: Omit<ZAxisProps, "ref" | "dataKey">;
  gridProps?: Omit<CartesianGridProps, "ref">;
  legendProps?: Omit<LegendProps, "ref" | "content">;
  tooltipProps?: Omit<TooltipProps<number, string>, "ref" | "content">;
  referenceLines?: readonly ChartReferenceLine[];
  chartRootProps?: Omit<ChartRootProps, "config" | "children">;
  responsiveContainerProps?: ChartRootProps["responsiveContainerProps"];
  bubbleProps?:
    | Partial<Omit<ScatterProps, "data" | "name" | "ref">>
    | ((
        series: BubbleChartSeries<TData>
      ) => Partial<Omit<ScatterProps, "data" | "name" | "ref">>);
  bubbleChartProps?: RechartsBubbleChartProps;
  /** @deprecated Use `bubbleChartProps`. */
  chartProps?: RechartsBubbleChartProps;
}

export type { RechartsBubbleChartProps };
