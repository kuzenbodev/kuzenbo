import type { CompleteChartDatum } from "../../shared/complete-types";
import { toNumber } from "../../shared/utils/number/to-number";
import { formatAxisNumericValue } from "./format-axis-numeric-value";

interface CreateAxisTickFormatterOptions<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  fallbackDatum: TData;
  unit?: string;
  valueFormatter?: (value: number, datum: TData) => string;
}

const createAxisTickFormatter =
  <TData extends CompleteChartDatum = CompleteChartDatum>({
    fallbackDatum,
    unit,
    valueFormatter,
  }: CreateAxisTickFormatterOptions<TData>) =>
  (value: string | number): string => {
    const numericValue = toNumber(value);

    if (numericValue === undefined) {
      return String(value);
    }

    return formatAxisNumericValue(numericValue, {
      datum: fallbackDatum,
      unit,
      valueFormatter,
    });
  };

export { createAxisTickFormatter };
