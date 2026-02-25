import type { ComponentProps } from "react";

import { Bar, LabelList } from "recharts";

import type { CompleteCompositeSeries } from "../../shared/complete-types";
import type { LabelListContentRenderer } from "../../shared/utils/label/label-list-content-types";

const DIMMED_SERIES_OPACITY = 0.45;

interface RenderBarSeriesArgs {
  barProps:
    | Partial<Omit<ComponentProps<typeof Bar>, "ref" | "dataKey">>
    | ((
        series: CompleteCompositeSeries
      ) => Partial<Omit<ComponentProps<typeof Bar>, "ref" | "dataKey">>)
    | undefined;
  fillOpacity: number;
  isDimmed: boolean;
  maxBarWidth: number | undefined;
  minBarSize: number | undefined;
  pointLabelContentRenderer: LabelListContentRenderer;
  resolvedBarRadius: ComponentProps<typeof Bar>["radius"];
  seriesColor: string;
  seriesItem: CompleteCompositeSeries;
  seriesName: string;
  withBarValueLabel: boolean;
}

const renderBarSeries = ({
  barProps,
  fillOpacity,
  isDimmed,
  maxBarWidth,
  minBarSize,
  pointLabelContentRenderer,
  resolvedBarRadius,
  seriesColor,
  seriesItem,
  seriesName,
  withBarValueLabel,
}: RenderBarSeriesArgs) => {
  const resolvedBarProps =
    typeof barProps === "function" ? barProps(seriesItem) : barProps;

  return (
    <Bar
      dataKey={seriesName}
      fill={seriesColor}
      fillOpacity={isDimmed ? DIMMED_SERIES_OPACITY : fillOpacity}
      key={seriesName}
      maxBarSize={maxBarWidth}
      minPointSize={minBarSize}
      radius={resolvedBarRadius}
      stackId={seriesItem.stackId}
      stroke={seriesColor}
      strokeOpacity={isDimmed ? DIMMED_SERIES_OPACITY : 0}
      yAxisId={seriesItem.yAxisId}
      {...resolvedBarProps}
    >
      {withBarValueLabel ? (
        <LabelList
          dataKey={seriesName}
          fill="var(--color-foreground)"
          fontWeight={600}
          content={pointLabelContentRenderer}
          position="top"
        />
      ) : null}
    </Bar>
  );
};

export { renderBarSeries };
