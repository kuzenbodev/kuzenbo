import type { ComponentProps } from "react";

import { Area, LabelList } from "recharts";

import type { CompleteCompositeSeries } from "../../shared/complete-types";
import type { LabelListContentRenderer } from "../../shared/utils/label/label-list-content-types";

const DIMMED_SERIES_OPACITY = 0.45;

interface RenderAreaSeriesArgs {
  activeDotProps: Record<string, unknown> | undefined;
  areaProps:
    | Partial<Omit<ComponentProps<typeof Area>, "ref" | "dataKey">>
    | ((
        series: CompleteCompositeSeries
      ) => Partial<Omit<ComponentProps<typeof Area>, "ref" | "dataKey">>)
    | undefined;
  connectNulls: boolean;
  curveType: CompleteCompositeSeries["curveType"];
  dotProps: Record<string, unknown> | undefined;
  fillOpacity: number;
  isDimmed: boolean;
  pointLabelContentRenderer: LabelListContentRenderer;
  seriesColor: string;
  seriesItem: CompleteCompositeSeries;
  seriesName: string;
  strokeWidth: number;
  withDots: boolean;
  withPointLabels: boolean;
}

const renderAreaSeries = ({
  activeDotProps,
  areaProps,
  connectNulls,
  curveType,
  dotProps,
  fillOpacity,
  isDimmed,
  pointLabelContentRenderer,
  seriesColor,
  seriesItem,
  seriesName,
  strokeWidth,
  withDots,
  withPointLabels,
}: RenderAreaSeriesArgs) => {
  const resolvedAreaProps =
    typeof areaProps === "function" ? areaProps(seriesItem) : areaProps;

  return (
    <Area
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
      fillOpacity={isDimmed ? DIMMED_SERIES_OPACITY : fillOpacity * 0.2}
      key={seriesName}
      name={seriesName}
      stroke={seriesColor}
      strokeDasharray={seriesItem.strokeDasharray}
      strokeOpacity={isDimmed ? DIMMED_SERIES_OPACITY : fillOpacity}
      strokeWidth={strokeWidth}
      type={seriesItem.curveType ?? curveType}
      yAxisId={seriesItem.yAxisId}
      {...resolvedAreaProps}
    >
      {withPointLabels ? (
        <LabelList
          dataKey={seriesName}
          fill="var(--color-muted-foreground)"
          fontSize={12}
          fontWeight={600}
          content={pointLabelContentRenderer}
          offset={8}
          position="top"
        />
      ) : null}
    </Area>
  );
};

export { renderAreaSeries };
