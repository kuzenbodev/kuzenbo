import { Cell } from "recharts";

import type {
  CompleteChartDatum,
  CompleteChartSeries,
} from "../../shared/complete-types";
import { toNumericValue } from "../../shared/utils/number/to-numeric-value";

interface BuildBarCellsArgs<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  barColor: string;
  data: readonly TData[];
  dataKey: keyof TData & string;
  getBarColor?: (value: number, series: CompleteChartSeries) => string;
  seriesItem: CompleteChartSeries;
  seriesName: string;
}

const buildBarCells = <TData extends CompleteChartDatum = CompleteChartDatum>({
  barColor,
  data,
  dataKey,
  getBarColor,
  seriesItem,
  seriesName,
}: BuildBarCellsArgs<TData>) => {
  const hasPerDatumColor =
    typeof getBarColor === "function" ||
    data.some((datum) => {
      const record = datum as Record<string, unknown>;
      return typeof record.color === "string";
    });

  if (!hasPerDatumColor) {
    return null;
  }

  return data.map((datum) => {
    const record = datum as Record<string, unknown>;
    const rawValue = record[seriesName];
    const numericValue = toNumericValue(rawValue, { allowRange: true });
    let computedColor: string | undefined;

    if (typeof record.color === "string") {
      computedColor = record.color;
    } else if (
      typeof getBarColor === "function" &&
      numericValue !== undefined
    ) {
      computedColor = getBarColor(numericValue, seriesItem);
    }

    const datumIdentity = String(record[dataKey] ?? rawValue ?? "value");

    return (
      <Cell
        fill={computedColor ?? barColor}
        key={`${seriesName}-cell-${datumIdentity}`}
      />
    );
  });
};

export { buildBarCells };
