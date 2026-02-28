import type {
  CompleteChartDatum,
  CompleteChartSeries,
} from "../../complete-types";
import { toNumericValue } from "../number/to-numeric-value";
import { resolveCompleteSeriesName } from "../series/resolve-complete-series-name";

type CompleteBarLikeSeries = Pick<CompleteChartSeries, "name" | "key">;

const calculateWaterfallData = <TData extends CompleteChartDatum>({
  data,
  dataKey,
  series,
}: {
  data: readonly TData[];
  dataKey: keyof TData & string;
  series: readonly CompleteBarLikeSeries[];
}) => {
  let start = 0;
  let end = 0;

  return data.map((rawDatum) => {
    const datum = { ...rawDatum } as Record<string, unknown>;
    const isStandalone = datum.standalone === true;

    for (const seriesItem of series) {
      const seriesName = resolveCompleteSeriesName(seriesItem);

      if (seriesName === dataKey) {
        continue;
      }

      const rawValue = datum[seriesName];
      const numericValue = toNumericValue(rawValue);

      if (numericValue === undefined) {
        continue;
      }

      if (isStandalone) {
        datum[seriesName] = [0, numericValue];
        continue;
      }

      end += numericValue;
      datum[seriesName] = [start, end];
      start = end;
    }

    return datum as TData;
  });
};

export { calculateWaterfallData };
