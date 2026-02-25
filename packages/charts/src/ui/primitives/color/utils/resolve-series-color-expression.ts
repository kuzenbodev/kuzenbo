import type { ChartSeriesColorRegistry } from "./constants";

import { CSS_VAR_REFERENCE_PATTERN } from "./constants";
import { getChartThemeFromDom } from "./get-chart-theme-from-dom";
import { normalizeLegacyChartColor } from "./normalize-legacy-chart-color";

interface ResolveSeriesColorExpressionOptions {
  value: string | undefined;
  fallbackSeriesKey?: string;
  registry: ChartSeriesColorRegistry;
  chartId: string;
}

const getSeriesColorFromRegistry = (
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

const resolveSeriesColorExpression = ({
  value,
  fallbackSeriesKey,
  registry,
  chartId,
}: ResolveSeriesColorExpressionOptions) => {
  const normalized = normalizeLegacyChartColor(value);

  if (!normalized) {
    if (!fallbackSeriesKey) {
      return;
    }

    return getSeriesColorFromRegistry(fallbackSeriesKey, registry, chartId);
  }

  const variableMatch = normalized.match(CSS_VAR_REFERENCE_PATTERN);

  if (!variableMatch) {
    return normalized;
  }

  const [, variableName] = variableMatch;

  if (!variableName) {
    return normalized;
  }

  const mappedSeriesKey = registry.byVarName[variableName] ?? fallbackSeriesKey;

  if (!mappedSeriesKey) {
    return normalized;
  }

  return (
    getSeriesColorFromRegistry(mappedSeriesKey, registry, chartId) ?? normalized
  );
};

export { resolveSeriesColorExpression };
export type { ResolveSeriesColorExpressionOptions };
