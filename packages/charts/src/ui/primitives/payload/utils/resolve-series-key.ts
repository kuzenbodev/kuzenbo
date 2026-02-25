import type { ChartConfig } from "../../types/chart-types";

import { resolveSeriesKeyCandidate } from "./resolve-series-key-candidate";
import { toStringValue } from "./to-string-value";

interface ChartPayloadLike {
  color?: string;
  dataKey?: unknown;
  name?: unknown;
  payload?: unknown;
  type?: unknown;
  value?: unknown;
}

const resolveSeriesKey = ({
  config,
  item,
  nameKey,
}: {
  config: ChartConfig;
  item: ChartPayloadLike;
  nameKey?: string;
}): string => {
  const fromExplicitKey = resolveSeriesKeyCandidate(item, nameKey);
  const fromDataKey = toStringValue(item.dataKey);
  const fromName = toStringValue(item.name);
  const fallbackKey = fromExplicitKey ?? fromDataKey ?? fromName ?? "value";

  if (fallbackKey in config) {
    return fallbackKey;
  }

  if (fallbackKey.includes(".")) {
    const parts = fallbackKey.split(".");

    for (let index = parts.length - 1; index >= 0; index -= 1) {
      const candidate = parts[index];

      if (!candidate) {
        continue;
      }

      if (candidate in config) {
        return candidate;
      }
    }
  }

  return fallbackKey;
};

export { resolveSeriesKey };
