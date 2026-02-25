import type { YAxisProps } from "recharts";

const DEFAULT_AXIS_ID = "0";

const normalizeAxisId = (axisId?: YAxisProps["yAxisId"] | null): string =>
  String(axisId ?? DEFAULT_AXIS_ID);

export { normalizeAxisId };
