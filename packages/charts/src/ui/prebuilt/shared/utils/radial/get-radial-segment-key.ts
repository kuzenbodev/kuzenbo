import type { CompleteChartDatum } from "../../complete-types";

const getRadialSegmentKey = <TData extends CompleteChartDatum>(
  datum: TData,
  nameKey: keyof TData & string,
  fallbackIndex: number
) => {
  const candidate = datum[nameKey];

  if (typeof candidate === "string" && candidate.length > 0) {
    return candidate;
  }

  if (typeof candidate === "number" || typeof candidate === "boolean") {
    return String(candidate);
  }

  return `segment-${fallbackIndex + 1}`;
};

export { getRadialSegmentKey };
