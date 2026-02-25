import type {
  ScatterChartDatum,
  ScatterChartProps,
} from "../scatter-chart-types";

import { formatAxisNumericValue } from "./format-axis-numeric-value";

interface CreateTooltipValueFormatterOptions<
  TData extends ScatterChartDatum = ScatterChartDatum,
> extends Pick<
  ScatterChartProps<TData>,
  | "valueFormatter"
  | "xKey"
  | "xUnit"
  | "xValueFormatter"
  | "yKey"
  | "yUnit"
  | "yValueFormatter"
> {
  fallbackDatum: TData;
}

const createTooltipValueFormatter = <
  TData extends ScatterChartDatum = ScatterChartDatum,
>({
  fallbackDatum,
  valueFormatter,
  xKey,
  xUnit,
  xValueFormatter,
  yKey,
  yUnit,
  yValueFormatter,
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

    return formatAxisNumericValue(value, {
      datum: resolvedDatum,
      unit: yUnit,
    });
  };
};

export { createTooltipValueFormatter };
