import type {
  ScatterChartDatum,
  ScatterChartProps,
  RechartsScatterChartProps,
} from "../scatter-chart-types";

import { createAxisTickFormatter } from "../utils/create-axis-tick-formatter";
import { createTooltipValueFormatter } from "../utils/create-tooltip-value-formatter";

type UseScatterChartRuntimeArgs<
  TData extends ScatterChartDatum = ScatterChartDatum,
> = Pick<
  ScatterChartProps<TData>,
  | "chartProps"
  | "scatterChartProps"
  | "series"
  | "valueFormatter"
  | "xAxisProps"
  | "xKey"
  | "xUnit"
  | "xValueFormatter"
  | "yAxisProps"
  | "yKey"
  | "yUnit"
  | "yValueFormatter"
>;

interface UseScatterChartRuntimeResult<
  TData extends ScatterChartDatum = ScatterChartDatum,
> {
  effectiveValueFormatter: ScatterChartProps<TData>["valueFormatter"];
  fallbackDatum: TData;
  resolveScatterChartProps: (
    usesAutoSizeContainer: boolean
  ) => RechartsScatterChartProps;
  xAxisTickFormatter: (value: string | number, index: number) => string;
  yAxisTickFormatter: (value: string | number, index: number) => string;
}

const useScatterChartRuntime = <
  TData extends ScatterChartDatum = ScatterChartDatum,
>({
  chartProps,
  scatterChartProps,
  series,
  valueFormatter,
  xAxisProps,
  xKey,
  xUnit,
  xValueFormatter,
  yAxisProps,
  yKey,
  yUnit,
  yValueFormatter,
}: UseScatterChartRuntimeArgs<TData>): UseScatterChartRuntimeResult<TData> => {
  const fallbackDatum = (series[0]?.data[0] ?? {}) as TData;
  const xAxisTickFormatter =
    xAxisProps?.tickFormatter ??
    createAxisTickFormatter({
      fallbackDatum,
      unit: xUnit,
      valueFormatter: xValueFormatter,
    });
  const yAxisTickFormatter =
    yAxisProps?.tickFormatter ??
    createAxisTickFormatter({
      fallbackDatum,
      unit: yUnit,
      valueFormatter: yValueFormatter,
    });
  const effectiveValueFormatter = createTooltipValueFormatter({
    fallbackDatum,
    valueFormatter,
    xKey,
    xUnit,
    xValueFormatter,
    yKey,
    yUnit,
    yValueFormatter,
  });
  const resolvedScatterChartPropsInput = scatterChartProps ?? chartProps;
  const mergedChartProps: RechartsScatterChartProps = {
    ...resolvedScatterChartPropsInput,
    style: {
      height: "100%",
      width: "100%",
      ...resolvedScatterChartPropsInput?.style,
    },
  };

  return {
    effectiveValueFormatter,
    fallbackDatum,
    resolveScatterChartProps: (usesAutoSizeContainer: boolean) => ({
      ...mergedChartProps,
      responsive:
        resolvedScatterChartPropsInput?.responsive ?? !usesAutoSizeContainer,
    }),
    xAxisTickFormatter,
    yAxisTickFormatter,
  };
};

export { useScatterChartRuntime };
