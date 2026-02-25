import type {
  HeatmapTooltipLabelArgs,
  HeatmapTooltipLabelFormatter,
} from "./types";

const createHeatmapTooltipLabel = (
  formatter?: HeatmapTooltipLabelFormatter
): ((args: HeatmapTooltipLabelArgs) => string) => {
  if (formatter) {
    return formatter;
  }

  return ({ formattedValue, isOutsideDate, isoDate }) => {
    const outsideRangeSuffix = isOutsideDate ? " (outside range)" : "";

    return `${isoDate}: ${formattedValue}${outsideRangeSuffix}`;
  };
};

export { createHeatmapTooltipLabel };
