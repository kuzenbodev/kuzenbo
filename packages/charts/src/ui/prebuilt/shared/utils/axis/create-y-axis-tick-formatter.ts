import type { YAxisProps } from "recharts";

import type {
  CompleteCartesianChartBaseProps,
  CompleteChartDatum,
} from "../../complete-types";

import { formatNumericValue } from "../format/format-numeric-value";
import { toNumber } from "../number/to-number";
import { resolveSeriesKeyForAxisId } from "./resolve-series-key-for-axis-id";

const createYAxisTickFormatter = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
  axisId,
  data,
  series,
  unit,
  valueFormatter,
}: Pick<
  CompleteCartesianChartBaseProps<TData>,
  "data" | "series" | "unit" | "valueFormatter"
> & {
  axisId?: YAxisProps["yAxisId"] | null;
}) => {
  const resolvedSeriesKey =
    resolveSeriesKeyForAxisId(series, axisId) ?? "value";
  const fallbackDatum = (data[0] ?? {}) as TData;

  return (value: string | number): string => {
    const numericValue = toNumber(value);

    if (numericValue === undefined) {
      return String(value);
    }

    if (valueFormatter) {
      return valueFormatter(numericValue, resolvedSeriesKey, fallbackDatum);
    }

    return formatNumericValue(numericValue, unit);
  };
};

export { createYAxisTickFormatter };
