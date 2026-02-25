import type { CompleteCartesianChartBaseProps } from "../../complete-types";

const shouldRenderXAxisTickLine = (
  tickLine: CompleteCartesianChartBaseProps["tickLine"]
) => tickLine === "x" || tickLine === "xy";

export { shouldRenderXAxisTickLine };
