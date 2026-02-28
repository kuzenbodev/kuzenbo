import type { ComponentProps } from "react";
import { Legend } from "recharts";

type ChartLegendProps = ComponentProps<typeof Legend>;

const ChartLegend = Legend;

export type { ChartLegendProps };
export { ChartLegend };
