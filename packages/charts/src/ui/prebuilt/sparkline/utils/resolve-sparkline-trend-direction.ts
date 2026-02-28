import type { CompleteChartDatum } from "../../shared/complete-types";
import { toNumericValue } from "../../shared/utils/number/to-numeric-value";

type SparklineTrendDirection = "up" | "down" | "flat";

interface ResolveSparklineTrendDirectionArgs<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  data: readonly TData[];
  valueKey: keyof TData & string;
}

const resolveSparklineTrendDirection = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
  data,
  valueKey,
}: ResolveSparklineTrendDirectionArgs<TData>): SparklineTrendDirection => {
  let firstNumericValue: number | null = null;
  let lastNumericValue: number | null = null;

  for (const datum of data) {
    const numericValue = toNumericValue(datum[valueKey]);

    if (numericValue === undefined) {
      continue;
    }

    if (firstNumericValue === null) {
      firstNumericValue = numericValue;
    }

    lastNumericValue = numericValue;
  }

  if (firstNumericValue === null || lastNumericValue === null) {
    return "flat";
  }

  if (lastNumericValue > firstNumericValue) {
    return "up";
  }

  if (lastNumericValue < firstNumericValue) {
    return "down";
  }

  return "flat";
};

export { resolveSparklineTrendDirection };
export type { SparklineTrendDirection, ResolveSparklineTrendDirectionArgs };
