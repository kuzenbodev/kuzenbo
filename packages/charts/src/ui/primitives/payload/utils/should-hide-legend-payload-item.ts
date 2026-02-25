import { isNoneToken } from "./is-none-token";

interface LegendPayloadItemLike {
  color?: unknown;
  type?: unknown;
}

const shouldHideLegendPayloadItem = (item: LegendPayloadItemLike): boolean =>
  isNoneToken(item.type) || isNoneToken(item.color);

export type { LegendPayloadItemLike };
export { shouldHideLegendPayloadItem };
