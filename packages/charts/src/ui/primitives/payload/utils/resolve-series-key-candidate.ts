import { asRecord } from "./as-record";
import { toStringValue } from "./to-string-value";

interface ChartPayloadLike {
  color?: string;
  dataKey?: unknown;
  name?: unknown;
  payload?: unknown;
  type?: unknown;
  value?: unknown;
}

const resolveSeriesKeyCandidate = (
  item: ChartPayloadLike,
  keyName: string | undefined
) => {
  if (!keyName) {
    return;
  }

  const directValue = asRecord(item)?.[keyName];
  const directString = toStringValue(directValue);

  if (directString) {
    return directString;
  }

  const payloadValue = asRecord(item.payload)?.[keyName];

  return toStringValue(payloadValue);
};

export { resolveSeriesKeyCandidate };
