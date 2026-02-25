import type { CompleteChartDatum } from "../../shared/complete-types";

import { toRenderableLabelValue } from "./to-renderable-label-value";

interface CreatePointLabelFormatterOptions<
  TData extends CompleteChartDatum = CompleteChartDatum,
> {
  pointLabelFormatter?: (
    value: number,
    seriesName: string,
    datum: TData
  ) => string;
  seriesName: string;
  valueFormatter?: (value: number, seriesKey: string, datum: TData) => string;
}

const createPointLabelFormatter =
  <TData extends CompleteChartDatum = CompleteChartDatum>({
    pointLabelFormatter,
    seriesName,
    valueFormatter,
  }: CreatePointLabelFormatterOptions<TData>) =>
  (value: unknown, datum: TData): number | string => {
    if (typeof value !== "number") {
      return toRenderableLabelValue(value);
    }

    if (pointLabelFormatter) {
      return pointLabelFormatter(value, seriesName, datum);
    }

    if (valueFormatter) {
      return valueFormatter(value, seriesName, datum);
    }

    return value;
  };

export { createPointLabelFormatter };
