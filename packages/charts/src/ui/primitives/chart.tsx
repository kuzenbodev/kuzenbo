"use client";

import {
  useActiveTooltipCoordinate,
  useActiveTooltipDataPoints,
  useActiveTooltipLabel,
  useChartHeight,
  useChartWidth,
  useIsTooltipActive,
  useOffset,
  usePlotArea,
} from "recharts";

import { ChartAutoSize } from "./autosize/chart-autosize";
import {
  useChart,
  useChartConfig,
  useSeriesColor,
  useSeriesColorVar,
} from "./context/use-chart";
import { ChartFrame } from "./frame/chart-frame";
import { ChartLegend } from "./legend/chart-legend";
import { ChartLegendContent } from "./legend/chart-legend-content";
import {
  ChartPortalTarget,
  useChartPortalTarget,
} from "./portal/chart-portal-target";
import { ChartProvider } from "./provider/chart-provider";
import { ChartRoot } from "./root/chart-root";
import type { ChartRootProps } from "./root/chart-root";
import { ChartStyle } from "./style/chart-style";
import { ChartTooltip } from "./tooltip/chart-tooltip";
import { ChartTooltipContent } from "./tooltip/chart-tooltip-content";

const Chart = Object.assign(ChartRoot, {
  AutoSize: ChartAutoSize,
  Frame: ChartFrame,
  Legend: ChartLegend,
  LegendContent: ChartLegendContent,
  PortalTarget: ChartPortalTarget,
  Provider: ChartProvider,
  Root: ChartRoot,
  Style: ChartStyle,
  Tooltip: ChartTooltip,
  TooltipContent: ChartTooltipContent,
  useActiveTooltipCoordinate,
  useActiveTooltipDataPoints,
  useActiveTooltipLabel,
  useChartHeight,
  useChartWidth,
  useConfig: useChartConfig,
  useIsTooltipActive,
  useOffset,
  usePlotArea,
  usePortalTarget: useChartPortalTarget,
  useSeriesColor,
  useSeriesColorVar,
});

export type ChartProps = ChartRootProps;

export type { ChartConfig } from "./types/chart-types";
export type { ChartAutoSizeProps } from "./autosize/chart-autosize";
export type { ChartFrameProps } from "./frame/chart-frame";
export type { ChartLegendContentProps } from "./legend/chart-legend-content";
export type { ChartProviderProps } from "./provider/chart-provider";
export type { ChartRootProps } from "./root/chart-root";
export type { ChartStyleProps } from "./style/chart-style";
export type { ChartTooltipContentProps } from "./tooltip/chart-tooltip-content";
export type {
  ChartPortalTargetProps,
  UseChartPortalTargetResult,
} from "./portal/chart-portal-target";

export {
  Chart,
  ChartAutoSize,
  ChartFrame,
  ChartLegend,
  ChartLegendContent,
  ChartPortalTarget,
  ChartProvider,
  ChartRoot,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  useChart,
  useActiveTooltipCoordinate,
  useActiveTooltipDataPoints,
  useActiveTooltipLabel,
  useChartHeight,
  useChartWidth,
  useChartConfig,
  useIsTooltipActive,
  useOffset,
  usePlotArea,
  useChartPortalTarget,
  useSeriesColor,
  useSeriesColorVar,
};

export type { ChartLegendProps } from "./legend/chart-legend";
export type { ChartTooltipProps } from "./tooltip/chart-tooltip";
