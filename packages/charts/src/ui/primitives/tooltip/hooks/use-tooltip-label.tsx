import type { ReactNode } from "react";
import { useMemo } from "react";
import { cn } from "tailwind-variants";

import type { NormalizedChartPayloadItem } from "../../payload/chart-payload-normalizer";

interface UseTooltipLabelOptions<TPayloadItem> {
  hideLabel: boolean;
  label: ReactNode;
  labelClassName?: string;
  labelFormatter?: (
    value: ReactNode,
    payload: readonly TPayloadItem[]
  ) => ReactNode;
  normalizedPayload: readonly NormalizedChartPayloadItem[];
  payload: readonly TPayloadItem[];
}

const useTooltipLabel = <TPayloadItem,>({
  hideLabel,
  label,
  labelClassName,
  labelFormatter,
  normalizedPayload,
  payload,
}: UseTooltipLabelOptions<TPayloadItem>) =>
  useMemo(() => {
    if (hideLabel || !normalizedPayload.length) {
      return null;
    }

    const [firstItem] = normalizedPayload;

    if (!firstItem) {
      return null;
    }

    const labelValue = firstItem.itemConfig?.label ?? label ?? firstItem.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(labelValue, payload)}
        </div>
      );
    }

    if (!labelValue) {
      return null;
    }

    return (
      <div className={cn("font-medium", labelClassName)}>{labelValue}</div>
    );
  }, [
    hideLabel,
    label,
    labelClassName,
    labelFormatter,
    normalizedPayload,
    payload,
  ]);

export { useTooltipLabel };
