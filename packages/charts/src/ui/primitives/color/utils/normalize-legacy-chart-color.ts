import { LEGACY_HSL_CHART_TOKEN_PATTERN } from "./constants";

const normalizeLegacyChartColor = (value: string | undefined) => {
  if (!value) {
    return;
  }

  const trimmed = value.trim();
  const legacyMatch = trimmed.match(LEGACY_HSL_CHART_TOKEN_PATTERN);

  if (legacyMatch) {
    return `var(${legacyMatch[1]})`;
  }

  return trimmed;
};

export { normalizeLegacyChartColor };
