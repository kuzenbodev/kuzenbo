import type {
  BubbleChartDatum,
  BubbleChartProps,
  RechartsBubbleChartProps,
} from "../bubble-chart-types";

import { createAxisTickFormatter } from "../utils/create-axis-tick-formatter";
import { createTooltipValueFormatter } from "../utils/create-tooltip-value-formatter";
import { resolveBubbleRange } from "../utils/resolve-bubble-range";

type UseBubbleChartRuntimeArgs<
  TData extends BubbleChartDatum = BubbleChartDatum,
> = Pick<
  BubbleChartProps<TData>,
  | "bubbleChartProps"
  | "bubbleRange"
  | "chartProps"
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
  | "zAxisProps"
  | "zKey"
  | "zUnit"
  | "zValueFormatter"
>;

interface UseBubbleChartRuntimeResult<
  TData extends BubbleChartDatum = BubbleChartDatum,
> {
  effectiveValueFormatter: BubbleChartProps<TData>["valueFormatter"];
  fallbackDatum: TData;
  resolveBubbleChartProps: (
    usesAutoSizeContainer: boolean
  ) => RechartsBubbleChartProps;
  resolvedBubbleRange: readonly [number, number];
  xAxisTickFormatter: (value: string | number, index: number) => string;
  yAxisTickFormatter: (value: string | number, index: number) => string;
}

const useBubbleChartRuntime = <
  TData extends BubbleChartDatum = BubbleChartDatum,
>({
  bubbleChartProps,
  bubbleRange,
  chartProps,
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
  zAxisProps,
  zKey,
  zUnit,
  zValueFormatter,
}: UseBubbleChartRuntimeArgs<TData>): UseBubbleChartRuntimeResult<TData> => {
  const fallbackDatum = (series[0]?.data[0] ?? {}) as TData;
  const resolvedBubbleRange = resolveBubbleRange(
    bubbleRange ?? (zAxisProps?.range as readonly [number, number] | undefined)
  );
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
    zKey,
    zUnit,
    zValueFormatter,
  });
  const resolvedBubbleChartPropsInput = bubbleChartProps ?? chartProps;
  const mergedChartProps: RechartsBubbleChartProps = {
    ...resolvedBubbleChartPropsInput,
    style: {
      height: "100%",
      width: "100%",
      ...resolvedBubbleChartPropsInput?.style,
    },
  };

  return {
    effectiveValueFormatter,
    fallbackDatum,
    resolveBubbleChartProps: (usesAutoSizeContainer: boolean) => ({
      ...mergedChartProps,
      responsive:
        resolvedBubbleChartPropsInput?.responsive ?? !usesAutoSizeContainer,
    }),
    resolvedBubbleRange,
    xAxisTickFormatter,
    yAxisTickFormatter,
  };
};

export { useBubbleChartRuntime };
