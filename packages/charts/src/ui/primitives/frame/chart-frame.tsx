"use client";

import type { ComponentProps, ReactNode } from "react";

import { cn, tv } from "tailwind-variants";

import { useChartConfig } from "../context/use-chart";
import { ChartStyle } from "../style/chart-style";

interface ChartFrameProps extends ComponentProps<"div"> {
  children: ReactNode;
  withStyle?: boolean;
}

const chartFrameVariants = tv({
  base: "relative w-full min-h-[240px] text-xs [&_.recharts-cartesian-axis-line]:stroke-border/70 [&_.recharts-cartesian-axis-tick-line]:stroke-border/70 [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_line]:stroke-border/50 [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_line]:stroke-border/70 [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
});

const ChartFrame = ({
  children,
  className,
  withStyle = true,
  ...props
}: ChartFrameProps) => {
  const { chartId, seriesRegistry } = useChartConfig();

  return (
    <div
      className={cn(chartFrameVariants(), className)}
      data-chart={chartId}
      data-slot="chart"
      {...props}
    >
      {withStyle ? (
        <ChartStyle id={chartId} seriesRegistry={seriesRegistry} />
      ) : null}
      {children}
    </div>
  );
};

export { ChartFrame };
export type { ChartFrameProps };
