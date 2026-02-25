import type {
  CompositeChartProps,
  CompleteChartDatum,
} from "../../shared/complete-types";

import {
  createYAxisTickFormatter,
  resolveDefaultBarRadius,
} from "../../shared/complete-helpers";

type ResolvedComposedChartProps<
  TData extends CompleteChartDatum = CompleteChartDatum,
> = NonNullable<CompositeChartProps<TData>["composedChartProps"]>;

type UseCompositeChartRuntimeArgs<
  TData extends CompleteChartDatum = CompleteChartDatum,
> = Pick<
  CompositeChartProps<TData>,
  | "chartProps"
  | "composedChartProps"
  | "data"
  | "maxBarSize"
  | "maxBarWidth"
  | "rightYAxisProps"
  | "series"
  | "unit"
  | "valueFormatter"
  | "yAxisProps"
>;

interface UseCompositeChartRuntimeResult<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  fallbackDatum: TData;
  leftYAxisTickFormatter: (value: string | number) => string;
  resolvedBarRadius: ReturnType<typeof resolveDefaultBarRadius>;
  resolvedMaxBarWidth: number | undefined;
  resolveComposedChartProps: (
    usesAutoSizeContainer: boolean
  ) => ResolvedComposedChartProps<TData>;
  rightYAxisTickFormatter: (value: string | number) => string;
}

const useCompositeChartRuntime = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
  chartProps,
  composedChartProps,
  data,
  maxBarSize,
  maxBarWidth,
  rightYAxisProps,
  series,
  unit,
  valueFormatter,
  yAxisProps,
}: UseCompositeChartRuntimeArgs<TData>): UseCompositeChartRuntimeResult<TData> => {
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
  const barSeries = series.filter((seriesItem) => seriesItem.type === "bar");
  const resolvedBarRadius = resolveDefaultBarRadius(barSeries);
  const resolvedComposedChartPropsInput = composedChartProps ?? chartProps;
  const resolvedMaxBarWidth = maxBarWidth ?? maxBarSize;
  const fallbackDatum = (data[0] ?? {}) as TData;
  const mergedChartProps: ResolvedComposedChartProps<TData> = {
    ...resolvedComposedChartPropsInput,
    style: {
      height: "100%",
      width: "100%",
      ...resolvedComposedChartPropsInput?.style,
    },
  };

  return {
    fallbackDatum,
    leftYAxisTickFormatter,
    resolvedBarRadius,
    resolvedMaxBarWidth,
    resolveComposedChartProps: (usesAutoSizeContainer: boolean) => ({
      ...mergedChartProps,
      responsive:
        resolvedComposedChartPropsInput?.responsive ?? !usesAutoSizeContainer,
    }),
    rightYAxisTickFormatter,
  };
};

export { useCompositeChartRuntime };
