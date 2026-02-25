import type {
  ChartSeriesColorDescriptor,
  ChartSeriesColorRegistry,
  ChartThemeName,
} from "./utils/constants";
import type { ResolveSeriesColorExpressionOptions } from "./utils/resolve-series-color-expression";

import { createSeriesColorRegistry } from "./utils/create-series-color-registry";
import { getChartThemeFromDom } from "./utils/get-chart-theme-from-dom";
import { getStyleDeclarationsForTheme } from "./utils/get-style-declarations-for-theme";
import { normalizeLegacyChartColor } from "./utils/normalize-legacy-chart-color";
import { resolveSeriesColorExpression as resolveSeriesColorExpressionFromRegistry } from "./utils/resolve-series-color-expression";
import { slugifySeriesKey } from "./utils/series-slug";

const getSeriesColorVarReference = (
  seriesKey: string,
  registry: ChartSeriesColorRegistry
) => {
  const descriptor = registry.byKey[seriesKey];

  if (descriptor) {
    return `var(${descriptor.varName})`;
  }

  const fallbackSlug = slugifySeriesKey(seriesKey);

  return `var(--color-${fallbackSlug})`;
};

const getSeriesColor = (
  seriesKey: string,
  registry: ChartSeriesColorRegistry,
  chartId: string
) => {
  const descriptor = registry.byKey[seriesKey];

  if (!descriptor) {
    return;
  }

  const theme = getChartThemeFromDom(chartId);

  return descriptor.colorByTheme[theme];
};

const resolveSeriesColorExpression = (
  options: ResolveSeriesColorExpressionOptions
) => resolveSeriesColorExpressionFromRegistry(options);

export type {
  ChartSeriesColorDescriptor,
  ChartSeriesColorRegistry,
  ChartThemeName,
};
export {
  createSeriesColorRegistry,
  getSeriesColor,
  getSeriesColorVarReference,
  getStyleDeclarationsForTheme,
  normalizeLegacyChartColor,
  resolveSeriesColorExpression,
  slugifySeriesKey,
};
