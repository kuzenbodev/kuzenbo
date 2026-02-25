import type { CompleteCartesianChartBaseProps } from "../../complete-types";

const shouldRenderYAxisTickLine = (
  tickLine: CompleteCartesianChartBaseProps["tickLine"]
) => tickLine === "y" || tickLine === "xy";

export { shouldRenderYAxisTickLine };
