import type {
  BarChartProps,
  CompleteChartDatum,
} from "../../shared/complete-types";
import { toNumericValue } from "../../shared/utils/number/to-numeric-value";
import { toRenderableLabelValue } from "./to-renderable-label-value";

const createBarValueLabelFormatter =
  <TData extends CompleteChartDatum = CompleteChartDatum>(
    valueFormatter: BarChartProps<TData>["valueFormatter"],
    seriesName: string
  ) =>
  (value: unknown, datum: TData) => {
    const numericValue = toNumericValue(value, { allowRange: true });

    if (numericValue === undefined) {
      return toRenderableLabelValue(value);
    }

    if (valueFormatter) {
      return valueFormatter(numericValue, seriesName, datum);
    }

    return numericValue;
  };

export { createBarValueLabelFormatter };
