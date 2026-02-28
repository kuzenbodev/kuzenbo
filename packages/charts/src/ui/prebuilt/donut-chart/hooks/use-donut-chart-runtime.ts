import type { ComponentProps } from "react";
import type { PieChart as RechartsPieChart } from "recharts";

import { resolveCompleteSeriesName } from "../../shared/complete-helpers";
import type {
  CompleteChartDatum,
  CompleteChartSeries,
} from "../../shared/complete-types";
import { createRadialLabelFormatter } from "../../shared/utils/radial/create-radial-label-formatter";
import type { RadialLabelMode } from "../../shared/utils/radial/create-radial-label-formatter";
import { getRadialSegmentColor } from "../../shared/utils/radial/get-radial-segment-color";
import { getRadialSegmentKey } from "../../shared/utils/radial/get-radial-segment-key";
import { resolveDonutRadii } from "../../shared/utils/radial/resolve-donut-radii";
import type { ResolveDonutRadiiOptions } from "../../shared/utils/radial/resolve-donut-radii";
import { resolveRadialAngles } from "../../shared/utils/radial/resolve-radial-angles";
import { resolveRadialChartProps } from "../../shared/utils/radial/resolve-radial-chart-props";
import { resolveTooltipSourceShared } from "../../shared/utils/radial/resolve-tooltip-source-shared";
import type {
  CompleteTooltipSourceMode,
  RechartsTooltipProps,
} from "../../shared/utils/radial/resolve-tooltip-source-shared";
import { toRadialValue } from "../../shared/utils/radial/to-radial-value";

type DonutChartRootProps = Omit<
  ComponentProps<typeof RechartsPieChart>,
  "children" | "data" | "ref"
>;

interface UseDonutChartRuntimeArgs<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  chartProps: DonutChartRootProps | undefined;
  data: readonly TData[];
  dataKey: keyof TData & string;
  fallbackNameKey: keyof TData & string;
  isSemicircle: boolean;
  labelMode: RadialLabelMode;
  nameKey: (keyof TData & string) | undefined;
  size?: ResolveDonutRadiiOptions["size"];
  series: readonly CompleteChartSeries[] | undefined;
  startAngle: number | undefined;
  thickness?: ResolveDonutRadiiOptions["thickness"];
  endAngle: number | undefined;
  tooltipProps: RechartsTooltipProps | undefined;
  tooltipSource: CompleteTooltipSourceMode;
  valueFormatter:
    | ((value: number, seriesKey: string, datum: TData) => string)
    | undefined;
}

interface UseDonutChartRuntimeResult<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  fallbackDatum: TData;
  labelFormatter: (value: unknown, datum: unknown) => string;
  resolvedRadii: ReturnType<typeof resolveDonutRadii>;
  resolvedAngles: ReturnType<typeof resolveRadialAngles>;
  resolvedNameKey: keyof TData & string;
  resolvedSeries: readonly CompleteChartSeries[];
  resolvedTooltipProps: RechartsTooltipProps | undefined;
  resolvePieChartProps: (
    usesAutoSizeContainer: boolean
  ) => DonutChartRootProps | undefined;
  resolveSegmentKey: (datum: TData, index: number) => string;
  totalValue: number;
}

const useDonutChartRuntime = <
  TData extends CompleteChartDatum = CompleteChartDatum,
>({
  chartProps,
  data,
  dataKey,
  fallbackNameKey,
  isSemicircle,
  labelMode,
  nameKey,
  size,
  series,
  startAngle,
  thickness,
  endAngle,
  tooltipProps,
  tooltipSource,
  valueFormatter,
}: UseDonutChartRuntimeArgs<TData>): UseDonutChartRuntimeResult<TData> => {
  const resolvedNameKey = (nameKey ?? fallbackNameKey) as keyof TData & string;
  const fallbackDatum = (data[0] ?? {}) as TData;
  const resolvedAngles = resolveRadialAngles({
    endAngle,
    isSemicircle,
    startAngle,
  });
  const resolvedRadii = resolveDonutRadii({
    size,
    thickness,
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
    mode: labelMode,
    seriesKey: String(dataKey),
    valueFormatter,
  });
  let totalValue = 0;

  for (const datum of data) {
    const numericValue = toRadialValue(datum[dataKey]);

    if (numericValue === null) {
      continue;
    }

    totalValue += numericValue;
  }

  return {
    fallbackDatum,
    labelFormatter,
    resolvePieChartProps: (usesAutoSizeContainer: boolean) =>
      resolveRadialChartProps(chartProps, usesAutoSizeContainer),
    resolveSegmentKey: (datum, index) =>
      getRadialSegmentKey(datum, resolvedNameKey, index),
    resolvedAngles,
    resolvedNameKey,
    resolvedRadii,
    resolvedSeries,
    resolvedTooltipProps,
    totalValue,
  };
};

export { useDonutChartRuntime };
