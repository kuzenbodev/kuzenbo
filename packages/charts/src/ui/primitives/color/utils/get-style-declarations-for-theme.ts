import type { ChartSeriesColorRegistry, ChartThemeName } from "./constants";

const getStyleDeclarationsForTheme = (
  registry: ChartSeriesColorRegistry,
  theme: ChartThemeName
) =>
  registry.order.flatMap((seriesKey) => {
    const descriptor = registry.byKey[seriesKey];

    if (!descriptor) {
      return [];
    }

    return [`  ${descriptor.varName}: ${descriptor.colorByTheme[theme]};`];
  });

export { getStyleDeclarationsForTheme };
