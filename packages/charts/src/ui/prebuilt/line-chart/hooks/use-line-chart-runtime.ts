import { useId } from "react";

import { createYAxisTickFormatter } from "../../shared/complete-helpers";
import type {
  CompleteChartDatum,
  LineChartProps,
} from "../../shared/complete-types";
import { DEFAULT_LINE_GRADIENT_STOPS } from "../utils/default-gradient-stops";

type UseLineChartRuntimeArgs<
  TData extends CompleteChartDatum = CompleteChartDatum,
> = Pick<
  LineChartProps<TData>,
  | "chartProps"
  | "data"
  | "gradientStops"
  | "lineChartProps"
  | "rightYAxisProps"
  | "series"
  | "unit"
  | "valueFormatter"
  | "yAxisProps"
>;

const useLineChartRuntime = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
  chartProps,
  data,
  gradientStops,
  lineChartProps,
  rightYAxisProps,
  series,
  unit,
  valueFormatter,
  yAxisProps,
}: UseLineChartRuntimeArgs<TData>) => {
  const gradientId = useId().replaceAll(":", "-");
  const leftYAxisTickFormatter = createYAxisTickFormatter({
    axisId: yAxisProps?.yAxisId,
    data,
    series,
    unit,
    valueFormatter,
  });
  const rightYAxisTickFormatter = createYAxisTickFormatter({
    axisId: rightYAxisProps?.yAxisId,
    data,
    series,
    unit,
    valueFormatter,
  });
  const resolvedLineChartPropsInput = lineChartProps ?? chartProps;
  const mergedChartProps = {
    ...resolvedLineChartPropsInput,
    style: {
      height: "100%",
      width: "100%",
      ...resolvedLineChartPropsInput?.style,
    },
  };
  const resolvedGradientStops =
    gradientStops && gradientStops.length > 0
      ? gradientStops
      : DEFAULT_LINE_GRADIENT_STOPS;
  const fallbackDatum = (data[0] ?? {}) as TData;

  return {
    fallbackDatum,
    gradientId,
    leftYAxisTickFormatter,
    resolveLineChartProps: (usesAutoSizeContainer: boolean) => ({
      ...mergedChartProps,
      responsive:
        resolvedLineChartPropsInput?.responsive ?? !usesAutoSizeContainer,
    }),
    resolvedGradientStops,
    rightYAxisTickFormatter,
  };
};

export { useLineChartRuntime };
