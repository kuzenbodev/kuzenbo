import type { ComponentProps } from "react";

import { Tooltip } from "recharts";

type ChartTooltipProps = ComponentProps<typeof Tooltip>;

const ChartTooltip = Tooltip;

export type { ChartTooltipProps };
export { ChartTooltip };
