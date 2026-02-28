"use client";

import type { ComponentProps, ReactNode } from "react";
import type { DefaultLegendContentProps } from "recharts";
import { cn, tv } from "tailwind-variants";

import { useChart } from "../context/use-chart";
import { normalizeChartPayload } from "../payload/chart-payload-normalizer";
import { shouldHideLegendPayloadItem } from "../payload/utils/should-hide-legend-payload-item";
import {
  DEFAULT_UI_SIZE,
  type UISize,
  useGlobalUISize,
  useKuzenboComponentDefaults,
} from "./chart-size";
import { useLegendHighlightHandlers } from "./hooks/use-legend-highlight-handlers";
import { getLegendFallbackLabel } from "./utils/get-legend-fallback-label";

type ChartLegendContentProps = ComponentProps<"div"> &
  Pick<DefaultLegendContentProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
    onHighlightChange?: (seriesName: string | null) => void;
    size?: UISize;
    showColor?: boolean;
  };

const chartLegendContentVariants = tv({
  base: "flex items-center justify-center gap-4",
  variants: {
    size: {
      xs: "gap-2 text-xs",
      sm: "gap-3 text-xs",
      md: "gap-4 text-sm",
      lg: "gap-5 text-sm",
      xl: "gap-6 text-base",
    },
    topAligned: {
      true: "pb-3",
      false: "pt-3",
    },
  },
  defaultVariants: {
    size: DEFAULT_UI_SIZE,
  },
});

const chartLegendItemVariants = tv({
  base: "cursor-clickable text-muted-foreground focus-visible:ring-ring/50 [&>svg]:text-muted-foreground flex items-center rounded-sm border-0 bg-transparent p-0 text-left focus-visible:ring-2 focus-visible:outline-none",
  variants: {
    size: {
      xs: "gap-1 [&>svg]:h-2.5 [&>svg]:w-2.5",
      sm: "gap-1.5 [&>svg]:h-3 [&>svg]:w-3",
      md: "gap-1.5 [&>svg]:h-3 [&>svg]:w-3",
      lg: "gap-2 [&>svg]:h-3.5 [&>svg]:w-3.5",
      xl: "gap-2.5 [&>svg]:h-4 [&>svg]:w-4",
    },
  },
  defaultVariants: {
    size: DEFAULT_UI_SIZE,
  },
});

const chartLegendSwatchVariants = tv({
  base: "shrink-0 rounded-[2px]",
  variants: {
    size: {
      xs: "h-1.5 w-1.5",
      sm: "h-2 w-2",
      md: "h-2 w-2",
      lg: "h-2.5 w-2.5",
      xl: "h-3 w-3",
    },
  },
  defaultVariants: {
    size: DEFAULT_UI_SIZE,
  },
});

const ChartLegendContent = ({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
  onHighlightChange,
  size: providedSize,
  showColor = true,
}: ChartLegendContentProps) => {
  const { size: componentDefaultSize } =
    useKuzenboComponentDefaults<ChartLegendContentProps>("ChartLegendContent");
  const globalSize = useGlobalUISize();
  const size =
    providedSize ?? componentDefaultSize ?? globalSize ?? DEFAULT_UI_SIZE;

  const { config, getSeriesColor, resolveColorExpression } = useChart();
  const { clearHighlight, getHighlightHandler } = useLegendHighlightHandlers({
    onHighlightChange,
  });
  const normalizedPayload = normalizeChartPayload({
    config,
    payload,
    nameKey,
    getSeriesColor,
    resolveColorExpression,
  }).filter((item) => !shouldHideLegendPayloadItem(item.item));

  if (!normalizedPayload.length) {
    return null;
  }

  return (
    <div
      className={cn(
        chartLegendContentVariants({
          size,
          topAligned: verticalAlign === "top",
        }),
        className
      )}
      data-size={size}
      data-slot="chart-legend-content"
    >
      {normalizedPayload.map((entry) => {
        const { item } = entry;
        const fallbackLabel: ReactNode = getLegendFallbackLabel({
          dataKey: item.dataKey,
          value: item.value,
        });
        const label = entry.itemConfig?.label ?? fallbackLabel;
        const highlightSeries = getHighlightHandler(entry.key);

        return (
          <button
            className={cn(chartLegendItemVariants({ size }))}
            data-size={size}
            data-slot="chart-legend-item"
            key={`${entry.key}-${String(item.value ?? item.dataKey ?? "value")}`}
            onBlur={clearHighlight}
            onFocus={highlightSeries}
            onMouseEnter={highlightSeries}
            onMouseLeave={clearHighlight}
            type="button"
          >
            {entry.itemConfig?.icon && !hideIcon ? (
              <entry.itemConfig.icon />
            ) : (
              showColor && (
                <div
                  className={cn(chartLegendSwatchVariants({ size }))}
                  style={{
                    backgroundColor: entry.color,
                  }}
                />
              )
            )}
            {label}
          </button>
        );
      })}
    </div>
  );
};

export type { ChartLegendContentProps };
export { ChartLegendContent };
