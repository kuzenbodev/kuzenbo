import type { CompleteCartesianChartBaseProps } from "../../complete-types";

const shouldRenderGridX = (
  gridAxis: CompleteCartesianChartBaseProps["gridAxis"]
) => gridAxis === "x" || gridAxis === "xy";

export { shouldRenderGridX };
