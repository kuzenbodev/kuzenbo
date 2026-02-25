import type { ReactNode } from "react";

interface GetLegendFallbackLabelOptions {
  dataKey: unknown;
  value: unknown;
}

const getLegendFallbackLabel = ({
  dataKey,
  value,
}: GetLegendFallbackLabelOptions): ReactNode => {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (dataKey !== undefined) {
    return String(dataKey);
  }

  return "Value";
};

export { getLegendFallbackLabel };
