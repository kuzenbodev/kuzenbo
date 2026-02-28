"use client";

import type { ComponentProps, CSSProperties } from "react";
import type { TooltipContentProps } from "recharts";
import { cn, tv } from "tailwind-variants";

import { useChart } from "../context/use-chart";
import {
  DEFAULT_UI_SIZE,
  type UISize,
  useGlobalUISize,
  useKuzenboComponentDefaults,
} from "../legend/chart-size";
import { normalizeChartPayload } from "../payload/chart-payload-normalizer";
import { shouldHideTooltipPayloadItem } from "../payload/utils/should-hide-tooltip-payload-item";
import { useTooltipLabel } from "./hooks/use-tooltip-label";
import { useTooltipValueFormat } from "./hooks/use-tooltip-value-format";
import { buildTooltipItemKey } from "./utils/build-tooltip-item-key";

type RechartsTooltipContentProps = TooltipContentProps<
  number | string | ReadonlyArray<number | string>,
  number | string
>;
type TooltipPayloadItem = NonNullable<
  RechartsTooltipContentProps["payload"]
>[number];

type ChartTooltipContentProps = Partial<RechartsTooltipContentProps> &
  ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
    size?: UISize;
    unit?: string;
    valueFormatter?: (
      value: number,
      seriesKey: string,
      datum: Record<string, unknown>
    ) => string;
  };

const chartTooltipContentVariants = tv({
  base: "border-border/50 bg-background grid min-w-32 items-start border shadow-xl",
  variants: {
    size: {
      xs: "gap-1 rounded-md px-2 py-1 text-xs",
      sm: "gap-1.5 rounded-md px-2.5 py-1.5 text-xs",
      md: "gap-1.5 rounded-lg px-2.5 py-1.5 text-xs",
      lg: "gap-2 rounded-lg px-3 py-2 text-sm",
      xl: "gap-2.5 rounded-xl px-3.5 py-2.5 text-base",
    },
  },
  defaultVariants: {
    size: DEFAULT_UI_SIZE,
  },
});

const chartTooltipRowsVariants = tv({
  base: "grid",
  variants: {
    size: {
      xs: "gap-1",
      sm: "gap-1.5",
      md: "gap-1.5",
      lg: "gap-2",
      xl: "gap-2.5",
    },
  },
  defaultVariants: {
    size: DEFAULT_UI_SIZE,
  },
});

const chartTooltipPayloadRowVariants = tv({
  base: "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch",
  variants: {
    dotIndicator: {
      true: "items-center",
    },
    size: {
      xs: "gap-1.5 [&>svg]:h-2 [&>svg]:w-2",
      sm: "gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
      md: "gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
      lg: "gap-2.5 [&>svg]:h-3 [&>svg]:w-3",
      xl: "gap-3 [&>svg]:h-3.5 [&>svg]:w-3.5",
    },
  },
  defaultVariants: {
    size: DEFAULT_UI_SIZE,
  },
});

