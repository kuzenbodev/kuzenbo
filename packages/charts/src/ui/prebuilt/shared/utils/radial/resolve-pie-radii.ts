import type { ComponentProps } from "react";
import type { Pie } from "recharts";

import { toNumber } from "../number/to-number";

type PieRadius = ComponentProps<typeof Pie>["outerRadius"];

interface ResolvePieRadiiOptions {
  size?: PieRadius;
}

interface ResolvedPieRadii {
  innerRadius: ComponentProps<typeof Pie>["innerRadius"];
  outerRadius: ComponentProps<typeof Pie>["outerRadius"];
}

const DEFAULT_PIE_SIZE = "80%";

const parsePercentage = (value: unknown): number | undefined => {
  if (typeof value !== "string") {
    return;
  }

  const normalized = value.trim();

  if (!normalized.endsWith("%")) {
    return;
  }

  return toNumber(normalized.slice(0, -1));
};

const resolvePieRadii = ({
  size = DEFAULT_PIE_SIZE,
}: ResolvePieRadiiOptions = {}): ResolvedPieRadii => {
  const sizeNumber = toNumber(size);

  if (sizeNumber !== undefined) {
    return {
      innerRadius: 0,
      outerRadius: Math.max(sizeNumber, 0),
    };
  }

  const sizePercentage = parsePercentage(size);

  if (sizePercentage !== undefined) {
    return {
      innerRadius: 0,
      outerRadius: `${Math.max(sizePercentage, 0)}%`,
    };
  }

  return {
    innerRadius: 0,
    outerRadius:
      typeof size === "string" && size.trim().length > 0
        ? size
        : DEFAULT_PIE_SIZE,
  };
};

export type { ResolvePieRadiiOptions, ResolvedPieRadii };
export { resolvePieRadii };
