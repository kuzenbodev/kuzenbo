import type { ReactNode } from "react";

import type { ChartConfig } from "../types/chart-types";
import { getPayloadConfigFromPayload } from "./chart-utils";
import { asRecord } from "./utils/as-record";
import { getShapeColor } from "./utils/get-shape-color";
import { resolveSeriesKey as resolveSeriesKeyFromPayload } from "./utils/resolve-series-key";
import { toStringValue } from "./utils/to-string-value";

interface ChartPayloadLike {
  color?: string;
  dataKey?: unknown;
  name?: unknown;
  payload?: unknown;
  type?: unknown;
  value?: unknown;
}

interface NormalizeChartPayloadOptions {
  config: ChartConfig;
  payload: readonly ChartPayloadLike[] | undefined;
  nameKey?: string;
  labelKey?: string;
  getSeriesColor: (seriesKey: string) => string | undefined;
  resolveColorExpression: (
    color: string | undefined,
    fallbackSeriesKey?: string
  ) => string | undefined;
}

interface NormalizedChartPayloadItem {
  color?: string;
  item: ChartPayloadLike;
  itemConfig?: ChartConfig[string];
  key: string;
  label?: ReactNode;
  payloadData?: Record<string, unknown>;
  value?: unknown;
}

const resolveSeriesKey = resolveSeriesKeyFromPayload;

const normalizeChartPayload = ({
  config,
  payload,
  nameKey,
  labelKey,
  getSeriesColor,
  resolveColorExpression,
}: NormalizeChartPayloadOptions): NormalizedChartPayloadItem[] => {
  const payloadItems = payload ?? [];

  return payloadItems.map((item) => {
    const key = resolveSeriesKey({
      config,
      item,
      nameKey,
    });

    const labelLookupKey = labelKey ?? key ?? "value";
    const itemConfig = getPayloadConfigFromPayload(
      config,
      item,
      labelLookupKey
    );
    const payloadData = asRecord(item.payload);
    const resolvedColor = resolveColorExpression(getShapeColor(item), key);

    return {
      color: resolvedColor ?? getSeriesColor(key ?? "value"),
      item,
      itemConfig,
      key,
      label:
        itemConfig?.label ??
        toStringValue(item.name) ??
        toStringValue(item.dataKey) ??
        toStringValue(item.value),
      payloadData,
      value: item.value,
    };
  });
};

export type { ChartPayloadLike, NormalizedChartPayloadItem };
export { normalizeChartPayload, resolveSeriesKey };
