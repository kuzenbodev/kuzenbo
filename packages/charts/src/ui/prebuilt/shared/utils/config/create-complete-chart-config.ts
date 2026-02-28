import type { ChartConfig } from "../../../../primitives/chart";
import { normalizeChartColor } from "../../../../primitives/color/chart-color-resolver";
import type { CompleteChartSeries } from "../../complete-types";
import { getFallbackSeriesColor } from "../series/get-fallback-series-color";
import { resolveCompleteSeriesName } from "../series/resolve-complete-series-name";

const createCompleteChartConfig = (
  series: readonly CompleteChartSeries[]
): ChartConfig => {
  const config: ChartConfig = {};

  for (const [index, seriesItem] of series.entries()) {
    const seriesName = resolveCompleteSeriesName(
      seriesItem,
      `series-${index + 1}`
    );

    config[seriesName] = {
      label: seriesItem.label,
      icon: seriesItem.icon,
      ...(seriesItem.theme
        ? {
            theme: {
              light:
                normalizeChartColor(seriesItem.theme.light) ??
                seriesItem.theme.light,
              dark:
                normalizeChartColor(seriesItem.theme.dark) ??
                seriesItem.theme.dark,
            },
          }
        : {
            color:
              normalizeChartColor(seriesItem.color) ??
              getFallbackSeriesColor(index),
          }),
    };
  }

  return config;
};

export { createCompleteChartConfig };
