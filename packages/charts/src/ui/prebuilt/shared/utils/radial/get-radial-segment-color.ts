import type { CompleteChartDatum } from "../../complete-types";
import { getFallbackSeriesColor } from "../series/get-fallback-series-color";

const getRadialSegmentColor = <TData extends CompleteChartDatum>(
  datum: TData,
  index: number
) => {
  const colorCandidate =
    datum["color"] ?? datum["fill"] ?? datum["stroke"] ?? null;

  if (typeof colorCandidate === "string" && colorCandidate.length > 0) {
    return colorCandidate;
  }

  return getFallbackSeriesColor(index);
};

export { getRadialSegmentColor };
