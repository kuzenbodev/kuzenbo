"use client";

import { useMemo } from "react";

import type {
  ChartSeriesColorRegistry,
  ChartThemeName,
} from "../color/chart-color-resolver";
import {
  createSeriesColorRegistry,
  getStyleDeclarationsForTheme,
} from "../color/chart-color-resolver";
import type { ChartConfig } from "../types/chart-types";
import { THEMES } from "../types/chart-types";

interface ChartStyleProps {
  id: string;
  config?: ChartConfig;
  seriesRegistry?: ChartSeriesColorRegistry;
}

const ChartStyle = ({ id, config, seriesRegistry }: ChartStyleProps) => {
  const resolvedRegistry = useMemo(() => {
    if (seriesRegistry) {
      return seriesRegistry;
    }

    if (!config) {
      return;
    }

    return createSeriesColorRegistry(config);
  }, [config, seriesRegistry]);

  if (!resolvedRegistry || resolvedRegistry.order.length === 0) {
    return null;
  }

  const escapedId = id.replaceAll('"', '\\"');

  return (
    <style
      // oxlint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, selectorPrefix]) => {
            const declarations = getStyleDeclarationsForTheme(
              resolvedRegistry,
              theme as ChartThemeName
            ).join("\n");

            return `
${selectorPrefix} [data-chart="${escapedId}"] {
${declarations}
}
`;
          })
          .join("\n"),
      }}
    />
  );
};

export type { ChartStyleProps };
export { ChartStyle };
