import type { CompleteChartDatum } from "../../shared/complete-types";

import { formatNumericValue } from "../../shared/utils/format/format-numeric-value";

interface FormatAxisNumericValueOptions<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  datum: TData;
  unit?: string;
  valueFormatter?: (value: number, datum: TData) => string;
}

const formatAxisNumericValue = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>(
  value: number,
  { datum, unit, valueFormatter }: FormatAxisNumericValueOptions<TData>
): string => {
  if (valueFormatter) {
    return valueFormatter(value, datum);
  }

  return formatNumericValue(value, unit);
};

export { formatAxisNumericValue };
