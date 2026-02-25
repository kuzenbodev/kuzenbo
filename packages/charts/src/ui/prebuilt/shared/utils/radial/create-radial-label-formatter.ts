import type { CompleteChartDatum } from "../../complete-types";

import { toRadialValue } from "./to-radial-value";

type RadialLabelMode = "percent" | "value";

interface CreateRadialLabelFormatterOptions<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  data: readonly TData[];
  dataKey: keyof TData & string;
  fallbackDatum: TData;
  mode: RadialLabelMode;
  seriesKey: string;
  valueFormatter?: (value: number, seriesKey: string, datum: TData) => string;
}

const numberFormatter = new Intl.NumberFormat("en-US");

const formatPercentValue = (value: number, total: number) => {
  if (total <= 0) {
    return "0%";
  }

  const percent = (value / total) * 100;
  const rounded =
    percent >= 10 ? Math.round(percent) : Number(percent.toFixed(1));

  return `${rounded}%`;
};

const createRadialLabelFormatter = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
  data,
  dataKey,
  fallbackDatum,
  mode,
  seriesKey,
  valueFormatter,
}: CreateRadialLabelFormatterOptions<TData>) => {
  let total = 0;

  for (const datum of data) {
    const numericValue = toRadialValue(datum[dataKey]);

    if (numericValue === null) {
      continue;
    }

    total += numericValue;
  }

  return (value: unknown, datum: unknown) => {
    const numericValue = toRadialValue(value);

    if (numericValue === null) {
      return "";
    }

    if (mode === "percent") {
      return formatPercentValue(numericValue, total);
    }

    const resolvedDatum =
      datum && typeof datum === "object" ? (datum as TData) : fallbackDatum;

    if (valueFormatter) {
      return valueFormatter(numericValue, seriesKey, resolvedDatum);
    }

    return numberFormatter.format(numericValue);
  };
};

export type { RadialLabelMode };
export { createRadialLabelFormatter };
