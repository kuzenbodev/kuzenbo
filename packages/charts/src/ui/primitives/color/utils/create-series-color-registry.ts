import type { ChartConfig } from "../../types/chart-types";
import type {
  ChartSeriesColorDescriptor,
  ChartSeriesColorRegistry,
  ChartThemeName,
} from "./constants";

import { getFallbackColor, isSafeColorExpression } from "./constants";
import { normalizeChartColor } from "./normalize-chart-color";
import { ensureUniqueSlug, slugifySeriesKey } from "./series-slug";

const normalizeColorWithFallback = (
  value: string | undefined,
  fallback: string
) => {
  const normalized = normalizeChartColor(value);

  if (!normalized || !isSafeColorExpression(normalized)) {
    return fallback;
  }

  return normalized;
};

const createSeriesColorRegistry = (
  config: ChartConfig
): ChartSeriesColorRegistry => {
  const byKey: ChartSeriesColorRegistry["byKey"] = {};
  const byVarName: ChartSeriesColorRegistry["byVarName"] = {};
  const order: string[] = [];
  const usedSlugs = new Set<string>();

  for (const [index, [key, itemConfig]] of Object.entries(config).entries()) {
    const baseSlug = slugifySeriesKey(key);
    const slug = ensureUniqueSlug(baseSlug, usedSlugs);
    const varName = `--color-${slug}`;

    const fallback = getFallbackColor(index);
    const colorByTheme: Record<ChartThemeName, string> = itemConfig.theme
      ? {
          light: normalizeColorWithFallback(itemConfig.theme.light, fallback),
          dark: normalizeColorWithFallback(itemConfig.theme.dark, fallback),
        }
      : {
          light: normalizeColorWithFallback(itemConfig.color, fallback),
          dark: normalizeColorWithFallback(itemConfig.color, fallback),
        };

    const descriptor: ChartSeriesColorDescriptor = {
      key,
      slug,
      varName,
      colorByTheme,
    };

    byKey[key] = descriptor;
    byVarName[varName] = key;

    order.push(key);
  }

  return {
    order,
    byKey,
    byVarName,
  };
};

export { createSeriesColorRegistry };
