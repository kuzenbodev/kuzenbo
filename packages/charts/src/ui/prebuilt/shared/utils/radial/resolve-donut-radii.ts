import type { ComponentProps } from "react";
import type { Pie } from "recharts";

import { toNumber } from "../number/to-number";

type PieRadius = ComponentProps<typeof Pie>["outerRadius"];

interface ResolveDonutRadiiOptions {
  size?: PieRadius;
  thickness?: number;
}

interface ResolvedDonutRadii {
  innerRadius: ComponentProps<typeof Pie>["innerRadius"];
  outerRadius: ComponentProps<typeof Pie>["outerRadius"];
}

const DEFAULT_DONUT_SIZE = "85%";
const DEFAULT_DONUT_THICKNESS = 25;
const FALLBACK_DONUT_INNER_RADIUS = "60%";

const toNonNegative = (value: unknown, fallback: number): number => {
  const numeric = toNumber(value);

  if (numeric === undefined) {
    return fallback;
  }

  return Math.max(numeric, 0);
};

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

const resolveDonutRadii = ({
  size = DEFAULT_DONUT_SIZE,
  thickness = DEFAULT_DONUT_THICKNESS,
}: ResolveDonutRadiiOptions = {}): ResolvedDonutRadii => {
  const resolvedThickness = toNonNegative(thickness, DEFAULT_DONUT_THICKNESS);
  const sizeNumber = toNumber(size);

  if (sizeNumber !== undefined) {
    return {
      innerRadius: Math.max(sizeNumber - resolvedThickness, 0),
      outerRadius: sizeNumber,
    };
  }

  const sizePercentage = parsePercentage(size);

  if (sizePercentage !== undefined) {
    const outerPercentage = Math.max(sizePercentage, 0);

    return {
      innerRadius: `${Math.max(outerPercentage - resolvedThickness, 0)}%`,
      outerRadius: `${outerPercentage}%`,
    };
  }

  return {
    innerRadius: FALLBACK_DONUT_INNER_RADIUS,
    outerRadius:
      typeof size === "string" && size.trim().length > 0
        ? size
        : DEFAULT_DONUT_SIZE,
  };
};

export type { ResolveDonutRadiiOptions, ResolvedDonutRadii };
export { resolveDonutRadii };
