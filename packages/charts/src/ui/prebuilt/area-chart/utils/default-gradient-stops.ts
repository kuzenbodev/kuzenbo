import type { AreaChartGradientStop } from "../area-chart-types";

const DEFAULT_AREA_GRADIENT_STOPS = [
  { offset: 5, opacity: 0.42 },
  { offset: 95, opacity: 0.04 },
] as const satisfies readonly AreaChartGradientStop[];

export { DEFAULT_AREA_GRADIENT_STOPS };
