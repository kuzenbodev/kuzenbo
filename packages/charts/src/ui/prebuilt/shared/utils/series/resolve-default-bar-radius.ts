import type { BarProps } from "recharts";

const resolveDefaultBarRadius = <TSeries extends { stackId?: string }>(
  series: readonly TSeries[],
  radius?: BarProps["radius"],
  forceSquare = false
) => {
  if (radius !== undefined) {
    return radius;
  }

  const hasStackedSeries =
    forceSquare || series.some((seriesItem) => !!seriesItem.stackId);
  return hasStackedSeries ? 0 : 6;
};

export { resolveDefaultBarRadius };