const chartTooltipIndicatorVariants = tv({
  base: "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
  variants: {
    indicator: {
      dot: "",
      line: "w-1",
      dashed: "w-0 border-[1.5px] border-dashed bg-transparent",
    },
    nestLabel: {
      true: "",
      false: "",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
  },
  compoundVariants: [
    {
      class: "h-2 w-2",
      indicator: "dot",
      size: "xs",
    },
    {
      class: "h-2.5 w-2.5",
      indicator: "dot",
      size: "sm",
    },
    {
      class: "h-2.5 w-2.5",
      indicator: "dot",
      size: "md",
    },
    {
      class: "h-3 w-3",
      indicator: "dot",
      size: "lg",
    },
    {
      class: "h-3.5 w-3.5",
      indicator: "dot",
      size: "xl",
    },
    {
      class: "w-0.5",
      indicator: "line",
      size: "xs",
    },
    {
      class: "w-1",
      indicator: "line",
      size: "sm",
    },
    {
      class: "w-1",
      indicator: "line",
      size: "md",
    },
    {
      class: "w-1.5",
      indicator: "line",
      size: "lg",
    },
    {
      class: "w-2",
      indicator: "line",
      size: "xl",
    },
    {
      class: "my-0.5",
      indicator: "dashed",
      nestLabel: true,
    },
    {
      class: "border-[1px]",
      indicator: "dashed",
      size: "xs",
    },
    {
      class: "border-[1.5px]",
      indicator: "dashed",
      size: "sm",
    },
    {
      class: "border-[1.5px]",
      indicator: "dashed",
      size: "md",
    },
    {
      class: "border-[2px]",
      indicator: "dashed",
      size: "lg",
    },
    {
      class: "border-[2px]",
      indicator: "dashed",
      size: "xl",
    },
  ],
  defaultVariants: {
    size: DEFAULT_UI_SIZE,
  },
});

const chartTooltipValueRowVariants = tv({
  base: "flex flex-1 justify-between leading-none",
  variants: {
    nestLabel: {
      true: "items-end",
      false: "items-center",
    },
    size: {
      xs: "gap-2",
      sm: "gap-3",
      md: "gap-3",
      lg: "gap-3.5",
      xl: "gap-4",
    },
  },
  defaultVariants: {
    size: DEFAULT_UI_SIZE,
  },
});

const ChartTooltipContent = ({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
  size: providedSize,
  unit,
  valueFormatter,
}: ChartTooltipContentProps) => {
  const { size: componentDefaultSize } =
    useKuzenboComponentDefaults<ChartTooltipContentProps>(
      "ChartTooltipContent"
    );
  const globalSize = useGlobalUISize();
  const size =
    providedSize ?? componentDefaultSize ?? globalSize ?? DEFAULT_UI_SIZE;

  const { config, getSeriesColor, resolveColorExpression } = useChart();
  const typedPayload = (payload ?? []) as readonly TooltipPayloadItem[];
  const normalizedPayload = normalizeChartPayload({
    config,
    payload: typedPayload,
    nameKey,
    labelKey,
    getSeriesColor,
    resolveColorExpression,
  }).filter((item) => !shouldHideTooltipPayloadItem(item.item));
  const tooltipLabel = useTooltipLabel({
    hideLabel,
    label,
    labelClassName,
    labelFormatter,
    normalizedPayload,
    payload: typedPayload,
  });
  const formatTooltipValue = useTooltipValueFormat({
    unit,
    valueFormatter,
  });

  if (!(active && normalizedPayload.length)) {
    return null;
  }

  const nestLabel = normalizedPayload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(chartTooltipContentVariants({ size }), className)}
      data-size={size}
      data-slot="chart-tooltip-content"
    >
      {nestLabel ? null : tooltipLabel}
      <div className={cn(chartTooltipRowsVariants({ size }))}>
        {normalizedPayload.map((entry, idx) => {
          const item = entry.item as TooltipPayloadItem;
          const indicatorColor =
            resolveColorExpression(color, entry.key) ?? entry.color;
          const itemValue = item.value;
          const formattedValue = formatTooltipValue(
            itemValue,
            entry.key,
            entry.payloadData
          );
          const itemKey = buildTooltipItemKey({
            itemName: item.name,
            itemValue,
            seriesKey: entry.key,
          });

          return (
            <div
              className={cn(
                chartTooltipPayloadRowVariants({
                  dotIndicator: indicator === "dot",
                  size,
                })
              )}
              key={itemKey}
            >
              {formatter && item.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, idx, typedPayload)
              ) : (
                <>
                  {entry.itemConfig?.icon ? (
                    <entry.itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          chartTooltipIndicatorVariants({
                            indicator,
                            nestLabel,
                            size,
                          })
                        )}
                        style={
                          {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor,
                          } as CSSProperties
                        }
                      />
                    )
                  )}
                  <div
                    className={cn(
                      chartTooltipValueRowVariants({
                        nestLabel,
                        size,
                      })
                    )}
                  >
                    <div
                      className={cn(
                        "grid min-w-0",
                        size === "xs" ? "gap-1" : "gap-1.5"
                      )}
                    >
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground truncate">
                        {entry.itemConfig?.label ??
                          item.name ??
                          (item.dataKey === undefined
                            ? "Value"
                            : String(item.dataKey))}
                      </span>
                    </div>
                    {item.value !== undefined && item.value !== null ? (
                      <span className="text-foreground shrink-0 pl-2 text-right font-mono font-medium tabular-nums">
                        {formattedValue}
                      </span>
                    ) : null}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export type { ChartTooltipContentProps };
export { ChartTooltipContent };
