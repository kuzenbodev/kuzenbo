import type { BubbleChartDatum, BubbleChartProps } from "../bubble-chart-types";

import { formatAxisNumericValue } from "./format-axis-numeric-value";

interface CreateTooltipValueFormatterOptions<
  TData extends BubbleChartDatum = BubbleChartDatum,
> extends Pick<
  BubbleChartProps<TData>,
  | "valueFormatter"
  | "xKey"
  | "xUnit"
  | "xValueFormatter"
  | "yKey"
  | "yUnit"
  | "yValueFormatter"
  | "zKey"
  | "zUnit"
  | "zValueFormatter"
> {
  fallbackDatum: TData;
}

const createTooltipValueFormatter = <
  TData extends BubbleChartDatum = BubbleChartDatum,
>({
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
}: CreateTooltipValueFormatterOptions<TData>) => {
  if (valueFormatter) {
    return valueFormatter;
  }

  return (value: number, seriesKey: string, datum: TData): string => {
    const resolvedDatum = datum ?? fallbackDatum;

    if (seriesKey === xKey) {
      return formatAxisNumericValue(value, {
        datum: resolvedDatum,
        unit: xUnit,
        valueFormatter: xValueFormatter,
      });
    }

    if (seriesKey === yKey) {
      return formatAxisNumericValue(value, {
        datum: resolvedDatum,
        unit: yUnit,
        valueFormatter: yValueFormatter,
      });
    }

    if (seriesKey === zKey) {
      return formatAxisNumericValue(value, {
        datum: resolvedDatum,
        unit: zUnit,
        valueFormatter: zValueFormatter,
      });
    }

    return formatAxisNumericValue(value, {
      datum: resolvedDatum,
      unit: yUnit,
    });
  };
};

export { createTooltipValueFormatter };
