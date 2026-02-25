import { useCallback } from "react";

interface UseTooltipValueFormatOptions {
  unit?: string;
  valueFormatter?: (
    value: number,
    seriesKey: string,
    datum: Record<string, unknown>
  ) => string;
}

const useTooltipValueFormat = ({
  unit,
  valueFormatter,
}: UseTooltipValueFormatOptions) =>
  useCallback(
    (
      itemValue: unknown,
      seriesKey: string,
      payloadData: Record<string, unknown> | undefined
    ) => {
      let numericValue = Number.NaN;

      if (typeof itemValue === "number") {
        numericValue = itemValue;
      } else if (typeof itemValue === "string") {
        numericValue = Number(itemValue);
      }

      const supportsNumericFormatting = Number.isFinite(numericValue);

      if (supportsNumericFormatting && valueFormatter && payloadData) {
        return valueFormatter(numericValue, seriesKey, payloadData);
      }

      if (supportsNumericFormatting) {
        const formattedNumericValue = numericValue.toLocaleString();

        if (!unit) {
          return formattedNumericValue;
        }

        return `${formattedNumericValue} ${unit}`;
      }

      return String(itemValue);
    },
    [unit, valueFormatter]
  );

export { useTooltipValueFormat };
