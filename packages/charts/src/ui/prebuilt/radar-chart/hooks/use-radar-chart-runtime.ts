import type { ComponentProps } from "react";
import type { RadarChart as RechartsRadarChart } from "recharts";

import type {
  CompleteChartDatum,
  CompleteChartSeries,
} from "../../shared/complete-types";

import { createYAxisTickFormatter } from "../../shared/complete-helpers";
import { resolveRadialChartProps } from "../../shared/utils/radial/resolve-radial-chart-props";

type RadarChartRootProps = Omit<
  ComponentProps<typeof RechartsRadarChart>,
  "children" | "data" | "ref"
>;

interface UseRadarChartRuntimeArgs<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  chartProps: RadarChartRootProps | undefined;
  data: readonly TData[];
  series: readonly CompleteChartSeries[];
  unit: string | undefined;
  valueFormatter:
    | ((value: number, seriesKey: string, datum: TData) => string)
    | undefined;
}

interface UseRadarChartRuntimeResult {
  radiusAxisTickFormatter: (value: string | number) => string;
  resolveRadarChartProps: (
    usesAutoSizeContainer: boolean
  ) => RadarChartRootProps | undefined;
}

const useRadarChartRuntime = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
  chartProps,
  data,
  series,
  unit,
  valueFormatter,
}: UseRadarChartRuntimeArgs<TData>): UseRadarChartRuntimeResult => {
  const radiusAxisTickFormatter = createYAxisTickFormatter({
    data,
    series,
    unit,
    valueFormatter,
  });

  return {
    radiusAxisTickFormatter,
    resolveRadarChartProps: (usesAutoSizeContainer: boolean) =>
      resolveRadialChartProps(chartProps, usesAutoSizeContainer),
  };
};

export { useRadarChartRuntime };
