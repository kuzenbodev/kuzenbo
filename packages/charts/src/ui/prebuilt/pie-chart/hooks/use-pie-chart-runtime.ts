import type { ComponentProps } from "react";
import type { PieChart as RechartsPieChart } from "recharts";

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
import {
  resolvePieRadii,
  type ResolvePieRadiiOptions,
} from "../../shared/utils/radial/resolve-pie-radii";
import { resolveRadialAngles } from "../../shared/utils/radial/resolve-radial-angles";
import { resolveRadialChartProps } from "../../shared/utils/radial/resolve-radial-chart-props";
import {
  resolveTooltipSourceShared,
  type CompleteTooltipSourceMode,
  type RechartsTooltipProps,
} from "../../shared/utils/radial/resolve-tooltip-source-shared";

type PieChartRootProps = Omit<
  ComponentProps<typeof RechartsPieChart>,
  "children" | "data" | "ref"
>;

interface UsePieChartRuntimeArgs<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  chartProps: PieChartRootProps | undefined;
  data: readonly TData[];
  dataKey: keyof TData & string;
  endAngle: number | undefined;
  labelMode: RadialLabelMode;
  nameKey: (keyof TData & string) | undefined;
  size?: ResolvePieRadiiOptions["size"];
  series: readonly CompleteChartSeries[] | undefined;
  startAngle: number | undefined;
  tooltipProps: RechartsTooltipProps | undefined;
  tooltipSource: CompleteTooltipSourceMode;
  valueFormatter:
    | ((value: number, seriesKey: string, datum: TData) => string)
    | undefined;
}

interface UsePieChartRuntimeResult<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  fallbackDatum: TData;
  labelFormatter: (value: unknown, datum: unknown) => string;
  resolvedRadii: ReturnType<typeof resolvePieRadii>;
  resolvedAngles: ReturnType<typeof resolveRadialAngles>;
  resolvedNameKey: keyof TData & string;
  resolvedSeries: readonly CompleteChartSeries[];
  resolvedTooltipProps: RechartsTooltipProps | undefined;
  resolvePieChartProps: (
    usesAutoSizeContainer: boolean
  ) => PieChartRootProps | undefined;
  resolveSegmentKey: (datum: TData, index: number) => string;
}

const usePieChartRuntime = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
  chartProps,
  data,
  dataKey,
  endAngle,
  labelMode,
  nameKey,
  size,
  series,
  startAngle,
  tooltipProps,
  tooltipSource,
  valueFormatter,
}: UsePieChartRuntimeArgs<TData>): UsePieChartRuntimeResult<TData> => {
  const resolvedNameKey = (nameKey ??
    ("name" as keyof TData & string)) as keyof TData & string;
  const fallbackDatum = (data[0] ?? {}) as TData;
  const resolvedAngles = resolveRadialAngles({
    endAngle,
    startAngle,
  });
  const resolvedRadii = resolvePieRadii({
    size,
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
    resolvedRadii,
    resolvedAngles,
    resolvedNameKey,
    resolvedSeries,
    resolvedTooltipProps,
    resolvePieChartProps: (usesAutoSizeContainer: boolean) =>
      resolveRadialChartProps(chartProps, usesAutoSizeContainer),
    resolveSegmentKey: (datum, index) =>
      getRadialSegmentKey(datum, resolvedNameKey, index),
  };
};

export { usePieChartRuntime };
