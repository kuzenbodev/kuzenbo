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

    const declarations = [
      `  ${descriptor.varName}: ${descriptor.colorByTheme[theme]};`,
    ];

    if (descriptor.legacyVarName) {
      declarations.push(
        `  ${descriptor.legacyVarName}: ${descriptor.colorByTheme[theme]};`
      );
    }

    return declarations;
  });

export { getStyleDeclarationsForTheme };
