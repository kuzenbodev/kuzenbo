import type { ComponentProps } from "react";

import { LabelList, Line } from "recharts";

import type { CompleteCompositeSeries } from "../../shared/complete-types";
import type { LabelListContentRenderer } from "../../shared/utils/label/label-list-content-types";

const DIMMED_SERIES_OPACITY = 0.45;

interface RenderLineSeriesArgs {
  activeDotProps: Record<string, unknown> | undefined;
  connectNulls: boolean;
  curveType: CompleteCompositeSeries["curveType"];
  dotProps: Record<string, unknown> | undefined;
  fillOpacity: number;
  isDimmed: boolean;
  lineProps:
    | Partial<Omit<ComponentProps<typeof Line>, "ref" | "dataKey">>
    | ((
        series: CompleteCompositeSeries
      ) => Partial<Omit<ComponentProps<typeof Line>, "ref" | "dataKey">>)
    | undefined;
  pointLabelContentRenderer: LabelListContentRenderer;
  seriesColor: string;
  seriesItem: CompleteCompositeSeries;
  seriesName: string;
  strokeWidth: number;
  withBarValueLabel: boolean;
  withDots: boolean;
  withPointLabels: boolean;
}

const renderLineSeries = ({
  activeDotProps,
  connectNulls,
  curveType,
  dotProps,
  fillOpacity,
  isDimmed,
  lineProps,
  pointLabelContentRenderer,
  seriesColor,
  seriesItem,
  seriesName,
  strokeWidth,
  withBarValueLabel,
  withDots,
  withPointLabels,
}: RenderLineSeriesArgs) => {
  const resolvedLineProps =
    typeof lineProps === "function" ? lineProps(seriesItem) : lineProps;

  return (
    <Line
      activeDot={
        withDots
          ? {
              ...activeDotProps,
              fillOpacity: isDimmed ? 0 : 1,
              strokeOpacity: isDimmed ? 0 : 1,
            }
          : false
      }
      connectNulls={connectNulls}
      dataKey={seriesName}
      dot={
        withDots
          ? {
              ...dotProps,
              fillOpacity: isDimmed ? 0 : 1,
              strokeOpacity: isDimmed ? 0 : 1,
            }
          : false
      }
      fill={seriesColor}
      fillOpacity={isDimmed ? DIMMED_SERIES_OPACITY : fillOpacity}
      key={seriesName}
      name={seriesName}
      stroke={seriesColor}
      strokeDasharray={seriesItem.strokeDasharray}
      strokeOpacity={isDimmed ? DIMMED_SERIES_OPACITY : fillOpacity}
      strokeWidth={strokeWidth}
      type={seriesItem.curveType ?? curveType}
      yAxisId={seriesItem.yAxisId}
      {...resolvedLineProps}
    >
      {withPointLabels ? (
        <LabelList
          dataKey={seriesName}
          fill={
            withBarValueLabel
              ? "var(--color-background)"
              : "var(--color-foreground)"
          }
          fontSize={12}
          fontWeight={600}
          content={pointLabelContentRenderer}
          offset={withBarValueLabel ? 10 : 8}
          position={withBarValueLabel ? "bottom" : "top"}
        />
      ) : null}
    </Line>
  );
};

export { renderLineSeries };
