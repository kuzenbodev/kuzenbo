type ChartThemeName = "light" | "dark";

interface ChartSeriesColorDescriptor {
  key: string;
  slug: string;
  varName: string;
  colorByTheme: Record<ChartThemeName, string>;
}

interface ChartSeriesColorRegistry {
  order: string[];
  byKey: Record<string, ChartSeriesColorDescriptor>;
  byVarName: Record<string, string>;
}

const CHART_COLOR_FALLBACKS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
] as const;

const DEFAULT_CHART_COLOR_FALLBACK = "var(--color-chart-1)";
const CSS_VAR_REFERENCE_PATTERN = /^var\(\s*(--[a-zA-Z0-9_-]+)\s*\)$/;
const CSS_CUSTOM_PROPERTY_NAME_PATTERN = /^--[a-zA-Z_][a-zA-Z0-9_-]*$/;
const UNSAFE_COLOR_EXPRESSION_PATTERN = /[;{}<>]|\r|\n/;

const getFallbackColor = (index: number) =>
  CHART_COLOR_FALLBACKS[index % CHART_COLOR_FALLBACKS.length] ??
  DEFAULT_CHART_COLOR_FALLBACK;

const isSafeColorExpression = (value: string) =>
  !UNSAFE_COLOR_EXPRESSION_PATTERN.test(value);

const isValidCssCustomPropertyName = (name: string) =>
  CSS_CUSTOM_PROPERTY_NAME_PATTERN.test(name);

export {
  CHART_COLOR_FALLBACKS,
  CSS_CUSTOM_PROPERTY_NAME_PATTERN,
  CSS_VAR_REFERENCE_PATTERN,
  DEFAULT_CHART_COLOR_FALLBACK,
  UNSAFE_COLOR_EXPRESSION_PATTERN,
  getFallbackColor,
  isSafeColorExpression,
  isValidCssCustomPropertyName,
};
export type {
  ChartSeriesColorDescriptor,
  ChartSeriesColorRegistry,
  ChartThemeName,
};
