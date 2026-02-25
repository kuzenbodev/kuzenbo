import type { CompleteCartesianChartBaseProps } from "../../complete-types";

const shouldRenderGridY = (
  gridAxis: CompleteCartesianChartBaseProps["gridAxis"]
) => gridAxis === "y" || gridAxis === "xy";

export { shouldRenderGridY };
