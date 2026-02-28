import type { ComponentProps } from "react";
import type { FunnelChart as RechartsFunnelChart } from "recharts";

import { resolveCompleteSeriesName } from "../../shared/complete-helpers";
import type {
  CompleteChartDatum,
  CompleteChartSeries,
} from "../../shared/complete-types";
import { createRadialLabelFormatter } from "../../shared/utils/radial/create-radial-label-formatter";
import { getRadialSegmentColor } from "../../shared/utils/radial/get-radial-segment-color";
import { getRadialSegmentKey } from "../../shared/utils/radial/get-radial-segment-key";
import { resolveRadialChartProps } from "../../shared/utils/radial/resolve-radial-chart-props";
import { resolveTooltipSourceShared } from "../../shared/utils/radial/resolve-tooltip-source-shared";
import type {
  CompleteTooltipSourceMode,
  RechartsTooltipProps,
} from "../../shared/utils/radial/resolve-tooltip-source-shared";

type FunnelChartRootProps = Omit<
  ComponentProps<typeof RechartsFunnelChart>,
  "children" | "data" | "ref"
>;

interface UseFunnelChartRuntimeArgs<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  chartProps: FunnelChartRootProps | undefined;
  data: readonly TData[];
  dataKey: keyof TData & string;
  nameKey: (keyof TData & string) | undefined;
  series: readonly CompleteChartSeries[] | undefined;
  tooltipProps: RechartsTooltipProps | undefined;
  tooltipSource: CompleteTooltipSourceMode;
  valueFormatter:
    | ((value: number, seriesKey: string, datum: TData) => string)
    | undefined;
}

interface UseFunnelChartRuntimeResult<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  fallbackDatum: TData;
  labelFormatter: (value: unknown, datum: unknown) => string;
  resolvedNameKey: keyof TData & string;
  resolvedSeries: readonly CompleteChartSeries[];
  resolvedTooltipProps: RechartsTooltipProps | undefined;
  resolveFunnelChartProps: (
    usesAutoSizeContainer: boolean
  ) => FunnelChartRootProps | undefined;
  resolveSegmentKey: (datum: TData, index: number) => string;
}

const useFunnelChartRuntime = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
  chartProps,
  data,
  dataKey,
  nameKey,
  series,
  tooltipProps,
  tooltipSource,
  valueFormatter,
}: UseFunnelChartRuntimeArgs<TData>): UseFunnelChartRuntimeResult<TData> => {
  const resolvedNameKey = (nameKey ?? ("name" as keyof TData & string)) as
    | (keyof TData & string)
    | (keyof TData & string);
  const fallbackDatum = (data[0] ?? {}) as TData;
  const resolvedTooltipProps = resolveTooltipSourceShared(
    tooltipSource,
    tooltipProps
  );
  const providedSeriesByName = new Map(
    (series ?? []).map((seriesItem, index) => [
      resolveCompleteSeriesName(seriesItem, `series-${index + 1}`),
      seriesItem,
    ])
  );
  const resolvedSeries: readonly CompleteChartSeries[] =
    data.length > 0
      ? data.map((datum, index) => {
          const segmentKey = getRadialSegmentKey(datum, resolvedNameKey, index);
          const providedSeries = providedSeriesByName.get(segmentKey);

          if (providedSeries) {
            return {
              ...providedSeries,
              color:
                providedSeries.color ?? getRadialSegmentColor(datum, index),
              label: providedSeries.label ?? segmentKey,
              name: segmentKey,
            };
          }

          return {
            color: getRadialSegmentColor(datum, index),
            label: segmentKey,
            name: segmentKey,
          };
        })
      : [...(series ?? [])];
  const labelFormatter = createRadialLabelFormatter({
    data,
    dataKey,
    fallbackDatum,
    mode: "value",
    seriesKey: String(dataKey),
    valueFormatter,
  });

  return {
    fallbackDatum,
    labelFormatter,
    resolveFunnelChartProps: (usesAutoSizeContainer: boolean) =>
      resolveRadialChartProps(chartProps, usesAutoSizeContainer),
    resolveSegmentKey: (datum, index) =>
      getRadialSegmentKey(datum, resolvedNameKey, index),
    resolvedNameKey,
    resolvedSeries,
    resolvedTooltipProps,
  };
};

export { useFunnelChartRuntime };
