import type {
  CompleteCartesianChartBaseProps,
  CompleteChartDatum,
} from "../../complete-types";

const createTooltipValueFormatter = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>(
  valueFormatter?: CompleteCartesianChartBaseProps<TData>["valueFormatter"]
) => {
  if (!valueFormatter) {
    return;
  }

  return (
    value: number,
    seriesKey: string,
    datum: Record<string, unknown>
  ): string => valueFormatter(value, seriesKey, datum as TData);
};

export { createTooltipValueFormatter };
