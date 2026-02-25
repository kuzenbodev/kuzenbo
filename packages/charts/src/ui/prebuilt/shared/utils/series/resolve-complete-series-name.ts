import type {
  CompleteCartesianChartBaseProps,
  CompleteChartSeries,
} from "../../complete-types";

const resolveCompleteSeriesName = (
  series:
    | Pick<CompleteChartSeries, "key" | "name">
    | Pick<CompleteCartesianChartBaseProps["series"][number], "key" | "name">,
  fallback = "value"
) => {
  const fromName = series.name?.trim();

  if (fromName) {
    return fromName;
  }

  const fromKey = series.key?.trim();

  if (fromKey) {
    return fromKey;
  }

  return fallback;
};

export { resolveCompleteSeriesName };
