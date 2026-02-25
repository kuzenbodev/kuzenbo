import type { MapHeatmapValueToColorArgs, MappedHeatmapValue } from "./types";

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const mapHeatmapValueToColor = ({
  colorRange,
  domain,
  value,
}: MapHeatmapValueToColorArgs): MappedHeatmapValue => {
  const palette = colorRange.length > 0 ? colorRange : ["var(--color-muted)"];
  const [rawMin, rawMax] = domain;
  const domainMin = Math.min(rawMin, rawMax);
  const domainMax = Math.max(rawMin, rawMax);
  const lastLevelIndex = palette.length - 1;

  if (value === null || !Number.isFinite(value)) {
    return {
      color: palette[0] ?? "var(--color-muted)",
      intensity: 0,
      level: 0,
    };
  }

  const domainSpan = domainMax - domainMin;

  if (domainSpan === 0) {
    const level = value <= domainMin ? 0 : lastLevelIndex;

    return {
      color: palette[level] ?? palette[0] ?? "var(--color-muted)",
      intensity: level / Math.max(lastLevelIndex, 1),
      level,
    };
  }

  const ratio = clamp((value - domainMin) / domainSpan, 0, 1);
  const level = Math.round(ratio * lastLevelIndex);

  return {
    color: palette[level] ?? palette[0] ?? "var(--color-muted)",
    intensity: ratio,
    level,
  };
};

export { mapHeatmapValueToColor };
