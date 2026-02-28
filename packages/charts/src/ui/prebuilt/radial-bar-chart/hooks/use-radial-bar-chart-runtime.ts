import type { ComponentProps } from "react";
import type { RadialBarChart as RechartsRadialBarChart } from "recharts";

import { resolveCompleteSeriesName } from "../../shared/complete-helpers";
import type {
  CompleteChartDatum,
  CompleteChartSeries,
} from "../../shared/complete-types";
import {
  createRadialLabelFormatter,
  type RadialLabelMode,
} from "../../shared/utils/radial/create-radial-label-formatter";
import { getRadialSegmentColor } from "../../shared/utils/radial/get-radial-segment-color";
import { getRadialSegmentKey } from "../../shared/utils/radial/get-radial-segment-key";
import { resolveRadialAngles } from "../../shared/utils/radial/resolve-radial-angles";
import { resolveRadialChartProps } from "../../shared/utils/radial/resolve-radial-chart-props";
import {
  resolveTooltipSourceShared,
  type CompleteTooltipSourceMode,
  type RechartsTooltipProps,
} from "../../shared/utils/radial/resolve-tooltip-source-shared";

type RadialBarChartRootProps = Omit<
  ComponentProps<typeof RechartsRadialBarChart>,
  "children" | "data" | "ref"
>;

interface UseRadialBarChartRuntimeArgs<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  chartProps: RadialBarChartRootProps | undefined;
  data: readonly TData[];
  dataKey: keyof TData & string;
  endAngle: number | undefined;
  labelMode: RadialLabelMode;
  nameKey: (keyof TData & string) | undefined;
  series: readonly CompleteChartSeries[] | undefined;
  startAngle: number | undefined;
  tooltipProps: RechartsTooltipProps | undefined;
  tooltipSource: CompleteTooltipSourceMode;
  valueFormatter:
    | ((value: number, seriesKey: string, datum: TData) => string)
    | undefined;
}

interface UseRadialBarChartRuntimeResult<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  fallbackDatum: TData;
  labelFormatter: (value: unknown, datum: unknown) => string;
  resolvedAngles: ReturnType<typeof resolveRadialAngles>;
  resolvedNameKey: keyof TData & string;
  resolvedSeries: readonly CompleteChartSeries[];
  resolvedTooltipProps: RechartsTooltipProps | undefined;
  resolveRadialBarChartProps: (
    usesAutoSizeContainer: boolean
  ) => RadialBarChartRootProps | undefined;
  resolveSegmentKey: (datum: TData, index: number) => string;
}

const useRadialBarChartRuntime = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
  chartProps,
  data,
  dataKey,
  endAngle,
  labelMode,
  nameKey,
  series,
  startAngle,
  tooltipProps,
  tooltipSource,
  valueFormatter,
}: UseRadialBarChartRuntimeArgs<TData>): UseRadialBarChartRuntimeResult<TData> => {
  const resolvedNameKey = (nameKey ?? ("name" as keyof TData & string)) as
    | (keyof TData & string)
    | (keyof TData & string);
  const fallbackDatum = (data[0] ?? {}) as TData;
  const resolvedAngles = resolveRadialAngles({
    endAngle,
    startAngle,
  });
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
    mode: labelMode,
    seriesKey: String(dataKey),
    valueFormatter,
  });

  return {
    fallbackDatum,
    labelFormatter,
    resolvedAngles,
    resolvedNameKey,
    resolvedSeries,
    resolvedTooltipProps,
    resolveRadialBarChartProps: (usesAutoSizeContainer: boolean) =>
      resolveRadialChartProps(chartProps, usesAutoSizeContainer),
    resolveSegmentKey: (datum, index) =>
      getRadialSegmentKey(datum, resolvedNameKey, index),
  };
};

export { useRadialBarChartRuntime };
