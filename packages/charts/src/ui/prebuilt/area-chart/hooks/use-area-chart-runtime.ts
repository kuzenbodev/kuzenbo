import { useId } from "react";

import {
  createPercentTickFormatter,
  createYAxisTickFormatter,
  formatPercentValue,
} from "../../shared/complete-helpers";
import type { CompleteChartDatum } from "../../shared/complete-types";
import type {
  AreaChartProps,
  RechartsAreaChartProps,
} from "../area-chart-types";
import { DEFAULT_AREA_GRADIENT_STOPS } from "../utils/default-gradient-stops";
import { resolveAreaStackConfig } from "../utils/resolve-area-stack-config";

const percentValueFormatter = (
  value: number,
  _seriesKey: string,
  _datum: CompleteChartDatum
) => formatPercentValue(value);

const percentAxisTickFormatter = createPercentTickFormatter() as (
  value: string | number,
  index: number
) => string;

type UseAreaChartRuntimeArgs<
  TData extends CompleteChartDatum = CompleteChartDatum,
> = Pick<
  AreaChartProps<TData>,
  | "areaChartProps"
  | "chartProps"
  | "data"
  | "gradientStops"
  | "rightYAxisProps"
  | "series"
  | "type"
  | "unit"
  | "valueFormatter"
  | "yAxisProps"
>;

interface UseAreaChartRuntimeResult<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  effectiveValueFormatter: AreaChartProps<TData>["valueFormatter"];
  fallbackDatum: TData;
  gradientIdPrefix: string;
  resolvedGradientStops: readonly {
    offset: number;
    opacity: number;
  }[];
  resolvedLeftYAxisTickFormatter:
    | ((value: string | number, index: number) => string)
    | undefined;
  resolvedRightYAxisTickFormatter:
    | ((value: string | number, index: number) => string)
    | undefined;
  resolveAreaChartProps: (
    usesAutoSizeContainer: boolean
  ) => RechartsAreaChartProps;
  shouldUseStack: boolean;
}

const useAreaChartRuntime = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
  areaChartProps,
  chartProps,
  data,
  gradientStops,
  rightYAxisProps,
  series,
  type = "default",
  unit,
  valueFormatter,
  yAxisProps,
}: UseAreaChartRuntimeArgs<TData>): UseAreaChartRuntimeResult<TData> => {
  const gradientIdPrefix = useId().replaceAll(":", "-");
  const shouldUsePercent = type === "percent";
  const effectiveValueFormatter =
    valueFormatter ?? (shouldUsePercent ? percentValueFormatter : undefined);
  const leftYAxisTickFormatter = createYAxisTickFormatter({
    axisId: yAxisProps?.yAxisId,
    data,
    series,
    unit,
    valueFormatter: effectiveValueFormatter,
  });
  const rightYAxisTickFormatter = createYAxisTickFormatter({
    axisId: rightYAxisProps?.yAxisId,
    data,
    series,
    unit,
    valueFormatter: effectiveValueFormatter,
  });
  const resolvedAreaChartPropsInput = areaChartProps ?? chartProps;
  const resolvedAreaStackConfig = resolveAreaStackConfig(type);
  const mergedChartProps: RechartsAreaChartProps = {
    ...resolvedAreaChartPropsInput,
    stackOffset:
      resolvedAreaStackConfig.stackOffset ??
      resolvedAreaChartPropsInput?.stackOffset,
    style: {
      height: "100%",
      width: "100%",
      ...resolvedAreaChartPropsInput?.style,
    },
  };
  const resolvedGradientStops =
    gradientStops && gradientStops.length > 0
      ? gradientStops
      : DEFAULT_AREA_GRADIENT_STOPS;
  const fallbackDatum = (data[0] ?? {}) as TData;
  const resolvedLeftYAxisTickFormatter =
    yAxisProps?.tickFormatter ??
    (shouldUsePercent ? percentAxisTickFormatter : leftYAxisTickFormatter);
  const resolvedRightYAxisTickFormatter =
    rightYAxisProps?.tickFormatter ??
    (shouldUsePercent ? percentAxisTickFormatter : rightYAxisTickFormatter);

  return {
    effectiveValueFormatter,
    fallbackDatum,
    gradientIdPrefix,
    resolvedGradientStops,
    resolvedLeftYAxisTickFormatter,
    resolvedRightYAxisTickFormatter,
    resolveAreaChartProps: (usesAutoSizeContainer: boolean) => ({
      ...mergedChartProps,
      responsive:
        resolvedAreaChartPropsInput?.responsive ?? !usesAutoSizeContainer,
    }),
    shouldUseStack: resolvedAreaStackConfig.shouldUseStack,
  };
};

export { useAreaChartRuntime };
