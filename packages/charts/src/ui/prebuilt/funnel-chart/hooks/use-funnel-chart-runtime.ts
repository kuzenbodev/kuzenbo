import type { ComponentProps } from "react";
import type { FunnelChart as RechartsFunnelChart } from "recharts";

import type {
  CompleteChartDatum,
  CompleteChartSeries,
} from "../../shared/complete-types";

import { resolveCompleteSeriesName } from "../../shared/complete-helpers";
import { createRadialLabelFormatter } from "../../shared/utils/radial/create-radial-label-formatter";
import { getRadialSegmentColor } from "../../shared/utils/radial/get-radial-segment-color";
import { getRadialSegmentKey } from "../../shared/utils/radial/get-radial-segment-key";
import { resolveRadialChartProps } from "../../shared/utils/radial/resolve-radial-chart-props";
import {
  resolveTooltipSourceShared,
  type CompleteTooltipSourceMode,
  type RechartsTooltipProps,
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
              name: segmentKey,
              label: providedSeries.label ?? segmentKey,
              color:
                providedSeries.color ?? getRadialSegmentColor(datum, index),
            };
          }

          return {
            name: segmentKey,
            label: segmentKey,
            color: getRadialSegmentColor(datum, index),
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
    resolvedNameKey,
    resolvedSeries,
    resolvedTooltipProps,
    resolveFunnelChartProps: (usesAutoSizeContainer: boolean) =>
      resolveRadialChartProps(chartProps, usesAutoSizeContainer),
    resolveSegmentKey: (datum, index) =>
      getRadialSegmentKey(datum, resolvedNameKey, index),
  };
};

export { useFunnelChartRuntime };
