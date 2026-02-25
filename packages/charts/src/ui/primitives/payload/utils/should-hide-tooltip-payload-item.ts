import { asRecord } from "./as-record";
import { isNoneToken } from "./is-none-token";

interface TooltipPayloadItemLike {
  color?: unknown;
  payload?: unknown;
  type?: unknown;
}

const hasExplicitColor = (value: unknown): boolean =>
  typeof value === "string" && value.trim().length > 0;

const shouldHideTooltipPayloadItem = (
  item: TooltipPayloadItemLike
): boolean => {
  if (isNoneToken(item.type)) {
    return true;
  }

  const payloadData = asRecord(item.payload);

  return isNoneToken(payloadData?.fill) && hasExplicitColor(item.color);
};

export type { TooltipPayloadItemLike };
export { shouldHideTooltipPayloadItem };
