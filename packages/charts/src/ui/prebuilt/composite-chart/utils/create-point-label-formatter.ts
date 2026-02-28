import type {
  CompositeChartProps,
  CompleteChartDatum,
} from "../../shared/complete-types";
import { toRenderableLabelValue } from "./to-renderable-label-value";

const createPointLabelFormatter =
  <TData extends CompleteChartDatum = CompleteChartDatum>(
    valueFormatter: CompositeChartProps<TData>["valueFormatter"],
    seriesName: string
  ) =>
  (value: unknown, datum: TData) => {
    if (typeof value === "number" && valueFormatter) {
      return valueFormatter(value, seriesName, datum);
    }

    return toRenderableLabelValue(value);
  };

export { createPointLabelFormatter };
