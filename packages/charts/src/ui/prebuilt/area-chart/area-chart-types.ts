import type { ComponentProps } from "react";
import type { AreaChart as RechartsAreaChart, AreaProps } from "recharts";

import type {
  CompleteCartesianChartBaseProps,
  CompleteChartCurveType,
  CompleteChartDatum,
  CompleteChartSeries,
} from "../shared/complete-types";

export type AreaChartType = "default" | "stacked" | "percent" | "split";

export interface AreaChartGradientStop {
  offset: number;
  opacity: number;
}

type RechartsAreaChartProps = Omit<
  ComponentProps<typeof RechartsAreaChart>,
  "children" | "data" | "ref"
>;

export type AreaChartProps<
  TData extends CompleteChartDatum = CompleteChartDatum,
> = CompleteCartesianChartBaseProps<TData> & {
  type?: AreaChartType;
  withGradient?: boolean;
  gradientStops?: readonly AreaChartGradientStop[];
  curveType?: CompleteChartCurveType;
  fillOpacity?: number;
  strokeWidth?: number;
  connectNulls?: boolean;
  withDots?: boolean;
  dotProps?: Record<string, unknown>;
  activeDotProps?: Record<string, unknown>;
  withPointLabels?: boolean;
  enableLegendHighlight?: boolean;
  areaProps?:
    | Partial<Omit<AreaProps, "ref" | "dataKey">>
    | ((
        series: CompleteChartSeries
      ) => Partial<Omit<AreaProps, "ref" | "dataKey">>);
  areaChartProps?: RechartsAreaChartProps;
  chartProps?: RechartsAreaChartProps;
};

export type { RechartsAreaChartProps };
